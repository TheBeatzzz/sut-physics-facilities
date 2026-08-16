const STUDENT_STORAGE_KEY = "sut-physics-student-draft-v1";
const TERM_VALUES = ["1", "2", "3"];

const backend = window.SUTSupabase;
const $ = selector => document.querySelector(selector);
const normalizeTerm = value => TERM_VALUES.includes(String(value || "").trim()) ? String(value).trim() : "";

function setAuthMessage(message, type = "") {
  const target = $("#student-auth-message");
  target.textContent = message;
  target.className = type ? `auth-help is-${type}` : "auth-help";
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

function studentDraft(data) {
  const email = String(data.email || "").trim().toLowerCase();
  return {
    id: `STU-${Date.now().toString(36).toUpperCase()}`,
    name: data.name,
    studentCode: data.studentCode,
    email,
    ownerEmail: email,
    verificationStatus: "Pending",
    level: "Bachelor",
    programId: "bsc-physics",
    startTerm: normalizeTerm(data.startTerm),
    startYear: data.startYear,
    status: "Active",
    deadlineAlertsEnabled: true,
    publicReady: false
  };
}

$("#student-signup-form").addEventListener("submit", async event => {
  event.preventDefault();
  if (!backend?.isConfigured?.()) {
    setAuthMessage("Supabase must be configured before students can create accounts.", "error");
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
      role: "student",
      full_name: data.name,
      student_code: data.studentCode,
      start_term: normalizeTerm(data.startTerm),
      start_year: data.startYear
    }, {
      emailRedirectTo: new URL("student-portal.html?emailVerified=1", window.location.href).href
    });
    localStorage.setItem(STUDENT_STORAGE_KEY, JSON.stringify(studentDraft(data)));
    if (session) {
      window.location.href = "student-portal.html";
    } else {
      setAuthMessage("Account created. Check your email if Supabase requires confirmation, then sign in from the student portal.", "success");
    }
  } catch (error) {
    setAuthMessage(error.message || "Could not create account.", "error");
  } finally {
    setBusy(event.submitter, false);
  }
});
