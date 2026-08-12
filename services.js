const REGISTRY_STORAGE_KEY = "sut-physics-equipment-registry-v3";

const SERVICE_CATEGORIES = {
  "certified-measurements": "Certified measurements",
  "short-courses": "Short courses",
  workshops: "Workshops",
  stem: "STEM"
};

const clean = value => String(value ?? "").replace(/[&<>'"]/g, character => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
}[character]));
const list = value => Array.isArray(value) ? value.filter(Boolean) : String(value || "").split(/\r?\n|,/).map(item => item.trim()).filter(Boolean);
const validEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
const categoryLabel = value => SERVICE_CATEGORIES[value] || value || "Service";
const serviceVisible = service => service.reviewStatus === "Verified" && service.publicReady === true;

let services = [];
let faculty = [];
let registryAvailable = false;

const normalizeService = service => ({
  id: service.id || `service-${services.length + 1}`,
  title: service.title || "Service title to verify",
  category: SERVICE_CATEGORIES[service.category] ? service.category : "workshops",
  summary: service.summary || "",
  details: service.details || "",
  audience: service.audience || "",
  duration: service.duration || "",
  schedule: service.schedule || "",
  fee: service.fee || "",
  location: service.location || "",
  contactName: service.contactName || "",
  contactEmail: service.contactEmail || "",
  facultyId: service.facultyId || "",
  ownerEmail: service.ownerEmail || "",
  publicReady: Boolean(service.publicReady),
  reviewStatus: service.reviewStatus || "Draft",
  submitterNotes: service.submitterNotes || "",
  updatedAt: service.updatedAt || "",
  sample: Boolean(service.sample)
});

const loadLocalServices = () => {
  try {
    const stored = localStorage.getItem(REGISTRY_STORAGE_KEY);
    if (!stored) return { services: [], faculty: [] };
    const registry = JSON.parse(stored);
    const publicServices = Array.isArray(registry.services) ? registry.services.map(normalizeService).filter(serviceVisible) : [];
    return {
      services: publicServices,
      faculty: Array.isArray(registry.faculty) ? registry.faculty : []
    };
  } catch {
    return { services: [], faculty: [] };
  }
};

const loadServices = async () => {
  registryAvailable = false;
  if (window.SUTSupabase?.isConfigured?.()) {
    try {
      const registry = await window.SUTSupabase.loadRegistry({ publicOnly: true });
      registryAvailable = true;
      return {
        services: Array.isArray(registry.services) ? registry.services.map(normalizeService) : [],
        faculty: Array.isArray(registry.faculty) ? registry.faculty : []
      };
    } catch (error) {
      console.warn("Supabase public services unavailable; using local data.", error);
    }
  }
  return loadLocalServices();
};

const facultyFor = id => faculty.find(profile => profile.id === id);
const serviceOwner = service => facultyFor(service.facultyId)?.name || service.contactName || "Faculty owner to confirm";
const serviceContact = service => service.contactEmail || facultyFor(service.facultyId)?.email || "";

const counts = () => Object.keys(SERVICE_CATEGORIES).reduce((result, category) => {
  result[category] = services.filter(service => service.category === category).length;
  return result;
}, { all: services.length });

const updateSummary = () => {
  const serviceCounts = counts();
  document.querySelector("#services-count").textContent = String(services.length).padStart(2, "0");
  Object.entries(serviceCounts).forEach(([category, count]) => {
    const summaryCount = document.querySelector(`[data-service-count="${category}"]`);
    const filterCount = document.querySelector(`[data-service-filter-count="${category}"]`);
    if (summaryCount) summaryCount.textContent = String(count).padStart(2, "0");
    if (filterCount) filterCount.textContent = String(count).padStart(2, "0");
  });
  document.querySelector("#services-data-status").textContent = registryAvailable ? "Live services" : "Prototype data";
  document.querySelector("#services-data-message").textContent = services.length
    ? `Showing ${services.length} verified public service${services.length === 1 ? "" : "s"} managed by faculty.`
    : "No verified public services are available yet. Faculty can add service details in the internal registry.";
  document.querySelector("#services-status-summary").textContent = services.length
    ? "Published services are grouped by category and routed to the responsible faculty contact."
    : "The service catalog is ready for faculty-managed records; visitors see a coming soon state until services are verified.";
};

const comingSoonMarkup = () => `
  <section class="services-coming-soon" aria-labelledby="coming-soon-title">
    <div class="coming-soon-animation" aria-hidden="true">
      <span></span><span></span><span></span><span></span>
    </div>
    <p class="section-index">Catalog status</p>
    <h3 id="coming-soon-title">Services coming soon</h3>
    <p>Faculty-managed service records will appear here after details, contact routes, and publication status are verified.</p>
    <div class="coming-soon-categories">
      ${Object.values(SERVICE_CATEGORIES).map(label => `<span>${clean(label)}</span>`).join("")}
    </div>
  </section>
`;

const serviceCard = service => {
  const contact = serviceContact(service);
  const owner = serviceOwner(service);
  const details = [
    ["Audience", service.audience || "To be confirmed"],
    ["Duration", service.duration || "By arrangement"],
    ["Schedule", service.schedule || "To be confirmed"],
    ["Fee", service.fee || "To be confirmed"],
    ["Location", service.location || "School of Physics, SUT"]
  ];
  const mailto = validEmail(contact)
    ? `mailto:${contact}?subject=${encodeURIComponent(`Service inquiry: ${service.title}`)}`
    : "faculty.html#directory";
  return `
    <article class="service-card">
      <div class="service-card-top"><span>${clean(categoryLabel(service.category))}</span><span>${clean(service.id)}</span></div>
      <h3>${clean(service.title)}</h3>
      <p>${clean(service.summary || service.details || "Service details are being prepared by the responsible faculty member.")}</p>
      ${service.details && service.summary ? `<p class="service-detail">${clean(service.details)}</p>` : ""}
      <dl class="service-meta">
        ${details.map(([label, value]) => `<div><dt>${clean(label)}</dt><dd>${clean(value)}</dd></div>`).join("")}
      </dl>
      <div class="service-card-foot">
        <span>Managed by<br /><b>${clean(owner)}</b></span>
        <a class="text-link" href="${clean(mailto)}">${validEmail(contact) ? "Contact" : "Find faculty"} <span aria-hidden="true">→</span></a>
      </div>
    </article>
  `;
};

const renderServices = (filter = "all") => {
  const target = document.querySelector("#services-grid");
  const filtered = filter === "all" ? services : services.filter(service => service.category === filter);
  target.innerHTML = services.length
    ? filtered.length
      ? filtered.map(serviceCard).join("")
      : `<div class="public-empty"><h3>No public services in this category</h3><p>Publish a verified ${clean(categoryLabel(filter).toLowerCase())} service to display it here.</p></div>`
    : comingSoonMarkup();
};

document.querySelectorAll("#service-category-filters .filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll("#service-category-filters .filter").forEach(item => {
      item.classList.remove("is-active");
      item.setAttribute("aria-pressed", "false");
    });
    button.classList.add("is-active");
    button.setAttribute("aria-pressed", "true");
    renderServices(button.dataset.filter);
  });
});

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-nav");
const surveyForm = document.querySelector("#service-survey-form");
const surveyMessage = document.querySelector("#service-survey-message");

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

const surveyValues = name => [...surveyForm.querySelectorAll(`[name="${name}"]:checked`)].map(input => input.value);

const setSurveyMessage = (message, type = "") => {
  if (!surveyMessage) return;
  surveyMessage.textContent = message;
  surveyMessage.classList.toggle("is-error", type === "error");
  surveyMessage.classList.toggle("is-success", type === "success");
};

const prepareSurveyEmail = event => {
  event.preventDefault();
  if (!surveyForm.reportValidity()) return;
  const categories = surveyValues("serviceCategory");
  if (!categories.length) {
    setSurveyMessage("Please select at least one service area.", "error");
    surveyForm.querySelector("#survey-category-group input")?.focus();
    return;
  }
  const data = Object.fromEntries(new FormData(surveyForm).entries());
  const lines = [
    "Service needs survey",
    "",
    `Service area: ${categories.join(", ")}`,
    `Visitor role: ${data.visitorRole || "Not provided"}`,
    `Preferred timing: ${data.timeline || "Not provided"}`,
    `Preferred format: ${data.format || "Not provided"}`,
    `Expected group size: ${data.groupSize || "Not provided"}`,
    "",
    "Main need or question:",
    data.mainNeed || "Not provided",
    "",
    "Desired output or outcome:",
    data.desiredOutcome || "Not provided",
    "",
    `Name: ${data.visitorName || "Not provided"}`,
    `Email: ${data.visitorEmail || "Not provided"}`,
    `Organization or school: ${data.organization || "Not provided"}`
  ];
  const subject = `Service needs survey: ${categories.slice(0, 2).join(", ")}`;
  setSurveyMessage("Email draft prepared in your mail application.", "success");
  window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
};

surveyForm?.addEventListener("submit", prepareSurveyEmail);

window.addEventListener("storage", async event => {
  if (event.key !== REGISTRY_STORAGE_KEY) return;
  const registry = await loadServices();
  services = registry.services;
  faculty = registry.faculty;
  updateSummary();
  const activeFilter = document.querySelector("#service-category-filters .filter.is-active")?.dataset.filter || "all";
  renderServices(activeFilter);
});

async function bootServicesPage() {
  const registry = await loadServices();
  services = registry.services;
  faculty = registry.faculty;
  updateSummary();
  renderServices();
}

bootServicesPage();
