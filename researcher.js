const RESEARCHER_STORAGE_KEY = "sut-physics-researcher-draft-v1";
const RESEARCHER_TYPES = ["Postdoctoral Researcher", "Postgraduate Researcher", "Research Fellow", "Visiting Researcher", "Research Assistant", "Project Researcher"];
const TO_BE_DECIDED_LABEL = "To be decided later";

const backend = window.SUTSupabase;
const emailCooldown = window.SUTStudentEmailCooldown;
let currentSession = null;
let currentRecord = null;
let facultyProfiles = [];
let researchGroups = [];
let pendingProfilePhoto = null;
let toastTimer;

const $ = selector => document.querySelector(selector);
const clean = value => String(value ?? "").replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
const today = () => new Date().toISOString().slice(0, 10);
const facultyNameValue = name => `name:${String(name || "").trim()}`;
const facultyOptionValue = profile => profile.optionFallback ? facultyNameValue(profile.name) : String(profile.id || "");
const facultyChoiceFromValue = value => {
  const raw = String(value || "").trim();
  if (raw.startsWith("name:")) return { id: "", name: raw.slice(5).trim() };
  const profile = facultyProfiles.find(item => item.id === raw);
  return { id: raw, name: profile?.name || "" };
};
const normalizeList = value => Array.isArray(value) ? value.filter(Boolean) : String(value || "").split(/\r?\n|,/).map(item => item.trim()).filter(Boolean);
const normalizeKeywords = value => normalizeList(value).slice(0, 5);
const wordCount = value => String(value || "").trim().split(/\s+/).filter(Boolean).length;
const photoSrc = photo => photo?.url || photo?.data || "";
const clone = value => JSON.parse(JSON.stringify(value));
const normalizeType = value => RESEARCHER_TYPES.includes(String(value || "").trim()) ? String(value).trim() : "Postdoctoral Researcher";

function showToast(message) {
  clearTimeout(toastTimer);
  $("#toast p").textContent = message;
  $("#toast").classList.add("is-visible");
  toastTimer = setTimeout(() => $("#toast").classList.remove("is-visible"), 2800);
}

function setAuthMessage(message, type = "") {
  const target = $("#researcher-auth-message");
  target.textContent = message;
  target.className = type ? `auth-help is-${type}` : "auth-help";
}

function setRecordMessage(message, type = "") {
  const target = $("#researcher-record-message");
  target.textContent = message;
  target.className = type ? `is-${type}` : "";
}

function setPasswordResetMessage(message, type = "") {
  const target = $("#researcher-password-reset-message");
  target.textContent = message;
  target.className = type ? `auth-help is-${type}` : "auth-help";
}

function isPasswordRecoveryUrl() {
  const url = new URL(window.location.href);
  const hash = new URLSearchParams(url.hash.replace(/^#/, ""));
  return url.searchParams.get("type") === "recovery" || hash.get("type") === "recovery";
}

function isEmailVerificationUrl() {
  const url = new URL(window.location.href);
  return url.searchParams.get("emailVerified") === "1";
}

function clearResearcherNoticeParam(name) {
  const url = new URL(window.location.href);
  url.searchParams.delete(name);
  window.history.replaceState({}, document.title, `${url.pathname}${url.search}${url.hash}`);
}

function showPasswordReset() {
  $("#researcher-auth").hidden = true;
  $("#researcher-workspace").hidden = true;
  $("#researcher-password-reset").hidden = false;
  setTimeout(() => $("#researcher-password-reset-form").elements.namedItem("password")?.focus(), 50);
}

function setBusy(button, busy, label = "Working...") {
  if (!button) return;
  if (busy) {
    button.dataset.originalText = button.textContent;
    button.textContent = label;
    button.disabled = true;
  } else {
    button.textContent = button.dataset.originalText || button.textContent;
    button.disabled = false;
  }
}

function resizeImage(file, maxDimension = 900, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read image"));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("Could not decode image"));
      image.onload = () => {
        const scale = Math.min(1, maxDimension / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve({ data: canvas.toDataURL("image/jpeg", quality), alt: "", name: file.name });
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function updateEmailCooldownNotice() {
  const target = $("#researcher-email-cooldown");
  if (!target || !emailCooldown) return;
  const cooldown = emailCooldown.status();
  target.classList.toggle("is-waiting", cooldown.remaining === 0);
  target.textContent = cooldown.remaining
    ? `Supabase built-in email can send about ${cooldown.remaining} more confirmation or reset email${cooldown.remaining === 1 ? "" : "s"} from this browser in the current hour.`
    : `Supabase built-in email may be cooling down for this browser. Try again in ${emailCooldown.formatWait(cooldown.waitMs)}, or ask faculty if the email does not arrive.`;
}

function renderProfilePhotoPreview() {
  const preview = $("#researcher-profile-photo-preview");
  const altLabel = $("#researcher-profile-photo-alt-label");
  const altInput = $("#researcher-profile-photo-alt");
  if (photoSrc(pendingProfilePhoto)) {
    preview.classList.remove("empty");
    preview.innerHTML = `<img src="${clean(photoSrc(pendingProfilePhoto))}" alt="" /><button class="media-remove" type="button" data-remove-researcher-profile-photo aria-label="Remove profile picture">x</button>`;
    altLabel.hidden = false;
    altInput.value = pendingProfilePhoto.alt || "";
  } else {
    preview.classList.add("empty");
    preview.innerHTML = `<span>No profile picture selected</span>`;
    altLabel.hidden = true;
    altInput.value = "";
  }
}

function reviewText(record) {
  const status = record?.reviewStatus || "Submitted";
  if (status === "Verified") return ["Verified", "This researcher profile can appear publicly when Show on public Researchers page is selected."];
  if (status === "Draft") return ["Draft", "This profile is saved as a draft and still needs faculty or registry manager review."];
  return ["Submitted for review", "Faculty or registry manager verification is required before this profile appears publicly."];
}

function validateProfileFields(form) {
  const interests = normalizeList(form.elements.researchInterests.value);
  if (interests.length > 5) {
    setRecordMessage("Use no more than 5 research interest keywords.", "error");
    form.elements.researchInterests.focus();
    return false;
  }
  if (wordCount(form.elements.shortBio.value) > 500) {
    setRecordMessage("Short bio must be 500 words or fewer.", "error");
    form.elements.shortBio.focus();
    return false;
  }
  if (form.elements.startDate.value && form.elements.endDate.value && form.elements.endDate.value < form.elements.startDate.value) {
    setRecordMessage("End date cannot be before start date.", "error");
    form.elements.endDate.focus();
    return false;
  }
  return true;
}

function populateHostOptions(selected = "") {
  const target = $("#researcher-self-host");
  target.innerHTML = `<option value="">${TO_BE_DECIDED_LABEL}</option>${facultyProfiles.map(profile => `<option value="${clean(facultyOptionValue(profile))}">${clean(profile.name)}</option>`).join("")}`;
  if ([...target.options].some(option => option.value === selected)) target.value = selected;
}

function populateResearchGroupOptions(selected = "") {
  const target = $("#researcher-self-research-group");
  target.innerHTML = `<option value="">${TO_BE_DECIDED_LABEL}</option>${researchGroups.map(group => `<option value="${clean(group.id)}">${clean(group.name)}</option>`).join("")}`;
  if ([...target.options].some(option => option.value === selected)) target.value = selected;
}

function researcherDraft(data) {
  const email = String(data.email || "").trim().toLowerCase();
  return {
    id: `RES-${Date.now().toString(36).toUpperCase()}`,
    name: data.name,
    type: normalizeType(data.type),
    email,
    ownerEmail: email,
    status: "Active",
    reviewStatus: "Submitted",
    publicReady: false,
    hostRole: "Host faculty / PI",
    createdAt: today(),
    updatedAt: today(),
    sample: false
  };
}

function formToRecord(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  Object.keys(data).forEach(key => { data[key] = String(data[key] || "").trim(); });
  const email = String(currentSession?.user?.email || data.email || "").trim().toLowerCase();
  const group = researchGroups.find(item => item.id === data.researchGroupId);
  const hostChoice = facultyChoiceFromValue(data.hostFacultyId);
  return {
    ...currentRecord,
    id: currentRecord?.id || `RES-${Date.now().toString(36).toUpperCase()}`,
    name: data.name,
    type: normalizeType(data.type),
    email,
    status: data.status || "Active",
    hostFacultyId: hostChoice.id,
    hostFacultyName: hostChoice.name,
    hostRole: data.hostRole || "Host faculty / PI",
    researchGroupId: data.researchGroupId,
    researchGroup: group?.name || data.researchGroup || currentRecord?.researchGroup || "",
    office: data.office,
    phone: data.phone,
    projectTitle: data.projectTitle,
    fundingSource: data.fundingSource,
    startDate: data.startDate,
    endDate: data.endDate,
    shortBio: data.shortBio,
    researchInterests: normalizeKeywords(data.researchInterests),
    skills: normalizeList(data.skills),
    notes: data.notes,
    profilePhoto: pendingProfilePhoto ? {
      ...pendingProfilePhoto,
      alt: $("#researcher-profile-photo-alt").value.trim() || `${data.name || "Researcher"} profile picture`
    } : null,
    publicReady: form.elements.publicReady.checked,
    reviewStatus: currentRecord?.reviewStatus || "Submitted",
    ownerEmail: currentRecord?.ownerEmail || email,
    createdAt: currentRecord?.createdAt || today(),
    updatedAt: today(),
    sample: false
  };
}

function fillRecordForm(record = null) {
  const form = $("#researcher-record-form");
  form.reset();
  const sessionUser = currentSession?.user || {};
  const email = String(sessionUser.email || "").trim().toLowerCase();
  const defaults = {
    email,
    name: sessionUser.user_metadata?.full_name || "",
    type: sessionUser.user_metadata?.researcher_type || "Postdoctoral Researcher",
    status: "Active",
    hostRole: "Host faculty / PI",
    reviewStatus: "Submitted",
    publicReady: false,
    ...(record || {})
  };
  pendingProfilePhoto = defaults.profilePhoto ? clone(defaults.profilePhoto) : null;
  ["name", "type", "email", "status", "hostFacultyId", "hostRole", "researchGroupId", "researchGroup", "office", "phone", "projectTitle", "fundingSource", "startDate", "endDate", "shortBio", "notes"].forEach(key => {
    const field = form.elements.namedItem(key);
    if (field) field.value = defaults[key] || "";
  });
  form.elements.researchInterests.value = normalizeList(defaults.researchInterests).join("\n");
  form.elements.skills.value = normalizeList(defaults.skills).join("\n");
  form.elements.publicReady.checked = Boolean(defaults.publicReady);
  populateHostOptions(defaults.hostFacultyId || (defaults.hostFacultyName ? facultyNameValue(defaults.hostFacultyName) : ""));
  populateResearchGroupOptions(defaults.researchGroupId || "");
  renderProfilePhotoPreview();
  const [title, note] = reviewText(record);
  $("#researcher-review-title").textContent = title;
  $("#researcher-review-note").textContent = note;
  $("#researcher-account-email").textContent = email;
}

async function loadFacultyOptions() {
  try {
    const [registry, facultyOptions] = await Promise.all([
      backend.loadRegistry({ publicOnly: true }),
      backend.loadFacultyOptions ? backend.loadFacultyOptions().catch(() => null) : Promise.resolve(null)
    ]);
    facultyProfiles = Array.isArray(facultyOptions) && facultyOptions.length ? facultyOptions : Array.isArray(registry.faculty) ? registry.faculty : [];
    researchGroups = Array.isArray(registry.facilities) ? registry.facilities : [];
  } catch {
    facultyProfiles = [];
    researchGroups = [];
  }
}

async function loadResearcherWorkspace() {
  $("#researcher-auth").hidden = true;
  $("#researcher-workspace").hidden = false;
  await loadFacultyOptions();
  currentRecord = await backend.loadMyResearcherRecord();
  if (!currentRecord) {
    try {
      const draft = JSON.parse(localStorage.getItem(RESEARCHER_STORAGE_KEY) || "null");
      if (draft?.email === currentSession?.user?.email) currentRecord = draft;
    } catch {}
  }
  fillRecordForm(currentRecord);
}

$("#researcher-signin-form").addEventListener("submit", async event => {
  event.preventDefault();
  if (!backend?.isConfigured?.()) {
    setAuthMessage("Supabase must be configured before researchers can sign in.", "error");
    return;
  }
  if (!event.currentTarget.reportValidity()) return;
  setBusy(event.submitter, true, "Signing in...");
  try {
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    currentSession = await backend.signIn(data.email, data.password);
    await loadResearcherWorkspace();
    showToast("Signed in");
  } catch (error) {
    setAuthMessage(error.message || "Could not sign in.", "error");
  } finally {
    setBusy(event.submitter, false);
  }
});

$("#researcher-signup-form").addEventListener("submit", async event => {
  event.preventDefault();
  if (!backend?.isConfigured?.()) {
    setAuthMessage("Supabase must be configured before researchers can create accounts.", "error");
    return;
  }
  if (!event.currentTarget.reportValidity()) return;
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  if (data.password !== data.confirmPassword) {
    setAuthMessage("Passwords do not match.", "error");
    event.currentTarget.elements.namedItem("confirmPassword").focus();
    return;
  }
  setBusy(event.submitter, true, "Creating...");
  try {
    const session = await backend.signUp(data.email, data.password, {
      role: "researcher",
      full_name: data.name,
      researcher_type: normalizeType(data.type)
    }, {
      emailRedirectTo: new URL("researcher-portal.html?emailVerified=1", window.location.href).href
    });
    localStorage.setItem(RESEARCHER_STORAGE_KEY, JSON.stringify(researcherDraft(data)));
    if (session) {
      currentSession = session;
      await loadResearcherWorkspace();
      showToast("Account created");
    } else {
      emailCooldown?.record();
      updateEmailCooldownNotice();
      setAuthMessage("Account created. Check your email if Supabase requires confirmation, then sign in from the researcher portal.", "success");
    }
  } catch (error) {
    setAuthMessage(error.message || "Could not create account.", "error");
  } finally {
    setBusy(event.submitter, false);
  }
});

$("#researcher-recovery-form").addEventListener("submit", async event => {
  event.preventDefault();
  if (!backend?.isConfigured?.()) {
    setAuthMessage("Supabase must be configured before researchers can reset passwords.", "error");
    return;
  }
  if (!event.currentTarget.reportValidity()) return;
  setBusy(event.submitter, true, "Sending...");
  try {
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    await backend.requestPasswordReset(data.email);
    emailCooldown?.record();
    updateEmailCooldownNotice();
    setAuthMessage("Password reset link sent. Check your email, then open the link to set a new password.", "success");
  } catch (error) {
    setAuthMessage(error.message || "Could not send password reset link.", "error");
  } finally {
    setBusy(event.submitter, false);
  }
});

$("#researcher-password-reset-form").addEventListener("submit", async event => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  const password = event.currentTarget.elements.namedItem("password").value;
  const confirmPassword = event.currentTarget.elements.namedItem("confirmPassword").value;
  if (password !== confirmPassword) {
    setPasswordResetMessage("Passwords do not match.", "error");
    event.currentTarget.elements.namedItem("confirmPassword").focus();
    return;
  }
  setBusy(event.submitter, true, "Updating...");
  try {
    await backend.updatePassword(password);
    await backend.signOut();
    currentSession = null;
    currentRecord = null;
    event.currentTarget.reset();
    $("#researcher-password-reset").hidden = true;
    $("#researcher-auth").hidden = false;
    setAuthMessage("Password updated. Sign in with your new password.", "success");
  } catch (error) {
    setPasswordResetMessage(error.message || "Could not update password.", "error");
  } finally {
    setBusy(event.submitter, false);
  }
});

$("#researcher-record-form").addEventListener("submit", async event => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  if (!validateProfileFields(event.currentTarget)) return;
  setBusy($("#researcher-record-submit"), true, "Saving...");
  setRecordMessage("Saving researcher profile...");
  try {
    const record = formToRecord(event.currentTarget);
    currentRecord = await backend.saveResearcher(record);
    localStorage.removeItem(RESEARCHER_STORAGE_KEY);
    fillRecordForm(currentRecord);
    setRecordMessage("Researcher profile saved for faculty review.", "success");
    showToast(currentRecord.reviewStatus === "Verified" ? "Researcher profile saved" : "Researcher profile saved for review");
  } catch (error) {
    const message = /researchers|schema cache|PGRST|42P01/i.test(String(error.message || ""))
      ? "Supabase needs the latest researcher schema before this profile can be saved."
      : error.message || "Could not save researcher profile.";
    setRecordMessage(message, "error");
    showToast(message);
  } finally {
    setBusy($("#researcher-record-submit"), false);
  }
});

$("#researcher-profile-photo-input").addEventListener("change", async event => {
  const file = event.target.files[0];
  if (!file) return;
  try {
    pendingProfilePhoto = await resizeImage(file);
    pendingProfilePhoto.alt = `${$("#researcher-record-form").elements.name.value || "Researcher"} profile picture`;
    renderProfilePhotoPreview();
  } catch {
    setRecordMessage("The profile picture could not be processed.", "error");
    showToast("The profile picture could not be processed");
  }
  event.target.value = "";
});

$("#researcher-profile-photo-preview").addEventListener("click", event => {
  if (!event.target.closest("[data-remove-researcher-profile-photo]")) return;
  pendingProfilePhoto = null;
  renderProfilePhotoPreview();
});

$("#researcher-sign-out").addEventListener("click", async () => {
  try {
    await backend.signOut();
  } catch {}
  currentSession = null;
  currentRecord = null;
  $("#researcher-workspace").hidden = true;
  $("#researcher-auth").hidden = false;
});

async function boot() {
  updateEmailCooldownNotice();
  if (!backend?.isConfigured?.()) {
    setAuthMessage("Supabase is not configured yet. Researcher accounts require the shared database.", "error");
    return;
  }
  try {
    const passwordRecovery = isPasswordRecoveryUrl();
    const emailVerification = isEmailVerificationUrl();
    const callbackSession = await backend.completeAuthFromUrl();
    currentSession = await backend.getSession();
    if (passwordRecovery && (callbackSession || currentSession)) {
      showPasswordReset();
      return;
    }
    if (emailVerification) {
      if (currentSession) await backend.signOut();
      currentSession = null;
      currentRecord = null;
      $("#researcher-password-reset").hidden = true;
      $("#researcher-workspace").hidden = true;
      $("#researcher-auth").hidden = false;
      clearResearcherNoticeParam("emailVerified");
      setAuthMessage("Email verified. Please sign in with your researcher account.", "success");
      return;
    }
    if (currentSession) await loadResearcherWorkspace();
  } catch (error) {
    setAuthMessage(error.message || "Could not complete sign-in.", "error");
  }
}

boot();
