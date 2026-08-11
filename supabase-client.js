(function () {
  const config = window.SUT_SUPABASE_CONFIG || {};
  const placeholderValues = new Set([
    "",
    "https://YOUR-PROJECT-REF.supabase.co",
    "YOUR-SUPABASE-ANON-KEY"
  ]);

  const isConfigured = () =>
    Boolean(window.supabase?.createClient) &&
    !placeholderValues.has(String(config.url || "").trim()) &&
    !placeholderValues.has(String(config.anonKey || "").trim());

  let client = null;

  const getClient = () => {
    if (!isConfigured()) return null;
    if (!client) {
      client = window.supabase.createClient(config.url, config.anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true
        }
      });
    }
    return client;
  };

  const camelEquipment = row => ({
    id: row.id,
    name: row.name,
    assetCode: row.asset_code || "",
    manufacturer: row.manufacturer || "",
    model: row.model || "",
    category: row.category || "",
    description: row.description || "",
    facilityId: row.facility_id || "",
    room: row.room || "",
    custodian: row.custodian || "",
    email: row.email || "",
    researchGroup: row.research_group || "",
    acquisitionYear: row.acquisition_year || "",
    status: row.status || "Operational",
    access: row.access || "Shared by arrangement",
    lastMaintenance: row.last_maintenance || "",
    nextMaintenance: row.next_maintenance || "",
    safety: row.safety || "",
    publicReady: Boolean(row.public_ready),
    reviewStatus: row.review_status || "Draft",
    submitterName: row.submitter_name || "",
    submitterEmail: row.submitter_email || "",
    submitterNotes: row.submitter_notes || "",
    featurePhoto: row.feature_photo || null,
    gallery: Array.isArray(row.gallery) ? row.gallery : [],
    createdAt: String(row.created_at || "").slice(0, 10),
    updatedAt: String(row.updated_at || "").slice(0, 10),
    sample: Boolean(row.sample)
  });

  const snakeEquipment = record => ({
    id: record.id,
    name: record.name,
    asset_code: record.assetCode || null,
    manufacturer: record.manufacturer || null,
    model: record.model || null,
    category: record.category || null,
    description: String(record.description || "").slice(0, 800),
    facility_id: record.facilityId || null,
    room: record.room || null,
    custodian: record.custodian || null,
    email: record.email || null,
    research_group: record.researchGroup || null,
    acquisition_year: record.acquisitionYear ? Number(record.acquisitionYear) : null,
    status: record.status || "Operational",
    access: record.access || "Shared by arrangement",
    last_maintenance: record.lastMaintenance || null,
    next_maintenance: record.nextMaintenance || null,
    safety: record.safety || null,
    public_ready: Boolean(record.publicReady),
    review_status: record.reviewStatus || "Draft",
    submitter_name: record.submitterName || null,
    submitter_email: record.submitterEmail || null,
    submitter_notes: record.submitterNotes || null,
    feature_photo: record.featurePhoto || null,
    gallery: Array.isArray(record.gallery) ? record.gallery.slice(0, 5) : [],
    sample: Boolean(record.sample)
  });

  const camelFacility = row => ({
    id: row.id,
    name: row.name,
    building: row.building || "",
    room: row.room || "",
    lead: row.lead || "",
    description: row.description || "",
    color: row.color || ""
  });

  const snakeFacility = facility => ({
    id: facility.id,
    name: facility.name,
    building: facility.building || null,
    room: facility.room || null,
    lead: facility.lead || null,
    description: facility.description || null,
    color: facility.color || null
  });

  const asArray = value => Array.isArray(value) ? value : [];

  const camelFaculty = row => ({
    id: row.id,
    name: row.name,
    title: row.title || "",
    email: row.email || "",
    office: row.office || "",
    phone: row.phone || "",
    bio: row.bio || "",
    researchInterests: asArray(row.research_interests),
    highlights: asArray(row.highlights),
    activities: asArray(row.activities),
    recognitions: asArray(row.recognitions),
    profileLinks: row.profile_links && typeof row.profile_links === "object" ? row.profile_links : {},
    scopusMetrics: row.scopus_metrics && typeof row.scopus_metrics === "object" ? row.scopus_metrics : null,
    facilityIds: asArray(row.facility_ids),
    profilePhoto: row.profile_photo || null,
    color: row.color || "",
    publicReady: row.public_ready !== false,
    ownerEmail: row.owner_email || "",
    sample: Boolean(row.sample),
    createdAt: String(row.created_at || "").slice(0, 10),
    updatedAt: String(row.updated_at || "").slice(0, 10)
  });

  const snakeFaculty = profile => ({
    id: profile.id,
    name: profile.name,
    title: profile.title || null,
    email: profile.email || null,
    office: profile.office || null,
    phone: profile.phone || null,
    bio: profile.bio || null,
    research_interests: asArray(profile.researchInterests).filter(Boolean),
    highlights: asArray(profile.highlights).filter(Boolean),
    activities: asArray(profile.activities).filter(Boolean),
    recognitions: asArray(profile.recognitions).filter(Boolean),
    profile_links: profile.profileLinks && typeof profile.profileLinks === "object" ? profile.profileLinks : {},
    scopus_metrics: profile.scopusMetrics && typeof profile.scopusMetrics === "object" ? profile.scopusMetrics : null,
    facility_ids: asArray(profile.facilityIds).filter(Boolean),
    profile_photo: profile.profilePhoto || null,
    color: profile.color || null,
    public_ready: profile.publicReady !== false,
    owner_email: profile.ownerEmail || profile.email || null,
    sample: Boolean(profile.sample)
  });

  const camelVisitorEvent = row => ({
    id: row.id,
    eventName: row.event_name || "page_view",
    sessionId: row.session_id || "",
    pagePath: row.page_path || "",
    pageTitle: row.page_title || "",
    pageReferrer: row.page_referrer || "",
    pageHost: row.page_host || "",
    userAgent: row.user_agent || "",
    language: row.language || "",
    screenWidth: row.screen_width || 0,
    screenHeight: row.screen_height || 0,
    viewportWidth: row.viewport_width || 0,
    viewportHeight: row.viewport_height || 0,
    timezone: row.timezone || "",
    utmSource: row.utm_source || "",
    utmMedium: row.utm_medium || "",
    utmCampaign: row.utm_campaign || "",
    createdAt: row.created_at || ""
  });

  const snakeVisitorEvent = event => ({
    event_name: event.eventName || "page_view",
    session_id: event.sessionId,
    page_path: String(event.pagePath || "").slice(0, 500),
    page_title: String(event.pageTitle || "").slice(0, 180),
    page_referrer: String(event.pageReferrer || "").slice(0, 500) || null,
    page_host: String(event.pageHost || "").slice(0, 180),
    user_agent: String(event.userAgent || "").slice(0, 500),
    language: String(event.language || "").slice(0, 80),
    screen_width: Number(event.screenWidth) || null,
    screen_height: Number(event.screenHeight) || null,
    viewport_width: Number(event.viewportWidth) || null,
    viewport_height: Number(event.viewportHeight) || null,
    timezone: String(event.timezone || "").slice(0, 120),
    utm_source: String(event.utmSource || "").slice(0, 120) || null,
    utm_medium: String(event.utmMedium || "").slice(0, 120) || null,
    utm_campaign: String(event.utmCampaign || "").slice(0, 180) || null
  });

  const dataUrlToBlob = dataUrl => {
    const [header, base64] = String(dataUrl).split(",");
    const contentType = header.match(/data:([^;]+)/)?.[1] || "image/jpeg";
    const binary = atob(base64 || "");
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
    return new Blob([bytes], { type: contentType });
  };

  const photoSrc = photo => photo?.url || photo?.data || "";

  const uploadPhoto = async (recordId, photo, role, index = 0) => {
    if (!photo?.data?.startsWith("data:image/")) return photo || null;
    const supabase = getClient();
    const extension = "jpg";
    const safeRole = role.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
    const path = `${recordId}/${safeRole}-${Date.now()}-${index}.${extension}`;
    const { error } = await supabase.storage
      .from(config.photoBucket || "equipment-photos")
      .upload(path, dataUrlToBlob(photo.data), {
        contentType: "image/jpeg",
        upsert: true
      });
    if (error) throw error;
    const { data } = supabase.storage.from(config.photoBucket || "equipment-photos").getPublicUrl(path);
    return {
      url: data.publicUrl,
      path,
      alt: photo.alt || "",
      name: photo.name || ""
    };
  };

  const uploadRecordMedia = async record => ({
    ...record,
    featurePhoto: record.featurePhoto ? await uploadPhoto(record.id, record.featurePhoto, "feature", 0) : null,
    gallery: await Promise.all((Array.isArray(record.gallery) ? record.gallery.slice(0, 5) : []).map((photo, index) => uploadPhoto(record.id, photo, "gallery", index + 1)))
  });

  const uploadFacultyMedia = async profile => ({
    ...profile,
    profilePhoto: profile.profilePhoto ? await uploadPhoto(`faculty/${profile.id}`, profile.profilePhoto, "profile", 0) : null
  });

  const loadRegistry = async ({ publicOnly = false } = {}) => {
    const supabase = getClient();
    if (!supabase) throw new Error("Supabase is not configured");

    const facilitiesQuery = supabase.from("facilities").select("*").order("id", { ascending: true });
    let facultyQuery = supabase.from("faculty").select("*").order("name", { ascending: true });
    let equipmentQuery = supabase.from("equipment").select("*").order("updated_at", { ascending: false });
    if (publicOnly) {
      facultyQuery = facultyQuery.eq("public_ready", true);
      equipmentQuery = equipmentQuery.eq("review_status", "Verified").eq("public_ready", true);
    }

    const [{ data: facilities, error: facilityError }, { data: faculty, error: facultyError }, { data: equipment, error: equipmentError }] = await Promise.all([
      facilitiesQuery,
      facultyQuery,
      equipmentQuery
    ]);

    if (facilityError) throw facilityError;
    const facultyTableMissing = facultyError && ["42P01", "PGRST205"].includes(facultyError.code);
    if (facultyError && !facultyTableMissing) throw facultyError;
    if (equipmentError) throw equipmentError;

    return {
      meta: {
        version: 5,
        institution: "Suranaree University of Technology",
        program: "Physics Program",
        backend: "supabase",
        loadedAt: new Date().toISOString()
      },
      facilities: (facilities || []).map(camelFacility),
      faculty: facultyTableMissing ? [] : (faculty || []).map(camelFaculty),
      equipment: (equipment || []).map(camelEquipment)
    };
  };

  const saveEquipment = async record => {
    const supabase = getClient();
    const withMedia = await uploadRecordMedia(record);
    const { data, error } = await supabase
      .from("equipment")
      .upsert(snakeEquipment(withMedia), { onConflict: "id" })
      .select()
      .single();
    if (error) throw error;
    return camelEquipment(data);
  };

  const deleteEquipment = async id => {
    const supabase = getClient();
    const { error } = await supabase.from("equipment").delete().eq("id", id);
    if (error) throw error;
  };

  const saveFacility = async facility => {
    const supabase = getClient();
    const { data, error } = await supabase
      .from("facilities")
      .upsert(snakeFacility(facility), { onConflict: "id" })
      .select()
      .single();
    if (error) throw error;
    return camelFacility(data);
  };

  const saveFaculty = async profile => {
    const supabase = getClient();
    const withMedia = await uploadFacultyMedia(profile);
    const { data, error } = await supabase
      .from("faculty")
      .upsert(snakeFaculty(withMedia), { onConflict: "id" })
      .select()
      .single();
    if (error) throw error;
    return camelFaculty(data);
  };

  const deleteFaculty = async id => {
    const supabase = getClient();
    const { error } = await supabase.from("faculty").delete().eq("id", id);
    if (error) throw error;
  };

  const trackVisit = async event => {
    const supabase = getClient();
    if (!supabase) return null;
    const { error } = await supabase.from("visitor_events").insert(snakeVisitorEvent(event));
    if (error) throw error;
    return true;
  };

  const loadVisitorStats = async ({ days = 90, limit = 2000 } = {}) => {
    const supabase = getClient();
    if (!supabase) throw new Error("Supabase is not configured");
    const since = new Date(Date.now() - Number(days || 90) * 24 * 60 * 60 * 1000).toISOString();
    const { data, error } = await supabase
      .from("visitor_events")
      .select("*")
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(Number(limit || 2000));
    if (error) throw error;
    return (data || []).map(camelVisitorEvent);
  };

  const refreshScopusMetrics = async (facultyId = null) => {
    const supabase = getClient();
    if (!supabase) throw new Error("Supabase is not configured");
    const { data, error } = await supabase.functions.invoke("refresh-scopus-metrics", {
      body: facultyId ? { facultyId } : {}
    });
    if (error) throw error;
    return data;
  };

  const getSession = async () => {
    const supabase = getClient();
    if (!supabase) return null;
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  };

  const clearAuthUrl = () => {
    const url = new URL(window.location.href);
    ["code", "state", "error", "error_code", "error_description"].forEach(param => url.searchParams.delete(param));
    url.hash = "";
    window.history.replaceState({}, document.title, `${url.pathname}${url.search}${url.hash}`);
  };

  const friendlyAuthError = (message, code = "") => {
    const text = String(message || "");
    const reason = String(code || "");
    if (/otp_expired|expired/i.test(`${reason} ${text}`)) {
      return "This Supabase invite or recovery link has expired. Ask the admin to send a fresh invite, then open the new link promptly.";
    }
    return text || "Supabase could not complete this email link.";
  };

  const completeAuthFromUrl = async () => {
    const supabase = getClient();
    if (!supabase) return null;
    const url = new URL(window.location.href);
    const hash = new URLSearchParams(url.hash.replace(/^#/, ""));
    const authError = url.searchParams.get("error_description") || url.searchParams.get("error") || hash.get("error_description") || hash.get("error");
    if (authError) {
      const authCode = url.searchParams.get("error_code") || hash.get("error_code") || "";
      clearAuthUrl();
      throw new Error(friendlyAuthError(authError, authCode));
    }
    if (url.searchParams.has("code")) {
      const { data, error } = await supabase.auth.exchangeCodeForSession(window.location.href);
      clearAuthUrl();
      if (error) throw error;
      return data.session;
    }
    if (hash.has("access_token") || hash.has("refresh_token")) {
      await new Promise(resolve => setTimeout(resolve, 250));
      const session = await getSession();
      if (session) clearAuthUrl();
      return session;
    }
    return null;
  };

  const signIn = async (email, password) => {
    const supabase = getClient();
    const allowedDomains = (Array.isArray(config.facultyEmailDomains) && config.facultyEmailDomains.length
      ? config.facultyEmailDomains
      : [config.facultyEmailDomain || "sut.ac.th"])
      .map(domain => String(domain).replace(/^@/, "").trim().toLowerCase())
      .filter(Boolean);
    const normalizedEmail = String(email || "").trim().toLowerCase();
    if (!allowedDomains.some(domain => normalizedEmail.endsWith(`@${domain}`))) {
      throw new Error(`Use an approved faculty email ending in ${allowedDomains.map(domain => `@${domain}`).join(" or ")}.`);
    }
    if (!password) throw new Error("Enter your password to sign in.");
    const { data, error } = await supabase.auth.signInWithPassword({ email: normalizedEmail, password });
    if (error) throw error;
    return data.session;
  };

  const signOut = async () => {
    const supabase = getClient();
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const updatePassword = async password => {
    const supabase = getClient();
    if (!supabase) throw new Error("Supabase is not configured");
    const { data, error } = await supabase.auth.updateUser({ password });
    if (error) throw error;
    return data.user;
  };

  window.SUTSupabase = {
    config,
    isConfigured,
    getClient,
    getSession,
    completeAuthFromUrl,
    signIn,
    signOut,
    updatePassword,
    loadRegistry,
    saveEquipment,
    deleteEquipment,
    saveFacility,
    saveFaculty,
    deleteFaculty,
    trackVisit,
    loadVisitorStats,
    refreshScopusMetrics,
    photoSrc
  };
})();
