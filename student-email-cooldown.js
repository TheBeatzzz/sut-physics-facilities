window.SUTStudentEmailCooldown = (() => {
  const STORAGE_KEY = "sut-physics-auth-email-requests-v1";
  const LIMIT = 2;
  const WINDOW_MS = 60 * 60 * 1000;

  const now = () => Date.now();
  const recent = () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]").filter(timestamp => now() - Number(timestamp) < WINDOW_MS);
    } catch {
      return [];
    }
  };
  const save = timestamps => localStorage.setItem(STORAGE_KEY, JSON.stringify(timestamps));
  const status = () => {
    const timestamps = recent();
    const remaining = Math.max(0, LIMIT - timestamps.length);
    const waitMs = remaining ? 0 : WINDOW_MS - (now() - Math.min(...timestamps));
    return { remaining, waitMs, limit: LIMIT, windowMs: WINDOW_MS };
  };
  const record = () => {
    const timestamps = [...recent(), now()];
    save(timestamps);
    return status();
  };
  const formatWait = waitMs => {
    const minutes = Math.max(1, Math.ceil(waitMs / 60000));
    return minutes >= 60 ? "about 1 hour" : `about ${minutes} minute${minutes === 1 ? "" : "s"}`;
  };

  return { status, record, formatWait };
})();
