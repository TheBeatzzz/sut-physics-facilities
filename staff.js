const REGISTRY_STORAGE_KEY = "sut-physics-equipment-registry-v3";
const STAFF_POSITIONS = ["Administrative Staff", "Teaching Assistant", "Laboratory Technician", "Technical Staff", "Academic Support Staff", "Program Coordinator"];

const clean = value => String(value ?? "").replace(/[&<>'"]/g, character => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
}[character]));
const list = value => Array.isArray(value) ? value.filter(Boolean) : String(value || "").split(/\r?\n|,/).map(item => item.trim()).filter(Boolean);
const photoSrc = photo => photo?.url || photo?.data || "";

let staff = [];
let facilities = [];
let activePosition = "all";

const facilityFor = id => facilities.find(group => group.id === id);
const groupName = profile => facilityFor(profile.researchGroupId)?.name || profile.researchGroup || "To be decided later";
const visibleStaff = profile => profile.reviewStatus === "Verified" && profile.publicReady === true;
const detailMarkup = items => items
  .filter(([, value]) => String(value || "").trim())
  .map(([label, value]) => `<div><dt>${clean(label)}</dt><dd>${clean(value)}</dd></div>`)
  .join("");
const tagMarkup = tags => tags.length ? `<div class="faculty-tags">${tags.map(tag => `<span>${clean(tag)}</span>`).join("")}</div>` : "";

const normalizeStaff = profile => ({
  id: profile.id || `staff-${staff.length + 1}`,
  name: profile.name || "Staff name to confirm",
  position: STAFF_POSITIONS.includes(profile.position) ? profile.position : "Administrative Staff",
  email: profile.email || "",
  status: profile.status || "Active",
  unit: profile.unit || "",
  office: profile.office || "",
  phone: profile.phone || "",
  profilePhoto: profile.profilePhoto || null,
  shortBio: profile.shortBio || "",
  responsibilities: list(profile.responsibilities),
  serviceAreas: list(profile.serviceAreas),
  researchGroupId: profile.researchGroupId || "",
  researchGroup: profile.researchGroup || "",
  publicReady: Boolean(profile.publicReady),
  reviewStatus: profile.reviewStatus || "Draft",
  updatedAt: profile.updatedAt || ""
});

const loadLocalStaff = () => {
  try {
    const registry = JSON.parse(localStorage.getItem(REGISTRY_STORAGE_KEY) || "{}");
    return {
      staff: Array.isArray(registry.staff) ? registry.staff.map(normalizeStaff).filter(visibleStaff) : [],
      facilities: Array.isArray(registry.facilities) ? registry.facilities : []
    };
  } catch {
    return { staff: [], facilities: [] };
  }
};

const loadStaff = async () => {
  if (window.SUTSupabase?.isConfigured?.() && window.SUTSupabase?.loadPublicStaff) {
    try {
      const result = await window.SUTSupabase.loadPublicStaff();
      return {
        staff: Array.isArray(result.staff) ? result.staff.map(normalizeStaff) : [],
        facilities: Array.isArray(result.facilities) ? result.facilities : []
      };
    } catch (error) {
      console.warn("Supabase public staff unavailable; using local data.", error);
    }
  }
  return loadLocalStaff();
};

const setText = (selector, value) => {
  const target = document.querySelector(selector);
  if (target) target.textContent = value;
};

const positionCounts = () => STAFF_POSITIONS.reduce((result, position) => {
  result[position] = staff.filter(profile => profile.position === position).length;
  return result;
}, { all: staff.length });

function populateSelectFilters() {
  const unitFilter = document.querySelector("#staff-unit-public-filter");
  const groupFilter = document.querySelector("#staff-group-public-filter");
  const statusFilter = document.querySelector("#staff-status-public-filter");
  const units = [...new Set(staff.map(profile => profile.unit).filter(Boolean))].sort();
  const groups = [...new Map(staff.map(profile => [profile.researchGroupId || "", groupName(profile)]))].sort((a, b) => a[1].localeCompare(b[1]));
  const statuses = [...new Set(staff.map(profile => profile.status).filter(Boolean))].sort();
  unitFilter.innerHTML = `<option value="all">All units</option>${units.map(unit => `<option>${clean(unit)}</option>`).join("")}`;
  groupFilter.innerHTML = `<option value="all">All groups</option>${groups.map(([id, name]) => `<option value="${clean(id)}">${clean(name)}</option>`).join("")}`;
  statusFilter.innerHTML = `<option value="all">All statuses</option>${statuses.map(status => `<option>${clean(status)}</option>`).join("")}`;
}

function updateSummary() {
  const counts = positionCounts();
  setText("#staff-count", String(staff.length).padStart(2, "0"));
  setText("#staff-status-summary", staff.length
    ? `${staff.length} public staff profile${staff.length === 1 ? "" : "s"} currently available.`
    : "Public staff profiles will appear here after records are verified and marked public.");
  Object.entries(counts).forEach(([position, count]) => {
    setText(`[data-staff-position-count="${position}"]`, String(count).padStart(2, "0"));
    setText(`[data-staff-filter-count="${position}"]`, String(count).padStart(2, "0"));
  });
}

function filteredStaff() {
  const unit = document.querySelector("#staff-unit-public-filter").value;
  const group = document.querySelector("#staff-group-public-filter").value;
  const status = document.querySelector("#staff-status-public-filter").value;
  return staff.filter(profile =>
    (activePosition === "all" || profile.position === activePosition) &&
    (unit === "all" || profile.unit === unit) &&
    (group === "all" || (profile.researchGroupId || "") === group) &&
    (status === "all" || profile.status === status)
  );
}

function staffCard(profile) {
  const portrait = photoSrc(profile.profilePhoto);
  const tags = [profile.position, profile.status, ...profile.serviceAreas.slice(0, 4)].filter(Boolean);
  return `
    <article class="service-card student-public-card public-profile-trigger" role="button" tabindex="0" data-staff-profile="${clean(profile.id)}" aria-label="Open full profile for ${clean(profile.name)}">
      ${portrait ? `<img class="student-public-photo" src="${clean(portrait)}" alt="${clean(`${profile.name} profile picture`)}" loading="lazy" decoding="async" />` : ""}
      <div class="service-card-top"><span>${clean(profile.position)}</span><span>${clean(profile.id)}</span></div>
      <h3>${clean(profile.name)}</h3>
      <p>${clean(profile.shortBio || "Staff bio coming soon.")}</p>
      ${tagMarkup(tags)}
      <dl class="service-meta">
        <div><dt>Unit</dt><dd>${clean(profile.unit || "School of Physics")}</dd></div>
        <div><dt>Lab / group</dt><dd>${clean(groupName(profile))}</dd></div>
        <div><dt>Office</dt><dd>${clean(profile.office || "Not listed")}</dd></div>
        <div><dt>Contact</dt><dd>${clean(profile.email || profile.phone || "Not listed")}</dd></div>
      </dl>
    </article>
  `;
}

function staffProfileMarkup(profile) {
  const portrait = photoSrc(profile.profilePhoto);
  const responsibilities = profile.responsibilities.length ? profile.responsibilities : [];
  const serviceAreas = profile.serviceAreas.length ? profile.serviceAreas : [];
  const details = detailMarkup([
    ["Position", profile.position],
    ["Status", profile.status],
    ["Unit", profile.unit || "School of Physics"],
    ["Lab / group", groupName(profile)],
    ["Office", profile.office || "Not listed"],
    ["Email", profile.email || "Not listed"],
    ["Phone", profile.phone || "Not listed"]
  ]);
  return `
    <div class="person-profile-shell">
      <header class="person-profile-head">
        <div class="person-profile-kicker"><span>${clean(profile.position)}</span> <span>${clean(profile.id)}</span></div>
        <button class="inquiry-close" type="button" data-close-person-profile aria-label="Close profile">×</button>
      </header>
      <div class="person-profile-body">
        <div class="person-profile-intro">
          ${portrait ? `<img class="person-profile-photo" src="${clean(portrait)}" alt="${clean(`${profile.name} profile picture`)}" loading="lazy" decoding="async" />` : `<span class="person-profile-initials">${clean(profile.name.split(/\s+/).slice(0, 2).map(part => part[0]).join("").toUpperCase() || "ST")}</span>`}
          <div>
            <p class="section-index">Staff profile</p>
            <h2 id="staff-profile-title">${clean(profile.name)}</h2>
            <p>${clean(profile.shortBio || "Staff bio coming soon.")}</p>
            ${tagMarkup([profile.position, profile.status, ...serviceAreas].filter(Boolean))}
          </div>
        </div>
        <dl class="person-profile-details">${details}</dl>
        ${(responsibilities.length || serviceAreas.length) ? `<div class="person-profile-lists">
          ${responsibilities.length ? `<section><h3>Responsibilities</h3>${tagMarkup(responsibilities)}</section>` : ""}
          ${serviceAreas.length ? `<section><h3>Service areas</h3>${tagMarkup(serviceAreas)}</section>` : ""}
        </div>` : ""}
      </div>
    </div>
  `;
}

function openStaffProfile(id) {
  const profile = staff.find(item => item.id === id);
  const dialog = document.querySelector("#staff-profile-dialog");
  const content = document.querySelector("#staff-profile-content");
  if (!profile || !dialog || !content) return;
  content.innerHTML = staffProfileMarkup(profile);
  dialog.showModal();
  setTimeout(() => content.querySelector("[data-close-person-profile]")?.focus(), 30);
}

function renderStaff() {
  const target = document.querySelector("#staff-grid");
  const filtered = filteredStaff();
  target.innerHTML = staff.length
    ? filtered.length
      ? filtered.map(staffCard).join("")
      : `<div class="public-empty"><h3>No staff match these filters yet</h3><p>Try another position, unit, group, or status.</p></div>`
    : `<div class="services-coming-soon"><p class="section-index">Staff profiles</p><h3>No public staff profiles yet</h3><p>Administrative staff, teaching assistants, technical staff, and academic support staff will appear here after verification.</p></div>`;
}

document.querySelector("#staff-grid").addEventListener("click", event => {
  const card = event.target.closest("[data-staff-profile]");
  if (card) openStaffProfile(card.dataset.staffProfile);
});

document.querySelector("#staff-grid").addEventListener("keydown", event => {
  if (!["Enter", " "].includes(event.key)) return;
  const card = event.target.closest("[data-staff-profile]");
  if (!card) return;
  event.preventDefault();
  openStaffProfile(card.dataset.staffProfile);
});

document.querySelector("#staff-profile-dialog").addEventListener("click", event => {
  if (event.target === event.currentTarget || event.target.closest("[data-close-person-profile]")) event.currentTarget.close();
});

document.addEventListener("DOMContentLoaded", async () => {
  const loaded = await loadStaff();
  staff = loaded.staff;
  facilities = loaded.facilities;
  populateSelectFilters();
  updateSummary();
  renderStaff();
  document.querySelectorAll("[data-staff-position]").forEach(button => {
    button.addEventListener("click", () => {
      activePosition = button.dataset.staffPosition;
      document.querySelectorAll("[data-staff-position]").forEach(item => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      renderStaff();
    });
  });
  ["#staff-unit-public-filter", "#staff-group-public-filter", "#staff-status-public-filter"].forEach(selector => {
    document.querySelector(selector).addEventListener("change", renderStaff);
  });
});
