const REGISTRY_STORAGE_KEY = "sut-physics-equipment-registry-v3";
const STUDY_PROGRAMS = {
  "bsc-physics": { label: "B.Sc. Physics", level: "Bachelor" },
  "msc-physics": { label: "M.Sc. Physics", level: "Master" },
  "msc-applied-physics": { label: "M.Sc. Applied Physics", level: "Master" },
  "phd-physics": { label: "Ph.D. Physics", level: "PhD" },
  "phd-applied-physics": { label: "Ph.D. Applied Physics", level: "PhD" }
};

const fallbackFaculty = [
  { id: "FACULTY-001", name: "Yupeng Yan", title: "Professor", email: "", bio: "", researchInterests: ["Physics program faculty"], highlights: [], activities: [], recognitions: [], profileLinks: {}, color: "#8fd8c8", publicReady: true, sample: true },
  { id: "FACULTY-002", name: "Santi Maensiri", title: "Professor", email: "", bio: "", researchInterests: ["Materials physics"], highlights: [], activities: ["Dean"], recognitions: [], profileLinks: {}, color: "#9bc7ee", publicReady: true, sample: true },
  { id: "FACULTY-003", name: "Sirichoke Jungthawan", title: "Associate Professor", email: "", bio: "", researchInterests: ["Physics program faculty"], highlights: [], activities: ["Head"], recognitions: [], profileLinks: {}, color: "#f4c26d", publicReady: true, sample: true },
  { id: "FACULTY-004", name: "Ayut Limphirat", title: "Associate Professor", email: "", bio: "", researchInterests: ["Physics program faculty"], highlights: [], activities: ["Vice Dean"], recognitions: [], profileLinks: {}, color: "#e8a89a", publicReady: true, sample: true },
  { id: "FACULTY-005", name: "Prapan Maenyum", title: "Associate Professor", email: "", bio: "", researchInterests: ["Physics program faculty"], highlights: [], activities: [], recognitions: [], profileLinks: {}, color: "#b8d276", publicReady: true, sample: true },
  { id: "FACULTY-006", name: "Poemwai Chainakul", title: "Assistant Professor", email: "", bio: "", researchInterests: ["Physics program faculty"], highlights: [], activities: [], recognitions: [], profileLinks: {}, color: "#c1b2df", publicReady: true, sample: true },
  { id: "FACULTY-007", name: "Puangratana Pairo", title: "Associate Professor", email: "", bio: "", researchInterests: ["Physics program faculty"], highlights: [], activities: [], recognitions: [], profileLinks: {}, color: "#7fc5b2", publicReady: true, sample: true },
  { id: "FACULTY-008", name: "Wittawat Saenrang", title: "Associate Professor", email: "", bio: "", researchInterests: ["Physics program faculty"], highlights: [], activities: [], recognitions: [], profileLinks: {}, color: "#74dfce", publicReady: true, sample: true },
  { id: "FACULTY-009", name: "Worawat Meevassana", title: "Associate Professor", email: "", bio: "", researchInterests: ["Physics program faculty"], highlights: [], activities: ["Vice Dean"], recognitions: [], profileLinks: {}, color: "#8fc3ff", publicReady: true, sample: true },
  { id: "FACULTY-010", name: "Prayoon Songsiriritthikul", title: "Associate Professor", email: "", bio: "", researchInterests: ["Physics program faculty"], highlights: [], activities: [], recognitions: [], profileLinks: {}, color: "#ff8b5b", publicReady: true, sample: true },
  { id: "FACULTY-011", name: "Panomsak Meemon", title: "Associate Professor", email: "", bio: "", researchInterests: ["Biomedical optics"], highlights: [], activities: [], recognitions: [], profileLinks: {}, color: "#d7ff3f", publicReady: true, sample: true },
  { id: "FACULTY-012", name: "Chinorat Kobdaj", title: "Assistant Professor", email: "", bio: "", researchInterests: ["Physics program faculty"], highlights: [], activities: [], recognitions: [], profileLinks: {}, color: "#b59cff", publicReady: true, sample: true },
  { id: "FACULTY-013", name: "Khanchai Kosolthongkee", title: "Assistant Professor", email: "", bio: "", researchInterests: ["Physics program faculty"], highlights: [], activities: ["Vice Dean"], recognitions: [], profileLinks: {}, color: "#ffc95c", publicReady: true, sample: true },
  { id: "FACULTY-014", name: "Christoph Herold", title: "Assistant Professor", email: "", bio: "", researchInterests: ["Physics program faculty"], highlights: [], activities: [], recognitions: [], profileLinks: {}, color: "#8fd8c8", publicReady: true, sample: true },
  { id: "FACULTY-015", name: "Tirawut Worrakitpoonpol", title: "Assistant Professor", email: "", bio: "", researchInterests: ["Physics program faculty"], highlights: [], activities: [], recognitions: [], profileLinks: {}, color: "#9bc7ee", publicReady: true, sample: true },
  { id: "FACULTY-016", name: "Michael F. Smith", title: "Assistant Professor", email: "", bio: "", researchInterests: ["Physics program faculty"], highlights: [], activities: [], recognitions: [], profileLinks: {}, color: "#f4c26d", publicReady: true, sample: true },
  { id: "FACULTY-017", name: "Ittipon Fongkaew", title: "Assistant Professor", email: "", bio: "", researchInterests: ["Physics program faculty"], highlights: [], activities: [], recognitions: [], profileLinks: {}, color: "#e8a89a", publicReady: true, sample: true },
  { id: "FACULTY-018", name: "Warintorn Srithawong", title: "Dr.", email: "", bio: "", researchInterests: ["Physics program faculty"], highlights: [], activities: [], recognitions: [], profileLinks: {}, color: "#b8d276", publicReady: true, sample: true },
  { id: "FACULTY-019", name: "Narongrit Ritjoho", title: "Dr.", email: "", bio: "", researchInterests: ["Physics program faculty"], highlights: [], activities: [], recognitions: [], profileLinks: {}, color: "#c1b2df", publicReady: true, sample: true },
  { id: "FACULTY-020", name: "Wiwat Nuansing", title: "Dr.", email: "", bio: "", researchInterests: ["Physics program faculty"], highlights: [], activities: [], recognitions: [], profileLinks: {}, color: "#7fc5b2", publicReady: true, sample: true },
  { id: "FACULTY-021", name: "Monchai Jitvisate", title: "Dr.", email: "", bio: "", researchInterests: ["Physics program faculty"], highlights: [], activities: [], recognitions: [], profileLinks: {}, color: "#74dfce", publicReady: true, sample: true },
  { id: "FACULTY-022", name: "Artitsupa Boontan", title: "Dr.", email: "", bio: "", researchInterests: ["Physics program faculty"], highlights: [], activities: [], recognitions: [], profileLinks: {}, color: "#8fc3ff", publicReady: true, sample: true },
  { id: "FACULTY-023", name: "Sorawis Sangtawesin", title: "Dr.", email: "", bio: "", researchInterests: ["Physics program faculty"], highlights: [], activities: [], recognitions: [], profileLinks: {}, color: "#ff8b5b", publicReady: true, sample: true },
  { id: "FACULTY-024", name: "Wanvisa Talataisong", title: "Dr.", email: "", bio: "", researchInterests: ["Physics program faculty"], highlights: [], activities: [], recognitions: [], profileLinks: {}, color: "#d7ff3f", publicReady: true, sample: true }
];

const fallbackFacilities = [
  { id: "FAC-01", name: "Advanced Microscopy & Biomedical Photonics Facility", color: "#8fd8c8" },
  { id: "FAC-02", name: "Infrared & Optical Spectroscopy Facility", color: "#9bc7ee" },
  { id: "FAC-03", name: "Ultrafast Laser & Optical Data Systems Facility", color: "#f4c26d" },
  { id: "FAC-04", name: "Advanced Materials Fabrication Facility", color: "#e8a89a" },
  { id: "FAC-05", name: "Optical Fiber & Integrated Photonics Facility", color: "#b8d276" },
  { id: "FAC-06", name: "Quantum Computing Laboratory", color: "#c1b2df" },
  { id: "FAC-07", name: "AI, Machine Vision & Medical Intelligence Laboratory", color: "#7fc5b2" }
];

const fallbackFacultyFacilityMap = {
  "FACULTY-002": ["FAC-04"],
  "FACULTY-009": ["FAC-05"],
  "FACULTY-011": ["FAC-01", "FAC-03"],
  "FACULTY-016": ["FAC-06"],
  "FACULTY-022": ["FAC-07"]
};
const fallbackFacultyFacilities = id => {
  const number = Number(String(id).replace(/\D/g, ""));
  return fallbackFacultyFacilityMap[id] || (Number.isFinite(number) && number > 0 ? [`FAC-${String((number - 1) % 7 + 1).padStart(2, "0")}`] : []);
};

const fallbackEquipment = [
  { id: "EQ-01", name: "Photon Counting Scanning Confocal Microscopy", category: "Imaging", facilityId: "FAC-01", researchGroup: "Biomedical photonics" },
  { id: "EQ-04", name: "Fourier Transform Infrared Spectroscopy Lab", category: "Spectroscopy", facilityId: "FAC-02", researchGroup: "Optical spectroscopy" },
  { id: "EQ-07", name: "Electrospinning Material Fabrication and Testing", category: "Materials preparation", facilityId: "FAC-04", researchGroup: "Functional materials" },
  { id: "EQ-10", name: "Quantum Computing Lab", category: "Computing", facilityId: "FAC-06", researchGroup: "Quantum technologies" },
  { id: "EQ-17", name: "Deep Learning Lab", category: "Computing", facilityId: "FAC-07", researchGroup: "Artificial intelligence" }
];

const palette = ["#74dfce", "#8fc3ff", "#ff8b5b", "#d7ff3f", "#b59cff", "#ffc95c"];
const clean = value => String(value ?? "").replace(/[&<>'"]/g, character => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
}[character]));
const list = value => Array.isArray(value) ? value.filter(Boolean) : String(value || "").split(/\r?\n|,/).map(item => item.trim()).filter(Boolean);
const photoSrc = photo => photo?.url || photo?.data || "";
const safeColor = (value, fallback = palette[0]) => /^#[0-9a-f]{3,8}$/i.test(String(value || "")) ? value : fallback;
const validEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
const keyFor = value => String(value || "").trim().toLowerCase().replace(/\s+/g, " ");
const numberText = value => Number.isFinite(Number(value)) ? Number(value).toLocaleString() : "";
const programLabel = value => STUDY_PROGRAMS[value]?.label || value || "Program TBD";
const startLabel = student => student.startYear ? `${student.startTerm ? `Term ${student.startTerm}, ` : ""}${student.startYear}` : "Start TBD";
const profileKey = profile => keyFor(profile.id || profile.name);
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
const facultyNameCorrections = {
  "Worawat Meewassana": "Worawat Meevassana",
  "Prayoon Songsirittikul": "Prayoon Songsiriritthikul",
  "Khanchar Kosalathongkee": "Khanchai Kosolthongkee",
  "Michale F. Smith": "Michael F. Smith",
  "Artitsupa Bootan": "Artitsupa Boontan"
};
const canonicalFacultyName = value => keyFor(String(facultyNameCorrections[value] || value || "")
  .replace(/\b(distinguished|associate|assistant)\s+professor\b/gi, " ")
  .replace(/\b(assoc|asst)\.?\s*prof\.?\b/gi, " ")
  .replace(/\bprofessor\b|\bprof\.?\b|\bdr\.?\b|\blecturer\b/gi, " ")
  .replace(/\b(dean|vice dean|head)\b/gi, " ")
  .replace(/[^a-z0-9]+/gi, " "));
const facultyIdentityKeys = profile => [...new Set([
  profileKey(profile),
  keyFor(profile.name),
  canonicalFacultyName(profile.name)
].filter(Boolean))];
const isPlaceholder = value => {
  const text = String(value || "").trim().toLowerCase();
  return !text || text.includes("to verify") || text.includes("not assigned") || text.includes("faculty owner");
};
const isPlaceholderContent = value => {
  const text = String(value || "").trim().toLowerCase();
  return !text ||
    text.includes("to verify") ||
    text.includes("to update") ||
    text.includes("dummy faculty profile") ||
    text.includes("replace with verified") ||
    text.includes("recognition or appointment") ||
    text.includes("research highlight");
};
const slug = value => String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

let registryAvailable = false;
let fallbackMode = false;
let registry = { faculty: [], facilities: [], equipment: [], students: [] };

const publicCategory = item => {
  const text = `${item.name} ${item.category}`.toLowerCase();
  if (text.includes("electrosp") || text.includes("3d print") || text.includes("fabricat") || text.includes("photonics on chip") || text.includes("fiber sensor")) return "fabricate";
  if (text.includes("microscop") || text.includes("tomograph") || text.includes("vein finder") || text.includes("machine vision") || item.category === "Imaging") return "observe";
  if (item.category === "Computing" || text.includes("deep learning") || text.includes("quantum computing") || text.includes("medical diagnosis")) return "model";
  return "measure";
};

const normalizeFaculty = profile => {
  const facilityIds = list(profile.facilityIds);
  return {
    ...profile,
    id: profile.id || `faculty-${slug(profile.name)}`,
    name: facultyNameCorrections[profile.name] || profile.name || "Faculty profile",
    title: profile.title || "Faculty member",
    email: profile.email || "",
    bio: profile.bio && !isPlaceholderContent(profile.bio) ? profile.bio : "",
    researchInterests: list(profile.researchInterests).filter(item => !isPlaceholderContent(item)),
    highlights: list(profile.highlights).filter(item => !isPlaceholderContent(item)),
    activities: list(profile.activities).filter(item => !isPlaceholderContent(item)),
    recognitions: list(profile.recognitions).filter(item => !isPlaceholderContent(item)),
    profileLinks: profile.profileLinks && typeof profile.profileLinks === "object" ? profile.profileLinks : {},
    scopusMetrics: profile.scopusMetrics && typeof profile.scopusMetrics === "object" ? profile.scopusMetrics : null,
    manualMetrics: profile.manualMetrics && typeof profile.manualMetrics === "object" ? profile.manualMetrics : null,
    facilityIds: facilityIds.length ? facilityIds : profile.sample ? fallbackFacultyFacilities(profile.id) : [],
    profilePhoto: profile.profilePhoto || null,
    color: profile.color || ""
  };
};

const sameListContent = (left, right) => {
  const leftKeys = list(left).map(keyFor).filter(Boolean).sort();
  const rightKeys = list(right).map(keyFor).filter(Boolean).sort();
  return leftKeys.length === rightKeys.length && leftKeys.every((key, index) => key === rightKeys[index]);
};
const hasRealListContent = values => list(values).some(item => !isPlaceholderContent(item) && keyFor(item) !== "physics program faculty");
const hasRealProfileLinks = profile => Object.values(profile.profileLinks || {}).some(url => /^https?:\/\//.test(String(url || "")));
const hasManualMetrics = profile => {
  const metrics = profile?.manualMetrics || {};
  return Number.isFinite(Number(metrics.hIndex)) || Number.isFinite(Number(metrics.citationCount));
};
const hasUpdatedFacultyInfo = (profile, fallbackProfile = null) => {
  if (!profile) return false;
  const listUpdated = key => hasRealListContent(profile[key]) && (!fallbackProfile || !sameListContent(profile[key], fallbackProfile[key]));
  return Boolean(
    validEmail(profile.email) ||
    photoSrc(profile.profilePhoto) ||
    hasRealProfileLinks(profile) ||
    hasManualMetrics(profile) ||
    (profile.bio && !isPlaceholderContent(profile.bio) && (!fallbackProfile || keyFor(profile.bio) !== keyFor(fallbackProfile.bio))) ||
    listUpdated("researchInterests") ||
    listUpdated("highlights") ||
    listUpdated("activities") ||
    listUpdated("recognitions") ||
    (Array.isArray(profile.facilityIds) && profile.facilityIds.length && !sameListContent(profile.facilityIds, fallbackProfile?.facilityIds || []))
  );
};
const facultyDedupeKey = profile => canonicalFacultyName(profile.name) || keyFor(profile.email) || profileKey(profile);
const facultyContentScore = profile => [
  profile.sample ? 0 : 100,
  hasUpdatedFacultyInfo(profile) ? 50 : 0,
  photoSrc(profile.profilePhoto) ? 20 : 0,
  validEmail(profile.email) ? 12 : 0,
  hasRealProfileLinks(profile) ? 10 : 0,
  list(profile.researchInterests).filter(item => !isPlaceholderContent(item)).length,
  list(profile.highlights).filter(item => !isPlaceholderContent(item)).length,
  list(profile.activities).filter(item => !isPlaceholderContent(item)).length,
  list(profile.recognitions).filter(item => !isPlaceholderContent(item)).length,
  list(profile.facilityIds).length
].reduce((total, value) => total + value, 0);
const dedupeFacultyProfiles = profiles => {
  const result = [];
  const indexByKey = new Map();
  profiles.forEach(profile => {
    const key = facultyDedupeKey(profile);
    if (!key || !indexByKey.has(key)) {
      indexByKey.set(key, result.length);
      result.push(profile);
      return;
    }
    const existingIndex = indexByKey.get(key);
    if (facultyContentScore(profile) > facultyContentScore(result[existingIndex])) result[existingIndex] = profile;
  });
  return result;
};

const mergeFacultyProfile = (fallbackProfile, liveProfile) => {
  if (!liveProfile) return fallbackProfile;
  const liveUpdated = hasUpdatedFacultyInfo(liveProfile, fallbackProfile);
  if (!fallbackProfile || liveUpdated) {
    return {
      ...fallbackProfile,
      ...liveProfile,
      id: liveProfile.id || fallbackProfile?.id,
      name: liveProfile.name || fallbackProfile?.name,
      title: liveProfile.title || fallbackProfile?.title || "Faculty member",
      bio: liveProfile.bio && !isPlaceholderContent(liveProfile.bio) ? liveProfile.bio : fallbackProfile?.bio || "",
      researchInterests: hasRealListContent(liveProfile.researchInterests) ? liveProfile.researchInterests : fallbackProfile?.researchInterests || liveProfile.researchInterests || [],
      highlights: hasRealListContent(liveProfile.highlights) ? liveProfile.highlights : fallbackProfile?.highlights || liveProfile.highlights || [],
      activities: hasRealListContent(liveProfile.activities) ? liveProfile.activities : fallbackProfile?.activities || liveProfile.activities || [],
      recognitions: hasRealListContent(liveProfile.recognitions) ? liveProfile.recognitions : fallbackProfile?.recognitions || liveProfile.recognitions || [],
      facilityIds: liveProfile.facilityIds.length ? liveProfile.facilityIds : fallbackProfile?.facilityIds || [],
      profileLinks: hasRealProfileLinks(liveProfile) ? liveProfile.profileLinks : fallbackProfile?.profileLinks || {},
      profilePhoto: liveProfile.profilePhoto || fallbackProfile?.profilePhoto || null,
      color: liveProfile.color || fallbackProfile?.color || "",
      sample: !liveUpdated && (liveProfile.sample || fallbackProfile?.sample || false)
    };
  }
  return fallbackProfile;
};

const mergeFacultyWithFallback = liveFaculty => {
  const fallback = fallbackFaculty.map(normalizeFaculty);
  const live = liveFaculty.map(normalizeFaculty);
  const byIdentity = new Map();
  live.forEach(profile => facultyIdentityKeys(profile).forEach(key => {
    const existing = byIdentity.get(key);
    if (!existing || facultyContentScore(profile) > facultyContentScore(existing)) byIdentity.set(key, profile);
  }));
  const merged = fallback.map(profile => {
    const liveProfile = facultyIdentityKeys(profile).map(key => byIdentity.get(key)).find(Boolean);
    return mergeFacultyProfile(profile, liveProfile);
  });
  const fallbackKeys = new Set(merged.flatMap(facultyIdentityKeys));
  const additions = live.filter(profile => !facultyIdentityKeys(profile).some(key => fallbackKeys.has(key)));
  return dedupeFacultyProfiles([...merged, ...additions]);
};

const mergeFacilitiesWithFallback = liveFacilities => {
  const live = Array.isArray(liveFacilities) ? liveFacilities : [];
  const byId = new Map(live.map(facility => [facility.id, facility]));
  const byName = new Map(live.map(facility => [keyFor(facility.name), facility]));
  const merged = fallbackFacilities.map(facility => byId.get(facility.id) || byName.get(keyFor(facility.name)) || { ...facility });
  const mergedKeys = new Set(merged.flatMap(facility => [facility.id, keyFor(facility.name)]));
  return [...merged, ...live.filter(facility => !mergedKeys.has(facility.id) && !mergedKeys.has(keyFor(facility.name)))];
};

const normalizeEquipment = item => ({
  ...item,
  id: item.id || "",
  category: publicCategory(item),
  researchGroup: item.researchGroup || item.category || "Research area",
  custodian: item.custodian || "",
  email: item.email || "",
  facilityId: item.facilityId || ""
});

const visibleStudent = student => student.verificationStatus === "Verified" && student.publicReady === true;

const normalizeStudent = student => ({
  id: student.id || "",
  studentCode: student.studentCode || "",
  name: student.name || "Student name to confirm",
  preferredName: student.preferredName || "",
  level: student.level === "Undergraduate" ? "Bachelor" : student.level || STUDY_PROGRAMS[student.programId]?.level || "Bachelor",
  status: student.status || "Active",
  verificationStatus: student.verificationStatus || "Pending",
  publicReady: Boolean(student.publicReady),
  programId: student.programId || "",
  advisorId: student.advisorId || "",
  coadvisor: student.coadvisor || "",
  researchGroupId: student.researchGroupId || "",
  researchGroup: student.researchGroup || "",
  projectTitle: student.projectTitle || "",
  thesisTitle: student.thesisTitle || "",
  startTerm: student.startTerm || "",
  startYear: student.startYear || "",
  shortBio: student.shortBio || "",
  researchInterests: list(student.researchInterests).slice(0, 5),
  skills: list(student.skills),
  updatedAt: student.updatedAt || ""
});

const prepareFallbackRegistry = () => {
  fallbackMode = true;
  return {
    faculty: fallbackFaculty.map(normalizeFaculty),
    facilities: fallbackFacilities.map(item => ({ ...item })),
    equipment: fallbackEquipment.map(normalizeEquipment),
    students: []
  };
};

const loadLocalRegistry = () => {
  try {
    const stored = localStorage.getItem(REGISTRY_STORAGE_KEY);
    if (!stored) return prepareFallbackRegistry();
    const parsed = JSON.parse(stored);
    const publicFaculty = (parsed.faculty || []).filter(profile => profile.publicReady !== false).map(normalizeFaculty);
    const publicEquipment = (parsed.equipment || [])
      .filter(item => item.reviewStatus === "Verified" && item.publicReady === true)
      .map(normalizeEquipment);
    const publicStudents = (parsed.students || []).map(normalizeStudent).filter(visibleStudent);
    const facilities = Array.isArray(parsed.facilities) ? parsed.facilities : [];
    if (!publicFaculty.length && !publicEquipment.length && !publicStudents.length && !facilities.length) return prepareFallbackRegistry();
    const faculty = mergeFacultyWithFallback(publicFaculty);
    fallbackMode = faculty.some(profile => profile.sample);
    return {
      faculty,
      facilities: mergeFacilitiesWithFallback(facilities),
      equipment: publicEquipment.length ? publicEquipment : fallbackEquipment.map(normalizeEquipment),
      students: publicStudents
    };
  } catch {
    return prepareFallbackRegistry();
  }
};

const loadFacultyRegistry = async () => {
  registryAvailable = false;
  fallbackMode = false;
  if (window.SUTSupabase?.isConfigured?.()) {
    try {
      const loaded = await window.SUTSupabase.loadRegistry({ publicOnly: true });
      const faculty = (loaded.faculty || []).map(normalizeFaculty);
      const equipment = (loaded.equipment || []).map(normalizeEquipment);
      const facilities = Array.isArray(loaded.facilities) ? loaded.facilities : [];
      let studentLoad = { students: [] };
      if (window.SUTSupabase.loadPublicStudents) {
        try {
          studentLoad = await window.SUTSupabase.loadPublicStudents();
        } catch (error) {
          console.warn("Supabase public student registry unavailable; hiding faculty advisees.", error);
        }
      }
      const students = (studentLoad.students || []).map(normalizeStudent).filter(visibleStudent);
      if (faculty.length || equipment.length || facilities.length || students.length) {
        registryAvailable = true;
        const mergedFaculty = mergeFacultyWithFallback(faculty);
        fallbackMode = mergedFaculty.some(profile => profile.sample);
        return {
          faculty: mergedFaculty,
          facilities: mergeFacilitiesWithFallback(facilities),
          equipment: equipment.length ? equipment : fallbackEquipment.map(normalizeEquipment),
          students
        };
      }
    } catch (error) {
      console.warn("Supabase faculty registry unavailable; using local/prototype data.", error);
    }
  }
  return loadLocalRegistry();
};

const initialsFor = name => {
  if (isPlaceholder(name)) return "FP";
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]).join("").toUpperCase();
};

const linkedEquipment = profile => registry.equipment.filter(item => {
  const facilityMatch = list(profile.facilityIds).includes(item.facilityId);
  const emailMatch = profile.email && item.email && item.email.toLowerCase() === profile.email.toLowerCase();
  const nameMatch = !isPlaceholder(profile.name) && item.custodian && item.custodian.toLowerCase().includes(profile.name.toLowerCase());
  const interestMatch = profile.researchInterests.some(interest => `${item.name} ${item.researchGroup} ${item.category}`.toLowerCase().includes(interest.toLowerCase()));
  return facilityMatch || emailMatch || nameMatch || interestMatch;
});

const adviseesFor = profile => {
  const profileKeys = facultyIdentityKeys(profile);
  return registry.students.filter(student => {
    const advisorKey = keyFor(student.advisorId);
    if (!advisorKey || advisorKey === "tbd") return false;
    return profileKeys.includes(advisorKey) || profileKeys.includes(canonicalFacultyName(student.advisorId));
  });
};

const adviseeHeadline = student => student.projectTitle || student.thesisTitle || student.researchGroup || "Research topic to be announced";

const adviseeCard = student => {
  const interests = list(student.researchInterests).slice(0, 5);
  return `
    <article>
      <span>${clean(programLabel(student.programId))}</span>
      <h3>${clean(student.preferredName || student.name)}</h3>
      <p>${clean(student.shortBio || adviseeHeadline(student))}</p>
      <dl class="profile-advisee-meta">
        <div><dt>Level</dt><dd>${clean(student.level || "TBD")}</dd></div>
        <div><dt>Started</dt><dd>${clean(startLabel(student))}</dd></div>
        <div><dt>Status</dt><dd>${clean(student.status || "Active")}</dd></div>
      </dl>
      ${interests.length ? `<div class="profile-advisee-tags">${interests.map(interest => `<small>${clean(interest)}</small>`).join("")}</div>` : ""}
    </article>
  `;
};

const facilityById = id => registry.facilities.find(facility => facility.id === id);

const associatedFacilityIds = profile => [...new Set([
  ...list(profile.facilityIds),
  ...linkedEquipment(profile).map(item => item.facilityId).filter(Boolean)
])];

const associatedFacilities = profile => associatedFacilityIds(profile)
  .map(id => facilityById(id)?.name || id)
  .filter(Boolean);

const categoriesFor = profile => {
  const linked = linkedEquipment(profile).map(item => item.category);
  const interestText = profile.researchInterests.join(" ").toLowerCase();
  const categories = new Set(linked);
  if (/fabricat|material|fiber|chip|print|electrosp/.test(interestText)) categories.add("fabricate");
  if (/microscop|imaging|vision|tomograph|observe/.test(interestText)) categories.add("observe");
  if (/comput|ai|learning|quantum|model/.test(interestText)) categories.add("model");
  if (!categories.size) categories.add("measure");
  return categories;
};

const linkLabels = {
  academic: "Personal website",
  scopus: "Scopus",
  researchGate: "ResearchGate",
  googleScholar: "Google Scholar",
  orcid: "ORCID"
};

const platformMarks = {
  academic: "AP",
  scopus: "S",
  researchGate: "RG",
  googleScholar: "G",
  orcid: "iD"
};

const profileLinkOrder = ["orcid", "scopus", "researchGate", "googleScholar", "academic"];
const externalLinks = profile => profileLinkOrder
  .map(key => [key, profile.profileLinks?.[key]])
  .filter(([, url]) => /^https?:\/\//.test(String(url || "")))
  .map(([key, url]) => ({ key, label: linkLabels[key] || key, mark: platformMarks[key] || "↗", url }));

const scopusAuthorIdFor = profile => profile.scopusMetrics?.scopusAuthorId || extractScopusAuthorId(profile.profileLinks?.scopus);
const hasScopusMetrics = profile => {
  const metrics = profile.scopusMetrics || {};
  return Number.isFinite(Number(metrics.hIndex)) || Number.isFinite(Number(metrics.citationCount)) || Number.isFinite(Number(metrics.documentCount));
};
const profileMetricsFor = profile => {
  if (hasScopusMetrics(profile)) return { metrics: profile.scopusMetrics || {}, source: "scopus" };
  if (hasManualMetrics(profile)) return { metrics: profile.manualMetrics || {}, source: "manual" };
  return null;
};
const scopusMetricsMarkup = profile => {
  const profileMetrics = profileMetricsFor(profile);
  if (!profileMetrics) return "";
  const { metrics, source } = profileMetrics;
  const updated = metrics.updatedAt ? new Date(metrics.updatedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "";
  const isScopus = source === "scopus";
  return `
    <section class="profile-metrics section-shell" aria-labelledby="citation-metrics-title">
      <div class="section-heading">
        <p class="section-index">${isScopus ? "Scopus metrics" : "Faculty-provided metrics"}</p>
        <div>
          <h2 id="citation-metrics-title">Citation profile<br />${isScopus ? "from Scopus." : "available metrics."}</h2>
          <p>${isScopus ? "Metrics are refreshed from the Scopus Author ID found in the faculty member's Scopus profile link." : "These values are shown when refreshed Scopus data is not available."}</p>
        </div>
      </div>
      <div class="profile-metric-grid">
        <article><span>H-index</span><strong>${clean(numberText(metrics.hIndex) || "NA")}</strong></article>
        <article><span>Citations</span><strong>${clean(numberText(metrics.citationCount) || "NA")}</strong></article>
        ${isScopus ? `<article><span>Documents</span><strong>${clean(numberText(metrics.documentCount) || "NA")}</strong></article>` : ""}
        <p>${clean(isScopus ? `Scopus Author ID: ${scopusAuthorIdFor(profile) || "not detected"}${updated ? ` · Updated ${updated}` : ""}` : `Faculty-provided metrics${updated ? ` · Updated ${updated}` : ""}`)}</p>
      </div>
    </section>
  `;
};

const renderProfileCard = (profile, index) => {
  const linked = linkedEquipment(profile);
  const facilities = associatedFacilities(profile);
  const interests = profile.researchInterests.slice(0, 4);
  const color = safeColor(profile.color, palette[index % palette.length]);
  const portrait = photoSrc(profile.profilePhoto);
  return `
    <article class="faculty-card" data-categories="${clean([...categoriesFor(profile)].join(" "))}" style="--faculty-color:${color}">
      <div class="faculty-card-head">
        <span class="faculty-avatar">${portrait ? `<img src="${clean(portrait)}" alt="${clean(`${profile.name} profile picture`)}" />` : `<span aria-hidden="true">${clean(initialsFor(profile.name))}</span>`}</span>
        <span class="faculty-state">${profile.sample ? "Faculty contact" : "Faculty profile"}</span>
      </div>
      <h3>${clean(profile.name)}</h3>
      <p>${clean(profile.title || "Faculty member")}</p>
      <div class="faculty-tags">
        ${interests.length ? interests.map(item => `<span>${clean(item)}</span>`).join("") : `<span>Physics faculty</span>`}
      </div>
      <dl class="faculty-meta">
        <div><dt>Highlights</dt><dd>${profile.highlights.length}</dd></div>
        <div><dt>Facilities</dt><dd>${facilities.length}</dd></div>
        <div><dt>Linked systems</dt><dd>${linked.length}</dd></div>
      </dl>
      <a class="faculty-email" href="faculty.html?id=${encodeURIComponent(profile.id)}">Open profile <span aria-hidden="true">→</span></a>
    </article>
  `;
};

const renderFaculty = (filter = "all") => {
  const filtered = filter === "all"
    ? registry.faculty
    : registry.faculty.filter(profile => categoriesFor(profile).has(filter));
  document.querySelector("#faculty-grid").innerHTML = filtered.length
    ? filtered.map(renderProfileCard).join("")
    : `<div class="public-empty"><h3>No faculty profiles in this area yet</h3><p>Try another expertise area or browse all faculty contacts.</p></div>`;
};

const renderExpertise = () => {
  const areas = new Map();
  registry.faculty.forEach(profile => {
    const interests = profile.researchInterests.length ? profile.researchInterests : ["Physics faculty"];
    interests.forEach(interest => {
      const key = interest.toLowerCase();
      if (!areas.has(key)) areas.set(key, { title: interest, people: [], systems: new Set() });
      const area = areas.get(key);
      area.people.push(profile);
      linkedEquipment(profile).forEach(item => area.systems.add(item.name));
    });
  });

  const cards = [...areas.values()].slice(0, 12).map((area, index) => `
    <article class="expertise-card" style="--facility-bg:${palette[index % palette.length]}">
      <span class="expertise-index">${String(index + 1).padStart(2, "0")}</span>
      <h3>${clean(area.title)}</h3>
      <p>${clean(area.people.slice(0, 3).map(profile => profile.name).join(", ") || "Faculty contacts")}</p>
      <div class="expertise-foot">
        <span><strong>${area.people.length}</strong> faculty</span>
        <span><strong>${area.systems.size}</strong> linked system${area.systems.size === 1 ? "" : "s"}</span>
      </div>
    </article>
  `);

  document.querySelector("#expertise-grid").innerHTML = cards.length
    ? cards.join("")
    : `<div class="public-empty"><h3>No expertise map yet</h3><p>Browse faculty profiles above while this expertise map grows.</p></div>`;
};

const updateSummary = () => {
  const facultyCount = registry.faculty.length;
  const linkedSystems = new Set(registry.faculty.flatMap(profile => linkedEquipment(profile).map(item => item.id))).size;
  const areaCount = new Set(registry.faculty.flatMap(profile => profile.researchInterests)).size;
  const counts = ["observe", "fabricate", "measure", "model"].reduce((result, category) => {
    result[category] = registry.faculty.filter(profile => categoriesFor(profile).has(category)).length;
    return result;
  }, { all: facultyCount });

  document.querySelector("#faculty-contact-count").textContent = String(facultyCount).padStart(2, "0");
  document.querySelector("#faculty-facility-count").textContent = String(registry.facilities.length).padStart(2, "0");
  document.querySelector("#faculty-system-count").textContent = String(linkedSystems).padStart(2, "0");
  document.querySelector("#snapshot-faculty-count").textContent = String(facultyCount).padStart(2, "0");
  document.querySelector("#snapshot-area-count").textContent = String(areaCount).padStart(2, "0");
  document.querySelector("#snapshot-linked-count").textContent = String(linkedSystems).padStart(2, "0");

  Object.entries(counts).forEach(([category, count]) => {
    const target = document.querySelector(`[data-faculty-filter-count="${category}"]`);
    if (target) target.textContent = String(count).padStart(2, "0");
  });

  const liveFacultyCount = registry.faculty.filter(profile => !profile.sample).length;
  document.querySelector("#faculty-data-status").textContent = "Faculty expertise";
  document.querySelector("#faculty-data-message").textContent = fallbackMode
    ? liveFacultyCount
      ? `Browse ${liveFacultyCount} faculty profile${liveFacultyCount === 1 ? "" : "s"} alongside broader School of Physics contacts.`
      : "Browse faculty contacts and research areas connected to the School of Physics."
    : "Browse faculty profiles and research contacts from the School of Physics.";
  document.querySelector("#faculty-status-summary").textContent = `${facultyCount} faculty contact${facultyCount === 1 ? "" : "s"} with ${areaCount} research interest area${areaCount === 1 ? "" : "s"} and ${linkedSystems} linked public system${linkedSystems === 1 ? "" : "s"}.`;
};

const listMarkup = (title, items) => `
  <section class="profile-panel">
    <p class="section-index">${clean(title)}</p>
    <ul>${items.length ? items.map(item => `<li>${clean(item)}</li>`).join("") : `<li>Profile details will appear here as they become available.</li>`}</ul>
  </section>
`;

const renderProfilePage = profile => {
  const linked = linkedEquipment(profile);
  const advisees = adviseesFor(profile);
  const facilities = associatedFacilities(profile);
  const links = externalLinks(profile);
  const portrait = photoSrc(profile.profilePhoto);
  document.title = `${profile.name} · Faculty Profile`;
  document.querySelector("#main").innerHTML = `
    <section id="top" class="faculty-profile-hero" style="--faculty-color:${safeColor(profile.color, palette[0])}">
      <div>
        <p class="eyebrow"><span>Faculty profile</span><span>${clean(profile.sample ? "Faculty contact" : "Research infographic")}</span></p>
        <h1>${clean(profile.name)}</h1>
        <p class="hero-intro">${clean(profile.title || "Faculty member")}</p>
        <p class="profile-bio">${clean(profile.bio || "Biography and research interests will appear here as profile details are added.")}</p>
        <div class="profile-actions">
          ${validEmail(profile.email) ? `<a class="button button-primary" href="mailto:${clean(profile.email)}">Email faculty <span aria-hidden="true">↗</span></a>` : ""}
          <a class="text-link" href="faculty.html#directory">Back to faculty directory <span aria-hidden="true">→</span></a>
        </div>
      </div>
      <div class="profile-orbit${portrait ? " has-photo" : ""}">
        ${portrait ? `<img src="${clean(portrait)}" alt="${clean(`${profile.name} profile picture`)}" />` : `<span aria-hidden="true">${clean(initialsFor(profile.name))}</span>`}
        <i></i><i></i><i></i>
      </div>
    </section>
    <section class="signal-strip" aria-label="Faculty profile summary">
      <p class="section-index">Profile snapshot</p>
      <div class="signal-grid">
        <div><strong>${String(profile.researchInterests.length).padStart(2, "0")}</strong><span>research interests</span></div>
        <div><strong>${String(profile.highlights.length).padStart(2, "0")}</strong><span>highlights</span></div>
        <div><strong>${String(advisees.length).padStart(2, "0")}</strong><span>advisees</span></div>
        <div><strong>${String(linked.length).padStart(2, "0")}</strong><span>linked systems</span></div>
        <p>${clean(facilities.length ? `Associated facilities: ${facilities.join(" · ")}` : "Associated facilities help visitors understand where this faculty member's research and service activities connect.")}</p>
      </div>
    </section>
    <section class="profile-sections section-shell">
      ${listMarkup("Research interests", profile.researchInterests)}
      ${listMarkup("Highlights", profile.highlights)}
      ${listMarkup("Activities", profile.activities)}
      ${listMarkup("Recognitions", profile.recognitions)}
    </section>
    ${scopusMetricsMarkup(profile)}
    <section class="profile-advisees section-shell" aria-labelledby="profile-advisees-title">
      <div class="section-heading">
        <p class="section-index">Advisees</p>
        <div>
          <h2 id="profile-advisees-title">Student<br />advisees.</h2>
          <p>Verified public students listing this faculty member as primary advisor.</p>
        </div>
      </div>
      <div class="profile-advisee-grid">
        ${advisees.length ? advisees.map(adviseeCard).join("") : `<article><span>Advisees</span><h3>No verified public advisees yet</h3><p>Student advisees will appear here after students opt in and faculty verification is complete.</p></article>`}
      </div>
    </section>
    <section class="faculty-expertise section-shell">
      <div class="section-heading">
        <p class="section-index">Academic links</p>
        <div>
          <h2>Profiles and<br />research systems.</h2>
          <p>Use these links to explore the faculty member's academic profiles and research activity.</p>
        </div>
      </div>
      <div class="profile-link-grid">
        ${links.length ? links.map(link => `<a href="${clean(link.url)}" target="_blank" rel="noopener"><span class="profile-platform-mark profile-platform-${clean(slug(link.key))}" aria-hidden="true">${clean(link.mark)}</span><span class="profile-platform-label">${clean(link.label)}</span><span class="profile-link-arrow" aria-hidden="true">↗</span></a>`).join("") : `<span>No academic profile links have been added yet.</span>`}
      </div>
      <div class="profile-equipment-grid">
        ${linked.length ? linked.map(item => `<article><span>${clean(item.category)}</span><h3>${clean(item.name)}</h3><p>${clean(item.researchGroup || item.category)}</p></article>`).join("") : `<article><span>Equipment</span><h3>No linked equipment yet</h3><p>This profile can still be a starting point for expertise, supervision, or collaboration questions.</p></article>`}
      </div>
    </section>
  `;
};

const bindInteractions = () => {
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

  document.querySelectorAll("#faculty-filters .filter").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll("#faculty-filters .filter").forEach(item => {
        item.classList.remove("is-active");
        item.setAttribute("aria-pressed", "false");
      });
      button.classList.add("is-active");
      button.setAttribute("aria-pressed", "true");
      renderFaculty(button.dataset.filter);
    });
  });
};

const bootFacultyPage = async () => {
  const loadedRegistry = await loadFacultyRegistry();
  registry = { ...loadedRegistry, faculty: dedupeFacultyProfiles(loadedRegistry.faculty || []) };
  const profileId = new URLSearchParams(window.location.search).get("id");
  bindInteractions();
  if (profileId) {
    const profile = registry.faculty.find(item => item.id === profileId);
    if (profile) {
      renderProfilePage(profile);
      return;
    }
  }
  updateSummary();
  renderFaculty();
  renderExpertise();
};

bootFacultyPage();
