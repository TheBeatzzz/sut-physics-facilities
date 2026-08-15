const STUDENT_STORAGE_KEY = "sut-physics-student-draft-v1";

const backend = window.SUTSupabase;
let currentSession = null;
let currentRecord = null;
let facultyProfiles = [];
let researchGroups = [];
let toastTimer;

const $ = selector => document.querySelector(selector);
const clean = value => String(value ?? "").replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
const today = () => new Date().toISOString().slice(0, 10);
const normalizeList = value => Array.isArray(value) ? value.filter(Boolean) : String(value || "").split(/\r?\n|,/).map(item => item.trim()).filter(Boolean);
const STUDY_PROGRAMS = {
  "bsc-physics": { label: "B.Sc. Physics", level: "Bachelor" },
  "msc-physics": { label: "M.Sc. Physics", level: "Master" },
  "msc-applied-physics": { label: "M.Sc. Applied Physics", level: "Master" },
  "phd-physics": { label: "Ph.D. Physics", level: "PhD" },
  "phd-applied-physics": { label: "Ph.D. Applied Physics", level: "PhD" }
};
const TERM_VALUES = ["1", "2", "3"];
const normalizeTerm = value => TERM_VALUES.includes(String(value || "").trim()) ? String(value).trim() : "";

function showToast(message) {
  clearTimeout(toastTimer);
  $("#toast p").textContent = message;
  $("#toast").classList.add("is-visible");
  toastTimer = setTimeout(() => $("#toast").classList.remove("is-visible"), 2800);
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

function verificationText(record) {
  const status = record?.verificationStatus || "Pending";
  if (status === "Verified") return ["Verified", `Verified by ${record.verifiedByEmail || "faculty"}${record.verifiedAt ? ` on ${new Date(record.verifiedAt).toLocaleDateString()}` : ""}.`];
  if (status === "Rejected") return ["Needs revision", "A faculty reviewer rejected this record. Update it and ask your advisor to review it again."];
  return ["Pending verification", "Your record is saved, but it is not official until a faculty member verifies it."];
}

function populateAdvisorOptions(selected = "") {
  const target = $("#student-self-advisor");
  target.innerHTML = `<option value="">TBD</option>${facultyProfiles.map(profile => `<option value="${clean(profile.id)}">${clean(profile.name)}</option>`).join("")}`;
  if ([...target.options].some(option => option.value === selected)) target.value = selected;
}

function populateResearchGroupOptions(selected = "") {
  const target = $("#student-self-research-group");
  target.innerHTML = `<option value="">TBD</option>${researchGroups.map(group => `<option value="${clean(group.id)}">${clean(group.name)}</option>`).join("")}`;
  if ([...target.options].some(option => option.value === selected)) target.value = selected;
}

function formToRecord(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  Object.keys(data).forEach(key => { data[key] = String(data[key] || "").trim(); });
  const email = String(currentSession?.user?.email || data.email || "").trim().toLowerCase();
  const program = STUDY_PROGRAMS[data.programId];
  const group = researchGroups.find(item => item.id === data.researchGroupId);
  return {
    ...currentRecord,
    id: currentRecord?.id || `STU-${Date.now().toString(36).toUpperCase()}`,
    studentCode: data.studentCode,
    name: data.name,
    preferredName: data.preferredName,
    email,
    level: data.level || program?.level || "Bachelor",
    status: data.status || "Active",
    advisorId: data.advisorId,
    coadvisor: data.coadvisor,
    researchGroupId: data.researchGroupId,
    researchGroup: group?.name || currentRecord?.researchGroup || "",
    projectTitle: data.projectTitle,
    thesisTitle: data.thesisTitle,
    startTerm: normalizeTerm(data.startTerm),
    startYear: data.startYear,
    expectedGraduationYear: data.expectedGraduationYear,
    graduationYear: data.graduationYear,
    office: data.office,
    shortBio: data.shortBio,
    skills: normalizeList(data.skills),
    notes: data.notes,
    programId: data.programId,
    studyProgress: currentRecord?.studyProgress || {},
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
    level: "Bachelor",
    programId: "bsc-physics",
    status: "Active",
    deadlineAlertsEnabled: true,
    publicReady: false,
    ...(record || {})
  };
  ["studentCode", "name", "preferredName", "email", "level", "status", "programId", "advisorId", "coadvisor", "researchGroupId", "office", "projectTitle", "thesisTitle", "startTerm", "startYear", "expectedGraduationYear", "graduationYear", "shortBio", "notes"].forEach(key => {
    const field = form.elements.namedItem(key);
    if (field) field.value = defaults[key] || "";
  });
  form.elements.skills.value = normalizeList(defaults.skills).join("\n");
  form.elements.deadlineAlertsEnabled.checked = defaults.deadlineAlertsEnabled !== false;
  form.elements.publicReady.checked = Boolean(defaults.publicReady);
  populateAdvisorOptions(defaults.advisorId || "");
  populateResearchGroupOptions(defaults.researchGroupId || "");
  const [title, note] = verificationText(record);
  $("#student-verification-title").textContent = title;
  $("#student-verification-note").textContent = note;
  $("#student-account-email").textContent = email;
}

async function loadFacultyOptions() {
  try {
    const registry = await backend.loadRegistry({ publicOnly: true });
    facultyProfiles = Array.isArray(registry.faculty) ? registry.faculty : [];
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

$("#student-record-form").addEventListener("submit", async event => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
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
    const message = /students|schema cache|PGRST|42P01/i.test(String(error.message || ""))
      ? "Supabase needs the latest student schema before this record can be saved."
      : error.message || "Could not save study record.";
    setRecordMessage(message, "error");
    showToast(message);
  } finally {
    setBusy($("#student-record-submit"), false);
  }
});

$("#student-record-form").elements.namedItem("programId").addEventListener("change", event => {
  const level = STUDY_PROGRAMS[event.target.value]?.level;
  if (level) $("#student-record-form").elements.namedItem("level").value = level;
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
    await backend.completeAuthFromUrl();
    currentSession = await backend.getSession();
    if (currentSession) await loadStudentWorkspace();
  } catch (error) {
    setAuthMessage(error.message || "Could not complete sign-in.", "error");
  }
}

boot();
