const REGISTRY_STORAGE_KEY = "sut-physics-equipment-registry-v3";

const RESEARCHER_TYPES = ["Postdoctoral Researcher", "Research Fellow", "Visiting Researcher", "Research Assistant", "Project Researcher"];

const clean = value => String(value ?? "").replace(/[&<>'"]/g, character => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
}[character]));
const list = value => Array.isArray(value) ? value.filter(Boolean) : String(value || "").split(/\r?\n|,/).map(item => item.trim()).filter(Boolean);
const keywords = value => list(value).slice(0, 5);
const photoSrc = photo => photo?.url || photo?.data || "";

let researchers = [];
let faculty = [];
let facilities = [];
let activeType = "all";

const facultyFor = id => faculty.find(profile => profile.id === id);
const facilityFor = id => facilities.find(group => group.id === id);
const hostName = id => facultyFor(id)?.name || "TBD";
const groupName = researcher => facilityFor(researcher.researchGroupId)?.name || researcher.researchGroup || "TBD";
const visibleResearcher = researcher => researcher.reviewStatus === "Verified" && researcher.publicReady === true;
const formatDate = value => value ? new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(`${value}T00:00:00`)) : "";
const periodLabel = researcher => [formatDate(researcher.startDate), formatDate(researcher.endDate)].filter(Boolean).join(" - ") || "Dates to be confirmed";
const detailMarkup = items => items
  .filter(([, value]) => String(value || "").trim())
  .map(([label, value]) => `<div><dt>${clean(label)}</dt><dd>${clean(value)}</dd></div>`)
  .join("");
const tagMarkup = tags => tags.length ? `<div class="faculty-tags">${tags.map(tag => `<span>${clean(tag)}</span>`).join("")}</div>` : "";

const normalizeResearcher = researcher => ({
  id: researcher.id || `researcher-${researchers.length + 1}`,
  name: researcher.name || "Researcher name to confirm",
  type: RESEARCHER_TYPES.includes(researcher.type) ? researcher.type : "Postdoctoral Researcher",
  email: researcher.email || "",
  status: researcher.status || "Active",
  hostFacultyId: researcher.hostFacultyId || "",
  hostRole: researcher.hostRole || "Host faculty / PI",
  researchGroupId: researcher.researchGroupId || "",
  researchGroup: researcher.researchGroup || "",
  projectTitle: researcher.projectTitle || "",
  fundingSource: researcher.fundingSource || "",
  startDate: researcher.startDate || "",
  endDate: researcher.endDate || "",
  profilePhoto: researcher.profilePhoto || null,
  shortBio: researcher.shortBio || "",
  researchInterests: keywords(researcher.researchInterests),
  skills: list(researcher.skills),
  publicReady: Boolean(researcher.publicReady),
  reviewStatus: researcher.reviewStatus || "Draft",
  updatedAt: researcher.updatedAt || ""
});

const loadLocalResearchers = () => {
  try {
    const registry = JSON.parse(localStorage.getItem(REGISTRY_STORAGE_KEY) || "{}");
    return {
      researchers: Array.isArray(registry.researchers) ? registry.researchers.map(normalizeResearcher).filter(visibleResearcher) : [],
      faculty: Array.isArray(registry.faculty) ? registry.faculty : [],
      facilities: Array.isArray(registry.facilities) ? registry.facilities : []
    };
  } catch {
    return { researchers: [], faculty: [], facilities: [] };
  }
};

const loadResearchers = async () => {
  if (window.SUTSupabase?.isConfigured?.() && window.SUTSupabase?.loadPublicResearchers) {
    try {
      const result = await window.SUTSupabase.loadPublicResearchers();
      return {
        researchers: Array.isArray(result.researchers) ? result.researchers.map(normalizeResearcher) : [],
        faculty: Array.isArray(result.faculty) ? result.faculty : [],
        facilities: Array.isArray(result.facilities) ? result.facilities : []
      };
    } catch (error) {
      console.warn("Supabase public researchers unavailable; using local data.", error);
    }
  }
  return loadLocalResearchers();
};

const setText = (selector, value) => {
  const target = document.querySelector(selector);
  if (target) target.textContent = value;
};

const typeCounts = () => RESEARCHER_TYPES.reduce((result, type) => {
  result[type] = researchers.filter(researcher => researcher.type === type).length;
  return result;
}, { all: researchers.length });

function populateSelectFilters() {
  const hostFilter = document.querySelector("#researcher-host-public-filter");
  const groupFilter = document.querySelector("#researcher-group-public-filter");
  const statusFilter = document.querySelector("#researcher-status-public-filter");
  const hosts = [...new Map(researchers.map(researcher => [researcher.hostFacultyId || "", hostName(researcher.hostFacultyId)]))].sort((a, b) => a[1].localeCompare(b[1]));
  const groups = [...new Map(researchers.map(researcher => [researcher.researchGroupId || "", groupName(researcher)]))].sort((a, b) => a[1].localeCompare(b[1]));
  const statuses = [...new Set(researchers.map(researcher => researcher.status).filter(Boolean))].sort();
  hostFilter.innerHTML = `<option value="all">All hosts</option>${hosts.map(([id, name]) => `<option value="${clean(id)}">${clean(name)}</option>`).join("")}`;
  groupFilter.innerHTML = `<option value="all">All groups</option>${groups.map(([id, name]) => `<option value="${clean(id)}">${clean(name)}</option>`).join("")}`;
  statusFilter.innerHTML = `<option value="all">All statuses</option>${statuses.map(status => `<option>${clean(status)}</option>`).join("")}`;
}

function updateSummary() {
  const counts = typeCounts();
  setText("#researchers-count", String(researchers.length).padStart(2, "0"));
  setText("#researchers-status-summary", researchers.length
    ? `${researchers.length} public researcher profile${researchers.length === 1 ? "" : "s"} currently available.`
    : "Public researcher profiles will appear here after records are verified and marked public.");
  Object.entries(counts).forEach(([type, count]) => {
    setText(`[data-researcher-type-count="${type}"]`, String(count).padStart(2, "0"));
    setText(`[data-researcher-filter-count="${type}"]`, String(count).padStart(2, "0"));
  });
}

function filteredResearchers() {
  const host = document.querySelector("#researcher-host-public-filter").value;
  const group = document.querySelector("#researcher-group-public-filter").value;
  const status = document.querySelector("#researcher-status-public-filter").value;
  return researchers.filter(researcher =>
    (activeType === "all" || researcher.type === activeType) &&
    (host === "all" || (researcher.hostFacultyId || "") === host) &&
    (group === "all" || (researcher.researchGroupId || "") === group) &&
    (status === "all" || researcher.status === status)
  );
}

function researcherCard(researcher) {
  const portrait = photoSrc(researcher.profilePhoto);
  const interests = researcher.researchInterests.length ? researcher.researchInterests : researcher.skills.slice(0, 5);
  const tags = [researcher.type, researcher.status, ...interests].filter(Boolean);
  return `
    <article class="service-card student-public-card public-profile-trigger" role="button" tabindex="0" data-researcher-profile="${clean(researcher.id)}" aria-label="Open full profile for ${clean(researcher.name)}">
      ${portrait ? `<img class="student-public-photo" src="${clean(portrait)}" alt="${clean(`${researcher.name} profile picture`)}" />` : ""}
      <div class="service-card-top"><span>${clean(researcher.type)}</span><span>${clean(researcher.id)}</span></div>
      <h3>${clean(researcher.name)}</h3>
      <p>${clean(researcher.shortBio || "Researcher bio coming soon.")}</p>
      <div class="faculty-tags">${tags.map(tag => `<span>${clean(tag)}</span>`).join("")}</div>
      <dl class="service-meta">
        <div><dt>Host / PI</dt><dd>${clean(hostName(researcher.hostFacultyId))}</dd></div>
        <div><dt>Lab / group</dt><dd>${clean(groupName(researcher))}</dd></div>
        <div><dt>Project</dt><dd>${clean(researcher.projectTitle || "Project to be announced")}</dd></div>
        <div><dt>Funding</dt><dd>${clean(researcher.fundingSource || "Not listed")}</dd></div>
      </dl>
    </article>
  `;
}

function researcherProfileMarkup(researcher) {
  const portrait = photoSrc(researcher.profilePhoto);
  const interests = researcher.researchInterests.length ? researcher.researchInterests : [];
  const skills = researcher.skills.length ? researcher.skills : [];
  const details = detailMarkup([
    ["Role type", researcher.type],
    ["Status", researcher.status],
    ["Host / PI", hostName(researcher.hostFacultyId)],
    ["Host role", researcher.hostRole || "Host faculty / PI"],
    ["Lab / group", groupName(researcher)],
    ["Project", researcher.projectTitle || "Project to be announced"],
    ["Funding", researcher.fundingSource || "Not listed"],
    ["Appointment", periodLabel(researcher)]
  ]);
  return `
    <div class="person-profile-shell">
      <header class="person-profile-head">
        <div class="person-profile-kicker"><span>${clean(researcher.type)}</span> <span>${clean(researcher.id)}</span></div>
        <button class="inquiry-close" type="button" data-close-person-profile aria-label="Close profile">×</button>
      </header>
      <div class="person-profile-body">
        <div class="person-profile-intro">
          ${portrait ? `<img class="person-profile-photo" src="${clean(portrait)}" alt="${clean(`${researcher.name} profile picture`)}" />` : `<span class="person-profile-initials">${clean(researcher.name.split(/\s+/).slice(0, 2).map(part => part[0]).join("").toUpperCase() || "RS")}</span>`}
          <div>
            <p class="section-index">Researcher profile</p>
            <h2 id="researcher-profile-title">${clean(researcher.name)}</h2>
            <p>${clean(researcher.shortBio || "Researcher bio coming soon.")}</p>
            ${tagMarkup([researcher.type, researcher.status, ...interests].filter(Boolean))}
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

function openResearcherProfile(id) {
  const researcher = researchers.find(item => item.id === id);
  const dialog = document.querySelector("#researcher-profile-dialog");
  const content = document.querySelector("#researcher-profile-content");
  if (!researcher || !dialog || !content) return;
  content.innerHTML = researcherProfileMarkup(researcher);
  dialog.showModal();
  setTimeout(() => content.querySelector("[data-close-person-profile]")?.focus(), 30);
}

function renderResearchers() {
  const target = document.querySelector("#researchers-grid");
  const filtered = filteredResearchers();
  target.innerHTML = researchers.length
    ? filtered.length
      ? filtered.map(researcherCard).join("")
      : `<div class="public-empty"><h3>No researchers match these filters yet</h3><p>Try another role type, host faculty, group, or status.</p></div>`
    : `<div class="services-coming-soon"><p class="section-index">Researcher profiles</p><h3>No public researcher profiles yet</h3><p>Postdocs, research fellows, visiting researchers, and research staff will appear here after verification.</p></div>`;
}

document.querySelector("#researchers-grid").addEventListener("click", event => {
  const card = event.target.closest("[data-researcher-profile]");
  if (card) openResearcherProfile(card.dataset.researcherProfile);
});

document.querySelector("#researchers-grid").addEventListener("keydown", event => {
  if (!["Enter", " "].includes(event.key)) return;
  const card = event.target.closest("[data-researcher-profile]");
  if (!card) return;
  event.preventDefault();
  openResearcherProfile(card.dataset.researcherProfile);
});

document.querySelector("#researcher-profile-dialog").addEventListener("click", event => {
  if (event.target === event.currentTarget || event.target.closest("[data-close-person-profile]")) event.currentTarget.close();
});

document.addEventListener("DOMContentLoaded", async () => {
  const loaded = await loadResearchers();
  researchers = loaded.researchers;
  faculty = loaded.faculty;
  facilities = loaded.facilities;
  populateSelectFilters();
  updateSummary();
  renderResearchers();
  document.querySelectorAll("[data-researcher-type]").forEach(button => {
    button.addEventListener("click", () => {
      activeType = button.dataset.researcherType;
      document.querySelectorAll("[data-researcher-type]").forEach(item => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      renderResearchers();
    });
  });
  ["#researcher-host-public-filter", "#researcher-group-public-filter", "#researcher-status-public-filter"].forEach(selector => {
    document.querySelector(selector).addEventListener("change", renderResearchers);
  });
});
