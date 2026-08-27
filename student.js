const STUDENT_STORAGE_KEY = "sut-physics-student-draft-v1";

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
const STUDY_PROGRAMS = {
  "bsc-physics": { label: "B.Sc. Physics", level: "Bachelor" },
  "msc-physics": { label: "M.Sc. Physics", level: "Master" },
  "msc-applied-physics": { label: "M.Sc. Applied Physics", level: "Master" },
  "phd-physics": { label: "Ph.D. Physics", level: "PhD" },
  "phd-applied-physics": { label: "Ph.D. Applied Physics", level: "PhD" }
};
const TERM_VALUES = ["1", "2", "3"];
const normalizeTerm = value => TERM_VALUES.includes(String(value || "").trim()) ? String(value).trim() : "";
const DEFAULT_STUDENT_ADVISOR_ID = "FACULTY-001";
const TO_BE_DECIDED_LABEL = "To be decided later";
const PROGRESS_MILESTONES = [
  "coreCourses",
  "comprehensiveExam",
  "qualifyingExam",
  "proposalDefense",
  "thesisDefense",
  "turnitinCheck",
  "publicationRequirement"
];

function showToast(message, type = "success") {
  clearTimeout(toastTimer);
  const toast = $("#toast");
  toast.querySelector("span").textContent = type === "error" ? "!" : "✓";
  toast.querySelector("p").textContent = message;
  toast.classList.toggle("is-error", type === "error");
  toast.classList.toggle("is-success", type !== "error");
  toast.classList.add("is-visible");
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2800);
}

function setAuthMessage(message, type = "") {
  const target = $("#student-auth-message");
  target.textContent = message;
  target.className = type ? `auth-help is-${type}` : "auth-help";
}

function setRecordMessage(message, type = "") {
  const target = $("#student-record-message");
  target.textContent = message;
  target.className = type ? `is-${type}` : "";
}

function setPasswordResetMessage(message, type = "") {
  const target = $("#student-password-reset-message");
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

function clearStudentNoticeParam(name) {
  const url = new URL(window.location.href);
  url.searchParams.delete(name);
  window.history.replaceState({}, document.title, `${url.pathname}${url.search}${url.hash}`);
}

function showPasswordReset() {
  $("#student-auth").hidden = true;
  $("#student-workspace").hidden = true;
  $("#student-password-reset").hidden = false;
  setTimeout(() => $("#student-password-reset-form").elements.namedItem("password")?.focus(), 50);
}

function validateProfileFields(form, setMessage) {
  const recordType = form.elements.recordType.value;
  if (recordType === "physics" && !form.elements.programId.value) {
    setMessage("Choose a Physics study program for School of Physics student records.", "error");
    form.elements.programId.focus();
    return false;
  }
  if (recordType === "sut-external" && (!form.elements.homeSchool.value.trim() || !form.elements.homeProgram.value.trim())) {
    setMessage("Enter the SUT school and program for external-program advisees.", "error");
    (form.elements.homeSchool.value.trim() ? form.elements.homeProgram : form.elements.homeSchool).focus();
    return false;
  }
  const interests = normalizeList(form.elements.researchInterests.value);
  if (interests.length > 5) {
    setMessage("Use no more than 5 research interest keywords.", "error");
    form.elements.researchInterests.focus();
    return false;
  }
  if (wordCount(form.elements.shortBio.value) > 500) {
    setMessage("Short bio must be 500 words or fewer.", "error");
    form.elements.shortBio.focus();
    return false;
  }
  return true;
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

function renderProfilePhotoPreview() {
  const preview = $("#student-profile-photo-preview");
  const altLabel = $("#student-profile-photo-alt-label");
  const altInput = $("#student-profile-photo-alt");
  if (photoSrc(pendingProfilePhoto)) {
    preview.classList.remove("empty");
    preview.innerHTML = `<img src="${clean(photoSrc(pendingProfilePhoto))}" alt="" /><button class="media-remove" type="button" data-remove-student-profile-photo aria-label="Remove profile picture">×</button>`;
    altLabel.hidden = false;
    altInput.value = pendingProfilePhoto.alt || "";
  } else {
    preview.classList.add("empty");
    preview.innerHTML = `<span>No profile picture selected</span>`;
    altLabel.hidden = true;
    altInput.value = "";
  }
}

function progressMilestones(progress = {}) {
  return progress && typeof progress === "object" && progress.milestones && typeof progress.milestones === "object"
    ? progress.milestones
    : {};
}

function collectStudyProgress(form) {
  const existing = currentRecord?.studyProgress && typeof currentRecord.studyProgress === "object"
    ? clone(currentRecord.studyProgress)
    : {};
  const milestones = {};
  PROGRESS_MILESTONES.forEach(id => {
    const completed = Boolean(form.elements.namedItem(`progress_${id}`)?.checked);
    const completedAt = form.elements.namedItem(`progress_${id}_date`)?.value || "";
    milestones[id] = { completed, completedAt };
  });
  return { ...existing, milestones };
}

function fillProgressChecklist(progress = {}) {
  const milestones = progressMilestones(progress);
  PROGRESS_MILESTONES.forEach(id => {
    const item = milestones[id] || {};
    const checkbox = $("#student-record-form").elements.namedItem(`progress_${id}`);
    const date = $("#student-record-form").elements.namedItem(`progress_${id}_date`);
    if (checkbox) checkbox.checked = Boolean(item.completed);
    if (date) date.value = item.completedAt || "";
  });
}

function syncProgressChecklist() {
  const level = $("#student-record-form").elements.namedItem("level").value || "Bachelor";
  document.querySelectorAll(".progress-checkitem[data-progress-levels]").forEach(item => {
    const levels = String(item.dataset.progressLevels || "").split(/\s+/).filter(Boolean);
    item.hidden = !levels.includes(level);
  });
  syncProgressDates();
}

function syncProgressDates() {
  const form = $("#student-record-form");
  PROGRESS_MILESTONES.forEach(id => {
    const checkbox = form.elements.namedItem(`progress_${id}`);
    const date = form.elements.namedItem(`progress_${id}_date`);
    if (date) date.disabled = !checkbox?.checked;
  });
}

function sessionStudentDefaults() {
  const metadata = currentSession?.user?.user_metadata || {};
  return {
    name: metadata.full_name || metadata.name || "",
    studentCode: metadata.student_code || metadata.studentCode || "",
    startTerm: normalizeTerm(metadata.start_term || metadata.startTerm),
    startYear: metadata.start_year || metadata.startYear || ""
  };
}

function syncRecordTypeFields() {
  const form = $("#student-record-form");
  const isExternal = form.elements.recordType.value === "sut-external";
  ["homeSchool", "homeProgram"].forEach(name => {
    const field = form.elements.namedItem(name);
    if (!field) return;
    field.closest("label").hidden = !isExternal;
    field.disabled = !isExternal;
    if (!isExternal) field.value = "";
  });
}

function verificationText(record) {
  const status = record?.verificationStatus || "Pending";
  if (status === "Verified") return ["Verified", `Verified by ${record.verifiedByEmail || "faculty"}${record.verifiedAt ? ` on ${new Date(record.verifiedAt).toLocaleDateString()}` : ""}.`];
  if (status === "Rejected") return ["Needs revision", "A faculty reviewer rejected this record. Update it and ask your advisor to review it again."];
  return ["Pending verification", "Your record is saved, but it is not official until a faculty member verifies it."];
}

function populateAdvisorOptions(selected = "") {
  const target = $("#student-self-advisor");
  target.innerHTML = `<option value="">${TO_BE_DECIDED_LABEL}</option>${facultyProfiles.map(profile => `<option value="${clean(facultyOptionValue(profile))}">${clean(profile.name)}</option>`).join("")}`;
  if ([...target.options].some(option => option.value === selected)) target.value = selected;
}

function populateResearchGroupOptions(selected = "") {
  const target = $("#student-self-research-group");
  target.innerHTML = `<option value="">${TO_BE_DECIDED_LABEL}</option>${researchGroups.map(group => `<option value="${clean(group.id)}">${clean(group.name)}</option>`).join("")}`;
  if ([...target.options].some(option => option.value === selected)) target.value = selected;
}

function formToRecord(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  Object.keys(data).forEach(key => { data[key] = String(data[key] || "").trim(); });
  const email = String(currentSession?.user?.email || data.email || "").trim().toLowerCase();
  const program = STUDY_PROGRAMS[data.programId];
  const group = researchGroups.find(item => item.id === data.researchGroupId);
  const recordType = data.recordType === "sut-external" ? "sut-external" : "physics";
  const advisorChoice = facultyChoiceFromValue(data.advisorId);
  return {
    ...currentRecord,
    id: currentRecord?.id || `STU-${Date.now().toString(36).toUpperCase()}`,
    studentCode: data.studentCode,
    name: data.name,
    preferredName: data.preferredName,
    email,
    recordType,
    level: data.level || program?.level || "Bachelor",
    status: data.status || "Active",
    advisorId: advisorChoice.id || "",
    advisorName: advisorChoice.name,
    advisorRole: data.advisorRole || "Primary advisor",
    coadvisor: data.coadvisor,
    researchGroupId: data.researchGroupId,
    researchGroup: group?.name || currentRecord?.researchGroup || "",
    homeSchool: recordType === "sut-external" ? data.homeSchool : "",
    homeProgram: recordType === "sut-external" ? data.homeProgram : "",
    projectTitle: data.projectTitle,
    thesisTitle: data.thesisTitle,
    startTerm: normalizeTerm(data.startTerm),
    startYear: data.startYear,
    expectedGraduationYear: data.expectedGraduationYear,
    graduationYear: data.graduationYear,
    office: data.office,
    shortBio: data.shortBio,
    researchInterests: normalizeKeywords(data.researchInterests),
    skills: normalizeList(data.skills),
    notes: data.notes,
    profilePhoto: pendingProfilePhoto ? {
      ...pendingProfilePhoto,
      alt: $("#student-profile-photo-alt").value.trim() || `${data.name || "Student"} profile picture`
    } : null,
    programId: data.programId,
    studyProgress: collectStudyProgress(form),
    deadlineAlertsEnabled: form.elements.deadlineAlertsEnabled.checked,
    deadlineLeadDays: currentRecord?.deadlineLeadDays || [30, 14, 7, 1],
    verificationStatus: currentRecord?.verificationStatus || "Pending",
    publicReady: form.elements.publicReady.checked,
    verifiedByEmail: currentRecord?.verifiedByEmail || "",
    verifiedAt: currentRecord?.verifiedAt || "",
    ownerEmail: currentRecord?.ownerEmail || email,
    createdAt: currentRecord?.createdAt || today(),
    updatedAt: today(),
    sample: false
  };
}

function fillRecordForm(record = null) {
  const form = $("#student-record-form");
  form.reset();
  const email = String(currentSession?.user?.email || "").trim().toLowerCase();
  const defaults = {
    email,
    recordType: "physics",
    level: "Bachelor",
    programId: "bsc-physics",
    status: "Active",
    deadlineAlertsEnabled: true,
    publicReady: false,
    ...sessionStudentDefaults(),
    ...(record || {})
  };
  pendingProfilePhoto = defaults.profilePhoto ? clone(defaults.profilePhoto) : null;
  ["studentCode", "name", "preferredName", "email", "recordType", "level", "status", "programId", "homeSchool", "homeProgram", "advisorId", "advisorRole", "coadvisor", "researchGroupId", "office", "projectTitle", "thesisTitle", "startTerm", "startYear", "expectedGraduationYear", "graduationYear", "shortBio", "notes"].forEach(key => {
    const field = form.elements.namedItem(key);
    if (field) field.value = defaults[key] || "";
  });
  form.elements.researchInterests.value = normalizeList(defaults.researchInterests).join("\n");
  form.elements.skills.value = normalizeList(defaults.skills).join("\n");
  form.elements.deadlineAlertsEnabled.checked = defaults.deadlineAlertsEnabled !== false;
  form.elements.publicReady.checked = Boolean(defaults.publicReady);
  fillProgressChecklist(defaults.studyProgress || {});
  syncProgressChecklist();
  syncRecordTypeFields();
  populateAdvisorOptions(defaults.advisorId || (defaults.advisorName ? facultyNameValue(defaults.advisorName) : DEFAULT_STUDENT_ADVISOR_ID));
  populateResearchGroupOptions(defaults.researchGroupId || "");
  renderProfilePhotoPreview();
  const [title, note] = verificationText(record);
  $("#student-verification-title").textContent = title;
  $("#student-verification-note").textContent = note;
  $("#student-account-email").textContent = email;
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

async function loadStudentWorkspace() {
  $("#student-auth").hidden = true;
  $("#student-workspace").hidden = false;
  await loadFacultyOptions();
  currentRecord = await backend.loadMyStudentRecord();
  if (!currentRecord) {
    try {
      const draft = JSON.parse(localStorage.getItem(STUDENT_STORAGE_KEY) || "null");
      if (draft?.email === currentSession?.user?.email) currentRecord = draft;
    } catch {}
  }
  fillRecordForm(currentRecord);
}

$("#student-signin-form").addEventListener("submit", async event => {
  event.preventDefault();
  if (!backend?.isConfigured?.()) {
    setAuthMessage("Supabase must be configured before students can sign in.", "error");
    return;
  }
  if (!event.currentTarget.reportValidity()) return;
  setBusy(event.submitter, true, "Signing in...");
  try {
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    currentSession = await backend.signIn(data.email, data.password);
    await loadStudentWorkspace();
    showToast("Signed in");
  } catch (error) {
    setAuthMessage(error.message || "Could not sign in.", "error");
  } finally {
    setBusy(event.submitter, false);
  }
});

$("#student-recovery-form").addEventListener("submit", async event => {
  event.preventDefault();
  if (!backend?.isConfigured?.()) {
    setAuthMessage("Supabase must be configured before students can reset passwords.", "error");
    return;
  }
  if (!event.currentTarget.reportValidity()) return;
  setBusy(event.submitter, true, "Sending...");
  try {
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    await backend.requestPasswordReset(data.email);
    emailCooldown?.record();
    setAuthMessage("Password reset link sent. Check your email, then open the link to set a new password.", "success");
  } catch (error) {
    setAuthMessage(error.message || "Could not send password reset link.", "error");
  } finally {
    setBusy(event.submitter, false);
  }
});

$("#student-password-reset-form").addEventListener("submit", async event => {
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
    $("#student-password-reset").hidden = true;
    $("#student-auth").hidden = false;
    setAuthMessage("Password updated. Sign in with your new password.", "success");
  } catch (error) {
    setPasswordResetMessage(error.message || "Could not update password.", "error");
  } finally {
    setBusy(event.submitter, false);
  }
});

$("#student-record-form").addEventListener("submit", async event => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  if (!validateProfileFields(event.currentTarget, setRecordMessage)) return;
  setBusy($("#student-record-submit"), true, "Saving...");
  setRecordMessage("Saving study record...");
  try {
    const record = formToRecord(event.currentTarget);
    currentRecord = await backend.saveStudent(record);
    localStorage.removeItem(STUDENT_STORAGE_KEY);
    fillRecordForm(currentRecord);
    setRecordMessage("Study record saved.", "success");
    showToast(currentRecord.verificationStatus === "Verified" ? "Study record saved" : "Study record saved for faculty verification");
  } catch (error) {
    const rawError = String(error.message || "");
    const message = /23503|foreign key|advisor_id|faculty/i.test(rawError)
      ? "The selected advisor is not available in the faculty registry. Choose an advisor from the list, then save again."
      : /students|schema cache|PGRST|42P01/i.test(rawError)
      ? "Supabase needs the latest student schema before this record can be saved."
      : error.message || "Could not save study record.";
    setRecordMessage(message, "error");
    showToast(message, "error");
  } finally {
    setBusy($("#student-record-submit"), false);
  }
});

$("#student-record-form").elements.namedItem("programId").addEventListener("change", event => {
  const level = STUDY_PROGRAMS[event.target.value]?.level;
  if (level) {
    $("#student-record-form").elements.namedItem("level").value = level;
    syncProgressChecklist();
  }
});

$("#student-record-form").elements.namedItem("level").addEventListener("change", syncProgressChecklist);
$("#student-record-form").elements.namedItem("recordType").addEventListener("change", syncRecordTypeFields);

document.querySelector(".progress-checklist").addEventListener("change", event => {
  if (event.target.type !== "checkbox" || !event.target.name.startsWith("progress_")) return;
  const date = $("#student-record-form").elements.namedItem(`${event.target.name}_date`);
  if (!date) return;
  if (event.target.checked && !date.value) date.value = today();
  syncProgressDates();
});

$("#student-profile-photo-input").addEventListener("change", async event => {
  const file = event.target.files[0];
  if (!file) return;
  try {
    pendingProfilePhoto = await resizeImage(file);
    pendingProfilePhoto.alt = `${$("#student-record-form").elements.name.value || "Student"} profile picture`;
    renderProfilePhotoPreview();
  } catch {
    setRecordMessage("The profile picture could not be processed.", "error");
    showToast("The profile picture could not be processed", "error");
  }
  event.target.value = "";
});

$("#student-profile-photo-preview").addEventListener("click", event => {
  if (!event.target.closest("[data-remove-student-profile-photo]")) return;
  pendingProfilePhoto = null;
  renderProfilePhotoPreview();
});

$("#student-sign-out").addEventListener("click", async () => {
  try {
    await backend.signOut();
  } catch {}
  currentSession = null;
  currentRecord = null;
  $("#student-workspace").hidden = true;
  $("#student-auth").hidden = false;
});

async function boot() {
  if (!backend?.isConfigured?.()) {
    setAuthMessage("Supabase is not configured yet. Student accounts require the shared database.", "error");
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
      $("#student-password-reset").hidden = true;
      $("#student-workspace").hidden = true;
      $("#student-auth").hidden = false;
      clearStudentNoticeParam("emailVerified");
      setAuthMessage("Email verified. Please sign in with your student account.", "success");
      return;
    }
    if (currentSession) await loadStudentWorkspace();
  } catch (error) {
    setAuthMessage(error.message || "Could not complete sign-in.", "error");
  }
}

boot();
