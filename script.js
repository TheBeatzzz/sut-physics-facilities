const REGISTRY_STORAGE_KEY = "sut-physics-equipment-registry-v3";

const fallbackEquipment = [
  {
    id: "EQ-01", category: "observe", name: "Photon Counting Scanning Confocal Microscopy",
    description: "Example system for photon-counting confocal imaging and spatially resolved optical investigation.",
    method: "Confocal imaging", access: "Details to verify", color: "#74dfce", visual: "microscope"
  },
  {
    id: "EQ-02", category: "observe", name: "Fluorescent Life-Time Measurement",
    description: "Example capability for studying fluorescence decay and time-dependent optical response.",
    method: "Lifetime imaging", access: "Details to verify", color: "#8fc3ff", visual: "spectrum"
  },
  {
    id: "EQ-03", category: "observe", name: "Optical Coherence Tomography Design and Applications",
    description: "Example platform for OCT system design, depth-resolved imaging, and application development.",
    method: "Depth imaging", access: "Details to verify", color: "#ff8b5b", visual: "microscope"
  },
  {
    id: "EQ-04", category: "measure", name: "Fourier Transform Infrared Spectroscopy Lab",
    description: "Example laboratory for Fourier-transform infrared spectral measurement and materials analysis.",
    method: "FTIR spectroscopy", access: "Details to verify", color: "#d7ff3f", visual: "spectrum"
  },
  {
    id: "EQ-05", category: "measure", name: "Mid IR Spectroscopy Lab",
    description: "Example laboratory for mid-infrared spectroscopy, optical characterization, and sensing research.",
    method: "Mid-IR analysis", access: "Details to verify", color: "#b59cff", visual: "spectrum"
  },
  {
    id: "EQ-06", category: "measure", name: "Short Pulse Laser Laboratory and Applications",
    description: "Example laboratory for short-pulse laser research, measurement, and application development.",
    method: "Ultrafast lasers", access: "Details to verify", color: "#ffc95c", visual: "detector"
  },
  {
    id: "EQ-07", category: "fabricate", name: "Electrospinning Material Fabrication and Testing",
    description: "Example capability for electrospun material fabrication, preparation, and performance testing.",
    method: "Electrospinning", access: "Details to verify", color: "#74dfce", visual: "layers"
  },
  {
    id: "EQ-08", category: "fabricate", name: "Advanced 3D Printing Lab",
    description: "Example laboratory for additive manufacturing, prototyping, and advanced structure fabrication.",
    method: "3D fabrication", access: "Details to verify", color: "#8fc3ff", visual: "layers"
  },
  {
    id: "EQ-09", category: "measure", name: "Surface Plasmon Analysis",
    description: "Example capability for surface plasmon measurement, interface analysis, and optical sensing.",
    method: "Surface sensing", access: "Details to verify", color: "#ff8b5b", visual: "spectrum"
  },
  {
    id: "EQ-10", category: "model", name: "Quantum Computing Lab",
    description: "Example laboratory for quantum computing research, system design, simulation, and applications.",
    method: "Quantum systems", access: "Details to verify", color: "#d7ff3f", visual: "compute"
  },
  {
    id: "EQ-11", category: "fabricate", name: "Optical Fiber Sensor Fabrication and Testing",
    description: "Example capability for fabricating optical fiber sensors and evaluating their response.",
    method: "Fiber sensors", access: "Details to verify", color: "#b59cff", visual: "layers"
  },
  {
    id: "EQ-12", category: "fabricate", name: "Design of Photonics on Chip Systems",
    description: "Example environment for integrated photonic device and on-chip optical system design.",
    method: "Integrated photonics", access: "Details to verify", color: "#ffc95c", visual: "compute"
  },
  {
    id: "EQ-13", category: "observe", name: "Optical Vein Finder Design",
    description: "Example platform for designing and evaluating optical vein visualization systems.",
    method: "Biomedical imaging", access: "Details to verify", color: "#74dfce", visual: "microscope"
  },
  {
    id: "EQ-14", category: "measure", name: "Ultra High Speed Optical Data Acquisition Design and Testing",
    description: "Example capability for designing and testing high-speed optical acquisition architectures.",
    method: "High-speed data", access: "Details to verify", color: "#8fc3ff", visual: "detector"
  },
  {
    id: "EQ-15", category: "measure", name: "Optical Reflectance and Transmittance Analysis",
    description: "Example capability for wavelength-dependent reflectance and transmittance characterization.",
    method: "Optical analysis", access: "Details to verify", color: "#ff8b5b", visual: "spectrum"
  },
  {
    id: "EQ-16", category: "measure", name: "High Speed Frequency Swept Laser and Applications",
    description: "Example platform for swept-frequency laser design, high-speed operation, and applications.",
    method: "Swept lasers", access: "Details to verify", color: "#d7ff3f", visual: "detector"
  },
  {
    id: "EQ-17", category: "model", name: "Deep Learning Lab",
    description: "Example laboratory for developing, training, and evaluating deep learning models for research applications.",
    method: "Deep learning", access: "Details to verify", color: "#b59cff", visual: "compute"
  },
  {
    id: "EQ-18", category: "observe", name: "Machine Vision Lab",
    description: "Example laboratory for image acquisition, computer vision, and machine-assisted visual analysis.",
    method: "Machine vision", access: "Details to verify", color: "#74dfce", visual: "microscope"
  },
  {
    id: "EQ-19", category: "model", name: "AI-Assisted Medical Diagnosis System Design and Implementation Lab",
    description: "Example laboratory for designing and implementing research systems that investigate AI-assisted medical diagnosis.",
    method: "Medical AI systems", access: "Details to verify", color: "#ff8b5b", visual: "compute"
  }
];

const fallbackFacilities = [
  { id: "FAC-01", name: "Advanced Microscopy & Biomedical Photonics Facility", building: "To be verified", room: "To be verified", lead: "Faculty lead to verify", description: "Example facility cluster for confocal imaging, fluorescence lifetime, optical coherence tomography, and biomedical optical design.", color: "#8fd8c8" },
  { id: "FAC-02", name: "Infrared & Optical Spectroscopy Facility", building: "To be verified", room: "To be verified", lead: "Faculty lead to verify", description: "Example facility cluster for infrared spectroscopy, surface plasmon analysis, and optical reflectance and transmittance measurements.", color: "#9bc7ee" },
  { id: "FAC-03", name: "Ultrafast Laser & Optical Data Systems Facility", building: "To be verified", room: "To be verified", lead: "Faculty lead to verify", description: "Example facility cluster for short-pulse lasers, swept laser systems, and high-speed optical data acquisition.", color: "#f4c26d" },
  { id: "FAC-04", name: "Advanced Materials Fabrication Facility", building: "To be verified", room: "To be verified", lead: "Faculty lead to verify", description: "Example facility cluster for electrospinning, advanced 3D printing, and materials testing workflows.", color: "#e8a89a" },
  { id: "FAC-05", name: "Optical Fiber & Integrated Photonics Facility", building: "To be verified", room: "To be verified", lead: "Faculty lead to verify", description: "Example facility cluster for optical fiber sensors and photonics-on-chip system design.", color: "#b8d276" },
  { id: "FAC-06", name: "Quantum Computing Laboratory", building: "To be verified", room: "To be verified", lead: "Faculty lead to verify", description: "Example facility for quantum computing research, design, simulation, and experimental activities.", color: "#c1b2df" },
  { id: "FAC-07", name: "AI, Machine Vision & Medical Intelligence Laboratory", building: "To be verified", room: "To be verified", lead: "Faculty lead to verify", description: "Example facility cluster for deep learning, machine vision, and AI-assisted medical diagnosis system design and implementation.", color: "#7fc5b2" }
];

const fallbackFacilityByEquipment = {
  "EQ-01": "FAC-01", "EQ-02": "FAC-01", "EQ-03": "FAC-01", "EQ-13": "FAC-01",
  "EQ-04": "FAC-02", "EQ-05": "FAC-02", "EQ-09": "FAC-02", "EQ-15": "FAC-02",
  "EQ-06": "FAC-03", "EQ-14": "FAC-03", "EQ-16": "FAC-03",
  "EQ-07": "FAC-04", "EQ-08": "FAC-04",
  "EQ-11": "FAC-05", "EQ-12": "FAC-05",
  "EQ-10": "FAC-06",
  "EQ-17": "FAC-07", "EQ-18": "FAC-07", "EQ-19": "FAC-07"
};

const capabilityDetails = {
  observe: {
    number: "01",
    title: "Observe",
    accent: "#74dfce",
    summary: "Resolve structures, images, and signals that cannot be captured by ordinary visual inspection.",
    methods: ["Microscopy", "Tomography", "Machine vision", "Biomedical imaging"],
    questions: ["What structure is present?", "How does the signal vary across space?", "Can the image reveal a hidden pattern?"],
    outputs: ["Images", "Spatial maps", "Feature measurements"]
  },
  fabricate: {
    number: "02",
    title: "Fabricate",
    accent: "#8fc3ff",
    summary: "Prepare samples, prototypes, fibers, materials, and controlled device structures for experiments.",
    methods: ["Electrospinning", "3D printing", "Fiber fabrication", "Integrated photonics"],
    questions: ["What structure needs to be made?", "Which preparation route is feasible?", "How reproducible is the process?"],
    outputs: ["Samples", "Prototype devices", "Prepared test structures"]
  },
  measure: {
    number: "03",
    title: "Measure",
    accent: "#ff8b5b",
    summary: "Capture optical, electrical, thermal, spectral, and radiation responses with appropriate instrumentation.",
    methods: ["Spectroscopy", "Optical sensing", "Laser measurements", "Data acquisition"],
    questions: ["Which signal matters?", "What precision is required?", "How should the method be calibrated?"],
    outputs: ["Spectra", "Response curves", "Measurement datasets"]
  },
  model: {
    number: "04",
    title: "Model",
    accent: "#d7ff3f",
    summary: "Connect experimental evidence with computation, simulation, data analysis, and theory.",
    methods: ["Quantum systems", "Deep learning", "Computer vision", "Medical AI"],
    questions: ["What model explains the result?", "Can computation guide the experiment?", "How robust is the prediction?"],
    outputs: ["Models", "Predictions", "Analysis workflows"]
  }
};

const clean = value => String(value ?? "").replace(/[&<>'"]/g, character => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
}[character]));

const publicCategory = item => {
  const text = `${item.name} ${item.category}`.toLowerCase();
  if (text.includes("electrosp") || text.includes("3d print") || text.includes("fabricat") || text.includes("photonics on chip") || text.includes("fiber sensor")) return "fabricate";
  if (text.includes("microscop") || text.includes("tomograph") || text.includes("vein finder") || text.includes("machine vision") || item.category === "Imaging") return "observe";
  if (item.category === "Computing" || text.includes("deep learning") || text.includes("quantum computing") || text.includes("medical diagnosis")) return "model";
  return "measure";
};

const publicVisual = item => {
  const text = `${item.name} ${item.category}`.toLowerCase();
  if (text.includes("fabricat") || text.includes("3d print") || text.includes("electrosp") || text.includes("fiber") || text.includes("chip")) return "layers";
  if (text.includes("comput") || text.includes("learning") || text.includes("quantum") || text.includes("diagnosis")) return "compute";
  if (text.includes("microscop") || text.includes("tomograph") || text.includes("vision") || text.includes("vein")) return "microscope";
  if (text.includes("laser") || text.includes("data acquisition")) return "detector";
  return "spectrum";
};

const palette = ["#74dfce", "#8fc3ff", "#ff8b5b", "#d7ff3f", "#b59cff", "#ffc95c"];
let publicFacilities = [];
let registryAvailable = false;
let registryEmptyFallback = false;
let equipmentAtlasFallback = false;

const prepareFallbackEquipment = ({ keepFacilities = false } = {}) => {
  const fallbackFacilityList = fallbackFacilities.map(facility => ({ ...facility }));
  if (!keepFacilities || !publicFacilities.length) publicFacilities = fallbackFacilityList;
  const fallbackLookup = keepFacilities ? fallbackFacilityList : publicFacilities;
  return fallbackEquipment.map(item => {
    const facilityId = fallbackFacilityByEquipment[item.id] || "";
    const facility = fallbackLookup.find(candidate => candidate.id === facilityId);
    return {
      ...item,
      facilityId,
      facilityName: facility?.name || "Physics Program facility",
      fromRegistry: false
    };
  });
};

const equipmentKey = item => String(item.name || item.id || "").trim().toLowerCase().replace(/\s+/g, " ");
const mergeWithFallbackEquipment = (publicEquipment, options = {}) => {
  const fallback = prepareFallbackEquipment(options);
  const seen = new Set(publicEquipment.map(equipmentKey).filter(Boolean));
  const fallbackOnly = fallback.filter(item => {
    const key = equipmentKey(item);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  equipmentAtlasFallback = fallbackOnly.length > 0;
  return [...publicEquipment, ...fallbackOnly];
};

const mapPublicEquipment = registry => {
  const visible = registry.equipment.filter(item => item.reviewStatus === "Verified" && item.publicReady === true);
  publicFacilities = registry.facilities;
  return visible.map((item, index) => {
    const facility = registry.facilities.find(candidate => candidate.id === item.facilityId);
    return {
      ...item,
      id: item.id || `EQ-${index + 1}`,
      category: publicCategory(item),
      method: item.researchGroup || item.category || "Research system",
      access: item.access || "Contact facility",
      color: facility?.color || palette[index % palette.length],
      visual: publicVisual(item),
      facilityName: facility?.name || "Physics Program facility",
      fromRegistry: true
    };
  });
};

const loadLocalPublicEquipment = () => {
  try {
    const stored = localStorage.getItem(REGISTRY_STORAGE_KEY);
    if (!stored) return prepareFallbackEquipment();
    const registry = JSON.parse(stored);
    if (!Array.isArray(registry.equipment) || !Array.isArray(registry.facilities)) return prepareFallbackEquipment();
    const localPublicEquipment = mapPublicEquipment(registry);
    if (localPublicEquipment.length) {
      registryAvailable = true;
      return mergeWithFallbackEquipment(localPublicEquipment, { keepFacilities: registry.facilities.length > 0 });
    }
    registryEmptyFallback = true;
    equipmentAtlasFallback = true;
    return prepareFallbackEquipment({ keepFacilities: registry.facilities.length > 0 });
  } catch {
    return prepareFallbackEquipment();
  }
};

const loadPublicEquipment = async () => {
  registryAvailable = false;
  registryEmptyFallback = false;
  equipmentAtlasFallback = false;
  if (window.SUTSupabase?.isConfigured?.()) {
    try {
      const registry = await window.SUTSupabase.loadRegistry({ publicOnly: true });
      const publicEquipment = mapPublicEquipment(registry);
      if (publicEquipment.length) {
        registryAvailable = true;
        return mergeWithFallbackEquipment(publicEquipment, { keepFacilities: registry.facilities.length > 0 });
      }
      if (registry.facilities.length) {
        registryAvailable = true;
        registryEmptyFallback = true;
        equipmentAtlasFallback = true;
        return prepareFallbackEquipment({ keepFacilities: true });
      }
      registryEmptyFallback = true;
      equipmentAtlasFallback = true;
      return prepareFallbackEquipment();
    } catch (error) {
      console.warn("Supabase public registry unavailable; using local/prototype data.", error);
    }
  }
  return loadLocalPublicEquipment();
};

let equipment = [];

const visualFor = (type, color) => {
  const common = `viewBox="0 0 640 260" role="img" aria-label="Abstract ${type} instrument illustration"`;
  const visuals = {
    microscope: `<svg ${common}><rect width="640" height="260" fill="${color}"/><g fill="none" stroke="#15261f" stroke-width="3"><circle cx="210" cy="130" r="72"/><circle cx="210" cy="130" r="43"/><path d="M275 183h130V72h-78M405 120h95v63H365M126 203h345"/><path d="m310 48 52 52-22 22-52-52z"/></g><circle cx="210" cy="130" r="12" fill="#15261f"/><g fill="#15261f"><circle cx="512" cy="70" r="6"/><circle cx="540" cy="100" r="3"/><circle cx="520" cy="132" r="9"/></g></svg>`,
    spectrum: `<svg ${common}><rect width="640" height="260" fill="${color}"/><g fill="none" stroke="#15261f"><path d="M0 200 C80 200 80 60 160 60s80 140 160 140S400 60 480 60s80 140 160 140" stroke-width="3"/><path d="M0 220 C70 220 100 105 160 105s95 115 160 115S390 105 480 105s95 115 160 115" stroke-width="1"/></g><g stroke="#15261f"><path d="M110 22v216M210 22v216M310 22v216M410 22v216M510 22v216" opacity=".22"/><path d="M78 130h484"/></g><circle cx="410" cy="130" r="13" fill="#15261f"/></svg>`,
    layers: `<svg ${common}><rect width="640" height="260" fill="${color}"/><g stroke="#15261f" stroke-width="2"><path d="m80 172 220-90 260 82-220 82z" fill="#f3f0e8"/><path d="m80 133 220-90 260 82-220 82z" fill="${color}"/><path d="m160 96 140-53 160 49-140 56z" fill="#15261f"/></g><g fill="#f3f0e8"><circle cx="280" cy="80" r="5"/><circle cx="321" cy="96" r="5"/><circle cx="360" cy="78" r="5"/></g></svg>`,
    cryogenic: `<svg ${common}><rect width="640" height="260" fill="${color}"/><g fill="none" stroke="#15261f" stroke-width="3"><path d="M220 22v68c0 25-25 38-25 72a65 65 0 0 0 130 0c0-34-25-47-25-72V22z"/><circle cx="260" cy="162" r="38" fill="#15261f"/><path d="M365 55h140M365 90h95M365 125h120M365 160h70M365 195h110"/></g><path d="M260 122v-78" stroke="#f3f0e8" stroke-width="6"/></svg>`,
    compute: `<svg ${common}><rect width="640" height="260" fill="${color}"/><g fill="none" stroke="#15261f"><path d="M75 50h490v160H75z" stroke-width="3"/><path d="M75 90h490M200 50v160M380 90v120"/><g stroke-width="3"><path d="m230 165 35-45 35 28 45-38"/><circle cx="265" cy="120" r="5" fill="#15261f"/><circle cx="345" cy="110" r="5" fill="#15261f"/></g></g><g fill="#15261f"><circle cx="100" cy="70" r="4"/><circle cx="115" cy="70" r="4"/><circle cx="130" cy="70" r="4"/></g></svg>`,
    detector: `<svg ${common}><rect width="640" height="260" fill="${color}"/><g fill="none" stroke="#15261f"><circle cx="210" cy="130" r="83" stroke-width="3"/><circle cx="210" cy="130" r="54"/><circle cx="210" cy="130" r="17" fill="#15261f"/><path d="M293 130h110l28-58 30 116 30-58h90" stroke-width="3"/></g><g fill="#15261f"><circle cx="110" cy="40" r="5"/><circle cx="342" cy="58" r="9"/><circle cx="350" cy="208" r="4"/></g></svg>`
  };
  return visuals[type];
};

const iconFor = name => {
  const text = name.toLowerCase();
  const svg = path => `<svg aria-hidden="true" viewBox="0 0 24 24">${path}</svg>`;
  if (text.includes("confocal")) return svg(`<circle cx="9" cy="9" r="4"/><path d="m12 12 6 6M15 18h5M5 20h10M13 4l4 4"/>`);
  if (text.includes("life-time")) return svg(`<circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2M4 12h2M18 12h2"/>`);
  if (text.includes("coherence")) return svg(`<path d="M3 12c3-6 6-6 9 0s6 6 9 0M3 17c3-4 6-4 9 0s6 4 9 0"/>`);
  if (text.includes("infrared") || text.includes("mid ir")) return svg(`<path d="M3 16c3 0 3-8 6-8s3 8 6 8 3-8 6-8M4 20h16"/>`);
  if (text.includes("laser")) return svg(`<path d="M3 12h13M16 7v10M19 9l2-2M19 15l2 2M19 12h3"/>`);
  if (text.includes("electrosp")) return svg(`<path d="M4 6h5l2 6 3-6h6M4 18c4-4 12-4 16 0"/>`);
  if (text.includes("3d print")) return svg(`<path d="m12 3 8 4-8 4-8-4 8-4Zm-8 4v9l8 5 8-5V7M12 11v10"/>`);
  if (text.includes("plasmon")) return svg(`<circle cx="7" cy="12" r="3"/><circle cx="17" cy="12" r="3"/><path d="M10 12h4M3 6c6 3 12 3 18 0M3 18c6-3 12-3 18 0"/>`);
  if (text.includes("quantum")) return svg(`<circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="9" ry="4"/><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(120 12 12)"/>`);
  if (text.includes("fiber")) return svg(`<path d="M3 6c6 0 6 12 12 12h6M3 12h6c6 0 6-6 12-6"/>`);
  if (text.includes("chip")) return svg(`<rect x="6" y="6" width="12" height="12"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M18 9h4M2 15h4M18 15h4"/>`);
  if (text.includes("vein") || text.includes("medical")) return svg(`<path d="M12 20s-8-4.8-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 6.2-8 11-8 11Z"/><path d="M8 12h2l1-3 2 6 1-3h2"/>`);
  if (text.includes("data acquisition")) return svg(`<path d="M3 17h4l2-10 4 12 2-7 2 5h4"/>`);
  if (text.includes("reflectance")) return svg(`<path d="M4 18 10 6l4 12 6-12M2 20h20"/>`);
  if (text.includes("deep learning")) return svg(`<circle cx="5" cy="7" r="2"/><circle cx="5" cy="17" r="2"/><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/><circle cx="19" cy="9" r="2"/><circle cx="19" cy="15" r="2"/><path d="m7 7 3-2M7 8l3 4M7 16l3-4M7 17l3 2M14 5l3 4M14 12l3-3M14 12l3 3M14 19l3-4"/>`);
  if (text.includes("machine vision")) return svg(`<path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>`);
  return svg(`<circle cx="12" cy="12" r="8"/><path d="M4 12h16M12 4v16"/>`);
};

const grid = document.querySelector("#equipment-grid");
const facilitiesGrid = document.querySelector("#facilities-grid");

const imageSource = image => window.SUTSupabase?.photoSrc?.(image) || image?.url || image?.data || "";
const validImage = image => imageSource(image).startsWith("data:image/") || /^https?:\/\//.test(imageSource(image)) ? image : null;
const safeColor = (value, fallback = palette[0]) => /^#[0-9a-f]{3,8}$/i.test(String(value || "")) ? value : fallback;

const visualMarkup = item => {
  const feature = validImage(item.featurePhoto);
  if (!feature) return `<span class="equipment-icon">${iconFor(item.name)}</span>${visualFor(item.visual, item.color)}`;
  return `<img class="equipment-feature-photo" src="${imageSource(feature)}" alt="${clean(feature.alt || `${item.name} equipment`)}" /><span class="equipment-icon">${iconFor(item.name)}</span>`;
};

const galleryMarkup = item => {
  const gallery = Array.isArray(item.gallery) ? item.gallery.filter(validImage).slice(0, 5) : [];
  if (!gallery.length) return `<div class="public-gallery is-empty" aria-hidden="true"></div>`;
  return `<div class="public-gallery" aria-label="Example use-case gallery">${gallery.map((photo, index) => {
    const src = imageSource(photo);
    const alt = photo.alt || `${item.name} gallery image ${index + 1}`;
    return `<button type="button" data-gallery-src="${clean(src)}" data-gallery-alt="${clean(alt)}" data-gallery-title="${clean(item.name)}" aria-label="Open ${clean(alt)} full size"><img src="${clean(src)}" alt="${clean(alt)}" /></button>`;
  }).join("")}</div>`;
};

const publicFacilityCards = () => {
  const knownFacilities = new Set(publicFacilities.map(facility => facility.id).filter(Boolean));
  const facilityEquipment = equipment;
  const cards = publicFacilities.map((facility, index) => {
    const linked = facilityEquipment.filter(item => item.facilityId === facility.id);
    const capabilities = [...new Set(linked.map(item => item.method || item.category).filter(Boolean))].slice(0, 4);
    return { facility, linked, capabilities, color: safeColor(facility.color, palette[index % palette.length]) };
  });

  const orphanGroups = facilityEquipment
    .filter(item => !item.facilityId || !knownFacilities.has(item.facilityId))
    .reduce((groups, item) => {
      const key = item.facilityId || "__unassigned";
      groups[key] ||= [];
      groups[key].push(item);
      return groups;
    }, {});

  Object.entries(orphanGroups).forEach(([facilityId, linked], index) => {
    const first = linked[0];
    cards.push({
      facility: {
        id: facilityId === "__unassigned" ? "FAC-TBD" : facilityId,
        name: first.facilityName || "Physics Program facility",
        building: "",
        room: "",
        lead: "Responsible faculty contact",
        description: "Public equipment records linked to this facility."
      },
      linked,
      capabilities: [...new Set(linked.map(item => item.method || item.category).filter(Boolean))].slice(0, 4),
      color: palette[(cards.length + index) % palette.length]
    });
  });

  return cards;
};

const renderFacilitiesInfographic = () => {
  let cards = publicFacilityCards();
  if (!cards.length && equipment.length) {
    cards = [{
      facility: {
        id: "FAC-TBD",
        name: "Physics Program Research Facilities",
        building: "",
        room: "",
        lead: "Responsible faculty contacts",
        description: "Public equipment records are available; facility assignments are being verified."
      },
      linked: equipment,
      capabilities: [...new Set(equipment.map(item => item.method || item.category).filter(Boolean))].slice(0, 4),
      color: palette[0]
    }];
  }
  facilitiesGrid.innerHTML = cards.length ? cards.map(({ facility, linked, capabilities, color }, index) => {
    const location = [facility.building, facility.room].filter(Boolean).join(" · ") || "Location to verify";
    return `
      <article class="public-facility-card public-profile-trigger" role="button" tabindex="0" data-facility-detail="${index}" style="--facility-bg:${color}" aria-label="Open details for ${clean(facility.name)}">
        <div class="facility-map-visual" aria-hidden="true"><span>${String(index + 1).padStart(2, "0")}</span><i></i><i></i><i></i></div>
        <div class="facility-map-meta"><span>${clean(facility.id)}</span><span>${clean(location)}</span></div>
        <h3>${clean(facility.name)}</h3>
        <p>${clean(facility.description || "Facility information is being verified by the Physics Program.")}</p>
        <div class="facility-capabilities">
          ${capabilities.map(capability => `<span>${clean(capability)}</span>`).join("") || `<span>Capabilities to verify</span>`}
        </div>
        <div class="facility-map-foot">
          <span><strong>${linked.length}</strong> public system${linked.length === 1 ? "" : "s"}</span>
          <span>Lead<br /><b>${clean(facility.lead || "Not assigned")}</b></span>
        </div>
      </article>
    `;
  }).join("") : `<div class="public-empty"><h3>No public facilities yet</h3><p>Add a facility and link verified public equipment records to display it here.</p></div>`;
};

const updatePublicSummary = () => {
  const registryMode = registryAvailable;
  const liveEquipmentCount = equipment.filter(item => item.fromRegistry).length;
  const facilityCount = publicFacilityCards().length;
  const counts = ["observe", "fabricate", "measure", "model"].reduce((result, category) => {
    result[category] = equipment.filter(item => item.category === category).length;
    return result;
  }, { all: equipment.length });

  document.querySelector("#hero-equipment-count").textContent = String(equipment.length).padStart(2, "0");
  document.querySelector("#hero-equipment-label").innerHTML = registryMode ? equipmentAtlasFallback ? "atlas<br />systems" : "verified<br />systems" : "example<br />systems";
  document.querySelector("#snapshot-equipment-count").textContent = String(equipment.length).padStart(2, "0");
  document.querySelector("#snapshot-equipment-label").textContent = registryMode ? equipmentAtlasFallback ? "public + examples" : "public records" : "example records";
  document.querySelector("#snapshot-facility-count").textContent = String(facilityCount).padStart(2, "0");
  document.querySelector("#snapshot-capability-count").textContent = String(Object.values(counts).slice(1).filter(Boolean).length).padStart(2, "0");
  Object.entries(counts).forEach(([category, count]) => {
    const target = document.querySelector(`[data-filter-count="${category}"]`);
    if (target) target.textContent = String(count).padStart(2, "0");
  });

  document.querySelector("#public-data-status").textContent = registryMode ? "Live registry" : "Prototype data";
  document.querySelector("#public-data-message").textContent = "";
};

const renderEquipment = (filter = "all") => {
  const filtered = filter === "all" ? equipment : equipment.filter(item => item.category === filter);
  grid.innerHTML = filtered.length ? filtered.map(item => `
    <article class="equipment-card public-profile-trigger" role="button" tabindex="0" data-category="${item.category}" data-equipment-detail="${clean(item.id)}" aria-label="Open details for ${clean(item.name)}">
      <div class="card-top"><span>${clean(item.id)} · ${item.fromRegistry ? "Verified" : "Sample"}</span><span>${clean(item.category)}</span></div>
      <div class="equipment-visual" style="--visual-bg:${item.color}">${visualMarkup(item)}</div>
      ${galleryMarkup(item)}
      <h3>${clean(item.name)}</h3>
      <p>${clean(item.description || "Contact the facility for equipment capabilities and use cases.")}</p>
      <div class="equipment-meta"><span>${clean(item.method)}</span><span>${clean(item.access)}</span></div>
    </article>
  `).join("") : `<div class="public-empty"><h3>No public records in this category</h3><p>Verify a registry record and mark it as a candidate for the public facility profile.</p></div>`;
};

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(item => {
      item.classList.remove("is-active");
      item.setAttribute("aria-pressed", "false");
    });
    button.classList.add("is-active");
    button.setAttribute("aria-pressed", "true");
    renderEquipment(button.dataset.filter);
  });
});

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-nav");
const inquiryDialog = document.querySelector("#inquiry-dialog");
const inquiryForm = document.querySelector("#inquiry-form");
const inquiryEquipment = document.querySelector("#inquiry-equipment");
const inquiryRecipient = document.querySelector("#inquiry-recipient");
const prepareInquiry = document.querySelector("#prepare-inquiry");
const galleryDialog = document.querySelector("#gallery-dialog");
const galleryDialogImage = document.querySelector("#gallery-dialog-image");
const galleryDialogCaption = document.querySelector("#gallery-dialog-caption");
const galleryDialogTitle = document.querySelector("#gallery-dialog-title");
const cardDetailDialog = document.querySelector("#card-detail-dialog");
const cardDetailKicker = document.querySelector("#card-detail-kicker");
const cardDetailContent = document.querySelector("#card-detail-content");

const list = value => Array.isArray(value) ? value.filter(Boolean) : [];
const initials = value => String(value || "PS").split(/\s+/).slice(0, 2).map(part => part[0]).join("").toUpperCase();
const detailTags = tags => tags.filter(Boolean).map(tag => `<span>${clean(tag)}</span>`).join("");
const detailRows = rows => rows
  .filter(([, value]) => value !== undefined && value !== null && String(value).trim() !== "")
  .map(([label, value]) => `<div><dt>${clean(label)}</dt><dd>${clean(value)}</dd></div>`)
  .join("");
const detailList = (title, items, fallback = "Details to confirm") => `
  <section>
    <h3>${clean(title)}</h3>
    <div class="facility-capabilities main-detail-tags">
      ${(items.length ? items : [fallback]).map(item => `<span>${clean(item)}</span>`).join("")}
    </div>
  </section>
`;

const openCardDetail = ({ kicker = [], title, summary, accent = palette[0], mark = "", rows = [], lists = [], actions = "" }) => {
  if (!cardDetailDialog || !cardDetailKicker || !cardDetailContent) return;
  cardDetailKicker.innerHTML = detailTags(kicker);
  cardDetailContent.innerHTML = `
    <div class="person-profile-intro">
      <div class="main-detail-mark" style="--detail-bg:${clean(accent)}">${mark || clean(initials(title))}</div>
      <div>
        <p class="section-index">Detail view</p>
        <h2 id="card-detail-title">${clean(title)}</h2>
        <p>${clean(summary)}</p>
        ${actions ? `<div class="main-detail-actions">${actions}</div>` : ""}
      </div>
    </div>
    ${rows.length ? `<dl class="person-profile-details">${detailRows(rows)}</dl>` : ""}
    ${lists.length ? `<div class="person-profile-lists">${lists.join("")}</div>` : ""}
  `;
  cardDetailDialog.showModal();
  setTimeout(() => document.querySelector("#close-card-detail")?.focus(), 30);
};

const openCapabilityDetail = key => {
  const detail = capabilityDetails[key];
  if (!detail) return;
  openCardDetail({
    kicker: ["Research spectrum", detail.number, key],
    title: detail.title,
    summary: detail.summary,
    accent: detail.accent,
    mark: detail.number,
    rows: [
      ["Capability area", detail.title],
      ["Research scale", key === "model" ? "Data to systems" : key === "observe" ? "Nano to device" : key === "fabricate" ? "Sample to device" : "Signal to dataset"],
      ["Equipment count", `${equipment.filter(item => item.category === key).length} public or example systems`]
    ],
    lists: [
      detailList("Typical methods", detail.methods),
      detailList("Useful questions", detail.questions),
      detailList("Expected outputs", detail.outputs)
    ]
  });
};

const facilityByRenderedIndex = index => {
  let cards = publicFacilityCards();
  if (!cards.length && equipment.length) {
    cards = [{
      facility: {
        id: "FAC-TBD",
        name: "Physics Program Research Facilities",
        building: "",
        room: "",
        lead: "Responsible faculty contacts",
        description: "Public equipment records are available; facility assignments are being verified."
      },
      linked: equipment,
      capabilities: [...new Set(equipment.map(item => item.method || item.category).filter(Boolean))].slice(0, 4),
      color: palette[0]
    }];
  }
  return cards[Number(index)];
};

const openFacilityDetail = index => {
  const card = facilityByRenderedIndex(index);
  if (!card) return;
  const { facility, linked, capabilities, color } = card;
  const location = [facility.building, facility.room].filter(Boolean).join(" · ") || "Location to verify";
  openCardDetail({
    kicker: ["Facility", facility.id || "FAC", `${linked.length} public systems`],
    title: facility.name || "Physics Program facility",
    summary: facility.description || "Facility information is being verified by the Physics Program.",
    accent: safeColor(color),
    mark: clean(String(Number(index) + 1).padStart(2, "0")),
    rows: [
      ["Location", location],
      ["Lead", facility.lead || "Not assigned"],
      ["Public systems", linked.length],
      ["Facility ID", facility.id || "FAC-TBD"]
    ],
    lists: [
      detailList("Capabilities", capabilities),
      detailList("Linked equipment", linked.map(item => item.name), "Linked equipment to confirm")
    ]
  });
};

const openEquipmentDetail = id => {
  const item = equipment.find(candidate => candidate.id === id);
  if (!item) return;
  const gallery = list(item.gallery).filter(validImage).slice(0, 5).map(photo => photo.alt || `${item.name} gallery image`);
  const actions = validContactEmail(item.email)
    ? `<button class="button button-primary" type="button" data-detail-inquiry="${clean(item.id)}">Discuss this equipment <span aria-hidden="true">↗</span></button>`
    : "";
  openCardDetail({
    kicker: ["Equipment", item.id, item.fromRegistry ? "Verified record" : "Sample record"],
    title: item.name || "Equipment record",
    summary: item.description || "Contact the facility for equipment capabilities and use cases.",
    accent: safeColor(item.color),
    mark: iconFor(item.name),
    rows: [
      ["Category", item.category],
      ["Method", item.method],
      ["Access", item.access],
      ["Facility", item.facilityName || "Physics Program facility"],
      ["Responsible contact", item.custodian || "Responsible equipment contact"],
      ["Email", item.email || "Contact email to add"],
      ["Manufacturer", item.manufacturer],
      ["Model", item.model],
      ["Room", item.room],
      ["Safety", item.safety],
      ["Status", item.status]
    ],
    lists: [
      detailList("Use cases", list(item.useCases), "Use cases to confirm"),
      detailList("Gallery", gallery, "No gallery images yet")
    ],
    actions
  });
};

const cardActivation = (event, selector, callback) => {
  const card = event.target.closest(selector);
  if (!card) return;
  if (event.target.closest("a, button, input, select, textarea") && event.target !== card) return;
  if (event.type === "keydown" && !["Enter", " "].includes(event.key)) return;
  event.preventDefault();
  callback(card);
};

const validContactEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());

const populateInquiryEquipment = () => {
  const currentValue = inquiryEquipment.value;
  const options = equipment
    .map(item => {
      const available = validContactEmail(item.email);
      return `<option value="${clean(item.id)}"${available ? "" : " disabled"}>${clean(item.name)}${available ? "" : " — contact email needed"}</option>`;
    })
    .join("");
  inquiryEquipment.innerHTML = `<option value="">Choose equipment</option>${options}`;
  if ([...inquiryEquipment.options].some(option => option.value === currentValue && !option.disabled)) {
    inquiryEquipment.value = currentValue;
  }
  updateInquiryRecipient();
};

const selectedInquiryEquipment = () => equipment.find(item => item.id === inquiryEquipment.value);

const updateInquiryRecipient = () => {
  const item = selectedInquiryEquipment();
  inquiryRecipient.classList.remove("is-ready", "is-unavailable");
  if (!item) {
    inquiryRecipient.textContent = equipment.some(candidate => validContactEmail(candidate.email))
      ? "Select equipment to see the responsible contact."
      : "No public equipment record currently has a contact email. Add one in the Equipment Registry.";
    if (!equipment.some(candidate => validContactEmail(candidate.email))) inquiryRecipient.classList.add("is-unavailable");
    prepareInquiry.disabled = true;
    return;
  }
  if (!validContactEmail(item.email)) {
    inquiryRecipient.textContent = "This equipment does not yet have a valid contact email.";
    inquiryRecipient.classList.add("is-unavailable");
    prepareInquiry.disabled = true;
    return;
  }
  const contactName = item.custodian && item.custodian !== "Faculty owner to verify" ? item.custodian : "Responsible equipment contact";
  inquiryRecipient.textContent = `${contactName} · ${item.email}${item.facilityName ? ` · ${item.facilityName}` : ""}`;
  inquiryRecipient.classList.add("is-ready");
  prepareInquiry.disabled = false;
};

const openInquiry = () => {
  populateInquiryEquipment();
  inquiryDialog.showModal();
  setTimeout(() => inquiryEquipment.focus(), 30);
};

const openGalleryImage = button => {
  const src = button.dataset.gallerySrc || "";
  const alt = button.dataset.galleryAlt || "Equipment gallery image";
  const title = button.dataset.galleryTitle || "Full-size image";
  if (!src) return;
  galleryDialogImage.src = src;
  galleryDialogImage.alt = alt;
  galleryDialogTitle.textContent = title;
  galleryDialogCaption.textContent = alt;
  galleryDialog.showModal();
  setTimeout(() => document.querySelector("#close-gallery").focus(), 30);
};

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

document.querySelector(".spectrum").addEventListener("click", event => {
  cardActivation(event, "[data-spectrum-detail]", card => openCapabilityDetail(card.dataset.spectrumDetail));
});

document.querySelector(".spectrum").addEventListener("keydown", event => {
  cardActivation(event, "[data-spectrum-detail]", card => openCapabilityDetail(card.dataset.spectrumDetail));
});

facilitiesGrid.addEventListener("click", event => {
  cardActivation(event, "[data-facility-detail]", card => openFacilityDetail(card.dataset.facilityDetail));
});

facilitiesGrid.addEventListener("keydown", event => {
  cardActivation(event, "[data-facility-detail]", card => openFacilityDetail(card.dataset.facilityDetail));
});

grid.addEventListener("click", event => {
  const button = event.target.closest("[data-gallery-src]");
  if (button) {
    event.stopPropagation();
    openGalleryImage(button);
    return;
  }
  cardActivation(event, "[data-equipment-detail]", card => openEquipmentDetail(card.dataset.equipmentDetail));
});

grid.addEventListener("keydown", event => {
  cardActivation(event, "[data-equipment-detail]", card => openEquipmentDetail(card.dataset.equipmentDetail));
});

window.addEventListener("storage", async event => {
  if (event.key !== REGISTRY_STORAGE_KEY) return;
  equipment = await loadPublicEquipment();
  updatePublicSummary();
  renderFacilitiesInfographic();
  const activeFilter = document.querySelector(".filter.is-active")?.dataset.filter || "all";
  renderEquipment(activeFilter);
  populateInquiryEquipment();
});

async function bootPublicPage() {
  equipment = await loadPublicEquipment();
  updatePublicSummary();
  renderFacilitiesInfographic();
  renderEquipment();
  populateInquiryEquipment();
}

document.querySelector("#open-inquiry").addEventListener("click", openInquiry);
document.querySelector("#close-inquiry").addEventListener("click", () => inquiryDialog.close());
document.querySelector("#close-gallery").addEventListener("click", () => galleryDialog.close());
document.querySelector("#close-card-detail").addEventListener("click", () => cardDetailDialog.close());
inquiryEquipment.addEventListener("change", updateInquiryRecipient);
inquiryDialog.addEventListener("click", event => {
  if (event.target === inquiryDialog) inquiryDialog.close();
});
galleryDialog.addEventListener("click", event => {
  if (event.target === galleryDialog) galleryDialog.close();
});
cardDetailDialog.addEventListener("click", event => {
  const inquiryButton = event.target.closest("[data-detail-inquiry]");
  if (inquiryButton) {
    const id = inquiryButton.dataset.detailInquiry;
    cardDetailDialog.close();
    populateInquiryEquipment();
    inquiryEquipment.value = id;
    updateInquiryRecipient();
    inquiryDialog.showModal();
    setTimeout(() => document.querySelector("#inquiry-name")?.focus(), 30);
    return;
  }
  if (event.target === cardDetailDialog) cardDetailDialog.close();
});

inquiryForm.addEventListener("submit", event => {
  event.preventDefault();
  if (!inquiryForm.reportValidity()) return;
  const item = selectedInquiryEquipment();
  if (!item || !validContactEmail(item.email)) {
    updateInquiryRecipient();
    return;
  }
  const visitorName = document.querySelector("#inquiry-name").value.trim();
  const visitorEmail = document.querySelector("#inquiry-email").value.trim();
  const organization = document.querySelector("#inquiry-organization").value.trim();
  const message = document.querySelector("#inquiry-message").value.trim();
  const subject = `Equipment inquiry: ${item.name}`;
  const body = [
    `Equipment: ${item.name}`,
    `Facility: ${item.facilityName || "Physics Program facility"}`,
    `From: ${visitorName}`,
    `Email: ${visitorEmail}`,
    organization ? `Organization / research group: ${organization}` : "",
    "",
    "Project question:",
    message
  ].filter((line, index, lines) => line || (index > 0 && lines[index - 1])).join("\n");
  window.location.href = `mailto:${item.email.trim()}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

bootPublicPage();
