(function () {
  const STORAGE_KEY = "sut-physics-visitor-session";
  const shouldSkip = () =>
    !window.SUTSupabase?.isConfigured?.() ||
    navigator.doNotTrack === "1" ||
    window.doNotTrack === "1";

  const sessionId = () => {
    try {
      const existing = sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY);
      if (existing) return existing;
      const created = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      sessionStorage.setItem(STORAGE_KEY, created);
      localStorage.setItem(STORAGE_KEY, created);
      return created;
    } catch {
      return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    }
  };

  const utm = new URLSearchParams(window.location.search);
  const event = () => ({
    eventName: "page_view",
    sessionId: sessionId(),
    pagePath: `${window.location.pathname}${window.location.search}`,
    pageTitle: document.title,
    pageReferrer: document.referrer,
    pageHost: window.location.host,
    userAgent: navigator.userAgent,
    language: navigator.language,
    screenWidth: window.screen?.width,
    screenHeight: window.screen?.height,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    utmSource: utm.get("utm_source") || "",
    utmMedium: utm.get("utm_medium") || "",
    utmCampaign: utm.get("utm_campaign") || ""
  });

  const track = () => {
    if (shouldSkip()) return;
    window.SUTSupabase.trackVisit(event()).catch(error => {
      if (!/visitor_events|schema cache|PGRST|42P01/i.test(String(error?.message || ""))) {
        console.warn("Visitor analytics could not be recorded.", error);
      }
    });
  };

  if (document.visibilityState === "visible") track();
  else document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") track();
  }, { once: true });
})();
