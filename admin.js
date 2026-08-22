const STORAGE_KEY = "sut-physics-equipment-registry-v3";
const DESCRIPTION_LIMIT = 800;
const SERVICE_CATEGORIES = {
  "certified-measurements": "Certified measurements",
  "short-courses": "Short courses",
  workshops: "Workshops",
  stem: "STEM"
};
const STUDY_LEVELS = ["Bachelor", "Master", "PhD"];
const STUDY_PROGRAMS = {
  "bsc-physics": { label: "B.Sc. Physics", level: "Bachelor" },
  "msc-physics": { label: "M.Sc. Physics", level: "Master" },
  "msc-applied-physics": { label: "M.Sc. Applied Physics", level: "Master" },
  "phd-physics": { label: "Ph.D. Physics", level: "PhD" },
  "phd-applied-physics": { label: "Ph.D. Applied Physics", level: "PhD" }
};
const STUDENT_MILESTONES = [
  { id: "coreCourses", label: "Core courses", shortLabel: "Core", levels: ["Bachelor", "Master", "PhD"] },
  { id: "comprehensiveExam", label: "Comprehensive exam", shortLabel: "Comp", levels: ["Master"] },
  { id: "qualifyingExam", label: "Qualifying exam", shortLabel: "Qual", levels: ["PhD"] },
  { id: "proposalDefense", label: "Proposal defense", shortLabel: "Proposal", levels: ["Master", "PhD"] },
  { id: "thesisDefense", label: "Thesis defense", shortLabel: "Defense", levels: ["Master", "PhD"] },
  { id: "turnitinCheck", label: "Turnitin check", shortLabel: "Turnitin", levels: ["Master", "PhD"] },
  { id: "publicationRequirement", label: "Publication requirement", shortLabel: "Publication", levels: ["Master", "PhD"] }
];
const RESEARCHER_TYPES = ["Postdoctoral Researcher", "Postgraduate Researcher", "Research Fellow", "Visiting Researcher", "Research Assistant", "Project Researcher"];
const STAFF_POSITIONS = ["Administrative Staff", "Teaching Assistant", "Laboratory Technician", "Technical Staff", "Academic Support Staff", "Program Coordinator"];
const DEFAULT_STUDENT_ADVISOR_ID = "FACULTY-011";

const sampleRecord = (id, name, category, facilityId, researchGroup, reviewStatus = "Verified", publicReady = true) => ({
  id,
  name,
  assetCode: `SAMPLE-${id.slice(-3)}`,
  manufacturer: "To be verified",
  model: "To be verified",
  category,
  description: `Example registry record for ${name.toLowerCase()}. Scope and capabilities must be confirmed by the responsible faculty member.`,
  facilityId,
  room: "Location to be verified",
  custodian: "Faculty owner to verify",
  email: "",
  researchGroup,
  acquisitionYear: "",
  status: "Operational",
  access: "Shared by arrangement",
  lastMaintenance: "",
  nextMaintenance: "",
  safety: "Training and safety requirements to be verified.",
  publicReady,
  reviewStatus,
  submitterName: reviewStatus === "Verified" ? "Example dataset" : "Example faculty submission",
  submitterEmail: "",
  ownerEmail: "",
  submitterNotes: "Replace example metadata with verified institutional information.",
  featurePhoto: null,
  gallery: [],
  createdAt: "2026-06-20",
  updatedAt: "2026-06-25",
  sample: true
});

const sampleFacultyFacilityMap = {
  "FACULTY-002": ["FAC-04"],
  "FACULTY-009": ["FAC-05"],
  "FACULTY-011": ["FAC-01", "FAC-03"],
  "FACULTY-016": ["FAC-06"],
  "FACULTY-022": ["FAC-07"]
};
const sampleFacultyFacilities = id => {
  const number = Number(String(id).replace(/\D/g, ""));
  return sampleFacultyFacilityMap[id] || (Number.isFinite(number) && number > 0 ? [`FAC-${String((number - 1) % 7 + 1).padStart(2, "0")}`] : []);
};

const sampleFacultyProfile = (id, name, title, researchInterests, color, role = "", facilityIds = null) => ({
  id,
  name,
  title,
  email: "",
  office: "Office to be verified",
  phone: "",
  bio: role
    ? `Dummy faculty profile for ${role}. Replace this with verified biography and research information before publication.`
    : "Dummy faculty profile. Replace this with verified biography and research information before publication.",
  researchInterests,
  highlights: ["Research highlight to update"],
  activities: role ? [role, "Recent activity to update"] : ["Recent activity to update"],
  recognitions: ["Recognition or appointment to update"],
  profileLinks: {
    academic: "",
    scopus: "",
    researchGate: "",
    googleScholar: "",
    orcid: ""
  },
  facilityIds: Array.isArray(facilityIds) ? facilityIds : sampleFacultyFacilities(id),
  profilePhoto: null,
  scopusMetrics: null,
  manualMetrics: null,
  color,
  publicReady: true,
  ownerEmail: "",
  createdAt: "2026-06-20",
  updatedAt: "2026-06-25",
  sample: true
});

const sampleDatabase = {
  meta: { version: 6, institution: "Suranaree University of Technology", program: "Physics Program", prototype: true },
  faculty: [
    sampleFacultyProfile("FACULTY-001", "Yupeng Yan", "Professor", ["Research interests to update", "Physics program faculty"], "#8fd8c8"),
    sampleFacultyProfile("FACULTY-002", "Santi Maensiri", "Professor", ["Research interests to update", "Materials physics"], "#9bc7ee", "Dean"),
    sampleFacultyProfile("FACULTY-003", "Sirichoke Jungthawan", "Associate Professor", ["Research interests to update", "Physics program faculty"], "#f4c26d", "Head"),
    sampleFacultyProfile("FACULTY-004", "Ayut Limphirat", "Associate Professor", ["Research interests to update", "Physics program faculty"], "#e8a89a", "Vice Dean"),
    sampleFacultyProfile("FACULTY-005", "Prapan Maenyum", "Associate Professor", ["Research interests to update", "Physics program faculty"], "#b8d276"),
    sampleFacultyProfile("FACULTY-006", "Poemwai Chainakul", "Assistant Professor", ["Research interests to update", "Physics program faculty"], "#c1b2df"),
    sampleFacultyProfile("FACULTY-007", "Puangratana Pairo", "Associate Professor", ["Research interests to update", "Physics program faculty"], "#7fc5b2"),
    sampleFacultyProfile("FACULTY-008", "Wittawat Saenrang", "Associate Professor", ["Research interests to update", "Physics program faculty"], "#74dfce"),
    sampleFacultyProfile("FACULTY-009", "Worawat Meevassana", "Associate Professor", ["Research interests to update", "Physics program faculty"], "#8fc3ff", "Vice Dean"),
    sampleFacultyProfile("FACULTY-010", "Prayoon Songsiriritthikul", "Associate Professor", ["Research interests to update", "Physics program faculty"], "#ff8b5b"),
    sampleFacultyProfile("FACULTY-011", "Panomsak Meemon", "Associate Professor", ["Research interests to update", "Biomedical optics"], "#d7ff3f"),
    sampleFacultyProfile("FACULTY-012", "Chinorat Kobdaj", "Assistant Professor", ["Research interests to update", "Physics program faculty"], "#b59cff"),
    sampleFacultyProfile("FACULTY-013", "Khanchai Kosolthongkee", "Assistant Professor", ["Research interests to update", "Physics program faculty"], "#ffc95c", "Vice Dean"),
    sampleFacultyProfile("FACULTY-014", "Christoph Herold", "Assistant Professor", ["Research interests to update", "Physics program faculty"], "#8fd8c8"),
    sampleFacultyProfile("FACULTY-015", "Tirawut Worrakitpoonpol", "Assistant Professor", ["Research interests to update", "Physics program faculty"], "#9bc7ee"),
    sampleFacultyProfile("FACULTY-016", "Michael F. Smith", "Assistant Professor", ["Research interests to update", "Physics program faculty"], "#f4c26d"),
    sampleFacultyProfile("FACULTY-017", "Ittipon Fongkaew", "Assistant Professor", ["Research interests to update", "Physics program faculty"], "#e8a89a"),
    sampleFacultyProfile("FACULTY-018", "Warintorn Srithawong", "Dr.", ["Research interests to update", "Physics program faculty"], "#b8d276"),
    sampleFacultyProfile("FACULTY-019", "Narongrit Ritjoho", "Dr.", ["Research interests to update", "Physics program faculty"], "#c1b2df"),
    sampleFacultyProfile("FACULTY-020", "Wiwat Nuansing", "Dr.", ["Research interests to update", "Physics program faculty"], "#7fc5b2"),
    sampleFacultyProfile("FACULTY-021", "Monchai Jitvisate", "Dr.", ["Research interests to update", "Physics program faculty"], "#74dfce"),
    sampleFacultyProfile("FACULTY-022", "Artitsupa Boontan", "Dr.", ["Research interests to update", "Physics program faculty"], "#8fc3ff"),
    sampleFacultyProfile("FACULTY-023", "Sorawis Sangtawesin", "Dr.", ["Research interests to update", "Physics program faculty"], "#ff8b5b"),
    sampleFacultyProfile("FACULTY-024", "Wanvisa Talataisong", "Dr.", ["Research interests to update", "Physics program faculty"], "#d7ff3f")
  ],
  facilities: [
    { id: "FAC-01", name: "Advanced Microscopy & Biomedical Photonics Facility", building: "To be verified", room: "To be verified", lead: "Faculty lead to verify", description: "Example facility cluster for confocal imaging, fluorescence lifetime, optical coherence tomography, and biomedical optical design.", color: "#8fd8c8" },
    { id: "FAC-02", name: "Infrared & Optical Spectroscopy Facility", building: "To be verified", room: "To be verified", lead: "Faculty lead to verify", description: "Example facility cluster for infrared spectroscopy, surface plasmon analysis, and optical reflectance and transmittance measurements.", color: "#9bc7ee" },
    { id: "FAC-03", name: "Ultrafast Laser & Optical Data Systems Facility", building: "To be verified", room: "To be verified", lead: "Faculty lead to verify", description: "Example facility cluster for short-pulse lasers, swept laser systems, and high-speed optical data acquisition.", color: "#f4c26d" },
    { id: "FAC-04", name: "Advanced Materials Fabrication Facility", building: "To be verified", room: "To be verified", lead: "Faculty lead to verify", description: "Example facility cluster for electrospinning, advanced 3D printing, and materials testing workflows.", color: "#e8a89a" },
    { id: "FAC-05", name: "Optical Fiber & Integrated Photonics Facility", building: "To be verified", room: "To be verified", lead: "Faculty lead to verify", description: "Example facility cluster for optical fiber sensors and photonics-on-chip system design.", color: "#b8d276" },
    { id: "FAC-06", name: "Quantum Computing Laboratory", building: "To be verified", room: "To be verified", lead: "Faculty lead to verify", description: "Example facility for quantum computing research, design, simulation, and experimental activities.", color: "#c1b2df" },
    { id: "FAC-07", name: "AI, Machine Vision & Medical Intelligence Laboratory", building: "To be verified", room: "To be verified", lead: "Faculty lead to verify", description: "Example facility cluster for deep learning, machine vision, and AI-assisted medical diagnosis system design and implementation.", color: "#7fc5b2" }
  ],
  students: [],
  researchers: [],
  staff: [],
  services: [],
  equipment: [
    sampleRecord("EQ-001", "Photon Counting Scanning Confocal Microscopy", "Imaging", "FAC-01", "Biomedical photonics"),
    sampleRecord("EQ-002", "Fluorescent Life-Time Measurement", "Optics & photonics", "FAC-01", "Biomedical photonics"),
    sampleRecord("EQ-003", "Optical Coherence Tomography Design and Applications", "Imaging", "FAC-01", "Biomedical photonics", "Submitted"),
    sampleRecord("EQ-004", "Fourier Transform Infrared Spectroscopy Lab", "Spectroscopy", "FAC-02", "Optical spectroscopy"),
    sampleRecord("EQ-005", "Mid IR Spectroscopy Lab", "Spectroscopy", "FAC-02", "Infrared photonics"),
    sampleRecord("EQ-006", "Short Pulse Laser Laboratory and Applications", "Optics & photonics", "FAC-03", "Ultrafast photonics", "Submitted"),
    sampleRecord("EQ-007", "Electrospinning Material Fabrication and Testing", "Materials preparation", "FAC-04", "Functional materials"),
    sampleRecord("EQ-008", "Advanced 3D Printing Lab", "Materials preparation", "FAC-04", "Advanced fabrication", "Draft", false),
    sampleRecord("EQ-009", "Surface Plasmon Analysis", "Spectroscopy", "FAC-02", "Optical sensing"),
    sampleRecord("EQ-010", "Quantum Computing Lab", "Computing", "FAC-06", "Quantum technologies", "Submitted"),
    sampleRecord("EQ-011", "Optical Fiber Sensor Fabrication and Testing", "Optics & photonics", "FAC-05", "Fiber optics"),
    sampleRecord("EQ-012", "Design of Photonics on Chip Systems", "Optics & photonics", "FAC-05", "Integrated photonics", "Draft", false),
    sampleRecord("EQ-013", "Optical Vein Finder Design", "Optics & photonics", "FAC-01", "Biomedical photonics", "Submitted"),
    sampleRecord("EQ-014", "Ultra High Speed Optical Data Acquisition Design and Testing", "Optics & photonics", "FAC-03", "Optical instrumentation"),
    sampleRecord("EQ-015", "Optical Reflectance and Transmittance Analysis", "Spectroscopy", "FAC-02", "Optical characterization"),
    sampleRecord("EQ-016", "High Speed Frequency Swept Laser and Applications", "Optics & photonics", "FAC-03", "Tunable laser systems", "Submitted"),
    sampleRecord("EQ-017", "Deep Learning Lab", "Computing", "FAC-07", "Artificial intelligence"),
    sampleRecord("EQ-018", "Machine Vision Lab", "Imaging", "FAC-07", "Computer vision", "Submitted"),
    sampleRecord("EQ-019", "AI-Assisted Medical Diagnosis System Design and Implementation Lab", "Computing", "FAC-07", "Medical artificial intelligence", "Submitted")
  ]
};

const facilityPalette = ["#8fd8c8", "#9bc7ee", "#f4c26d", "#c1b2df", "#e8a89a", "#b8d276", "#7fc5b2", "#e8a89a"];

const clone = value => JSON.parse(JSON.stringify(value));
const normalizeList = value => Array.isArray(value) ? value.filter(Boolean) : String(value || "").split(/\r?\n|,/).map(item => item.trim()).filter(Boolean);
const normalizeKeywords = value => normalizeList(value).slice(0, 5);
const wordCount = value => String(value || "").trim().split(/\s+/).filter(Boolean).length;
const facultyNameCorrections = {
  "Worawat Meewassana": "Worawat Meevassana",
  "Prayoon Songsirittikul": "Prayoon Songsiriritthikul",
  "Khanchar Kosalathongkee": "Khanchai Kosolthongkee",
  "Michale F. Smith": "Michael F. Smith",
  "Artitsupa Bootan": "Artitsupa Boontan"
};
const normalizeFacultyNames = profiles => profiles.map(profile => {
  const facilityIds = normalizeList(profile.facilityIds);
  return {
    ...profile,
    name: facultyNameCorrections[profile.name] || profile.name,
    facilityIds: facilityIds.length ? facilityIds : profile.sample ? sampleFacultyFacilities(profile.id) : []
  };
});
const normalizeStudents = students => students.map(student => ({
  ...student,
  level: student.level === "Undergraduate" ? "Bachelor" : STUDY_LEVELS.includes(student.level) ? student.level : STUDY_PROGRAMS[student.programId]?.level || "Bachelor",
  status: student.status || "Active",
  startTerm: ["1", "2", "3"].includes(String(student.startTerm || "")) ? String(student.startTerm) : "",
  researchInterests: normalizeKeywords(student.researchInterests),
  skills: normalizeList(student.skills),
  shortBio: student.shortBio || "",
  researchGroupId: student.researchGroupId || "",
  studyProgress: student.studyProgress && typeof student.studyProgress === "object" ? student.studyProgress : {},
  deadlineAlertsEnabled: student.deadlineAlertsEnabled !== false,
  deadlineLeadDays: normalizeList(student.deadlineLeadDays).length ? normalizeList(student.deadlineLeadDays) : [30, 14, 7, 1],
  verificationStatus: student.verificationStatus || "Pending",
  publicReady: Boolean(student.publicReady),
  verifiedByEmail: student.verifiedByEmail || "",
  verifiedAt: student.verifiedAt || ""
}));
const normalizeResearchers = researchers => researchers.map(researcher => ({
  ...researcher,
  type: RESEARCHER_TYPES.includes(researcher.type) ? researcher.type : "Postdoctoral Researcher",
  status: researcher.status || "Active",
  hostFacultyId: researcher.hostFacultyId || "",
  researchGroupId: researcher.researchGroupId || "",
  researchInterests: normalizeKeywords(researcher.researchInterests),
  skills: normalizeList(researcher.skills),
  shortBio: researcher.shortBio || "",
  reviewStatus: researcher.reviewStatus || "Draft",
  publicReady: Boolean(researcher.publicReady)
}));
const normalizeStaff = staff => staff.map(profile => ({
  ...profile,
  position: STAFF_POSITIONS.includes(profile.position) ? profile.position : "Administrative Staff",
  status: profile.status || "Active",
  unit: profile.unit || "",
  researchGroupId: profile.researchGroupId || "",
  responsibilities: normalizeList(profile.responsibilities),
  serviceAreas: normalizeList(profile.serviceAreas),
  shortBio: profile.shortBio || "",
  reviewStatus: profile.reviewStatus || "Draft",
  publicReady: Boolean(profile.publicReady)
}));
const isGenericSampleFaculty = profiles =>
  Array.isArray(profiles) &&
  profiles.length > 0 &&
  profiles.every(profile => profile.sample && String(profile.name || "").toLowerCase().includes("to verify"));
const normalizeDatabase = value => ({
  ...clone(sampleDatabase),
  ...value,
  meta: { ...clone(sampleDatabase.meta), ...(value?.meta || {}) },
  faculty: isGenericSampleFaculty(value?.faculty) ? clone(sampleDatabase.faculty) : Array.isArray(value?.faculty) ? normalizeFacultyNames(value.faculty) : [],
  facilities: Array.isArray(value?.facilities) ? value.facilities : [],
  students: Array.isArray(value?.students) ? normalizeStudents(value.students) : [],
  researchers: Array.isArray(value?.researchers) ? normalizeResearchers(value.researchers) : [],
  staff: Array.isArray(value?.staff) ? normalizeStaff(value.staff) : [],
  services: Array.isArray(value?.services) ? value.services : [],
  equipment: Array.isArray(value?.equipment) ? value.equipment : []
});
const loadDatabase = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? normalizeDatabase(JSON.parse(saved)) : clone(sampleDatabase);
  } catch { return clone(sampleDatabase); }
};

let db = loadDatabase();
const backend = window.SUTSupabase;
const backendConfigured = Boolean(backend?.isConfigured?.());
let backendReady = false;
let currentSession = null;
let lastRegistryError = null;
let activeView = "overview";
let recordMode = "manager";
let toastTimer;
let pendingFeaturePhoto = null;
let pendingGallery = [];
let pendingFacultyPhoto = null;
let pendingServicePhoto = null;
let lastFacilityError = null;
let editingFacilityId = null;
let lastFacultyError = null;
let editingFacultyId = null;
let lastStudentError = null;
let editingStudentId = null;
let lastResearcherError = null;
let editingResearcherId = null;
let lastStaffError = null;
let editingStaffId = null;
let lastServiceError = null;
let editingServiceId = null;
let visitorEvents = [];
let visitorStatsError = "";

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const today = () => new Date().toISOString().slice(0, 10);
const signedInEmail = () => String(currentSession?.user?.email || "").trim().toLowerCase();
const currentFacultyProfile = () => {
  const email = signedInEmail();
  if (!email) return null;
  return db.faculty.find(profile =>
    [profile.ownerEmail, profile.email].some(value => String(value || "").trim().toLowerCase() === email)
  ) || null;
};
const clean = value => String(value ?? "").replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
const slug = value => String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const nameKey = value => String(value || "").trim().toLowerCase().replace(/\s+/g, " ");
const metricNumber = value => Number.isFinite(Number(value)) ? Number(value).toLocaleString() : "";
const metricValue = value => {
  if (String(value || "").trim() === "") return null;
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? Math.floor(number) : null;
};
const hasMetric = value => Number.isFinite(Number(value));
const hasMetrics = metrics => Boolean(metrics && typeof metrics === "object" && (
  hasMetric(metrics.hIndex) ||
  hasMetric(metrics.citationCount) ||
  hasMetric(metrics.documentCount)
));
const metricFallback = profile => {
  if (hasMetrics(profile.scopusMetrics)) return { metrics: profile.scopusMetrics, source: "Scopus" };
  if (hasMetrics(profile.manualMetrics)) return { metrics: profile.manualMetrics, source: "Manual" };
  return { metrics: {}, source: "NA" };
};
const extractScopusAuthorId = value => {
  const text = String(value || "").trim();
  if (!text) return "";
  try {
    const url = new URL(text);
    const direct = url.searchParams.get("authorId") || url.searchParams.get("author_id") || url.searchParams.get("authid");
    if (direct && /^\d{6,20}$/.test(direct)) return direct;
  } catch {}
  const decoded = decodeURIComponent(text);
  const match = decoded.match(/(?:authorId|author_id|authid)[=/:%?&]+(\d{6,20})/i) || decoded.match(/\b(\d{8,20})\b/);
  return match ? match[1] : "";
};
const facilityFor = id => db.facilities.find(item => item.id === id);
const facultyFor = id => db.faculty.find(item => item.id === id);
const advisorName = id => facultyFor(id)?.name || "TBD";
const researchGroupName = student => facilityFor(student.researchGroupId)?.name || student.researchGroup || "TBD";
const serviceCategoryLabel = value => SERVICE_CATEGORIES[value] || value || "Service";
const programLabel = value => STUDY_PROGRAMS[value]?.label || value || "Program TBD";
const formatDate = value => value ? new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(`${value}T00:00:00`)) : "Not recorded";
const milestoneLevelFor = student => student.level || STUDY_PROGRAMS[student.programId]?.level || "Bachelor";
const milestonesForStudent = student => {
  const level = milestoneLevelFor(student);
  const progress = student.studyProgress && typeof student.studyProgress === "object" ? student.studyProgress : {};
  const milestoneData = progress.milestones && typeof progress.milestones === "object" ? progress.milestones : {};
  return STUDENT_MILESTONES
    .filter(milestone => milestone.levels.includes(level))
    .map(milestone => {
      const record = milestoneData[milestone.id] && typeof milestoneData[milestone.id] === "object" ? milestoneData[milestone.id] : {};
      return {
        ...milestone,
        completed: Boolean(record.completed),
        completedAt: record.completedAt || ""
      };
    });
};
const studentMilestoneSummary = student => {
  const milestones = milestonesForStudent(student);
  const completed = milestones.filter(milestone => milestone.completed).length;
  const total = milestones.length;
  const percent = total ? Math.round((completed / total) * 100) : 0;
  return { milestones, completed, total, percent };
};
const studentMilestoneMarkup = student => {
  const { milestones, completed, total, percent } = studentMilestoneSummary(student);
  if (!total) return `<div class="student-milestones"><small>No milestones assigned</small></div>`;
  return `<div class="student-milestones">
    <div class="student-milestones-head"><strong>${completed}/${total} milestones</strong><small>${percent}% complete</small></div>
    <div class="student-milestone-list">${milestones.map(milestone => {
      const dateLabel = milestone.completedAt ? formatDate(milestone.completedAt) : "";
      return `<span class="student-milestone-chip ${milestone.completed ? "is-complete" : "is-pending"}" title="${clean(milestone.label)}${dateLabel ? ` completed ${clean(dateLabel)}` : " pending"}"><b>${clean(milestone.shortLabel)}</b>${dateLabel ? `<time datetime="${clean(milestone.completedAt)}">${clean(dateLabel)}</time>` : ""}</span>`;
    }).join("")}</div>
  </div>`;
};
const photoSrc = photo => backend?.photoSrc?.(photo) || photo?.url || photo?.data || "";
const save = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    return true;
  } catch {
    showToast("Browser storage is full. Remove some photos or export the registry.");
    return false;
  }
};

const atlasSeedId = id => `ATLAS-${id}`;
const atlasFacilityIdFor = sourceFacility => {
  const existing = db.facilities.find(item => item.id === sourceFacility.id || item.id === atlasSeedId(sourceFacility.id) || nameKey(item.name) === nameKey(sourceFacility.name));
  return existing?.id || atlasSeedId(sourceFacility.id);
};
const atlasSeedFacilities = () => sampleDatabase.facilities
  .filter(sourceFacility => !db.facilities.some(item => item.id === sourceFacility.id || item.id === atlasSeedId(sourceFacility.id) || nameKey(item.name) === nameKey(sourceFacility.name)))
  .map(sourceFacility => ({
    ...clone(sourceFacility),
    id: atlasSeedId(sourceFacility.id),
    lead: "",
    description: `${sourceFacility.description} Faculty associations can be assigned later.`
  }));
const atlasSeedEquipment = () => sampleDatabase.equipment
  .map(sourceRecord => {
    const sourceFacility = sampleDatabase.facilities.find(facility => facility.id === sourceRecord.facilityId);
    const number = String(sourceRecord.id).replace(/\D/g, "").padStart(3, "0");
    return {
      ...clone(sourceRecord),
      id: atlasSeedId(sourceRecord.id),
      assetCode: `ATLAS-${number}`,
      facilityId: sourceFacility ? atlasFacilityIdFor(sourceFacility) : "",
      custodian: "",
      email: "",
      reviewStatus: "Verified",
      publicReady: true,
      submitterName: "Equipment Atlas fallback",
      submitterEmail: "",
      submitterNotes: "Seeded from the fallback Equipment Atlas. Assign faculty ownership and verify final metadata later.",
      updatedAt: today(),
      sample: true
    };
  })
  .filter(sourceRecord => !db.equipment.some(item => item.id === sourceRecord.id || nameKey(item.name) === nameKey(sourceRecord.name)));

function setBusy(button, busy, label = "Saving…") {
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

function setRegistryMode(message = "") {
  const state = $("#storage-state");
  if (!state) return;
  const title = state.querySelector("strong");
  const detail = state.querySelector("small");
  if (backendConfigured) {
    title.textContent = backendReady ? "Supabase registry" : "Supabase login";
    detail.textContent = message || (backendReady ? "Shared database active" : "Sign in required");
    $("#registry-mode-title").textContent = backendReady ? "Live shared registry" : "Faculty login required";
    $("#registry-mode-note").textContent = backendReady ? "Records are loaded from Supabase and shared across registered faculty accounts." : "Sign in with a registered SUT faculty account to manage your profile, facilities, and equipment.";
    $("#media-storage-note").innerHTML = "<strong>Supabase storage:</strong> equipment images and faculty profile pictures upload to the shared equipment-photos bucket.";
    $("#sign-out").hidden = !backendReady;
    $("#change-password").hidden = !backendReady;
    $("#reset-data").disabled = backendReady;
  } else {
    title.textContent = "Prototype storage";
    detail.textContent = "Saved in this browser only";
    $("#registry-mode-title").textContent = "Prototype dataset";
    $("#registry-mode-note").textContent = "Sample records are marked and must be replaced with verified program data.";
    $("#media-storage-note").innerHTML = "<strong>Prototype note:</strong> photos are saved only in this browser. Configure Supabase to upload them to shared storage.";
    $("#sign-out").hidden = true;
    $("#change-password").hidden = true;
    $("#reset-data").disabled = false;
  }
}

function setUserChip() {
  const email = currentSession?.user?.email || "";
  const initials = email ? email.slice(0, 2).toUpperCase() : "PM";
  $("#user-chip").querySelector("span").textContent = initials;
  $("#user-chip").querySelector("strong").textContent = email || "Program manager";
  $("#user-chip").querySelector("small").textContent = backendReady ? "Supabase account" : "Registry editor";
}

function hideAccessIssuePanel() {
  const panel = $("#access-issue-panel");
  if (panel) panel.hidden = true;
}

function showAuthGate(message = "", options = {}) {
  const clearSession = options.clearSession !== false;
  $("#auth-gate").hidden = false;
  document.body.classList.add("auth-required");
  $("#auth-message").textContent = message || "Sign in with a registered SUT faculty account to manage the shared registry.";
  hideAccessIssuePanel();
  db = { ...clone(sampleDatabase), faculty: [], students: [], researchers: [], staff: [], equipment: [], facilities: [], services: [] };
  backendReady = false;
  visitorEvents = [];
  visitorStatsError = "";
  if (clearSession) currentSession = null;
  setRegistryMode();
  setUserChip();
  renderAll();
}

function hideAuthGate() {
  $("#auth-gate").hidden = true;
  document.body.classList.remove("auth-required");
}

function showAccessIssue(message, email, emailConfirmed = false) {
  showAuthGate(emailConfirmed
    ? "Your email link was confirmed, but this account is not connected to a faculty profile or registry manager role yet."
    : message || "This account is signed in but is not connected to a faculty profile or registry manager role yet.",
    { clearSession: false });
  const panel = $("#access-issue-panel");
  if (panel) {
    $("#access-issue-email").textContent = email || "this account";
    panel.hidden = false;
  }
  $("#auth-message").textContent = `${message || "Supabase blocked access to the internal registry."} Confirm ${email || "this email"} matches faculty.owner_email or faculty.email, or ask an admin to add it to public.registry_admins with active = true for manager access.`;
}

async function loadSharedRegistry(options = {}) {
  if (!backendConfigured) return false;
  try {
    db = normalizeDatabase(await backend.loadRegistry({ publicOnly: false }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    lastRegistryError = null;
    backendReady = true;
    setRegistryMode();
    setUserChip();
    hideAuthGate();
    await loadVisitorAnalytics();
    renderAll();
    return true;
  } catch (error) {
    lastRegistryError = error;
    if (options.showGate !== false) {
      showAuthGate(`${error.message || "Could not load the shared registry."} If you are signed in, confirm that your @sut.ac.th or @g.sut.ac.th email matches your faculty profile owner email or is active in the registry_admins allowlist.`);
    }
    return false;
  }
}

async function loadVisitorAnalytics() {
  visitorEvents = [];
  visitorStatsError = "";
  if (!backendReady || !backend?.loadVisitorStats) return;
  try {
    visitorEvents = await backend.loadVisitorStats({ days: 90, limit: 2500 });
  } catch (error) {
    visitorStatsError = /visitor_events|schema cache|PGRST|42P01/i.test(String(error.message || ""))
      ? "Run the latest supabase-schema.sql to create visitor_events, then refresh this page."
      : error.message || "Could not load visitor statistics.";
  }
}

async function persistEquipment(record, previousEquipment) {
  if (!backendReady) {
    if (save()) return true;
    db.equipment = previousEquipment;
    renderAll();
    return false;
  }
  try {
    const savedRecord = await backend.saveEquipment(record);
    const index = db.equipment.findIndex(item => item.id === savedRecord.id);
    if (index >= 0) db.equipment[index] = savedRecord; else db.equipment.unshift(savedRecord);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    return true;
  } catch (error) {
    db.equipment = previousEquipment;
    renderAll();
    const rlsMessage = /row-level security|violates.*policy|equipment|storage/i.test(String(error.message || ""))
      ? "Supabase blocked this equipment save. Ask an admin to rerun the latest supabase-schema.sql and confirm your faculty profile owner email matches your sign-in email. For existing equipment, the owner email, equipment email, submitter email, or custodian should match your faculty profile."
      : "";
    showToast(rlsMessage || error.message || "Could not save to Supabase");
    return false;
  }
}

async function persistFacility(facility) {
  lastFacilityError = null;
  if (!backendReady) {
    const index = db.facilities.findIndex(item => item.id === facility.id);
    if (index >= 0) db.facilities[index] = facility; else db.facilities.push(facility);
    save();
    return true;
  }
  try {
    const savedFacility = await backend.saveFacility(facility);
    const index = db.facilities.findIndex(item => item.id === savedFacility.id);
    if (index >= 0) db.facilities[index] = savedFacility; else db.facilities.push(savedFacility);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    return true;
  } catch (error) {
    const rlsMessage = /row-level security|violates.*policy|facilities/i.test(String(error.message || ""))
      ? "Supabase blocked this facility save. Ask an admin to rerun the latest supabase-schema.sql and confirm your faculty profile owner email matches your sign-in email. For existing facilities, the facility lead should match your faculty profile name or the facility owner email should match your sign-in email."
      : "";
    lastFacilityError = rlsMessage ? new Error(rlsMessage) : error;
    showToast(rlsMessage || error.message || "Could not save facility to Supabase");
    return false;
  }
}

async function persistFaculty(profile) {
  lastFacultyError = null;
  if (!backendReady) {
    const index = db.faculty.findIndex(item => item.id === profile.id);
    if (index >= 0) db.faculty[index] = profile; else db.faculty.push(profile);
    save();
    return true;
  }
  try {
    const savedProfile = await backend.saveFaculty(profile);
    const index = db.faculty.findIndex(item => item.id === savedProfile.id);
    if (index >= 0) db.faculty[index] = savedProfile; else db.faculty.push(savedProfile);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    return true;
  } catch (error) {
    const schemaMessage = /schema cache|facility_ids|profile_photo|scopus_metrics|manual_metrics/i.test(String(error.message || ""))
      ? "Supabase needs the latest faculty schema. Run supabase-schema.sql in SQL Editor, then try saving this profile again."
      : "";
    lastFacultyError = schemaMessage ? new Error(schemaMessage) : error;
    showToast(schemaMessage || error.message || "Could not save faculty profile to Supabase");
    return false;
  }
}

async function persistStudent(student) {
  lastStudentError = null;
  if (!backendReady) {
    const index = db.students.findIndex(item => item.id === student.id);
    if (index >= 0) db.students[index] = student; else db.students.unshift(student);
    save();
    return true;
  }
  try {
    const savedStudent = await backend.saveStudent(student);
    const index = db.students.findIndex(item => item.id === savedStudent.id);
    if (index >= 0) db.students[index] = savedStudent; else db.students.unshift(savedStudent);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    return true;
  } catch (error) {
    const schemaMessage = /schema cache|students|PGRST|42P01/i.test(String(error.message || ""))
      ? "Supabase needs the latest students schema. Run supabase-schema.sql in SQL Editor, then try saving this student again."
      : "";
    const rlsMessage = /row-level security|violates.*policy/i.test(String(error.message || ""))
      ? "Supabase blocked this student save. Confirm the owner email matches your sign-in email, or assign yourself as the advisor on the student record."
      : "";
    lastStudentError = new Error(schemaMessage || rlsMessage || error.message || "Could not save student to Supabase");
    showToast(lastStudentError.message);
    return false;
  }
}

async function persistResearcher(researcher) {
  lastResearcherError = null;
  if (!backendReady) {
    const index = db.researchers.findIndex(item => item.id === researcher.id);
    if (index >= 0) db.researchers[index] = researcher; else db.researchers.unshift(researcher);
    save();
    return true;
  }
  try {
    const savedResearcher = await backend.saveResearcher(researcher);
    const index = db.researchers.findIndex(item => item.id === savedResearcher.id);
    if (index >= 0) db.researchers[index] = savedResearcher; else db.researchers.unshift(savedResearcher);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    return true;
  } catch (error) {
    const schemaMessage = /schema cache|researchers|PGRST|42P01/i.test(String(error.message || ""))
      ? "Supabase needs the latest researchers schema. Run supabase-schema.sql in SQL Editor, then try saving this researcher again."
      : "";
    const rlsMessage = /row-level security|violates.*policy/i.test(String(error.message || ""))
      ? "Supabase blocked this researcher save. Confirm your faculty profile owner email matches your sign-in email, or assign yourself as the host faculty."
      : "";
    lastResearcherError = new Error(schemaMessage || rlsMessage || error.message || "Could not save researcher to Supabase");
    showToast(lastResearcherError.message);
    return false;
  }
}

async function persistStaff(profile) {
  lastStaffError = null;
  if (!backendReady) {
    const index = db.staff.findIndex(item => item.id === profile.id);
    if (index >= 0) db.staff[index] = profile; else db.staff.unshift(profile);
    save();
    return true;
  }
  try {
    const savedProfile = await backend.saveStaff(profile);
    const index = db.staff.findIndex(item => item.id === savedProfile.id);
    if (index >= 0) db.staff[index] = savedProfile; else db.staff.unshift(savedProfile);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    return true;
  } catch (error) {
    const schemaMessage = /schema cache|staff|PGRST|42P01/i.test(String(error.message || ""))
      ? "Supabase needs the latest staff schema. Run supabase-schema.sql in SQL Editor, then try saving this staff profile again."
      : "";
    const rlsMessage = /row-level security|violates.*policy/i.test(String(error.message || ""))
      ? "Supabase blocked this staff save. Confirm the owner email matches the staff sign-in email, or ask a registry manager to approve it."
      : "";
    lastStaffError = new Error(schemaMessage || rlsMessage || error.message || "Could not save staff profile to Supabase");
    showToast(lastStaffError.message);
    return false;
  }
}

async function persistService(service) {
  lastServiceError = null;
  if (!backendReady) {
    const index = db.services.findIndex(item => item.id === service.id);
    if (index >= 0) db.services[index] = service; else db.services.unshift(service);
    save();
    return true;
  }
  try {
    const savedService = await backend.saveService(service);
    const index = db.services.findIndex(item => item.id === savedService.id);
    if (index >= 0) db.services[index] = savedService; else db.services.unshift(savedService);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    return true;
  } catch (error) {
    const schemaMessage = /schema cache|services|PGRST|42P01/i.test(String(error.message || ""))
      ? "Supabase needs the latest services schema. Run supabase-schema.sql in SQL Editor, then try saving this service again."
      : "";
    const rlsMessage = /row-level security|violates.*policy/i.test(String(error.message || ""))
      ? "Supabase blocked this service save. Confirm your faculty profile owner email matches your sign-in email, or ask a registry manager to approve it."
      : "";
    lastServiceError = new Error(schemaMessage || rlsMessage || error.message || "Could not save service to Supabase");
    showToast(lastServiceError.message);
    return false;
  }
}

function showToast(message) {
  clearTimeout(toastTimer);
  $("#toast p").textContent = message;
  $("#toast").classList.add("is-visible");
  toastTimer = setTimeout(() => $("#toast").classList.remove("is-visible"), 2800);
}

function showView(view, options = {}) {
  activeView = view;
  $$(".nav-item").forEach(item => item.classList.toggle("is-active", item.dataset.view === view));
  $$(".view").forEach(panel => panel.classList.toggle("is-visible", panel.dataset.viewPanel === view));
  const labels = { overview: "Registry overview", equipment: "Equipment registry", submissions: "Faculty submissions", faculty: "Faculty profiles", students: "Student database", researchers: "Researchers directory", staff: "Staff directory", facilities: "Facilities directory", services: "Services directory", data: "Data & export" };
  $("#page-context").textContent = labels[view];
  $("#sidebar").classList.remove("is-open");
  $(".mobile-menu").setAttribute("aria-expanded", "false");
  if (!options.preserveScroll) window.scrollTo({ top: 0, behavior: "smooth" });
  if (view === "equipment" && options.query) {
    $("#equipment-search").value = options.query;
    renderEquipmentTable();
  }
}

function renderAll() {
  renderNavigationCounts();
  populateFacilityOptions();
  renderOverview();
  renderFacultyProfiles();
  populateStudentStartYearOptions();
  renderStudents();
  renderResearchers();
  populateStaffGroupOptions();
  renderStaff();
  renderEquipmentTable();
  renderSubmissions();
  renderFacilities();
  renderServices();
}

function renderNavigationCounts() {
  $("#equipment-nav-count").textContent = db.equipment.length;
  $("#submission-nav-count").textContent = db.equipment.filter(item => item.reviewStatus === "Submitted").length || "";
  const facultyCount = $("#faculty-nav-count");
  if (facultyCount) facultyCount.textContent = db.faculty.length;
  const studentsCount = $("#students-nav-count");
  if (studentsCount) studentsCount.textContent = db.students.length;
  const researchersCount = $("#researchers-nav-count");
  if (researchersCount) researchersCount.textContent = db.researchers.length;
  const staffCount = $("#staff-nav-count");
  if (staffCount) staffCount.textContent = db.staff.length;
  const servicesCount = $("#services-nav-count");
  if (servicesCount) servicesCount.textContent = db.services.length;
}

function renderOverview() {
  const verified = db.equipment.filter(item => item.reviewStatus === "Verified").length;
  const pending = db.equipment.filter(item => item.reviewStatus === "Submitted").length;
  const publicReady = db.equipment.filter(item => item.publicReady && item.reviewStatus === "Verified").length;
  const activeStudents = db.students.filter(item => item.status === "Active").length;
  const activeResearchers = db.researchers.filter(item => item.status === "Active").length;
  const activeStaff = db.staff.filter(item => item.status === "Active").length;
  const metrics = [
    ["Equipment records", db.equipment.length, "total", "+ Registry"],
    ["Faculty profiles", db.faculty.length, "total", "People"],
    ["Student records", db.students.length, `${activeStudents} active`, "Students"],
    ["Researchers", db.researchers.length, `${activeResearchers} active`, "People"],
    ["Staff", db.staff.length, `${activeStaff} active`, "People"],
    ["Public-ready", publicReady, "systems", "Website"]
  ];
  $("#metric-grid").innerHTML = metrics.map(([label, value, note, tag]) => `<article class="metric-card"><div class="metric-label"><span>${label}</span><span>${tag}</span></div><div class="metric-value"><strong>${value}</strong><small>${note}</small></div></article>`).join("");

  const maintenance = db.equipment.filter(item => item.status === "Maintenance");
  const incomplete = db.equipment.filter(item => !item.email || !item.nextMaintenance);
  const attention = [
    ["!", `${pending} submission${pending === 1 ? "" : "s"} awaiting review`, "Confirm ownership, access, and safety information.", "", "submissions"],
    ["↻", `${maintenance.length} instrument${maintenance.length === 1 ? "" : "s"} in maintenance`, maintenance[0]?.name || "No instruments currently marked for maintenance.", "warning", "equipment"],
    ["i", `${incomplete.length} incomplete record${incomplete.length === 1 ? "" : "s"}`, "Missing contact or maintenance information.", "info", "equipment"]
  ];
  $("#attention-list").innerHTML = attention.map(([icon, title, detail, kind, view]) => `<div class="attention-row"><span class="attention-symbol ${kind}">${icon}</span><div><strong>${clean(title)}</strong><p>${clean(detail)}</p></div><button type="button" data-attention-view="${view}" aria-label="Open ${clean(title)}">→</button></div>`).join("");

  const coverage = [
    ["Verified", percentage(verified, db.equipment.length)],
    ["Custodian email", percentage(db.equipment.filter(item => item.email).length, db.equipment.length)],
    ["Maintenance date", percentage(db.equipment.filter(item => item.nextMaintenance).length, db.equipment.length)],
    ["Public profile", percentage(db.equipment.filter(item => item.publicReady).length, db.equipment.length)]
  ];
  $("#coverage-chart").innerHTML = coverage.map(([label, value]) => `<div class="coverage-row"><span>${label}</span><div class="coverage-track"><div class="coverage-fill" style="width:${value}%"></div></div><span>${value}%</span></div>`).join("");
  $("#data-date").textContent = `Updated ${formatDate(today())}`;

  const recent = [...db.equipment].sort((a,b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 5);
  $("#recent-table").innerHTML = recent.map(item => `<tr><td>${nameCell(item)}</td><td>${clean(facilityFor(item.facilityId)?.name || "Unassigned")}</td><td>${clean(item.custodian || "Not assigned")}</td><td>${statusPill(item.status)}</td><td>${formatDate(item.updatedAt)}</td></tr>`).join("");
  renderVisitorAnalytics();
}

function percentage(value, total) { return total ? Math.round((value / total) * 100) : 0; }
function groupCount(items, getKey) {
  const counts = new Map();
  items.forEach(item => {
    const key = getKey(item) || "Unknown";
    counts.set(key, (counts.get(key) || 0) + 1);
  });
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}
function sameSiteReferrer(referrer, pageHost = window.location.host) {
  try {
    return referrer && new URL(referrer).host === pageHost;
  } catch {
    return false;
  }
}
function referrerLabel(event) {
  const referrer = event.pageReferrer;
  if (!referrer || sameSiteReferrer(referrer, event.pageHost)) return "Direct or internal";
  try {
    return new URL(referrer).host.replace(/^www\./, "");
  } catch {
    return "Unknown";
  }
}
function deviceLabel(event) {
  const width = Number(event.viewportWidth || event.screenWidth || 0);
  if (width && width < 720) return "Mobile";
  if (width && width < 1100) return "Tablet";
  return "Desktop";
}
function pageLabel(path) {
  const cleanPath = String(path || "/").replace(/^\/sut-physics-facilities/, "") || "/";
  if (cleanPath === "/" || cleanPath.endsWith("/index.html")) return "Facilities overview";
  if (cleanPath.includes("faculty.html?id=")) return "Faculty profile";
  if (cleanPath.includes("faculty.html")) return "Faculty directory";
  if (cleanPath.includes("researchers.html")) return "Researchers";
  if (cleanPath.includes("staff.html")) return "Staff";
  if (cleanPath.includes("services.html")) return "Services";
  return cleanPath;
}
function visitorRows(rows, empty = "No data yet") {
  return rows.length
    ? rows.slice(0, 5).map(([label, count]) => `<div class="visitor-row"><span>${clean(label)}</span><strong>${count}</strong></div>`).join("")
    : `<p class="visitor-empty">${clean(empty)}</p>`;
}
function renderVisitorAnalytics() {
  const status = $("#visitor-status");
  const summary = $("#visitor-summary-grid");
  const pages = $("#visitor-page-list");
  const devices = $("#visitor-device-list");
  const referrers = $("#visitor-referrer-list");
  if (!status || !summary || !pages || !devices || !referrers) return;
  if (!backendConfigured) {
    status.textContent = "Supabase not configured";
    summary.innerHTML = `<p class="visitor-empty">Configure Supabase to collect visitor statistics.</p>`;
    pages.innerHTML = devices.innerHTML = referrers.innerHTML = `<p class="visitor-empty">No analytics source.</p>`;
    return;
  }
  if (!backendReady) {
    status.textContent = "Sign in required";
    summary.innerHTML = `<p class="visitor-empty">Visitor statistics appear after an approved admin signs in.</p>`;
    pages.innerHTML = devices.innerHTML = referrers.innerHTML = `<p class="visitor-empty">Waiting for registry access.</p>`;
    return;
  }
  if (visitorStatsError) {
    status.textContent = "Analytics unavailable";
    summary.innerHTML = `<p class="visitor-empty">${clean(visitorStatsError)}</p>`;
    pages.innerHTML = devices.innerHTML = referrers.innerHTML = `<p class="visitor-empty">No visitor table available.</p>`;
    return;
  }
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;
  const lastSeven = visitorEvents.filter(event => new Date(event.createdAt).getTime() >= now - 7 * dayMs);
  const todayEvents = visitorEvents.filter(event => new Date(event.createdAt).toISOString().slice(0, 10) === today());
  const uniqueSessions = new Set(visitorEvents.map(event => event.sessionId).filter(Boolean)).size;
  status.textContent = visitorEvents.length ? `Last 90 days · ${visitorEvents.length} events` : "No visits recorded yet";
  summary.innerHTML = [
    ["Total views", visitorEvents.length],
    ["Unique sessions", uniqueSessions],
    ["Last 7 days", lastSeven.length],
    ["Today", todayEvents.length]
  ].map(([label, value]) => `<article class="visitor-stat"><span>${clean(label)}</span><strong>${value}</strong></article>`).join("");
  pages.innerHTML = visitorRows(groupCount(visitorEvents, event => pageLabel(event.pagePath)));
  devices.innerHTML = visitorRows(groupCount(visitorEvents, deviceLabel));
  referrers.innerHTML = visitorRows(groupCount(visitorEvents, referrerLabel));
}
function researchIcon(item) {
  const text = `${item.name} ${item.category}`.toLowerCase();
  const svg = path => `<svg aria-hidden="true" viewBox="0 0 24 24">${path}</svg>`;
  if (text.includes("confocal") || text.includes("microscop")) return svg(`<circle cx="9" cy="9" r="4"/><path d="m12 12 6 6M15 18h5M5 20h10M13 4l4 4"/>`);
  if (text.includes("lifetime")) return svg(`<circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2M4 12h2M18 12h2"/>`);
  if (text.includes("coherence") || text.includes("tomography")) return svg(`<path d="M3 12c3-6 6-6 9 0s6 6 9 0M3 17c3-4 6-4 9 0s6 4 9 0"/>`);
  if (text.includes("infrared") || text.includes("spectro") || text.includes("reflectance")) return svg(`<path d="M3 16c3 0 3-8 6-8s3 8 6 8 3-8 6-8M4 20h16"/>`);
  if (text.includes("laser")) return svg(`<path d="M3 12h13M16 7v10M19 9l2-2M19 15l2 2M19 12h3"/>`);
  if (text.includes("electrosp")) return svg(`<path d="M4 6h5l2 6 3-6h6M4 18c4-4 12-4 16 0"/>`);
  if (text.includes("3d print")) return svg(`<path d="m12 3 8 4-8 4-8-4 8-4Zm-8 4v9l8 5 8-5V7M12 11v10"/>`);
  if (text.includes("plasmon")) return svg(`<circle cx="7" cy="12" r="3"/><circle cx="17" cy="12" r="3"/><path d="M10 12h4M3 6c6 3 12 3 18 0M3 18c6-3 12-3 18 0"/>`);
  if (text.includes("quantum")) return svg(`<circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="9" ry="4"/><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(120 12 12)"/>`);
  if (text.includes("fiber")) return svg(`<path d="M3 6c6 0 6 12 12 12h6M3 12h6c6 0 6-6 12-6"/>`);
  if (text.includes("chip")) return svg(`<rect x="6" y="6" width="12" height="12"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M18 9h4M2 15h4M18 15h4"/>`);
  if (text.includes("vein") || text.includes("medical")) return svg(`<path d="M12 20s-8-4.8-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 6.2-8 11-8 11Z"/><path d="M8 12h2l1-3 2 6 1-3h2"/>`);
  if (text.includes("data acquisition")) return svg(`<path d="M3 17h4l2-10 4 12 2-7 2 5h4"/>`);
  if (text.includes("deep learning")) return svg(`<circle cx="5" cy="7" r="2"/><circle cx="5" cy="17" r="2"/><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/><circle cx="19" cy="9" r="2"/><circle cx="19" cy="15" r="2"/><path d="m7 7 3-2M7 8l3 4M7 16l3-4M7 17l3 2M14 5l3 4M14 12l3-3M14 12l3 3M14 19l3-4"/>`);
  if (text.includes("vision") || text.includes("imaging")) return svg(`<path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>`);
  return svg(`<circle cx="12" cy="12" r="8"/><path d="M4 12h16M12 4v16"/>`);
}
function nameCell(item) {
  const media = photoSrc(item.featurePhoto)
    ? `<img src="${photoSrc(item.featurePhoto)}" alt="" />`
    : researchIcon(item);
  return `<div class="equipment-name-cell"><span class="record-icon">${media}</span><div><strong>${clean(item.name)}</strong><small>${clean(item.assetCode || item.id)}${item.sample ? " · SAMPLE" : ""}${photoSrc(item.featurePhoto) ? " · PHOTO" : ""}</small></div></div>`;
}
function statusPill(status) { return `<span class="status-pill status-${slug(status)}">${clean(status)}</span>`; }
function reviewPill(status) { return `<span class="review-pill ${slug(status)}">${clean(status)}</span>`; }

function populateFacilityOptions() {
  const options = db.facilities.map(f => `<option value="${f.id}">${clean(f.name)}</option>`).join("");
  const filter = $("#facility-filter");
  const previous = filter.value;
  filter.innerHTML = `<option value="all">All facilities</option>${options}`;
  if ([...filter.options].some(option => option.value === previous)) filter.value = previous;
  $("#record-facility").innerHTML = `<option value="">Select facility</option>${options}`;
  populateFacultyFacilityOptions();
  populateServiceFacultyOptions();
  populateStudentAdvisorOptions();
  populateStudentResearchGroupOptions();
  populateResearcherHostOptions();
  populateResearcherGroupOptions();
}

function populateServiceFacultyOptions(selected = "") {
  const target = $("#service-faculty");
  if (!target) return;
  const previous = selected || target.value;
  target.innerHTML = `<option value="">Choose faculty profile</option>${db.faculty.map(profile => `<option value="${clean(profile.id)}">${clean(profile.name)}</option>`).join("")}`;
  if ([...target.options].some(option => option.value === previous)) target.value = previous;
}

function populateStudentAdvisorOptions(selected = "") {
  const options = db.faculty.map(profile => `<option value="${clean(profile.id)}">${clean(profile.name)}</option>`).join("");
  const formTarget = $("#student-advisor");
  if (formTarget) {
    const previous = selected || formTarget.value;
    formTarget.innerHTML = `<option value="">TBD</option>${options}`;
    if ([...formTarget.options].some(option => option.value === previous)) formTarget.value = previous;
  }
  const filterTarget = $("#student-advisor-filter");
  if (filterTarget) {
    const previous = filterTarget.value;
    filterTarget.innerHTML = `<option value="all">All advisors</option><option value="">TBD</option>${options}`;
    if ([...filterTarget.options].some(option => option.value === previous)) filterTarget.value = previous;
  }
}

function populateStudentResearchGroupOptions(selected = "") {
  const options = db.facilities.map(facility => `<option value="${clean(facility.id)}">${clean(facility.name)}</option>`).join("");
  const formTarget = $("#student-research-group");
  if (formTarget) {
    const previous = selected || formTarget.value;
    formTarget.innerHTML = `<option value="">TBD</option>${options}`;
    if ([...formTarget.options].some(option => option.value === previous)) formTarget.value = previous;
  }
  const filterTarget = $("#student-group-filter");
  if (filterTarget) {
    const previous = filterTarget.value;
    filterTarget.innerHTML = `<option value="all">All groups</option><option value="">TBD</option>${options}`;
    if ([...filterTarget.options].some(option => option.value === previous)) filterTarget.value = previous;
  }
}

function populateResearcherHostOptions(selected = "") {
  const options = db.faculty.map(profile => `<option value="${clean(profile.id)}">${clean(profile.name)}</option>`).join("");
  const formTarget = $("#researcher-host");
  if (formTarget) {
    const previous = selected || formTarget.value;
    formTarget.innerHTML = `<option value="">TBD</option>${options}`;
    if ([...formTarget.options].some(option => option.value === previous)) formTarget.value = previous;
  }
  const filterTarget = $("#researcher-host-filter");
  if (filterTarget) {
    const previous = filterTarget.value;
    filterTarget.innerHTML = `<option value="all">All hosts</option><option value="">TBD</option>${options}`;
    if ([...filterTarget.options].some(option => option.value === previous)) filterTarget.value = previous;
  }
}

function populateResearcherGroupOptions(selected = "") {
  const options = db.facilities.map(facility => `<option value="${clean(facility.id)}">${clean(facility.name)}</option>`).join("");
  const formTarget = $("#researcher-group");
  if (formTarget) {
    const previous = selected || formTarget.value;
    formTarget.innerHTML = `<option value="">TBD</option>${options}`;
    if ([...formTarget.options].some(option => option.value === previous)) formTarget.value = previous;
  }
  const filterTarget = $("#researcher-group-filter");
  if (filterTarget) {
    const previous = filterTarget.value;
    filterTarget.innerHTML = `<option value="all">All groups</option><option value="">TBD</option>${options}`;
    if ([...filterTarget.options].some(option => option.value === previous)) filterTarget.value = previous;
  }
}

function populateStaffGroupOptions(selected = "") {
  const options = db.facilities.map(facility => `<option value="${clean(facility.id)}">${clean(facility.name)}</option>`).join("");
  const formTarget = $("#staff-group");
  if (formTarget) {
    const previous = selected || formTarget.value;
    formTarget.innerHTML = `<option value="">TBD</option>${options}`;
    if ([...formTarget.options].some(option => option.value === previous)) formTarget.value = previous;
  }
  const filterTarget = $("#staff-group-filter");
  if (filterTarget) {
    const previous = filterTarget.value;
    filterTarget.innerHTML = `<option value="all">All groups</option><option value="">TBD</option>${options}`;
    if ([...filterTarget.options].some(option => option.value === previous)) filterTarget.value = previous;
  }
}

function populateStudentStartYearOptions() {
  const target = $("#student-start-year-filter");
  if (!target) return;
  const previous = target.value;
  const years = [...new Set(db.students.map(student => student.startYear).filter(Boolean))].sort((a, b) => Number(b) - Number(a));
  target.innerHTML = `<option value="all">All years</option>${years.map(year => `<option value="${clean(year)}">${clean(year)}</option>`).join("")}`;
  if ([...target.options].some(option => option.value === previous)) target.value = previous;
}

function populateFacultyFacilityOptions(selected = []) {
  const target = $("#faculty-facility-options");
  if (!target) return;
  const selectedSet = new Set(normalizeList(selected));
  target.innerHTML = db.facilities.length ? db.facilities.map(facility => {
    const detail = [facility.building, facility.room].filter(Boolean).join(" · ") || "Location to verify";
    return `<label><input type="checkbox" name="facilityIds" value="${clean(facility.id)}"${selectedSet.has(facility.id) ? " checked" : ""} /><span><strong>${clean(facility.name)}</strong><small>${clean(detail)}</small></span></label>`;
  }).join("") : `<p>Add facilities first, then link them to each faculty profile.</p>`;
}

function filteredEquipment() {
  const query = $("#equipment-search").value.trim().toLowerCase();
  const facility = $("#facility-filter").value;
  const status = $("#status-filter").value;
  const review = $("#review-filter").value;
  return db.equipment.filter(item => {
    const haystack = [item.name, item.assetCode, item.category, item.custodian, facilityFor(item.facilityId)?.name].join(" ").toLowerCase();
    return (!query || haystack.includes(query)) && (facility === "all" || item.facilityId === facility) && (status === "all" || item.status === status) && (review === "all" || item.reviewStatus === review);
  });
}

function renderEquipmentTable() {
  const records = filteredEquipment();
  $("#registry-result-count").textContent = records.length;
  $("#registry-empty").hidden = records.length > 0;
  $("#equipment-table").innerHTML = records.map(item => {
    const facility = facilityFor(item.facilityId);
    return `<tr data-record-id="${item.id}"><td>${nameCell(item)}</td><td><div class="cell-stack"><strong>${clean(facility?.name || "Unassigned")}</strong><small>${clean(item.room || facility?.room || "No room recorded")}</small></div></td><td><div class="cell-stack"><strong>${clean(item.custodian || "Not assigned")}</strong><small>${clean(item.email || "No email")}</small></div></td><td>${statusPill(item.status)}</td><td>${reviewPill(item.reviewStatus)}</td><td><div class="row-actions"><button type="button" data-edit="${item.id}" aria-label="Edit ${clean(item.name)}">✎</button><button type="button" data-delete="${item.id}" aria-label="Delete ${clean(item.name)}">×</button></div></td></tr>`;
  }).join("");
}

function renderSubmissions() {
  const submitted = db.equipment.filter(item => item.reviewStatus === "Submitted");
  const drafts = db.equipment.filter(item => item.reviewStatus === "Draft");
  const verifiedThisMonth = db.equipment.filter(item => item.reviewStatus === "Verified" && item.updatedAt.slice(0,7) === today().slice(0,7));
  $("#queue-metrics").innerHTML = [[submitted.length,"Awaiting review"],[drafts.length,"Faculty drafts"],[verifiedThisMonth.length,"Verified this month"]].map(([value,label]) => `<div class="queue-stat"><strong>${value}</strong><span>${label}</span></div>`).join("");
  const list = [...submitted, ...drafts];
  $("#submission-list").innerHTML = list.length ? list.map(item => {
    const facility = facilityFor(item.facilityId);
    return `<article class="submission-card"><div class="submission-card-head"><div><span class="submission-label">${clean(item.reviewStatus)} · ${clean(item.id)}</span><h2>${clean(item.name)}</h2><p>Submitted by ${clean(item.submitterName || "Unidentified contributor")} · ${formatDate(item.updatedAt)}</p></div>${reviewPill(item.reviewStatus)}</div><div class="submission-details"><div><span>Category</span><strong>${clean(item.category || "Not set")}</strong></div><div><span>Facility</span><strong>${clean(facility?.name || "Unassigned")}</strong></div><div><span>Custodian</span><strong>${clean(item.custodian || "Not set")}</strong></div><div><span>Status</span><strong>${clean(item.status)}</strong></div></div><div class="submission-card-foot"><p>${clean(item.submitterNotes || "No reviewer note supplied.")}</p><div class="submission-actions"><button class="button button-secondary" type="button" data-edit="${item.id}">Review & edit</button>${item.reviewStatus === "Submitted" ? `<button class="button button-primary" type="button" data-approve="${item.id}">Approve record</button>` : ""}</div></div></article>`;
  }).join("") : `<div class="empty-state panel"><span>✓</span><h2>The queue is clear</h2><p>No faculty submissions currently need review.</p></div>`;
}

function profileLinks(profile) {
  return profile.profileLinks && typeof profile.profileLinks === "object" ? profile.profileLinks : {};
}

function facultyFacilities(profile) {
  return normalizeList(profile.facilityIds).map(id => facilityFor(id)?.name).filter(Boolean);
}

function renderFacultyProfiles() {
  const grid = $("#faculty-profile-grid");
  if (!grid) return;
  grid.innerHTML = db.faculty.length ? db.faculty.map((profile, index) => {
    const links = profileLinks(profile);
    const linkCount = Object.values(links).filter(Boolean).length;
    const facilityCount = facultyFacilities(profile).length;
    const portrait = photoSrc(profile.profilePhoto);
    const scopusId = profile.scopusMetrics?.scopusAuthorId || extractScopusAuthorId(links.scopus);
    const { metrics, source: metricSource } = metricFallback(profile);
    const hIndex = metricNumber(metrics.hIndex);
    const citations = metricNumber(metrics.citationCount);
    const equipmentCount = db.equipment.filter(item => {
      const emailMatch = profile.email && item.email && item.email.toLowerCase() === profile.email.toLowerCase();
      const nameMatch = profile.name && item.custodian && item.custodian.toLowerCase().includes(profile.name.toLowerCase());
      return emailMatch || nameMatch;
    }).length;
    const interests = normalizeList(profile.researchInterests).slice(0, 4);
    return `<article class="faculty-admin-card" data-faculty-id="${clean(profile.id)}" style="--faculty-color:${profile.color || facilityPalette[index % facilityPalette.length]}">
      <div class="faculty-admin-head"><span>${portrait ? `<img src="${clean(portrait)}" alt="" />` : clean(initials(profile.name))}</span><small>${profile.publicReady === false ? "Hidden" : "Public"}</small></div>
      <h2>${clean(profile.name)}</h2>
      <p>${clean(profile.title || "Title to verify")}</p>
      <div class="faculty-admin-tags">${interests.map(item => `<span>${clean(item)}</span>`).join("") || `<span>Interests to add</span>`}</div>
      <div class="faculty-admin-foot">
        <span><strong>${facilityCount}</strong> associated facilities</span>
        <span><strong>${equipmentCount}</strong> linked equipment</span>
        <span><strong>${linkCount}</strong> profile links</span>
        <span><strong>${clean(hIndex || "NA")}</strong> h-index</span>
        <span><strong>${clean(citations || "NA")}</strong> citations</span>
        <span><strong>${clean(metricSource)}</strong> metric source</span>
        <span><strong>${clean(scopusId ? "ID" : "NA")}</strong> ${clean(scopusId || "No Scopus ID")}</span>
        <button class="text-button" type="button" data-edit-faculty="${clean(profile.id)}" aria-label="Edit ${clean(profile.name)}">Edit <span>→</span></button>
      </div>
    </article>`;
  }).join("") : `<div class="empty-state panel"><span>+</span><h2>No faculty profiles yet</h2><p>Add every faculty member here, including those without equipment records.</p></div>`;
}

function studentStatusPill(status) {
  const className = status === "Active" ? "verified" : status === "Leave" ? "submitted" : "draft";
  return `<span class="review-pill ${className}">${clean(status || "Active")}</span>`;
}

function verificationPill(status) {
  const className = status === "Verified" ? "verified" : status === "Pending" ? "submitted" : "draft";
  return `<span class="review-pill ${className}">${clean(status || "Pending")}</span>`;
}

function filteredStudents() {
  const query = $("#student-search")?.value.trim().toLowerCase() || "";
  const level = $("#student-level-filter")?.value || "all";
  const program = $("#student-program-filter")?.value || "all";
  const startYear = $("#student-start-year-filter")?.value || "all";
  const status = $("#student-status-filter")?.value || "all";
  const verification = $("#student-verification-filter")?.value || "all";
  const advisor = $("#student-advisor-filter")?.value || "all";
  const group = $("#student-group-filter")?.value || "all";
  return db.students.filter(student => {
    const haystack = [
      student.name,
      student.preferredName,
      student.studentCode,
      student.email,
      student.level,
      programLabel(student.programId),
      student.status,
      student.verificationStatus,
      student.startTerm ? `Term ${student.startTerm}` : "",
      student.startYear,
      normalizeList(student.researchInterests).join(" "),
      advisorName(student.advisorId),
      student.coadvisor,
      researchGroupName(student),
      student.projectTitle,
      student.thesisTitle,
      student.shortBio,
      normalizeList(student.skills).join(" ")
    ].join(" ").toLowerCase();
    return (!query || haystack.includes(query)) &&
      (level === "all" || student.level === level) &&
      (program === "all" || student.programId === program) &&
      (startYear === "all" || String(student.startYear || "") === startYear) &&
      (status === "all" || student.status === status) &&
      (verification === "all" || student.verificationStatus === verification) &&
      (advisor === "all" || student.advisorId === advisor) &&
      (group === "all" || (student.researchGroupId || "") === group);
  });
}

function renderStudents() {
  const table = $("#student-table");
  if (!table) return;
  const students = filteredStudents();
  $("#student-result-count").textContent = students.length;
  $("#student-empty").hidden = students.length > 0;
  table.innerHTML = students.map(student => {
    const started = student.startYear ? `${student.startTerm ? `Term ${student.startTerm}, ` : ""}${student.startYear}` : "Start TBD";
    const years = [started, student.expectedGraduationYear || student.graduationYear].filter(Boolean).join(" - ") || "Timeline TBD";
    const project = student.projectTitle || student.thesisTitle || "Project title to add";
    const external = student.recordType === "sut-external";
    const program = external ? student.homeProgram || "SUT external program" : programLabel(student.programId);
    const typeLabel = external ? `${student.homeSchool || "SUT"} · External advisee` : student.level || "Bachelor";
    return `<tr data-student-id="${clean(student.id)}">
      <td><div class="equipment-name-cell"><span class="record-icon student-record-icon">${clean(initials(student.name))}</span><div><strong>${clean(student.name)}</strong><small>${clean(student.studentCode || student.id)}${student.email ? ` · ${clean(student.email)}` : ""}</small></div></div></td>
      <td><div class="cell-stack"><strong>${clean(program)}</strong><small>${clean(typeLabel)} · ${studentStatusPill(student.status || "Active")} ${verificationPill(student.verificationStatus || "Pending")}</small></div></td>
      <td><div class="cell-stack"><strong>${clean(advisorName(student.advisorId))}</strong><small>${clean(student.advisorRole || "Primary advisor")}${student.coadvisor ? ` · ${clean(student.coadvisor)}` : ""}</small></div></td>
      <td><div class="cell-stack"><strong>${clean(project)}</strong><small>${clean(researchGroupName(student))}</small></div></td>
      <td><div class="cell-stack student-progress-cell"><strong>${clean(years)}</strong><small>${clean(student.graduationYear ? "Graduated" : "In progress")}</small>${studentMilestoneMarkup(student)}</div></td>
      <td><div class="row-actions"><button type="button" data-edit-student="${clean(student.id)}" aria-label="Edit ${clean(student.name)}">✎</button><button type="button" data-delete-student="${clean(student.id)}" aria-label="Delete ${clean(student.name)}">×</button></div></td>
    </tr>`;
  }).join("");
}

function filteredResearchers() {
  const query = $("#researcher-search")?.value.trim().toLowerCase() || "";
  const type = $("#researcher-type-filter")?.value || "all";
  const status = $("#researcher-status-filter")?.value || "all";
  const review = $("#researcher-review-filter")?.value || "all";
  const host = $("#researcher-host-filter")?.value || "all";
  const group = $("#researcher-group-filter")?.value || "all";
  return db.researchers.filter(researcher => {
    const haystack = [
      researcher.name,
      researcher.type,
      researcher.email,
      researcher.status,
      researcher.reviewStatus,
      researcher.projectTitle,
      researcher.shortBio,
      normalizeList(researcher.researchInterests).join(" "),
      normalizeList(researcher.skills).join(" "),
      advisorName(researcher.hostFacultyId),
      researchGroupName({ researchGroupId: researcher.researchGroupId, researchGroup: researcher.researchGroup })
    ].join(" ").toLowerCase();
    return (!query || haystack.includes(query)) &&
      (type === "all" || researcher.type === type) &&
      (status === "all" || researcher.status === status) &&
      (review === "all" || researcher.reviewStatus === review) &&
      (host === "all" || (researcher.hostFacultyId || "") === host) &&
      (group === "all" || (researcher.researchGroupId || "") === group);
  });
}

function renderResearchers() {
  const table = $("#researcher-table");
  if (!table) return;
  const researchers = filteredResearchers();
  $("#researcher-result-count").textContent = researchers.length;
  $("#researcher-empty").hidden = researchers.length > 0;
  table.innerHTML = researchers.map(researcher => {
    const interests = normalizeList(researcher.researchInterests).slice(0, 3);
    const dates = [researcher.startDate ? formatDate(researcher.startDate) : "", researcher.endDate ? formatDate(researcher.endDate) : ""].filter(Boolean).join(" - ") || "Dates TBD";
    return `<tr data-researcher-id="${clean(researcher.id)}">
      <td><div class="equipment-name-cell"><span class="record-icon student-record-icon">${clean(initials(researcher.name))}</span><div><strong>${clean(researcher.name)}</strong><small>${clean(researcher.email || researcher.id)}</small></div></div></td>
      <td><div class="cell-stack"><strong>${clean(researcher.type || "Researcher")}</strong><small>${clean(researcher.status || "Active")} · ${reviewPill(researcher.reviewStatus || "Draft")} ${researcher.publicReady ? verificationPill("Verified") : verificationPill("Pending")}</small></div></td>
      <td><div class="cell-stack"><strong>${clean(advisorName(researcher.hostFacultyId))}</strong><small>${clean(researcher.hostRole || "Host faculty / PI")}</small></div></td>
      <td><div class="cell-stack"><strong>${clean(researchGroupName({ researchGroupId: researcher.researchGroupId, researchGroup: researcher.researchGroup }))}</strong><small>${clean(interests.join(" · ") || "Interests to add")}</small></div></td>
      <td><div class="cell-stack"><strong>${clean(researcher.projectTitle || "Project to add")}</strong><small>${clean(dates)}</small></div></td>
      <td><div class="row-actions"><button type="button" data-edit-researcher="${clean(researcher.id)}" aria-label="Edit ${clean(researcher.name)}">✎</button><button type="button" data-delete-researcher="${clean(researcher.id)}" aria-label="Delete ${clean(researcher.name)}">×</button></div></td>
    </tr>`;
  }).join("");
}

function filteredStaff() {
  const query = $("#staff-search")?.value.trim().toLowerCase() || "";
  const position = $("#staff-position-filter")?.value || "all";
  const status = $("#staff-status-filter")?.value || "all";
  const review = $("#staff-review-filter")?.value || "all";
  const unit = $("#staff-unit-filter")?.value || "all";
  const group = $("#staff-group-filter")?.value || "all";
  return db.staff.filter(profile => {
    const haystack = [
      profile.name,
      profile.position,
      profile.email,
      profile.status,
      profile.reviewStatus,
      profile.unit,
      profile.shortBio,
      normalizeList(profile.responsibilities).join(" "),
      normalizeList(profile.serviceAreas).join(" "),
      researchGroupName({ researchGroupId: profile.researchGroupId, researchGroup: profile.researchGroup })
    ].join(" ").toLowerCase();
    return (!query || haystack.includes(query)) &&
      (position === "all" || profile.position === position) &&
      (status === "all" || profile.status === status) &&
      (review === "all" || profile.reviewStatus === review) &&
      (unit === "all" || (profile.unit || "") === unit) &&
      (group === "all" || (profile.researchGroupId || "") === group);
  });
}

function populateStaffUnitOptions() {
  const target = $("#staff-unit-filter");
  if (!target) return;
  const previous = target.value;
  const units = [...new Set(db.staff.map(profile => profile.unit).filter(Boolean))].sort();
  target.innerHTML = `<option value="all">All units</option>${units.map(unit => `<option>${clean(unit)}</option>`).join("")}`;
  if ([...target.options].some(option => option.value === previous)) target.value = previous;
}

function renderStaff() {
  const table = $("#staff-table");
  if (!table) return;
  populateStaffUnitOptions();
  const profiles = filteredStaff();
  $("#staff-result-count").textContent = profiles.length;
  $("#staff-empty").hidden = profiles.length > 0;
  table.innerHTML = profiles.map(profile => {
    const responsibilities = normalizeList(profile.responsibilities).slice(0, 3);
    const contact = [profile.email, profile.phone].filter(Boolean).join(" · ") || "Contact to add";
    return `<tr data-staff-id="${clean(profile.id)}">
      <td><div class="equipment-name-cell"><span class="record-icon student-record-icon">${clean(initials(profile.name))}</span><div><strong>${clean(profile.name)}</strong><small>${clean(profile.email || profile.id)}</small></div></div></td>
      <td><div class="cell-stack"><strong>${clean(profile.position || "Staff")}</strong><small>${clean(profile.status || "Active")} · ${reviewPill(profile.reviewStatus || "Draft")} ${profile.publicReady ? verificationPill("Verified") : verificationPill("Pending")}</small></div></td>
      <td><div class="cell-stack"><strong>${clean(profile.unit || "School of Physics")}</strong><small>${clean(researchGroupName({ researchGroupId: profile.researchGroupId, researchGroup: profile.researchGroup }))}</small></div></td>
      <td><div class="cell-stack"><strong>${clean(responsibilities.join(" · ") || "Responsibilities to add")}</strong><small>${clean(normalizeList(profile.serviceAreas).slice(0, 3).join(" · ") || "Service areas to add")}</small></div></td>
      <td><div class="cell-stack"><strong>${clean(profile.office || "Office to add")}</strong><small>${clean(contact)}</small></div></td>
      <td><div class="row-actions"><button type="button" data-edit-staff="${clean(profile.id)}" aria-label="Edit ${clean(profile.name)}">✎</button><button type="button" data-delete-staff="${clean(profile.id)}" aria-label="Delete ${clean(profile.name)}">×</button></div></td>
    </tr>`;
  }).join("");
}

function initials(name) {
  const parts = String(name || "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "FP";
  return parts.slice(0, 2).map(part => part[0]).join("").toUpperCase();
}

function renderFacilities() {
  $("#facility-grid").innerHTML = db.facilities.map((facility, index) => {
    const count = db.equipment.filter(item => item.facilityId === facility.id).length;
    return `<article class="facility-card" data-facility-id="${clean(facility.id)}"><div class="facility-visual" style="--facility-color:${facility.color || facilityPalette[index % facilityPalette.length]}"></div><div class="facility-card-meta"><span>${clean(facility.id)}</span><span>${clean(facility.building || "Building not set")} · ${clean(facility.room || "Room not set")}</span></div><h2>${clean(facility.name)}</h2><p>${clean(facility.description || "No facility description has been added.")}</p><div class="facility-card-foot"><span><strong>${count}</strong> equipment record${count === 1 ? "" : "s"}</span><span>Lead<br /><b>${clean(facility.lead || "Not assigned")}</b></span><button class="text-button" type="button" data-edit-facility="${clean(facility.id)}" aria-label="Edit ${clean(facility.name)}">Edit <span>→</span></button><button class="text-button" type="button" data-delete-facility="${clean(facility.id)}" aria-label="Delete ${clean(facility.name)}">Delete <span>×</span></button></div></article>`;
  }).join("");
}

function serviceOwner(service) {
  const profile = facultyFor(service.facultyId);
  return profile?.name || service.contactName || "Faculty owner to assign";
}

function renderServices() {
  const grid = $("#service-grid");
  if (!grid) return;
  $("#service-result-count").textContent = db.services.length;
  grid.innerHTML = db.services.length ? db.services.map(service => `
    <article class="service-admin-card" data-service-id="${clean(service.id)}">
      ${photoSrc(service.featurePhoto) ? `<img class="service-admin-photo" src="${clean(photoSrc(service.featurePhoto))}" alt="${clean(service.featurePhoto?.alt || `${service.title} service photo`)}" />` : ""}
      <div class="service-admin-meta"><span>${clean(serviceCategoryLabel(service.category))}</span>${reviewPill(service.reviewStatus || "Draft")}</div>
      <h2>${clean(service.title)}</h2>
      <p>${clean(service.summary || service.details || "Service details have not been added yet.")}</p>
      <div class="service-admin-foot">
        <span><strong>${clean(service.duration || "TBD")}</strong> duration</span>
        <span><strong>${clean(service.schedule || "TBD")}</strong> schedule</span>
        <span><strong>${clean(serviceOwner(service))}</strong> owner</span>
        <span><strong>${service.publicReady ? "Yes" : "No"}</strong> public</span>
        <button class="text-button" type="button" data-edit-service="${clean(service.id)}" aria-label="Edit ${clean(service.title)}">Edit <span>→</span></button>
        <button class="text-button" type="button" data-delete-service="${clean(service.id)}" aria-label="Delete ${clean(service.title)}">Delete <span>×</span></button>
      </div>
    </article>
  `).join("") : `<div class="empty-state panel"><span>+</span><h2>No services yet</h2><p>Add a service record when certified measurements, short courses, workshops, or STEM offerings are ready.</p></div>`;
}

function setStudentMessage(message = "", type = "") {
  const target = $("#student-message");
  if (!target) return;
  target.textContent = message;
  target.className = type ? `is-${type}` : "";
}

function validateStudentProfileFields(form) {
  const recordType = form.elements.recordType.value;
  if (recordType === "physics" && !form.elements.programId.value) {
    setStudentMessage("Choose a Physics study program for School of Physics student records.", "error");
    form.elements.programId.focus();
    return false;
  }
  if (recordType === "sut-external" && (!form.elements.homeSchool.value.trim() || !form.elements.homeProgram.value.trim())) {
    setStudentMessage("Enter the SUT school and program for external-program advisees.", "error");
    (form.elements.homeSchool.value.trim() ? form.elements.homeProgram : form.elements.homeSchool).focus();
    return false;
  }
  const interests = normalizeList(form.elements.researchInterests.value);
  if (interests.length > 5) {
    setStudentMessage("Use no more than 5 research interest keywords.", "error");
    form.elements.researchInterests.focus();
    return false;
  }
  if (wordCount(form.elements.shortBio.value) > 500) {
    setStudentMessage("Short bio must be 500 words or fewer.", "error");
    form.elements.shortBio.focus();
    return false;
  }
  return true;
}

function openStudentDialog(id = null) {
  const form = $("#student-form");
  const student = id ? db.students.find(item => item.id === id) : null;
  const faculty = currentFacultyProfile();
  editingStudentId = student?.id || null;
  form.reset();
  setStudentMessage();
  $("#student-form-title").textContent = student ? "Edit student" : "Add student";
  $("#student-primary-action").textContent = student ? "Save student" : "Add student";
  populateStudentAdvisorOptions(student?.advisorId || "");
  populateStudentResearchGroupOptions(student?.researchGroupId || "");
  if (student) {
    ["studentCode", "name", "preferredName", "email", "recordType", "level", "status", "verificationStatus", "programId", "homeSchool", "homeProgram", "advisorId", "advisorRole", "coadvisor", "researchGroupId", "office", "phone", "ownerEmail", "projectTitle", "thesisTitle", "startTerm", "startYear", "expectedGraduationYear", "graduationYear", "shortBio", "notes"].forEach(key => {
      const field = form.elements.namedItem(key);
      if (field) field.value = student[key] || "";
    });
    form.elements.researchInterests.value = normalizeList(student.researchInterests).join("\n");
    form.elements.skills.value = normalizeList(student.skills).join("\n");
    form.elements.deadlineAlertsEnabled.checked = student.deadlineAlertsEnabled !== false;
    form.elements.publicReady.checked = Boolean(student.publicReady);
  } else {
    form.elements.recordType.value = "physics";
    form.elements.level.value = "Bachelor";
    form.elements.programId.value = "bsc-physics";
    form.elements.status.value = "Active";
    form.elements.verificationStatus.value = "Pending";
    form.elements.advisorId.value = faculty?.id || DEFAULT_STUDENT_ADVISOR_ID;
    form.elements.advisorRole.value = "Primary advisor";
    form.elements.startTerm.value = "1";
    form.elements.deadlineAlertsEnabled.checked = true;
    form.elements.publicReady.checked = false;
    form.elements.ownerEmail.value = signedInEmail() || faculty?.ownerEmail || faculty?.email || "";
  }
  $("#student-dialog").showModal();
  setTimeout(() => form.elements.namedItem("name")?.focus(), 50);
}

function studentFromForm(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  Object.keys(data).forEach(key => { data[key] = String(data[key] || "").trim(); });
  const existing = editingStudentId ? db.students.find(item => item.id === editingStudentId) : null;
  const numericIds = db.students.map(item => Number(String(item.id).replace(/\D/g,""))).filter(Number.isFinite);
  const id = existing?.id || `STU-${String(Math.max(0, ...numericIds) + 1).padStart(3, "0")}`;
  const advisor = facultyFor(data.advisorId);
  const group = facilityFor(data.researchGroupId);
  const program = STUDY_PROGRAMS[data.programId];
  const recordType = data.recordType === "sut-external" ? "sut-external" : "physics";
  return {
    ...existing,
    id,
    studentCode: data.studentCode,
    name: data.name,
    preferredName: data.preferredName,
    email: data.email,
    recordType,
    level: data.level || program?.level || "Bachelor",
    status: data.status || "Active",
    advisorId: data.advisorId || DEFAULT_STUDENT_ADVISOR_ID,
    advisorRole: data.advisorRole || "Primary advisor",
    coadvisor: data.coadvisor,
    researchGroupId: data.researchGroupId,
    researchGroup: group?.name || existing?.researchGroup || "",
    homeSchool: recordType === "sut-external" ? data.homeSchool : "",
    homeProgram: recordType === "sut-external" ? data.homeProgram : "",
    projectTitle: data.projectTitle,
    thesisTitle: data.thesisTitle,
    startTerm: data.startTerm,
    startYear: data.startYear,
    expectedGraduationYear: data.expectedGraduationYear,
    graduationYear: data.graduationYear,
    office: data.office,
    phone: data.phone,
    shortBio: data.shortBio,
    researchInterests: normalizeKeywords(data.researchInterests),
    skills: normalizeList(data.skills),
    notes: data.notes,
    programId: data.programId,
    studyProgress: existing?.studyProgress || {},
    deadlineAlertsEnabled: form.elements.deadlineAlertsEnabled.checked,
    deadlineLeadDays: existing?.deadlineLeadDays || [30, 14, 7, 1],
    verificationStatus: data.verificationStatus || existing?.verificationStatus || "Pending",
    publicReady: form.elements.publicReady.checked,
    verifiedByEmail: data.verificationStatus === "Verified" ? (existing?.verifiedByEmail || signedInEmail()) : existing?.verifiedByEmail || "",
    verifiedAt: data.verificationStatus === "Verified" ? (existing?.verifiedAt || new Date().toISOString()) : existing?.verifiedAt || "",
    ownerEmail: data.ownerEmail || advisor?.ownerEmail || advisor?.email || signedInEmail(),
    createdAt: existing?.createdAt || today(),
    updatedAt: today(),
    sample: existing?.sample || false
  };
}

async function deleteStudent(id) {
  const student = db.students.find(item => item.id === id);
  if (!student) return;
  const confirmed = await askConfirm("Delete student record?", `“${student.name}” will be removed from ${backendReady ? "the shared Supabase registry" : "this browser database"}.`);
  if (!confirmed) return;
  const previousStudents = clone(db.students);
  db.students = db.students.filter(item => item.id !== id);
  if (backendReady) {
    try {
      await backend.deleteStudent(id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    } catch (error) {
      db.students = previousStudents;
      renderAll();
      showToast(error.message || "Could not delete student from Supabase");
      return;
    }
  } else {
    save();
  }
  renderAll();
  showToast("Student record deleted");
}

function setResearcherMessage(message = "", type = "") {
  const target = $("#researcher-message");
  if (!target) return;
  target.textContent = message;
  target.className = type ? `is-${type}` : "";
}

function validateResearcherProfileFields(form) {
  const interests = normalizeList(form.elements.researchInterests.value);
  if (interests.length > 5) {
    setResearcherMessage("Use no more than 5 research interest keywords.", "error");
    form.elements.researchInterests.focus();
    return false;
  }
  if (wordCount(form.elements.shortBio.value) > 500) {
    setResearcherMessage("Short bio must be 500 words or fewer.", "error");
    form.elements.shortBio.focus();
    return false;
  }
  return true;
}

function openResearcherDialog(id = null) {
  const form = $("#researcher-form");
  const researcher = id ? db.researchers.find(item => item.id === id) : null;
  const faculty = currentFacultyProfile();
  editingResearcherId = researcher?.id || null;
  form.reset();
  setResearcherMessage();
  $("#researcher-form-title").textContent = researcher ? "Edit researcher" : "Add researcher";
  $("#researcher-primary-action").textContent = researcher ? "Save researcher" : "Add researcher";
  populateResearcherHostOptions(researcher?.hostFacultyId || faculty?.id || "");
  populateResearcherGroupOptions(researcher?.researchGroupId || "");
  if (researcher) {
    ["name", "type", "email", "status", "reviewStatus", "hostFacultyId", "hostRole", "researchGroupId", "researchGroup", "office", "phone", "projectTitle", "fundingSource", "startDate", "endDate", "shortBio", "ownerEmail", "notes"].forEach(key => {
      const field = form.elements.namedItem(key);
      if (field) field.value = researcher[key] || "";
    });
    form.elements.researchInterests.value = normalizeList(researcher.researchInterests).join("\n");
    form.elements.skills.value = normalizeList(researcher.skills).join("\n");
    form.elements.publicReady.checked = Boolean(researcher.publicReady);
  } else {
    form.elements.type.value = "Postdoctoral Researcher";
    form.elements.status.value = "Active";
    form.elements.reviewStatus.value = "Draft";
    form.elements.hostFacultyId.value = faculty?.id || "";
    form.elements.hostRole.value = "Host faculty / PI";
    form.elements.publicReady.checked = false;
    form.elements.ownerEmail.value = signedInEmail() || faculty?.ownerEmail || faculty?.email || "";
  }
  $("#researcher-dialog").showModal();
  setTimeout(() => form.elements.namedItem("name")?.focus(), 50);
}

function researcherFromForm(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  Object.keys(data).forEach(key => { data[key] = String(data[key] || "").trim(); });
  const existing = editingResearcherId ? db.researchers.find(item => item.id === editingResearcherId) : null;
  const numericIds = db.researchers.map(item => Number(String(item.id).replace(/\D/g,""))).filter(Number.isFinite);
  const id = existing?.id || `RES-${String(Math.max(0, ...numericIds) + 1).padStart(3, "0")}`;
  const host = facultyFor(data.hostFacultyId);
  const group = facilityFor(data.researchGroupId);
  return {
    ...existing,
    id,
    name: data.name,
    type: RESEARCHER_TYPES.includes(data.type) ? data.type : "Postdoctoral Researcher",
    email: data.email,
    status: data.status || "Active",
    reviewStatus: data.reviewStatus || "Draft",
    publicReady: form.elements.publicReady.checked,
    hostFacultyId: data.hostFacultyId,
    hostRole: data.hostRole || "Host faculty / PI",
    researchGroupId: data.researchGroupId,
    researchGroup: group?.name || data.researchGroup || existing?.researchGroup || "",
    office: data.office,
    phone: data.phone,
    projectTitle: data.projectTitle,
    fundingSource: data.fundingSource,
    startDate: data.startDate,
    endDate: data.endDate,
    shortBio: data.shortBio,
    researchInterests: normalizeKeywords(data.researchInterests),
    skills: normalizeList(data.skills),
    ownerEmail: data.ownerEmail || host?.ownerEmail || host?.email || signedInEmail(),
    notes: data.notes,
    createdAt: existing?.createdAt || today(),
    updatedAt: today(),
    sample: existing?.sample || false
  };
}

async function deleteResearcher(id) {
  const researcher = db.researchers.find(item => item.id === id);
  if (!researcher) return;
  const confirmed = await askConfirm("Delete researcher?", `“${researcher.name}” will be removed from ${backendReady ? "the shared Supabase registry" : "this browser database"}.`);
  if (!confirmed) return;
  const previousResearchers = clone(db.researchers);
  db.researchers = db.researchers.filter(item => item.id !== id);
  if (backendReady) {
    try {
      await backend.deleteResearcher(id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    } catch (error) {
      db.researchers = previousResearchers;
      renderAll();
      showToast(error.message || "Could not delete researcher from Supabase");
      return;
    }
  } else {
    save();
  }
  renderAll();
  showToast("Researcher record deleted");
}

function setStaffMessage(message = "", type = "") {
  const target = $("#staff-message");
  if (!target) return;
  target.textContent = message;
  target.className = type ? `is-${type}` : "";
}

function validateStaffProfileFields(form) {
  if (!normalizeList(form.elements.responsibilities.value).length) {
    setStaffMessage("Add at least one responsibility.", "error");
    form.elements.responsibilities.focus();
    return false;
  }
  if (wordCount(form.elements.shortBio.value) > 500) {
    setStaffMessage("Short bio must be 500 words or fewer.", "error");
    form.elements.shortBio.focus();
    return false;
  }
  return true;
}

function openStaffDialog(id = null) {
  const form = $("#staff-form");
  const profile = id ? db.staff.find(item => item.id === id) : null;
  editingStaffId = profile?.id || null;
  form.reset();
  setStaffMessage();
  $("#staff-form-title").textContent = profile ? "Edit staff profile" : "Add staff";
  $("#staff-primary-action").textContent = profile ? "Save staff" : "Add staff";
  populateStaffGroupOptions(profile?.researchGroupId || "");
  if (profile) {
    ["name", "position", "email", "status", "reviewStatus", "unit", "researchGroupId", "researchGroup", "office", "phone", "shortBio", "ownerEmail", "notes"].forEach(key => {
      const field = form.elements.namedItem(key);
      if (field) field.value = profile[key] || "";
    });
    form.elements.responsibilities.value = normalizeList(profile.responsibilities).join("\n");
    form.elements.serviceAreas.value = normalizeList(profile.serviceAreas).join("\n");
    form.elements.publicReady.checked = Boolean(profile.publicReady);
  } else {
    form.elements.position.value = "Administrative Staff";
    form.elements.status.value = "Active";
    form.elements.reviewStatus.value = "Draft";
    form.elements.unit.value = "School of Physics";
    form.elements.publicReady.checked = false;
    form.elements.ownerEmail.value = signedInEmail();
  }
  $("#staff-dialog").showModal();
  setTimeout(() => form.elements.namedItem("name")?.focus(), 50);
}

function staffFromForm(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  Object.keys(data).forEach(key => { data[key] = String(data[key] || "").trim(); });
  const existing = editingStaffId ? db.staff.find(item => item.id === editingStaffId) : null;
  const numericIds = db.staff.map(item => Number(String(item.id).replace(/\D/g,""))).filter(Number.isFinite);
  const id = existing?.id || `STAFF-${String(Math.max(0, ...numericIds) + 1).padStart(3, "0")}`;
  const group = facilityFor(data.researchGroupId);
  return {
    ...existing,
    id,
    name: data.name,
    position: STAFF_POSITIONS.includes(data.position) ? data.position : "Administrative Staff",
    email: data.email,
    status: data.status || "Active",
    reviewStatus: data.reviewStatus || "Draft",
    publicReady: form.elements.publicReady.checked,
    unit: data.unit || "School of Physics",
    researchGroupId: data.researchGroupId,
    researchGroup: group?.name || data.researchGroup || existing?.researchGroup || "",
    office: data.office,
    phone: data.phone,
    shortBio: data.shortBio,
    responsibilities: normalizeList(data.responsibilities),
    serviceAreas: normalizeList(data.serviceAreas),
    ownerEmail: data.ownerEmail || data.email || signedInEmail(),
    notes: data.notes,
    createdAt: existing?.createdAt || today(),
    updatedAt: today(),
    sample: existing?.sample || false
  };
}

async function deleteStaff(id) {
  const profile = db.staff.find(item => item.id === id);
  if (!profile) return;
  const confirmed = await askConfirm("Delete staff profile?", `“${profile.name}” will be removed from ${backendReady ? "the shared Supabase registry" : "this browser database"}.`);
  if (!confirmed) return;
  const previousStaff = clone(db.staff);
  db.staff = db.staff.filter(item => item.id !== id);
  if (backendReady) {
    try {
      await backend.deleteStaff(id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    } catch (error) {
      db.staff = previousStaff;
      renderAll();
      showToast(error.message || "Could not delete staff profile from Supabase");
      return;
    }
  } else {
    save();
  }
  renderAll();
  showToast("Staff profile deleted");
}

function setServiceMessage(message = "", type = "") {
  const target = $("#service-message");
  if (!target) return;
  target.textContent = message;
  target.className = type ? `is-${type}` : "";
}

function openServiceDialog(id = null) {
  const form = $("#service-form");
  const service = id ? db.services.find(item => item.id === id) : null;
  const faculty = currentFacultyProfile();
  editingServiceId = service?.id || null;
  pendingServicePhoto = service?.featurePhoto ? clone(service.featurePhoto) : null;
  form.reset();
  setServiceMessage();
  $("#service-form-title").textContent = service ? "Edit service" : "Add service";
  $("#service-primary-action").textContent = service ? "Save service" : "Add service";
  populateServiceFacultyOptions(service?.facultyId || faculty?.id || "");
  if (service) {
    ["title", "category", "summary", "details", "audience", "duration", "schedule", "fee", "location", "contactName", "contactEmail", "ownerEmail", "reviewStatus", "submitterNotes"].forEach(key => {
      const field = form.elements.namedItem(key);
      if (field) field.value = service[key] || "";
    });
    form.elements.publicReady.checked = Boolean(service.publicReady);
  } else {
    form.elements.category.value = "certified-measurements";
    form.elements.reviewStatus.value = "Draft";
    form.elements.publicReady.checked = false;
    if (faculty) {
      form.elements.facultyId.value = faculty.id;
      form.elements.contactName.value = faculty.name || "";
      form.elements.contactEmail.value = signedInEmail() || faculty.email || "";
      form.elements.ownerEmail.value = signedInEmail() || faculty.ownerEmail || faculty.email || "";
    } else if (signedInEmail()) {
      form.elements.contactEmail.value = signedInEmail();
      form.elements.ownerEmail.value = signedInEmail();
    }
  }
  renderServicePhotoPreview();
  $("#service-dialog").showModal();
  setTimeout(() => form.elements.namedItem("title")?.focus(), 50);
}

function serviceFromForm(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  Object.keys(data).forEach(key => { data[key] = String(data[key] || "").trim(); });
  const existing = editingServiceId ? db.services.find(item => item.id === editingServiceId) : null;
  const numericIds = db.services.map(item => Number(String(item.id).replace(/\D/g,""))).filter(Number.isFinite);
  const id = existing?.id || `SERV-${String(Math.max(0, ...numericIds) + 1).padStart(3, "0")}`;
  const profile = facultyFor(data.facultyId);
  if (pendingServicePhoto) pendingServicePhoto.alt = $("#service-photo-alt").value.trim();
  return {
    ...existing,
    ...data,
    id,
    contactName: data.contactName || profile?.name || "",
    contactEmail: data.contactEmail || profile?.email || signedInEmail(),
    ownerEmail: data.ownerEmail || profile?.ownerEmail || profile?.email || signedInEmail(),
    publicReady: form.elements.publicReady.checked,
    featurePhoto: pendingServicePhoto,
    createdAt: existing?.createdAt || today(),
    updatedAt: today(),
    sample: existing?.sample || false
  };
}

function renderServicePhotoPreview() {
  const preview = $("#service-photo-preview");
  const altLabel = $("#service-photo-alt-label");
  if (!preview || !altLabel) return;
  if (photoSrc(pendingServicePhoto)) {
    preview.classList.remove("empty");
    preview.innerHTML = `<img src="${photoSrc(pendingServicePhoto)}" alt="" /><button class="media-remove" type="button" data-remove-service-photo aria-label="Remove service photo">×</button>`;
    altLabel.hidden = false;
    $("#service-photo-alt").value = pendingServicePhoto.alt || "";
  } else {
    preview.classList.add("empty");
    preview.innerHTML = `<span>No service photo selected</span>`;
    altLabel.hidden = true;
    $("#service-photo-alt").value = "";
  }
}

async function deleteService(id) {
  const service = db.services.find(item => item.id === id);
  if (!service) return;
  const confirmed = await askConfirm("Delete service?", `“${service.title}” will be removed from ${backendReady ? "the shared Supabase registry" : "this browser database"}.`);
  if (!confirmed) return;
  const previousServices = clone(db.services);
  db.services = db.services.filter(item => item.id !== id);
  if (backendReady) {
    try {
      await backend.deleteService(id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    } catch (error) {
      db.services = previousServices;
      renderAll();
      showToast(error.message || "Could not delete service from Supabase");
      return;
    }
  } else {
    save();
  }
  renderAll();
  showToast("Service deleted");
}

function setFacultyMessage(message = "", type = "") {
  const target = $("#faculty-message");
  if (!target) return;
  target.textContent = message;
  target.className = type ? `is-${type}` : "";
}

function openFacultyDialog(id = null) {
  const form = $("#faculty-form");
  const profile = id ? db.faculty.find(item => item.id === id) : null;
  editingFacultyId = profile?.id || null;
  pendingFacultyPhoto = profile?.profilePhoto ? clone(profile.profilePhoto) : null;
  form.reset();
  setFacultyMessage();
  $("#faculty-form-title").textContent = profile ? "Edit faculty profile" : "Add faculty profile";
  $("#faculty-primary-action").textContent = profile ? "Save profile" : "Add profile";
  if (profile) {
    ["name", "title", "email", "office", "phone", "bio", "color", "ownerEmail"].forEach(key => {
      const field = form.elements.namedItem(key);
      if (field) field.value = profile[key] || (key === "color" ? "#8fd8c8" : "");
    });
    ["researchInterests", "highlights", "activities", "recognitions"].forEach(key => {
      const field = form.elements.namedItem(key);
      if (field) field.value = normalizeList(profile[key]).join("\n");
    });
    const links = profileLinks(profile);
    ["academic", "scopus", "researchGate", "googleScholar", "orcid"].forEach(key => {
      const field = form.elements.namedItem(key);
      if (field) field.value = links[key] || "";
    });
    const manualMetrics = profile.manualMetrics || {};
    const manualHIndex = form.elements.namedItem("manualHIndex");
    const manualCitationCount = form.elements.namedItem("manualCitationCount");
    if (manualHIndex) manualHIndex.value = hasMetric(manualMetrics.hIndex) ? manualMetrics.hIndex : "";
    if (manualCitationCount) manualCitationCount.value = hasMetric(manualMetrics.citationCount) ? manualMetrics.citationCount : "";
    form.elements.publicReady.checked = profile.publicReady !== false;
  } else {
    form.elements.publicReady.checked = true;
    form.elements.color.value = facilityPalette[db.faculty.length % facilityPalette.length];
  }
  populateFacultyFacilityOptions(profile?.facilityIds || []);
  renderFacultyPhotoPreview();
  $("#faculty-dialog").showModal();
  setTimeout(() => form.elements.namedItem("name")?.focus(), 50);
}

function facultyFromForm(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  Object.keys(data).forEach(key => { data[key] = String(data[key] || "").trim(); });
  const existing = editingFacultyId ? db.faculty.find(item => item.id === editingFacultyId) : null;
  const numericIds = db.faculty.map(item => Number(String(item.id).replace(/\D/g,""))).filter(Number.isFinite);
  const id = existing?.id || `FACULTY-${String(Math.max(0, ...numericIds) + 1).padStart(3, "0")}`;
  const manualHIndex = metricValue(data.manualHIndex);
  const manualCitationCount = metricValue(data.manualCitationCount);
  const manualMetrics = manualHIndex !== null || manualCitationCount !== null ? {
    hIndex: manualHIndex,
    citationCount: manualCitationCount,
    source: "Faculty provided",
    updatedAt: new Date().toISOString()
  } : null;
  return {
    ...existing,
    id,
    name: data.name,
    title: data.title,
    email: data.email,
    office: data.office,
    phone: data.phone,
    bio: data.bio,
    researchInterests: normalizeList(data.researchInterests),
    highlights: normalizeList(data.highlights),
    activities: normalizeList(data.activities),
    recognitions: normalizeList(data.recognitions),
    facilityIds: [...form.querySelectorAll('input[name="facilityIds"]:checked')].map(input => input.value),
    profilePhoto: pendingFacultyPhoto ? {
      ...pendingFacultyPhoto,
      alt: $("#faculty-photo-alt").value.trim() || `${data.name || "Faculty member"} profile picture`
    } : null,
    profileLinks: {
      academic: data.academic,
      scopus: data.scopus,
      researchGate: data.researchGate,
      googleScholar: data.googleScholar,
      orcid: data.orcid
    },
    manualMetrics,
    color: data.color || existing?.color || facilityPalette[db.faculty.length % facilityPalette.length],
    publicReady: form.elements.publicReady.checked,
    ownerEmail: data.ownerEmail || data.email,
    createdAt: existing?.createdAt || today(),
    updatedAt: today(),
    sample: existing?.sample || false
  };
}

function renderFacultyPhotoPreview() {
  const preview = $("#faculty-photo-preview");
  const altLabel = $("#faculty-photo-alt-label");
  if (!preview || !altLabel) return;
  if (photoSrc(pendingFacultyPhoto)) {
    preview.classList.remove("empty");
    preview.innerHTML = `<img src="${photoSrc(pendingFacultyPhoto)}" alt="" /><button class="media-remove" type="button" data-remove-faculty-photo aria-label="Remove profile picture">×</button>`;
    altLabel.hidden = false;
    $("#faculty-photo-alt").value = pendingFacultyPhoto.alt || "";
  } else {
    preview.classList.add("empty");
    preview.innerHTML = `<span>No profile picture selected</span>`;
    altLabel.hidden = true;
    $("#faculty-photo-alt").value = "";
  }
}

function openFacilityDialog(id = null) {
  const form = $("#facility-form");
  const facility = id ? db.facilities.find(item => item.id === id) : null;
  editingFacilityId = facility?.id || null;
  form.reset();
  setFacilityMessage();
  $("#facility-form-title").textContent = facility ? "Edit facility" : "Add facility";
  $("#facility-primary-action").textContent = facility ? "Save changes" : "Add facility";
  if (facility) {
    ["name", "building", "room", "color", "lead", "description"].forEach(key => {
      const field = form.elements.namedItem(key);
      if (field) field.value = facility[key] || (key === "color" ? "#8fd8c8" : "");
    });
  }
  $("#facility-dialog").showModal();
  setTimeout(() => form.elements.namedItem("name")?.focus(), 50);
}

function openRecordDialog(mode = "manager", id = null) {
  recordMode = mode;
  const form = $("#record-form");
  form.reset();
  $("#record-id").value = "";
  const item = id ? db.equipment.find(record => record.id === id) : null;
  pendingFeaturePhoto = item?.featurePhoto ? clone(item.featurePhoto) : null;
  pendingGallery = Array.isArray(item?.gallery) ? clone(item.gallery).slice(0, 5) : [];
  $("#record-form-kicker").textContent = mode === "faculty" ? "Faculty contribution" : item ? "Edit equipment record" : "New registry record";
  $("#record-form-title").textContent = mode === "faculty" ? "Submit equipment information" : item ? "Edit equipment" : "Add equipment";
  $("#record-primary-action").textContent = mode === "faculty" ? "Submit for review" : "Save record";
  $("#submitter-section").hidden = mode !== "faculty" && !item?.submitterName;
  if (item) {
    Object.entries(item).forEach(([key, value]) => {
      const field = form.elements.namedItem(key);
      if (!field) return;
      if (field.type === "checkbox") field.checked = Boolean(value); else field.value = value ?? "";
    });
    $("#record-id").value = item.id;
  } else {
    form.elements.publicReady.checked = mode !== "faculty";
    const faculty = currentFacultyProfile();
    const email = signedInEmail();
    const submitterName = form.elements.namedItem("submitterName");
    const submitterEmail = form.elements.namedItem("submitterEmail");
    const custodian = form.elements.namedItem("custodian");
    const recordEmail = form.elements.namedItem("email");
    if (submitterName && faculty?.name) submitterName.value = faculty.name;
    if (submitterEmail && email) submitterEmail.value = email;
    if (custodian && faculty?.name) custodian.value = faculty.name;
    if (recordEmail && email) recordEmail.value = email;
  }
  const descriptionField = $("#equipment-description");
  descriptionField.value = descriptionField.value.slice(0, DESCRIPTION_LIMIT);
  updateDescriptionCounter();
  renderMediaPreviews();
  $("#record-dialog").showModal();
  setTimeout(() => form.elements.name.focus(), 50);
}

function recordFromForm(form, saveMode) {
  const data = Object.fromEntries(new FormData(form).entries());
  data.description = String(data.description || "").slice(0, DESCRIPTION_LIMIT);
  const existing = db.equipment.find(item => item.id === data.id);
  const numericIds = db.equipment.map(item => Number(item.id.replace(/\D/g,""))).filter(Number.isFinite);
  const id = existing?.id || `EQ-${String(Math.max(0, ...numericIds) + 1).padStart(3,"0")}`;
  const reviewStatus = saveMode === "draft" ? "Draft" : recordMode === "faculty" ? "Submitted" : existing?.reviewStatus === "Verified" ? "Verified" : "Verified";
  const email = signedInEmail();
  if (!data.submitterEmail && email) data.submitterEmail = email;
  if (!data.email && email) data.email = email;
  if (pendingFeaturePhoto) pendingFeaturePhoto.alt = $("#feature-photo-alt").value.trim();
  return { ...existing, ...data, id, ownerEmail: existing?.ownerEmail || email, publicReady: form.elements.publicReady.checked, featurePhoto: pendingFeaturePhoto, gallery: pendingGallery, reviewStatus, createdAt: existing?.createdAt || today(), updatedAt: today(), sample: existing?.sample || false };
}

function updateDescriptionCounter() {
  const field = $("#equipment-description");
  const counter = $("#description-counter");
  const length = field.value.length;
  counter.textContent = `${length} / ${DESCRIPTION_LIMIT}`;
  counter.classList.toggle("is-near-limit", length >= 700 && length < DESCRIPTION_LIMIT);
  counter.classList.toggle("is-at-limit", length >= DESCRIPTION_LIMIT);
}

function resizeImage(file, maxDimension = 1200, quality = 0.76) {
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

function renderMediaPreviews() {
  const featurePreview = $("#feature-photo-preview");
  const altLabel = $("#feature-alt-label");
  if (photoSrc(pendingFeaturePhoto)) {
    featurePreview.classList.remove("empty");
    featurePreview.innerHTML = `<img src="${photoSrc(pendingFeaturePhoto)}" alt="" /><button class="media-remove" type="button" data-remove-feature aria-label="Remove feature photo">×</button>`;
    altLabel.hidden = false;
    $("#feature-photo-alt").value = pendingFeaturePhoto.alt || "";
  } else {
    featurePreview.classList.add("empty");
    featurePreview.innerHTML = `<span>No feature photo selected</span>`;
    altLabel.hidden = true;
    $("#feature-photo-alt").value = "";
  }
  const galleryPreview = $("#gallery-photo-preview");
  galleryPreview.innerHTML = pendingGallery.length
    ? pendingGallery.map((photo, index) => `<div class="gallery-item"><img src="${photoSrc(photo)}" alt="" /><button class="media-remove" type="button" data-remove-gallery="${index}" aria-label="Remove gallery photo ${index + 1}">×</button><input type="text" value="${clean(photo.alt || "")}" data-gallery-alt="${index}" aria-label="Description for gallery photo ${index + 1}" placeholder="Describe this photo" /></div>`).join("")
    : `<p>No gallery photos selected</p>`;
}

async function deleteRecord(id) {
  const item = db.equipment.find(record => record.id === id);
  if (!item) return;
  const confirmed = await askConfirm("Delete equipment record?", `“${item.name}” will be removed from ${backendReady ? "the shared Supabase registry" : "this browser database"}. This cannot be undone.`);
  if (!confirmed) return;
  const previousEquipment = clone(db.equipment);
  db.equipment = db.equipment.filter(record => record.id !== id);
  if (backendReady) {
    try {
      await backend.deleteEquipment(id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    } catch (error) {
      db.equipment = previousEquipment;
      renderAll();
      showToast(error.message || "Could not delete from Supabase");
      return;
    }
  } else {
    save();
  }
  renderAll(); showToast("Equipment record deleted");
}

async function deleteFacility(id) {
  const facility = db.facilities.find(item => item.id === id);
  if (!facility) return;
  const linkedEquipmentCount = db.equipment.filter(item => item.facilityId === id).length;
  const confirmed = await askConfirm(
    "Delete facility?",
    `“${facility.name}” will be removed from ${backendReady ? "the shared Supabase registry" : "this browser database"}.${linkedEquipmentCount ? ` ${linkedEquipmentCount} linked equipment record${linkedEquipmentCount === 1 ? "" : "s"} will become unassigned.` : ""}`
  );
  if (!confirmed) return;
  const previousFacilities = clone(db.facilities);
  const previousEquipment = clone(db.equipment);
  db.facilities = db.facilities.filter(item => item.id !== id);
  db.equipment = db.equipment.map(item => item.facilityId === id ? { ...item, facilityId: "" } : item);
  if (backendReady) {
    try {
      await backend.deleteFacility(id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    } catch (error) {
      db.facilities = previousFacilities;
      db.equipment = previousEquipment;
      renderAll();
      showToast(error.message || "Could not delete facility from Supabase");
      return;
    }
  } else {
    save();
  }
  renderAll();
  showToast("Facility deleted");
}

function askConfirm(title, message) {
  return new Promise(resolve => {
    const dialog = $("#confirm-dialog");
    $("#confirm-title").textContent = title;
    $("#confirm-message").textContent = message;
    const handleClose = () => { dialog.removeEventListener("close", handleClose); resolve(dialog.returnValue === "confirm"); };
    dialog.addEventListener("close", handleClose);
    dialog.showModal();
  });
}

function downloadFile(filename, type, content) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url; link.download = filename; document.body.append(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function exportCsv() {
  const fields = ["id","name","assetCode","manufacturer","model","category","facilityId","room","custodian","email","researchGroup","status","access","lastMaintenance","nextMaintenance","safety","publicReady","reviewStatus","updatedAt"];
  const quote = value => `"${String(value ?? "").replace(/"/g,'""')}"`;
  const csv = [fields.join(","), ...db.equipment.map(item => fields.map(field => quote(item[field])).join(","))].join("\n");
  downloadFile(`sut-physics-equipment-${today()}.csv`, "text/csv;charset=utf-8", csv);
  showToast("CSV export created");
}

function exportStudentCsv() {
  const fields = ["id","studentCode","name","preferredName","email","level","program","status","verificationStatus","publicReady","advisor","coadvisor","researchGroup","projectTitle","thesisTitle","shortBio","researchInterests","startTerm","startYear","expectedGraduationYear","graduationYear","office","phone","skills","deadlineAlertsEnabled","ownerEmail","verifiedByEmail","verifiedAt","updatedAt"];
  const quote = value => `"${String(value ?? "").replace(/"/g,'""')}"`;
  const rows = db.students.map(student => ({
    ...student,
    program: programLabel(student.programId),
    advisor: advisorName(student.advisorId),
    researchGroup: researchGroupName(student),
    researchInterests: normalizeList(student.researchInterests).join("; "),
    skills: normalizeList(student.skills).join("; ")
  }));
  const csv = [fields.join(","), ...rows.map(item => fields.map(field => quote(item[field])).join(","))].join("\n");
  downloadFile(`sut-physics-students-${today()}.csv`, "text/csv;charset=utf-8", csv);
  showToast("Student CSV export created");
}

function exportResearcherCsv() {
  const fields = ["id","name","type","email","status","reviewStatus","publicReady","hostFaculty","hostRole","researchGroup","projectTitle","fundingSource","startDate","endDate","shortBio","researchInterests","skills","office","phone","ownerEmail","updatedAt"];
  const quote = value => `"${String(value ?? "").replace(/"/g,'""')}"`;
  const rows = db.researchers.map(researcher => ({
    ...researcher,
    hostFaculty: advisorName(researcher.hostFacultyId),
    researchGroup: researchGroupName({ researchGroupId: researcher.researchGroupId, researchGroup: researcher.researchGroup }),
    researchInterests: normalizeList(researcher.researchInterests).join("; "),
    skills: normalizeList(researcher.skills).join("; ")
  }));
  const csv = [fields.join(","), ...rows.map(item => fields.map(field => quote(item[field])).join(","))].join("\n");
  downloadFile(`sut-physics-researchers-${today()}.csv`, "text/csv;charset=utf-8", csv);
  showToast("Researcher CSV export created");
}

function exportStaffCsv() {
  const fields = ["id","name","position","email","status","reviewStatus","publicReady","unit","researchGroup","responsibilities","serviceAreas","shortBio","office","phone","ownerEmail","updatedAt"];
  const quote = value => `"${String(value ?? "").replace(/"/g,'""')}"`;
  const rows = db.staff.map(profile => ({
    ...profile,
    researchGroup: researchGroupName({ researchGroupId: profile.researchGroupId, researchGroup: profile.researchGroup }),
    responsibilities: normalizeList(profile.responsibilities).join("; "),
    serviceAreas: normalizeList(profile.serviceAreas).join("; ")
  }));
  const csv = [fields.join(","), ...rows.map(item => fields.map(field => quote(item[field])).join(","))].join("\n");
  downloadFile(`sut-physics-staff-${today()}.csv`, "text/csv;charset=utf-8", csv);
  showToast("Staff CSV export created");
}

$$('.nav-item').forEach(button => button.addEventListener("click", () => showView(button.dataset.view)));
$$('[data-view-jump]').forEach(button => button.addEventListener("click", () => showView(button.dataset.viewJump)));
$$('[data-action="new-record"]').forEach(button => button.addEventListener("click", () => openRecordDialog("manager")));
$$('[data-action="faculty-submit"]').forEach(button => button.addEventListener("click", () => openRecordDialog("faculty")));
$$('[data-action="new-faculty"]').forEach(button => button.addEventListener("click", () => openFacultyDialog()));
$$('[data-action="new-student"]').forEach(button => button.addEventListener("click", () => openStudentDialog()));
$$('[data-action="new-researcher"]').forEach(button => button.addEventListener("click", () => openResearcherDialog()));
$$('[data-action="new-staff"]').forEach(button => button.addEventListener("click", () => openStaffDialog()));
$$('[data-action="new-service"]').forEach(button => button.addEventListener("click", () => openServiceDialog()));
function setFacilityMessage(message = "", type = "") {
  const target = $("#facility-message");
  if (!target) return;
  target.textContent = message;
  target.className = type ? `is-${type}` : "";
}

$$('[data-action="new-facility"]').forEach(button => button.addEventListener("click", () => {
  openFacilityDialog();
}));
$$('[data-close]').forEach(button => button.addEventListener("click", () => $(`#${button.dataset.close}`).close()));

$("#equipment-description").addEventListener("input", event => {
  if (event.currentTarget.value.length > DESCRIPTION_LIMIT) {
    event.currentTarget.value = event.currentTarget.value.slice(0, DESCRIPTION_LIMIT);
  }
  updateDescriptionCounter();
});

$("#feature-photo-input").addEventListener("change", async event => {
  const file = event.target.files[0];
  if (!file) return;
  try {
    pendingFeaturePhoto = await resizeImage(file, 1400, 0.8);
    pendingFeaturePhoto.alt = `${$("#record-form").elements.name.value || "Research equipment"} feature photo`;
    renderMediaPreviews();
  } catch {
    showToast("The feature photo could not be processed");
  }
  event.target.value = "";
});

$("#gallery-photo-input").addEventListener("change", async event => {
  const available = Math.max(0, 5 - pendingGallery.length);
  const files = [...event.target.files].slice(0, available);
  if (!available) {
    showToast("The gallery already contains the maximum of 5 photos");
    event.target.value = "";
    return;
  }
  try {
    const images = await Promise.all(files.map(file => resizeImage(file, 640, 0.66)));
    const equipmentName = $("#record-form").elements.name.value || "Research equipment";
    images.forEach((photo, index) => { photo.alt = `${equipmentName} use-case photo ${pendingGallery.length + index + 1}`; });
    pendingGallery.push(...images);
    renderMediaPreviews();
    if (event.target.files.length > available) showToast("Only the first available gallery photos were added");
  } catch {
    showToast("One or more gallery photos could not be processed");
  }
  event.target.value = "";
});

$("#faculty-photo-input").addEventListener("change", async event => {
  const file = event.target.files[0];
  if (!file) return;
  try {
    pendingFacultyPhoto = await resizeImage(file, 900, 0.82);
    pendingFacultyPhoto.alt = `${$("#faculty-form").elements.name.value || "Faculty member"} profile picture`;
    renderFacultyPhotoPreview();
  } catch {
    showToast("The faculty profile picture could not be processed");
  }
  event.target.value = "";
});

$("#service-photo-input").addEventListener("change", async event => {
  const file = event.target.files[0];
  if (!file) return;
  try {
    pendingServicePhoto = await resizeImage(file, 1400, 0.8);
    pendingServicePhoto.alt = `${$("#service-form").elements.title.value || "Service"} photo`;
    renderServicePhotoPreview();
  } catch {
    showToast("The service photo could not be processed");
  }
  event.target.value = "";
});

$("#feature-photo-preview").addEventListener("click", event => {
  if (!event.target.closest("[data-remove-feature]")) return;
  pendingFeaturePhoto = null;
  renderMediaPreviews();
});

$("#faculty-photo-preview").addEventListener("click", event => {
  if (!event.target.closest("[data-remove-faculty-photo]")) return;
  pendingFacultyPhoto = null;
  renderFacultyPhotoPreview();
});

$("#service-photo-preview").addEventListener("click", event => {
  if (!event.target.closest("[data-remove-service-photo]")) return;
  pendingServicePhoto = null;
  renderServicePhotoPreview();
});

$("#gallery-photo-preview").addEventListener("click", event => {
  const button = event.target.closest("[data-remove-gallery]");
  if (!button) return;
  pendingGallery.splice(Number(button.dataset.removeGallery), 1);
  renderMediaPreviews();
});

$("#gallery-photo-preview").addEventListener("input", event => {
  const input = event.target.closest("[data-gallery-alt]");
  if (!input) return;
  const photo = pendingGallery[Number(input.dataset.galleryAlt)];
  if (photo) photo.alt = input.value;
});

$(".mobile-menu").addEventListener("click", event => {
  const open = $("#sidebar").classList.toggle("is-open");
  event.currentTarget.setAttribute("aria-expanded", String(open));
});

$("#record-form").addEventListener("submit", async event => {
  event.preventDefault();
  const saveMode = event.submitter?.value || "submit";
  if (!event.currentTarget.reportValidity()) return;
  setBusy(event.submitter, true, backendReady ? "Uploading…" : "Saving…");
  const record = recordFromForm(event.currentTarget, saveMode);
  const index = db.equipment.findIndex(item => item.id === record.id);
  const previousEquipment = clone(db.equipment);
  if (index >= 0) db.equipment[index] = record; else db.equipment.unshift(record);
  if (!(await persistEquipment(record, previousEquipment))) {
    setBusy(event.submitter, false);
    return;
  }
  setBusy(event.submitter, false);
  renderAll(); $("#record-dialog").close();
  showToast(record.reviewStatus === "Submitted" ? "Submitted for registry review" : record.reviewStatus === "Draft" ? "Draft saved" : record.publicReady ? "Equipment saved and available to the public page" : "Equipment record saved");
});

$("#facility-form").addEventListener("submit", async event => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  setBusy(event.submitter, true);
  setFacilityMessage("Saving facility…");
  const form = event.currentTarget;
  try {
    const data = Object.fromEntries(new FormData(form).entries());
    Object.keys(data).forEach(key => { data[key] = String(data[key] || "").trim(); });
    const duplicate = db.facilities.find(item => item.id !== editingFacilityId && item.name.trim().toLowerCase() === data.name.toLowerCase());
    if (duplicate) {
      setFacilityMessage(`A facility named “${duplicate.name}” already exists.`, "error");
      showToast(`A facility named “${duplicate.name}” already exists`);
      form.elements.namedItem("name")?.focus();
      return;
    }
    const existing = editingFacilityId ? db.facilities.find(item => item.id === editingFacilityId) : null;
    const numericIds = db.facilities.map(item => Number(item.id.replace(/\D/g,""))).filter(Number.isFinite);
    const id = existing?.id || `FAC-${String(Math.max(0, ...numericIds) + 1).padStart(2,"0")}`;
    const facility = {
      ...existing,
      ...data,
      id,
      ownerEmail: existing?.ownerEmail || signedInEmail(),
      color: data.color || existing?.color || facilityPalette[db.facilities.length % facilityPalette.length]
    };
    if (await persistFacility(facility)) {
      $("#facility-dialog").close();
      form.reset();
      editingFacilityId = null;
      renderAll();
      showToast(`${facility.name} ${existing ? "updated" : "added to the facilities directory"}`);
    } else {
      setFacilityMessage(lastFacilityError?.message || "Could not save this facility. Confirm your admin account is active in Supabase.", "error");
    }
  } catch (error) {
    setFacilityMessage(error.message || "Could not add this facility.", "error");
    showToast(error.message || "Could not add facility");
  } finally {
    setBusy(event.submitter, false);
  }
});

$("#facility-grid").addEventListener("click", event => {
  const deleteButton = event.target.closest("[data-delete-facility]");
  if (deleteButton) {
    event.stopPropagation();
    deleteFacility(deleteButton.dataset.deleteFacility);
    return;
  }
  const editButton = event.target.closest("[data-edit-facility]");
  const card = event.target.closest("[data-facility-id]");
  const id = editButton?.dataset.editFacility || card?.dataset.facilityId;
  if (id) openFacilityDialog(id);
});

$("#faculty-profile-grid").addEventListener("click", event => {
  const editButton = event.target.closest("[data-edit-faculty]");
  const card = event.target.closest("[data-faculty-id]");
  const id = editButton?.dataset.editFaculty || card?.dataset.facultyId;
  if (id) openFacultyDialog(id);
});

$("#student-table").addEventListener("click", event => {
  const deleteButton = event.target.closest("[data-delete-student]");
  const editButton = event.target.closest("[data-edit-student]");
  if (deleteButton) {
    event.stopPropagation();
    deleteStudent(deleteButton.dataset.deleteStudent);
    return;
  }
  if (editButton) {
    event.stopPropagation();
    openStudentDialog(editButton.dataset.editStudent);
    return;
  }
  const row = event.target.closest("[data-student-id]");
  if (row) openStudentDialog(row.dataset.studentId);
});

$("#researcher-table").addEventListener("click", event => {
  const deleteButton = event.target.closest("[data-delete-researcher]");
  const editButton = event.target.closest("[data-edit-researcher]");
  if (deleteButton) {
    event.stopPropagation();
    deleteResearcher(deleteButton.dataset.deleteResearcher);
    return;
  }
  if (editButton) {
    event.stopPropagation();
    openResearcherDialog(editButton.dataset.editResearcher);
    return;
  }
  const row = event.target.closest("[data-researcher-id]");
  if (row) openResearcherDialog(row.dataset.researcherId);
});

$("#staff-table").addEventListener("click", event => {
  const deleteButton = event.target.closest("[data-delete-staff]");
  const editButton = event.target.closest("[data-edit-staff]");
  if (deleteButton) {
    event.stopPropagation();
    deleteStaff(deleteButton.dataset.deleteStaff);
    return;
  }
  if (editButton) {
    event.stopPropagation();
    openStaffDialog(editButton.dataset.editStaff);
    return;
  }
  const row = event.target.closest("[data-staff-id]");
  if (row) openStaffDialog(row.dataset.staffId);
});

$("#service-grid").addEventListener("click", event => {
  const deleteButton = event.target.closest("[data-delete-service]");
  if (deleteButton) {
    event.stopPropagation();
    deleteService(deleteButton.dataset.deleteService);
    return;
  }
  const editButton = event.target.closest("[data-edit-service]");
  const card = event.target.closest("[data-service-id]");
  const id = editButton?.dataset.editService || card?.dataset.serviceId;
  if (id) openServiceDialog(id);
});

$("#researcher-form").addEventListener("submit", async event => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  if (!validateResearcherProfileFields(event.currentTarget)) return;
  setBusy(event.submitter, true);
  setResearcherMessage("Saving researcher…");
  try {
    const researcher = researcherFromForm(event.currentTarget);
    const duplicate = db.researchers.find(item => item.id !== researcher.id && item.name.trim().toLowerCase() === researcher.name.trim().toLowerCase());
    if (duplicate) {
      setResearcherMessage(`A researcher record for “${duplicate.name}” already exists.`, "error");
      showToast(`A researcher record for “${duplicate.name}” already exists`);
      return;
    }
    if (await persistResearcher(researcher)) {
      $("#researcher-dialog").close();
      event.currentTarget.reset();
      editingResearcherId = null;
      renderAll();
      showToast(`${researcher.name} researcher record saved`);
    } else {
      setResearcherMessage(lastResearcherError?.message || "Could not save this researcher.", "error");
    }
  } catch (error) {
    setResearcherMessage(error.message || "Could not save this researcher.", "error");
    showToast(error.message || "Could not save researcher");
  } finally {
    setBusy(event.submitter, false);
  }
});

$("#staff-form").addEventListener("submit", async event => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  if (!validateStaffProfileFields(event.currentTarget)) return;
  setBusy(event.submitter, true);
  setStaffMessage("Saving staff profile…");
  try {
    const profile = staffFromForm(event.currentTarget);
    const duplicate = db.staff.find(item => item.id !== profile.id && item.name.trim().toLowerCase() === profile.name.trim().toLowerCase());
    if (duplicate) {
      setStaffMessage(`A staff profile for “${duplicate.name}” already exists.`, "error");
      showToast(`A staff profile for “${duplicate.name}” already exists`);
      return;
    }
    if (await persistStaff(profile)) {
      $("#staff-dialog").close();
      event.currentTarget.reset();
      editingStaffId = null;
      renderAll();
      showToast(`${profile.name} staff profile saved`);
    } else {
      setStaffMessage(lastStaffError?.message || "Could not save this staff profile.", "error");
    }
  } catch (error) {
    setStaffMessage(error.message || "Could not save this staff profile.", "error");
    showToast(error.message || "Could not save staff profile");
  } finally {
    setBusy(event.submitter, false);
  }
});

$("#student-form").addEventListener("submit", async event => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  if (!validateStudentProfileFields(event.currentTarget)) return;
  setBusy(event.submitter, true);
  setStudentMessage("Saving student…");
  try {
    const student = studentFromForm(event.currentTarget);
    const duplicate = db.students.find(item => {
      if (item.id === student.id) return false;
      const sameCode = student.studentCode && item.studentCode && item.studentCode.trim().toLowerCase() === student.studentCode.trim().toLowerCase();
      const sameEmail = student.email && item.email && item.email.trim().toLowerCase() === student.email.trim().toLowerCase();
      const sameName = item.name.trim().toLowerCase() === student.name.trim().toLowerCase();
      return sameCode || sameEmail || sameName;
    });
    if (duplicate) {
      setStudentMessage(`A student record for “${duplicate.name}” already exists.`, "error");
      showToast(`A student record for “${duplicate.name}” already exists`);
      return;
    }
    if (await persistStudent(student)) {
      $("#student-dialog").close();
      event.currentTarget.reset();
      editingStudentId = null;
      renderAll();
      showToast(`${student.name} ${db.students.some(item => item.id === student.id) ? "student record saved" : "added to students"}`);
    } else {
      setStudentMessage(lastStudentError?.message || "Could not save this student.", "error");
    }
  } catch (error) {
    setStudentMessage(error.message || "Could not save this student.", "error");
    showToast(error.message || "Could not save student");
  } finally {
    setBusy(event.submitter, false);
  }
});

$("#student-form").elements.namedItem("programId").addEventListener("change", event => {
  const level = STUDY_PROGRAMS[event.target.value]?.level;
  if (level) $("#student-form").elements.namedItem("level").value = level;
});

$("#service-form").addEventListener("submit", async event => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  setBusy(event.submitter, true);
  setServiceMessage("Saving service…");
  try {
    const service = serviceFromForm(event.currentTarget);
    const duplicate = db.services.find(item => item.id !== service.id && item.title.trim().toLowerCase() === service.title.trim().toLowerCase());
    if (duplicate) {
      setServiceMessage(`A service named “${duplicate.title}” already exists.`, "error");
      showToast(`A service named “${duplicate.title}” already exists`);
      return;
    }
    if (await persistService(service)) {
      $("#service-dialog").close();
      event.currentTarget.reset();
      editingServiceId = null;
      renderAll();
      showToast(`${service.title} ${db.services.some(item => item.id === service.id) ? "saved" : "added to services"}`);
    } else {
      setServiceMessage(lastServiceError?.message || "Could not save this service.", "error");
    }
  } catch (error) {
    setServiceMessage(error.message || "Could not save this service.", "error");
    showToast(error.message || "Could not save service");
  } finally {
    setBusy(event.submitter, false);
  }
});

$("#faculty-form").addEventListener("submit", async event => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  setBusy(event.submitter, true);
  setFacultyMessage("Saving faculty profile…");
  try {
    const profile = facultyFromForm(event.currentTarget);
    const duplicate = db.faculty.find(item => item.id !== profile.id && item.name.trim().toLowerCase() === profile.name.trim().toLowerCase());
    if (duplicate) {
      setFacultyMessage(`A faculty profile named “${duplicate.name}” already exists.`, "error");
      showToast(`A faculty profile named “${duplicate.name}” already exists`);
      return;
    }
    if (await persistFaculty(profile)) {
      $("#faculty-dialog").close();
      event.currentTarget.reset();
      editingFacultyId = null;
      pendingFacultyPhoto = null;
      renderAll();
      showToast(`${profile.name} ${db.faculty.some(item => item.id === profile.id) ? "profile saved" : "added to faculty profiles"}`);
    } else {
      setFacultyMessage(lastFacultyError?.message || "Could not save this faculty profile. Confirm your admin account is active in Supabase.", "error");
    }
  } catch (error) {
    setFacultyMessage(error.message || "Could not save this faculty profile.", "error");
    showToast(error.message || "Could not save faculty profile");
  } finally {
    setBusy(event.submitter, false);
  }
});

$("#equipment-table").addEventListener("click", event => {
  const deleteButton = event.target.closest("[data-delete]");
  const editButton = event.target.closest("[data-edit]");
  if (deleteButton) { event.stopPropagation(); deleteRecord(deleteButton.dataset.delete); return; }
  if (editButton) { event.stopPropagation(); openRecordDialog("manager", editButton.dataset.edit); return; }
  const row = event.target.closest("[data-record-id]"); if (row) openRecordDialog("manager", row.dataset.recordId);
});

$("#submission-list").addEventListener("click", async event => {
  const edit = event.target.closest("[data-edit]"); if (edit) openRecordDialog("manager", edit.dataset.edit);
  const approve = event.target.closest("[data-approve]");
  if (approve) {
    const item = db.equipment.find(record => record.id === approve.dataset.approve);
    if (item) {
      const previousEquipment = clone(db.equipment);
      item.reviewStatus = "Verified";
      item.publicReady = true;
      item.updatedAt = today();
      setBusy(approve, true, "Approving…");
      if (await persistEquipment(item, previousEquipment)) {
        renderAll();
        showToast("Submission approved and published to the public page");
      }
      setBusy(approve, false);
    }
  }
});

$("#attention-list").addEventListener("click", event => { const button = event.target.closest("[data-attention-view]"); if (button) showView(button.dataset.attentionView); });

[$("#equipment-search"), $("#facility-filter"), $("#status-filter"), $("#review-filter")].forEach(control => control.addEventListener(control.tagName === "INPUT" ? "input" : "change", renderEquipmentTable));
$("#clear-filters").addEventListener("click", () => { $("#equipment-search").value = ""; $("#facility-filter").value = "all"; $("#status-filter").value = "all"; $("#review-filter").value = "all"; renderEquipmentTable(); });

[$("#student-search"), $("#student-level-filter"), $("#student-program-filter"), $("#student-start-year-filter"), $("#student-status-filter"), $("#student-verification-filter"), $("#student-advisor-filter"), $("#student-group-filter")].forEach(control => control.addEventListener(control.tagName === "INPUT" ? "input" : "change", renderStudents));
$("#clear-student-filters").addEventListener("click", () => {
  $("#student-search").value = "";
  $("#student-level-filter").value = "all";
  $("#student-program-filter").value = "all";
  $("#student-start-year-filter").value = "all";
  $("#student-status-filter").value = "all";
  $("#student-verification-filter").value = "all";
  $("#student-advisor-filter").value = "all";
  $("#student-group-filter").value = "all";
  renderStudents();
});

[$("#researcher-search"), $("#researcher-type-filter"), $("#researcher-status-filter"), $("#researcher-review-filter"), $("#researcher-host-filter"), $("#researcher-group-filter")].forEach(control => control.addEventListener(control.tagName === "INPUT" ? "input" : "change", renderResearchers));
$("#clear-researcher-filters").addEventListener("click", () => {
  $("#researcher-search").value = "";
  $("#researcher-type-filter").value = "all";
  $("#researcher-status-filter").value = "all";
  $("#researcher-review-filter").value = "all";
  $("#researcher-host-filter").value = "all";
  $("#researcher-group-filter").value = "all";
  renderResearchers();
});

[$("#staff-search"), $("#staff-position-filter"), $("#staff-status-filter"), $("#staff-review-filter"), $("#staff-unit-filter"), $("#staff-group-filter")].forEach(control => control.addEventListener(control.tagName === "INPUT" ? "input" : "change", renderStaff));
$("#clear-staff-filters").addEventListener("click", () => {
  $("#staff-search").value = "";
  $("#staff-position-filter").value = "all";
  $("#staff-status-filter").value = "all";
  $("#staff-review-filter").value = "all";
  $("#staff-unit-filter").value = "all";
  $("#staff-group-filter").value = "all";
  renderStaff();
});

$("#global-search").addEventListener("input", event => { if (event.target.value.trim()) showView("equipment", { query: event.target.value, preserveScroll: true }); });
document.addEventListener("keydown", event => { if (event.key === "/" && !["INPUT","TEXTAREA","SELECT"].includes(document.activeElement.tagName)) { event.preventDefault(); $("#global-search").focus(); } });

$("#export-json").addEventListener("click", () => { downloadFile(`sut-physics-registry-${today()}.json`, "application/json", JSON.stringify(db, null, 2)); showToast("JSON backup created"); });
$("#export-csv").addEventListener("click", exportCsv);
$("#export-student-csv").addEventListener("click", exportStudentCsv);
$("#export-researcher-csv").addEventListener("click", exportResearcherCsv);
$("#export-staff-csv").addEventListener("click", exportStaffCsv);
$("#import-json").addEventListener("change", async event => {
  const file = event.target.files[0]; if (!file) return;
  try {
    const imported = JSON.parse(await file.text());
    if (!Array.isArray(imported.equipment) || !Array.isArray(imported.facilities)) throw new Error("Invalid schema");
    imported.faculty = Array.isArray(imported.faculty) ? imported.faculty : [];
    imported.students = Array.isArray(imported.students) ? imported.students : [];
    imported.researchers = Array.isArray(imported.researchers) ? imported.researchers : [];
    imported.staff = Array.isArray(imported.staff) ? imported.staff : [];
    imported.services = Array.isArray(imported.services) ? imported.services : [];
    imported.equipment = imported.equipment.map(item => ({
      ...item,
      description: String(item.description || "").slice(0, DESCRIPTION_LIMIT)
    }));
    const confirmed = await askConfirm(backendReady ? "Import into the shared registry?" : "Replace the browser database?", `Import ${imported.faculty.length} faculty profiles, ${imported.students.length} student records, ${imported.researchers.length} researcher records, ${imported.staff.length} staff profiles, ${imported.equipment.length} equipment records, ${imported.facilities.length} facilities, and ${imported.services.length} services from “${file.name}”?`);
    if (confirmed) {
      if (backendReady) {
        for (const profile of imported.faculty) await backend.saveFaculty(profile);
        for (const student of imported.students) await backend.saveStudent(student);
        for (const researcher of imported.researchers) await backend.saveResearcher(researcher);
        for (const profile of imported.staff) await backend.saveStaff(profile);
        for (const facility of imported.facilities) await backend.saveFacility(facility);
        for (const record of imported.equipment) await backend.saveEquipment(record);
        for (const service of imported.services) await backend.saveService(service);
        await loadSharedRegistry();
      } else {
        db = normalizeDatabase(imported); save(); renderAll();
      }
      showView("overview"); showToast("Registry backup imported");
    }
  } catch { showToast("Could not import: file is not a valid registry backup"); }
  event.target.value = "";
});

$("#seed-atlas-equipment").addEventListener("click", async event => {
  const facilities = atlasSeedFacilities();
  const records = atlasSeedEquipment();
  const confirmed = await askConfirm(
    "Seed fallback atlas equipment?",
    `Add ${records.length} missing Equipment Atlas record${records.length === 1 ? "" : "s"} and ${facilities.length} missing facility cluster${facilities.length === 1 ? "" : "s"} to ${backendReady ? "Supabase" : "this browser"} without creating faculty profiles or custodians?`
  );
  if (!confirmed) return;
  setBusy(event.currentTarget, true, "Seeding…");
  try {
    if (backendReady) {
      for (const facility of facilities) await backend.saveFacility(facility);
      for (const record of records) await backend.saveEquipment(record);
      await loadSharedRegistry();
    } else {
      db.facilities = [...db.facilities, ...facilities];
      db.equipment = [...db.equipment, ...records];
      save();
      renderAll();
    }
    showView("equipment");
    showToast(records.length ? `${records.length} fallback equipment record${records.length === 1 ? "" : "s"} seeded` : "All fallback equipment already exists");
  } catch (error) {
    showToast(error.message || "Could not seed fallback equipment");
  } finally {
    setBusy(event.currentTarget, false);
  }
});

$("#refresh-scopus-metrics").addEventListener("click", async event => {
  if (!backendReady) {
    showToast("Sign in to Supabase before refreshing Scopus metrics");
    return;
  }
  if (!backend?.refreshScopusMetrics) {
    showToast("Scopus refresh support is not available in this build");
    return;
  }
  const profilesWithScopus = db.faculty.filter(profile => extractScopusAuthorId(profile.profileLinks?.scopus));
  const confirmed = await askConfirm(
    "Refresh Scopus metrics?",
    `Update h-index, citation count, and document count for ${profilesWithScopus.length} faculty profile${profilesWithScopus.length === 1 ? "" : "s"} with Scopus Author IDs?`
  );
  if (!confirmed) return;
  setBusy(event.currentTarget, true, "Refreshing…");
  try {
    const result = await backend.refreshScopusMetrics();
    await loadSharedRegistry();
    const updated = Number(result?.updated || 0);
    const skipped = Number(result?.skipped || 0);
    showToast(`Scopus metrics refreshed for ${updated} profile${updated === 1 ? "" : "s"}${skipped ? `; ${skipped} skipped` : ""}`);
  } catch (error) {
    const message = /FunctionsHttpError|404|refresh-scopus-metrics/i.test(String(error.message || ""))
      ? "Deploy the refresh-scopus-metrics Edge Function and set ELSEVIER_API_KEY first."
      : error.message || "Could not refresh Scopus metrics";
    showToast(message);
  } finally {
    setBusy(event.currentTarget, false);
  }
});

$("#seed-sample-data").addEventListener("click", async event => {
  const confirmed = await askConfirm("Seed example records?", `Add or update ${sampleDatabase.faculty.length} example faculty profiles, ${sampleDatabase.students.length} student records, ${sampleDatabase.equipment.length} example equipment records, ${sampleDatabase.facilities.length} facilities, and ${sampleDatabase.services.length} services in ${backendReady ? "Supabase" : "this browser"}?`);
  if (!confirmed) return;
  setBusy(event.currentTarget, true, "Seeding…");
  try {
    if (backendReady) {
      for (const profile of sampleDatabase.faculty) await backend.saveFaculty(profile);
      for (const student of sampleDatabase.students) await backend.saveStudent(student);
      for (const facility of sampleDatabase.facilities) await backend.saveFacility(facility);
      for (const record of sampleDatabase.equipment) await backend.saveEquipment(record);
      for (const service of sampleDatabase.services) await backend.saveService(service);
      await loadSharedRegistry();
    } else {
      db = clone(sampleDatabase);
      save();
      renderAll();
    }
    showView("overview");
    showToast("Example registry records seeded");
  } catch (error) {
    showToast(error.message || "Could not seed example records");
  } finally {
    setBusy(event.currentTarget, false);
  }
});

$("#reset-data").addEventListener("click", async () => {
  if (backendReady) {
    showToast("Sample reset is disabled while Supabase is active");
    return;
  }
  const confirmed = await askConfirm("Reset the prototype database?", "All browser edits will be removed and the original sample records restored.");
  if (confirmed) { db = clone(sampleDatabase); save(); renderAll(); showView("overview"); showToast("Sample database restored"); }
});

$("#auth-form").addEventListener("submit", async event => {
  event.preventDefault();
  if (!backendConfigured) return;
  if (!event.currentTarget.reportValidity()) return;
  hideAccessIssuePanel();
  const email = $("#auth-email").value.trim();
  const password = $("#auth-password").value;
  setBusy($("#auth-submit"), true, "Signing in…");
  try {
    const session = await backend.signIn(email, password);
    currentSession = session || await backend.getSession();
    const loaded = await loadSharedRegistry({ showGate: false });
    if (!loaded) {
      showAccessIssue(
        `${lastRegistryError?.message || "Password accepted, but Supabase blocked access to the internal registry."} Confirm this email matches a faculty profile owner email, or add it to public.registry_admins with active = true for manager access.`,
        currentSession?.user?.email || email
      );
      return;
    }
    showToast("Signed in to shared registry");
  } catch (error) {
    $("#auth-message").textContent = error.message || "Could not sign in. Check your account and Supabase settings.";
  } finally {
    setBusy($("#auth-submit"), false);
  }
});

$("#sign-out").addEventListener("click", async () => {
  try {
    await backend.signOut();
    showAuthGate("Signed out. Sign in again to manage the shared registry.");
  } catch (error) {
    showToast(error.message || "Could not sign out");
  }
});

$("#access-sign-out").addEventListener("click", async () => {
  try {
    await backend.signOut();
    showAuthGate("Signed out. You can sign in again with another registered faculty or manager email and password.");
  } catch (error) {
    showToast(error.message || "Could not sign out");
  }
});

$("#change-password").addEventListener("click", () => {
  $("#password-form").reset();
  $("#password-message").textContent = "";
  $("#password-message").className = "";
  $("#password-dialog").showModal();
  setTimeout(() => $("#new-password").focus(), 50);
});

$("#password-form").addEventListener("submit", async event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const password = $("#new-password").value;
  const confirmPassword = $("#confirm-password").value;
  const message = $("#password-message");
  message.className = "";
  if (password !== confirmPassword) {
    message.textContent = "Passwords do not match.";
    message.classList.add("is-error");
    $("#confirm-password").focus();
    return;
  }
  setBusy($("#password-submit"), true, "Updating…");
  try {
    await backend.updatePassword(password);
    message.textContent = "Password updated successfully.";
    message.classList.add("is-success");
    showToast("Password updated");
    setTimeout(() => $("#password-dialog").close(), 900);
  } catch (error) {
    message.textContent = error.message || "Could not update password.";
    message.classList.add("is-error");
  } finally {
    setBusy($("#password-submit"), false);
  }
});

async function boot() {
  setRegistryMode();
  setUserChip();
  if (!backendConfigured) {
    renderAll();
    return;
  }
  try {
    const callbackSession = await backend.completeAuthFromUrl();
    if (callbackSession) {
      currentSession = callbackSession;
      $("#auth-message").textContent = "Email link confirmed. Loading the shared registry…";
    }
    currentSession = await backend.getSession();
    if (!currentSession) {
      showAuthGate();
      return;
    }
    const loaded = await loadSharedRegistry({ showGate: false });
    if (!loaded) {
      showAccessIssue(callbackSession
        ? "Supabase confirmed your email, but blocked access to the internal registry."
        : "This account is signed in, but Supabase blocked access to the internal registry.",
      currentSession.user?.email, Boolean(callbackSession));
    }
  } catch (error) {
    showAuthGate(`Supabase sign-in could not be completed: ${error.message || "Could not connect to Supabase."}`);
  }
}

boot();
