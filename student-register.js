const STUDENT_STORAGE_KEY = "sut-physics-student-draft-v1";
const TERM_VALUES = ["1", "2", "3"];
const DEFAULT_STUDENT_ADVISOR_ID = "FACULTY-001";

const backend = window.SUTSupabase;
const emailCooldown = window.SUTStudentEmailCooldown;
const $ = selector => document.querySelector(selector);
const normalizeTerm = value => TERM_VALUES.includes(String(value || "").trim()) ? String(value).trim() : "";
const emailDeliveryErrorPattern = /confirmation email|send.*email|sending.*email|smtp|rate limit|too many/i;

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
    recordType: "physics",
    level: "Bachelor",
    programId: "bsc-physics",
    advisorId: DEFAULT_STUDENT_ADVISOR_ID,
    startTerm: normalizeTerm(data.startTerm),
    startYear: data.startYear,
    status: "Active",
    deadlineAlertsEnabled: true,
    publicReady: false
  };
}

function updateEmailCooldownNotice() {
  const target = $("#student-email-cooldown");
  if (!target || !emailCooldown) return;
  const cooldown = emailCooldown.status();
  target.classList.toggle("is-waiting", cooldown.remaining === 0);
  target.textContent = cooldown.remaining
    ? `This browser has ${cooldown.remaining} locally tracked signup email attempt${cooldown.remaining === 1 ? "" : "s"} left in the current hour. Supabase project limits or SMTP settings may still affect delivery.`
    : `This browser has reached its locally tracked signup email attempts. Try again in ${emailCooldown.formatWait(cooldown.waitMs)}, or ask faculty if the email does not arrive.`;
}

function isEmailDeliveryError(error) {
  return emailDeliveryErrorPattern.test(String(error?.message || error || ""));
}

function signupErrorMessage(error) {
  if (isEmailDeliveryError(error)) {
    return "Supabase could not send the confirmation email. This is usually an email rate limit or SMTP sender issue, not a problem with the student information. Please wait and try again, or ask faculty to create or verify the account.";
  }
  return error?.message || "Could not create account.";
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
      emailCooldown?.record();
      updateEmailCooldownNotice();
      setAuthMessage("Account created. Check your email if Supabase requires confirmation, then sign in from the student portal.", "success");
    }
  } catch (error) {
    console.error("Student signup failed", error);
    if (isEmailDeliveryError(error)) {
      emailCooldown?.record();
      updateEmailCooldownNotice();
    }
    setAuthMessage(signupErrorMessage(error), "error");
  } finally {
    setBusy(event.submitter, false);
  }
});

updateEmailCooldownNotice();
