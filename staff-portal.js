const STAFF_STORAGE_KEY = "sut-physics-staff-draft-v1";
const STAFF_POSITIONS = ["Administrative Staff", "Teaching Assistant", "Laboratory Technician", "Technical Staff", "Academic Support Staff", "Program Coordinator"];
const TO_BE_DECIDED_LABEL = "To be decided later";

const backend = window.SUTSupabase;
const emailCooldown = window.SUTStudentEmailCooldown;
let currentSession = null;
let currentRecord = null;
let researchGroups = [];
let pendingProfilePhoto = null;
let toastTimer;

const $ = selector => document.querySelector(selector);
const clean = value => String(value ?? "").replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
const today = () => new Date().toISOString().slice(0, 10);
const normalizeList = value => Array.isArray(value) ? value.filter(Boolean) : String(value || "").split(/\r?\n|,/).map(item => item.trim()).filter(Boolean);
const wordCount = value => String(value || "").trim().split(/\s+/).filter(Boolean).length;
const photoSrc = photo => photo?.url || photo?.data || "";
const clone = value => JSON.parse(JSON.stringify(value));
const normalizePosition = value => STAFF_POSITIONS.includes(String(value || "").trim()) ? String(value).trim() : "Administrative Staff";

function showToast(message) {
  clearTimeout(toastTimer);
  $("#toast p").textContent = message;
  $("#toast").classList.add("is-visible");
  toastTimer = setTimeout(() => $("#toast").classList.remove("is-visible"), 2800);
}

function setAuthMessage(message, type = "") {
  const target = $("#staff-auth-message");
  target.textContent = message;
  target.className = type ? `auth-help is-${type}` : "auth-help";
}

function setRecordMessage(message, type = "") {
  const target = $("#staff-record-message");
  target.textContent = message;
  target.className = type ? `is-${type}` : "";
}

function setPasswordResetMessage(message, type = "") {
  const target = $("#staff-password-reset-message");
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

function clearStaffNoticeParam(name) {
  const url = new URL(window.location.href);
  url.searchParams.delete(name);
  window.history.replaceState({}, document.title, `${url.pathname}${url.search}${url.hash}`);
}

function showPasswordReset() {
  $("#staff-auth").hidden = true;
  $("#staff-workspace").hidden = true;
  $("#staff-password-reset").hidden = false;
  setTimeout(() => $("#staff-password-reset-form").elements.namedItem("password")?.focus(), 50);
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
  const target = $("#staff-email-cooldown");
  if (!target || !emailCooldown) return;
  const cooldown = emailCooldown.status();
  target.classList.toggle("is-waiting", cooldown.remaining === 0);
  target.textContent = cooldown.remaining
    ? `Supabase built-in email can send about ${cooldown.remaining} more confirmation or reset email${cooldown.remaining === 1 ? "" : "s"} from this browser in the current hour.`
    : `Supabase built-in email may be cooling down for this browser. Try again in ${emailCooldown.formatWait(cooldown.waitMs)}, or ask the office if the email does not arrive.`;
}

function renderProfilePhotoPreview() {
  const preview = $("#staff-profile-photo-preview");
  const altLabel = $("#staff-profile-photo-alt-label");
  const altInput = $("#staff-profile-photo-alt");
  if (photoSrc(pendingProfilePhoto)) {
    preview.classList.remove("empty");
    preview.innerHTML = `<img src="${clean(photoSrc(pendingProfilePhoto))}" alt="" /><button class="media-remove" type="button" data-remove-staff-profile-photo aria-label="Remove profile picture">x</button>`;
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
  if (status === "Verified") return ["Verified", "This staff profile can appear publicly when Show on public Staff page is selected."];
  if (status === "Draft") return ["Draft", "This profile is saved as a draft and still needs registry manager review."];
  return ["Submitted for review", "Registry manager verification is required before this profile appears publicly."];
}

function validateProfileFields(form) {
  if (!normalizeList(form.elements.responsibilities.value).length) {
    setRecordMessage("Add at least one responsibility.", "error");
    form.elements.responsibilities.focus();
    return false;
  }
  if (wordCount(form.elements.shortBio.value) > 500) {
    setRecordMessage("Short bio must be 500 words or fewer.", "error");
    form.elements.shortBio.focus();
    return false;
  }
  return true;
}

function populateResearchGroupOptions(selected = "") {
  const target = $("#staff-self-research-group");
  target.innerHTML = `<option value="">${TO_BE_DECIDED_LABEL}</option>${researchGroups.map(group => `<option value="${clean(group.id)}">${clean(group.name)}</option>`).join("")}`;
  if ([...target.options].some(option => option.value === selected)) target.value = selected;
}

function staffDraft(data) {
  const email = String(data.email || "").trim().toLowerCase();
  return {
    id: `STAFF-${Date.now().toString(36).toUpperCase()}`,
    name: data.name,
    position: normalizePosition(data.position),
    email,
    ownerEmail: email,
    status: "Active",
    reviewStatus: "Submitted",
    publicReady: false,
    unit: "School of Physics",
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
  return {
    ...currentRecord,
    id: currentRecord?.id || `STAFF-${Date.now().toString(36).toUpperCase()}`,
    name: data.name,
    position: normalizePosition(data.position),
    email,
    status: data.status || "Active",
    unit: data.unit || "School of Physics",
    researchGroupId: data.researchGroupId,
    researchGroup: group?.name || data.researchGroup || currentRecord?.researchGroup || "",
    office: data.office,
    phone: data.phone,
    shortBio: data.shortBio,
    responsibilities: normalizeList(data.responsibilities),
    serviceAreas: normalizeList(data.serviceAreas),
    notes: data.notes,
    profilePhoto: pendingProfilePhoto ? {
      ...pendingProfilePhoto,
      alt: $("#staff-profile-photo-alt").value.trim() || `${data.name || "Staff"} profile picture`
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
  const form = $("#staff-record-form");
  form.reset();
  const sessionUser = currentSession?.user || {};
  const email = String(sessionUser.email || "").trim().toLowerCase();
  const defaults = {
    email,
    name: sessionUser.user_metadata?.full_name || "",
    position: sessionUser.user_metadata?.staff_position || "Administrative Staff",
    status: "Active",
    unit: "School of Physics",
    reviewStatus: "Submitted",
    publicReady: false,
    ...(record || {})
  };
  pendingProfilePhoto = defaults.profilePhoto ? clone(defaults.profilePhoto) : null;
  ["name", "position", "email", "status", "unit", "researchGroupId", "researchGroup", "office", "phone", "shortBio", "notes"].forEach(key => {
    const field = form.elements.namedItem(key);
    if (field) field.value = defaults[key] || "";
  });
  form.elements.responsibilities.value = normalizeList(defaults.responsibilities).join("\n");
  form.elements.serviceAreas.value = normalizeList(defaults.serviceAreas).join("\n");
  form.elements.publicReady.checked = Boolean(defaults.publicReady);
  populateResearchGroupOptions(defaults.researchGroupId || "");
  renderProfilePhotoPreview();
  const [title, note] = reviewText(record);
  $("#staff-review-title").textContent = title;
  $("#staff-review-note").textContent = note;
  $("#staff-account-email").textContent = email;
}

async function loadStaffOptions() {
  try {
    const registry = await backend.loadRegistry({ publicOnly: true });
    researchGroups = Array.isArray(registry.facilities) ? registry.facilities : [];
  } catch {
    researchGroups = [];
  }
}

async function loadStaffWorkspace() {
  $("#staff-auth").hidden = true;
  $("#staff-workspace").hidden = false;
  await loadStaffOptions();
  currentRecord = await backend.loadMyStaffRecord();
  if (!currentRecord) {
    try {
      const draft = JSON.parse(localStorage.getItem(STAFF_STORAGE_KEY) || "null");
      if (draft?.email === currentSession?.user?.email) currentRecord = draft;
    } catch {}
  }
  fillRecordForm(currentRecord);
}

$("#staff-signin-form").addEventListener("submit", async event => {
  event.preventDefault();
  if (!backend?.isConfigured?.()) {
    setAuthMessage("Supabase must be configured before staff can sign in.", "error");
    return;
  }
  if (!event.currentTarget.reportValidity()) return;
  setBusy(event.submitter, true, "Signing in...");
  try {
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    currentSession = await backend.signIn(data.email, data.password);
    await loadStaffWorkspace();
    showToast("Signed in");
  } catch (error) {
    setAuthMessage(error.message || "Could not sign in.", "error");
  } finally {
    setBusy(event.submitter, false);
  }
});

$("#staff-signup-form").addEventListener("submit", async event => {
  event.preventDefault();
  if (!backend?.isConfigured?.()) {
    setAuthMessage("Supabase must be configured before staff can create accounts.", "error");
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
      role: "staff",
      full_name: data.name,
      staff_position: normalizePosition(data.position)
    }, {
      emailRedirectTo: new URL("staff-portal.html?emailVerified=1", window.location.href).href
    });
    localStorage.setItem(STAFF_STORAGE_KEY, JSON.stringify(staffDraft(data)));
    if (session) {
      currentSession = session;
      await loadStaffWorkspace();
      showToast("Account created");
    } else {
      emailCooldown?.record();
      updateEmailCooldownNotice();
      setAuthMessage("Account created. Check your email if Supabase requires confirmation, then sign in from the staff portal.", "success");
    }
  } catch (error) {
    setAuthMessage(error.message || "Could not create account.", "error");
  } finally {
    setBusy(event.submitter, false);
  }
});

$("#staff-recovery-form").addEventListener("submit", async event => {
  event.preventDefault();
  if (!backend?.isConfigured?.()) {
    setAuthMessage("Supabase must be configured before staff can reset passwords.", "error");
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

$("#staff-password-reset-form").addEventListener("submit", async event => {
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
    $("#staff-password-reset").hidden = true;
    $("#staff-auth").hidden = false;
    setAuthMessage("Password updated. Sign in with your new password.", "success");
  } catch (error) {
    setPasswordResetMessage(error.message || "Could not update password.", "error");
  } finally {
    setBusy(event.submitter, false);
  }
});

$("#staff-record-form").addEventListener("submit", async event => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  if (!validateProfileFields(event.currentTarget)) return;
  setBusy($("#staff-record-submit"), true, "Saving...");
  setRecordMessage("Saving staff profile...");
  try {
    const record = formToRecord(event.currentTarget);
    currentRecord = await backend.saveStaff(record);
    localStorage.removeItem(STAFF_STORAGE_KEY);
    fillRecordForm(currentRecord);
    setRecordMessage("Staff profile saved for registry review.", "success");
    showToast(currentRecord.reviewStatus === "Verified" ? "Staff profile saved" : "Staff profile saved for review");
  } catch (error) {
    const message = /staff|schema cache|PGRST|42P01/i.test(String(error.message || ""))
      ? "Supabase needs the latest staff schema before this profile can be saved."
      : error.message || "Could not save staff profile.";
    setRecordMessage(message, "error");
    showToast(message);
  } finally {
    setBusy($("#staff-record-submit"), false);
  }
});

$("#staff-profile-photo-input").addEventListener("change", async event => {
  const file = event.target.files[0];
  if (!file) return;
  try {
    pendingProfilePhoto = await resizeImage(file);
    pendingProfilePhoto.alt = `${$("#staff-record-form").elements.name.value || "Staff"} profile picture`;
    renderProfilePhotoPreview();
  } catch {
    setRecordMessage("The profile picture could not be processed.", "error");
    showToast("The profile picture could not be processed");
  }
  event.target.value = "";
});

$("#staff-profile-photo-preview").addEventListener("click", event => {
  if (!event.target.closest("[data-remove-staff-profile-photo]")) return;
  pendingProfilePhoto = null;
  renderProfilePhotoPreview();
});

$("#staff-sign-out").addEventListener("click", async () => {
  try {
    await backend.signOut();
  } catch {}
  currentSession = null;
  currentRecord = null;
  $("#staff-workspace").hidden = true;
  $("#staff-auth").hidden = false;
});

async function boot() {
  updateEmailCooldownNotice();
  if (!backend?.isConfigured?.()) {
    setAuthMessage("Supabase is not configured yet. Staff accounts require the shared database.", "error");
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
      $("#staff-password-reset").hidden = true;
      $("#staff-workspace").hidden = true;
      $("#staff-auth").hidden = false;
      clearStaffNoticeParam("emailVerified");
      setAuthMessage("Email verified. Please sign in with your staff account.", "success");
      return;
    }
    if (currentSession) await loadStaffWorkspace();
  } catch (error) {
    setAuthMessage(error.message || "Could not complete sign-in.", "error");
  }
}

boot();
