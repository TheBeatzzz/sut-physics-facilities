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
const photoSrc = photo => window.SUTSupabase?.photoSrc?.(photo) || photo?.url || photo?.data || "";

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
  featurePhoto: service.featurePhoto || null,
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
const serviceOwner = service => facultyFor(service.facultyId)?.name || service.contactName || "Contact to be confirmed";
const serviceContact = service => service.contactEmail || facultyFor(service.facultyId)?.email || "";
const setText = (selector, value) => {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
};

const counts = () => Object.keys(SERVICE_CATEGORIES).reduce((result, category) => {
  result[category] = services.filter(service => service.category === category).length;
  return result;
}, { all: services.length });

const updateSummary = () => {
  const serviceCounts = counts();
  setText("#services-count", String(services.length).padStart(2, "0"));
  Object.entries(serviceCounts).forEach(([category, count]) => {
    const summaryCount = document.querySelector(`[data-service-count="${category}"]`);
    const filterCount = document.querySelector(`[data-service-filter-count="${category}"]`);
    if (summaryCount) summaryCount.textContent = String(count).padStart(2, "0");
    if (filterCount) filterCount.textContent = String(count).padStart(2, "0");
  });
  setText("#services-data-status", services.length ? "Available services" : "Service interests");
  setText("#services-data-message", services.length
    ? `${services.length} service option${services.length === 1 ? "" : "s"} currently match visitor and partner needs.`
    : "Tell us what measurement, training, workshop, or STEM support would help your work.");
  setText("#services-status-summary", services.length
    ? "Service options are grouped by category so you can find the closest starting point."
    : "Use the survey below to share the kind of service, timing, format, and outcome you are looking for.");
};

const comingSoonMarkup = () => `
  <section class="services-coming-soon" aria-labelledby="coming-soon-title">
    <div class="coming-soon-animation" aria-hidden="true">
      <span></span><span></span><span></span><span></span>
    </div>
    <p class="section-index">Service interests</p>
    <h3 id="coming-soon-title">Services coming soon</h3>
    <p>We are gathering interest in measurements, short courses, workshops, and STEM activities. Share your need below to help shape future service options.</p>
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
  const imageSrc = photoSrc(service.featurePhoto);
  const imageAlt = service.featurePhoto?.alt || `${service.title} service photo`;
  return `
    <article class="service-card">
      ${imageSrc ? `<img class="service-card-photo" src="${clean(imageSrc)}" alt="${clean(imageAlt)}" />` : ""}
      <div class="service-card-top"><span>${clean(categoryLabel(service.category))}</span><span>${clean(service.id)}</span></div>
      <h3>${clean(service.title)}</h3>
      <p>${clean(service.summary || service.details || "Contact the School of Physics to discuss the scope, timing, and expected outcome for this service.")}</p>
      ${service.details && service.summary ? `<p class="service-detail">${clean(service.details)}</p>` : ""}
      <dl class="service-meta">
        ${details.map(([label, value]) => `<div><dt>${clean(label)}</dt><dd>${clean(value)}</dd></div>`).join("")}
      </dl>
      <div class="service-card-foot">
        <span>Contact<br /><b>${clean(owner)}</b></span>
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
      : `<div class="public-empty"><h3>No services listed in this category yet</h3><p>Use the survey below to tell us what kind of ${clean(categoryLabel(filter).toLowerCase())} support you need.</p></div>`
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
    "Service request summary",
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
  setSurveyMessage("Your service request summary is ready to send.", "success");
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
