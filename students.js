const REGISTRY_STORAGE_KEY = "sut-physics-equipment-registry-v3";
const STUDY_PROGRAMS = {
  "bsc-physics": { label: "B.Sc. Physics", level: "Bachelor" },
  "msc-physics": { label: "M.Sc. Physics", level: "Master" },
  "msc-applied-physics": { label: "M.Sc. Applied Physics", level: "Master" },
  "phd-physics": { label: "Ph.D. Physics", level: "PhD" },
  "phd-applied-physics": { label: "Ph.D. Applied Physics", level: "PhD" }
};

const clean = value => String(value ?? "").replace(/[&<>'"]/g, character => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
}[character]));
const list = value => Array.isArray(value) ? value.filter(Boolean) : String(value || "").split(/\r?\n|,/).map(item => item.trim()).filter(Boolean);
const keywords = value => list(value).slice(0, 5);
const photoSrc = photo => photo?.url || photo?.data || "";

let students = [];
let faculty = [];
let facilities = [];
let activeLevel = "all";

const programLabel = value => STUDY_PROGRAMS[value]?.label || value || "Program TBD";
const startLabel = student => student.startYear ? `${student.startTerm ? `Term ${student.startTerm}, ` : ""}${student.startYear}` : "Start TBD";
const facultyFor = id => faculty.find(profile => profile.id === id);
const facilityFor = id => facilities.find(group => group.id === id);
const advisorName = id => facultyFor(id)?.name || "TBD";
const groupName = student => facilityFor(student.researchGroupId)?.name || student.researchGroup || "TBD";
const visibleStudent = student => student.verificationStatus === "Verified" && student.publicReady === true;
const physicsStudent = student => (student.recordType || "physics") === "physics";
const detailMarkup = items => items
  .filter(([, value]) => String(value || "").trim())
  .map(([label, value]) => `<div><dt>${clean(label)}</dt><dd>${clean(value)}</dd></div>`)
  .join("");
const tagMarkup = tags => tags.length ? `<div class="faculty-tags">${tags.map(tag => `<span>${clean(tag)}</span>`).join("")}</div>` : "";

const normalizeStudent = student => ({
  id: student.id || `student-${students.length + 1}`,
  studentCode: student.studentCode || "",
  name: student.name || "Student name to confirm",
  preferredName: student.preferredName || "",
  recordType: student.recordType || "physics",
  level: student.level === "Undergraduate" ? "Bachelor" : student.level || STUDY_PROGRAMS[student.programId]?.level || "Bachelor",
  status: student.status || "Active",
  verificationStatus: student.verificationStatus || "Pending",
  publicReady: Boolean(student.publicReady),
  programId: student.programId || "",
  advisorId: student.advisorId || "",
  advisorRole: student.advisorRole || "Primary advisor",
  coadvisor: student.coadvisor || "",
  researchGroupId: student.researchGroupId || "",
  researchGroup: student.researchGroup || "",
  homeSchool: student.homeSchool || "",
  homeProgram: student.homeProgram || "",
  projectTitle: student.projectTitle || "",
  thesisTitle: student.thesisTitle || "",
  startTerm: student.startTerm || "",
  startYear: student.startYear || "",
  profilePhoto: student.profilePhoto || null,
  shortBio: student.shortBio || "",
  researchInterests: keywords(student.researchInterests),
  skills: list(student.skills),
  updatedAt: student.updatedAt || ""
});

const loadLocalStudents = () => {
  try {
    const registry = JSON.parse(localStorage.getItem(REGISTRY_STORAGE_KEY) || "{}");
    return {
      students: Array.isArray(registry.students) ? registry.students.map(normalizeStudent).filter(student => visibleStudent(student) && physicsStudent(student)) : [],
      faculty: Array.isArray(registry.faculty) ? registry.faculty : [],
      facilities: Array.isArray(registry.facilities) ? registry.facilities : []
    };
  } catch {
    return { students: [], faculty: [], facilities: [] };
  }
};

const loadStudents = async () => {
  if (window.SUTSupabase?.isConfigured?.() && window.SUTSupabase?.loadPublicStudents) {
    try {
      const result = await window.SUTSupabase.loadPublicStudents();
      return {
        students: Array.isArray(result.students) ? result.students.map(normalizeStudent).filter(physicsStudent) : [],
        faculty: Array.isArray(result.faculty) ? result.faculty : [],
        facilities: Array.isArray(result.facilities) ? result.facilities : []
      };
    } catch (error) {
      console.warn("Supabase public students unavailable; using local data.", error);
    }
  }
  return loadLocalStudents();
};

const setText = (selector, value) => {
  const target = document.querySelector(selector);
  if (target) target.textContent = value;
};

const levelCounts = () => ["Bachelor", "Master", "PhD"].reduce((result, level) => {
  result[level] = students.filter(student => student.level === level).length;
  return result;
}, { all: students.length });

function populateSelectFilters() {
  const programFilter = document.querySelector("#student-program-public-filter");
  const yearFilter = document.querySelector("#student-year-public-filter");
  const advisorFilter = document.querySelector("#student-advisor-public-filter");
  const groupFilter = document.querySelector("#student-group-public-filter");
  programFilter.innerHTML = `<option value="all">All programs</option>${Object.entries(STUDY_PROGRAMS).map(([id, program]) => `<option value="${clean(id)}">${clean(program.label)}</option>`).join("")}`;
  const years = [...new Set(students.map(student => student.startYear).filter(Boolean))].sort((a, b) => Number(b) - Number(a));
  yearFilter.innerHTML = `<option value="all">All years</option>${years.map(year => `<option value="${clean(year)}">${clean(year)}</option>`).join("")}`;
  const advisors = [...new Map(students.map(student => [student.advisorId || "", advisorName(student.advisorId)]))].sort((a, b) => a[1].localeCompare(b[1]));
  const groups = [...new Map(students.map(student => [student.researchGroupId || "", groupName(student)]))].sort((a, b) => a[1].localeCompare(b[1]));
  advisorFilter.innerHTML = `<option value="all">All advisors</option>${advisors.map(([id, name]) => `<option value="${clean(id)}">${clean(name)}</option>`).join("")}`;
  groupFilter.innerHTML = `<option value="all">All groups</option>${groups.map(([id, name]) => `<option value="${clean(id)}">${clean(name)}</option>`).join("")}`;
}

function updateSummary() {
  const counts = levelCounts();
  setText("#students-count", String(students.length).padStart(2, "0"));
  Object.entries(counts).forEach(([level, count]) => {
    setText(`[data-student-level-count="${level}"]`, String(count).padStart(2, "0"));
    setText(`[data-student-filter-count="${level}"]`, String(count).padStart(2, "0"));
  });
  setText("#students-status-summary", students.length
    ? `${students.length} verified student profile${students.length === 1 ? "" : "s"} currently available.`
    : "Verified student profiles will appear here after students opt in and faculty approve their record.");
}

function filteredStudents() {
  const program = document.querySelector("#student-program-public-filter").value;
  const year = document.querySelector("#student-year-public-filter").value;
  const advisor = document.querySelector("#student-advisor-public-filter").value;
  const group = document.querySelector("#student-group-public-filter").value;
  return students.filter(student =>
    (activeLevel === "all" || student.level === activeLevel) &&
    (program === "all" || student.programId === program) &&
    (year === "all" || String(student.startYear || "") === year) &&
    (advisor === "all" || (student.advisorId || "") === advisor) &&
    (group === "all" || (student.researchGroupId || "") === group)
  );
}

function studentCard(student) {
  const project = student.projectTitle || student.thesisTitle || "Research topic to be announced";
  const interests = student.researchInterests.length ? student.researchInterests : student.skills.slice(0, 5);
  const tags = [student.level, programLabel(student.programId), ...interests].filter(Boolean);
  const portrait = photoSrc(student.profilePhoto);
  return `
    <article class="service-card student-public-card public-profile-trigger" role="button" tabindex="0" data-student-profile="${clean(student.id)}" aria-label="Open full profile for ${clean(student.preferredName || student.name)}">
      ${portrait ? `<img class="student-public-photo" src="${clean(portrait)}" alt="${clean(`${student.preferredName || student.name} profile picture`)}" loading="lazy" decoding="async" />` : ""}
      <div class="service-card-top"><span>${clean(programLabel(student.programId))}</span><span>${clean(student.studentCode || student.id)}</span></div>
      <h3>${clean(student.preferredName || student.name)}</h3>
      <p>${clean(student.shortBio || "Short bio coming soon.")}</p>
      <div class="faculty-tags">${tags.map(tag => `<span>${clean(tag)}</span>`).join("")}</div>
      <dl class="service-meta">
        <div><dt>Advisor</dt><dd>${clean(advisorName(student.advisorId))}</dd></div>
        <div><dt>Started</dt><dd>${clean(startLabel(student))}</dd></div>
        <div><dt>Lab / group</dt><dd>${clean(groupName(student))}</dd></div>
        <div><dt>Project</dt><dd>${clean(project)}</dd></div>
        <div><dt>Status</dt><dd>${clean(student.status || "Active")}</dd></div>
      </dl>
    </article>
  `;
}

function studentProfileMarkup(student) {
  const displayName = student.preferredName || student.name;
  const project = student.projectTitle || student.thesisTitle || "Research topic to be announced";
  const interests = student.researchInterests.length ? student.researchInterests : [];
  const skills = student.skills.length ? student.skills : [];
  const portrait = photoSrc(student.profilePhoto);
  const details = detailMarkup([
    ["Program", programLabel(student.programId)],
    ["Level", student.level],
    ["Advisor", advisorName(student.advisorId)],
    ["Advisor role", student.advisorRole || "Primary advisor"],
    ["Co-advisor", student.coadvisor],
    ["Started", startLabel(student)],
    ["Lab / group", groupName(student)],
    ["Status", student.status || "Active"],
    ["Project", project],
    ["Thesis title", student.thesisTitle]
  ]);
  return `
    <div class="person-profile-shell">
      <header class="person-profile-head">
        <div class="person-profile-kicker"><span>${clean(programLabel(student.programId))}</span> <span>${clean(student.studentCode || student.id)}</span></div>
        <button class="inquiry-close" type="button" data-close-person-profile aria-label="Close profile">×</button>
      </header>
      <div class="person-profile-body">
        <div class="person-profile-intro">
          ${portrait ? `<img class="person-profile-photo" src="${clean(portrait)}" alt="${clean(`${displayName} profile picture`)}" loading="lazy" decoding="async" />` : `<span class="person-profile-initials">${clean(displayName.split(/\s+/).slice(0, 2).map(part => part[0]).join("").toUpperCase() || "ST")}</span>`}
          <div>
            <p class="section-index">Student profile</p>
            <h2 id="student-profile-title">${clean(displayName)}</h2>
            <p>${clean(student.shortBio || "Short bio coming soon.")}</p>
            ${tagMarkup([student.level, programLabel(student.programId), ...interests].filter(Boolean))}
          </div>
        </div>
        <dl class="person-profile-details">${details}</dl>
        ${(interests.length || skills.length) ? `<div class="person-profile-lists">
          ${interests.length ? `<section><h3>Research interests</h3>${tagMarkup(interests)}</section>` : ""}
          ${skills.length ? `<section><h3>Skills and methods</h3>${tagMarkup(skills)}</section>` : ""}
        </div>` : ""}
      </div>
    </div>
  `;
}

function openStudentProfile(id) {
  const student = students.find(item => item.id === id);
  const dialog = document.querySelector("#student-profile-dialog");
  const content = document.querySelector("#student-profile-content");
  if (!student || !dialog || !content) return;
  content.innerHTML = studentProfileMarkup(student);
  dialog.showModal();
  setTimeout(() => content.querySelector("[data-close-person-profile]")?.focus(), 30);
}

function renderStudents() {
  const target = document.querySelector("#students-grid");
  const filtered = filteredStudents();
  target.innerHTML = students.length
    ? filtered.length
      ? filtered.map(studentCard).join("")
      : `<div class="public-empty"><h3>No students match these filters yet</h3><p>Try another study level, program, year, advisor, or group.</p></div>`
    : `<div class="services-coming-soon"><p class="section-index">Student profiles</p><h3>No verified student profiles yet</h3><p>Students who opt in will appear here after faculty verification.</p></div>`;
}

document.querySelector("#students-grid").addEventListener("click", event => {
  const card = event.target.closest("[data-student-profile]");
  if (card) openStudentProfile(card.dataset.studentProfile);
});

document.querySelector("#students-grid").addEventListener("keydown", event => {
  if (!["Enter", " "].includes(event.key)) return;
  const card = event.target.closest("[data-student-profile]");
  if (!card) return;
  event.preventDefault();
  openStudentProfile(card.dataset.studentProfile);
});

document.querySelector("#student-profile-dialog").addEventListener("click", event => {
  if (event.target === event.currentTarget || event.target.closest("[data-close-person-profile]")) event.currentTarget.close();
});

document.querySelectorAll("#student-directory-filters .filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll("#student-directory-filters .filter").forEach(item => {
      item.classList.remove("is-active");
      item.setAttribute("aria-pressed", "false");
    });
    button.classList.add("is-active");
    button.setAttribute("aria-pressed", "true");
    activeLevel = button.dataset.level;
    renderStudents();
  });
});

["#student-program-public-filter", "#student-year-public-filter", "#student-advisor-public-filter", "#student-group-public-filter"].forEach(selector => {
  document.querySelector(selector).addEventListener("change", renderStudents);
});

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-nav");
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  navigation.classList.toggle("is-open", !open);
});

navigation.addEventListener("click", event => {
  if (event.target.closest("a")) {
    menuButton.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  }
});

async function init() {
  const loaded = await loadStudents();
  students = loaded.students;
  faculty = loaded.faculty;
  facilities = loaded.facilities;
  populateSelectFilters();
  updateSummary();
  renderStudents();
}

init();
