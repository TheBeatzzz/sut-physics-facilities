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
    ownerEmail: row.owner_email || "",
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
    owner_email: record.ownerEmail || null,
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
    ownerEmail: row.owner_email || "",
    description: row.description || "",
    color: row.color || ""
  });

  const snakeFacility = facility => ({
    id: facility.id,
    name: facility.name,
    building: facility.building || null,
    room: facility.room || null,
    lead: facility.lead || null,
    owner_email: facility.ownerEmail || null,
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
    manualMetrics: row.manual_metrics && typeof row.manual_metrics === "object" ? row.manual_metrics : null,
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
    manual_metrics: profile.manualMetrics && typeof profile.manualMetrics === "object" ? profile.manualMetrics : null,
    facility_ids: asArray(profile.facilityIds).filter(Boolean),
    profile_photo: profile.profilePhoto || null,
    color: profile.color || null,
    public_ready: profile.publicReady !== false,
    owner_email: profile.ownerEmail || profile.email || null,
    sample: Boolean(profile.sample)
  });

  const camelStudent = row => ({
    id: row.id,
    studentCode: row.student_code || "",
    name: row.name,
    preferredName: row.preferred_name || "",
    email: row.email || "",
    recordType: row.record_type || "physics",
    level: row.level === "Undergraduate" ? "Bachelor" : row.level || "Bachelor",
    status: row.status || "Active",
    advisorId: row.advisor_id || "",
    advisorRole: row.advisor_role || "Primary advisor",
    coadvisor: row.coadvisor || "",
    researchGroupId: row.research_group_id || "",
    researchGroup: row.research_group || "",
    homeSchool: row.home_school || "",
    homeProgram: row.home_program || "",
    projectTitle: row.project_title || "",
    thesisTitle: row.thesis_title || "",
    startTerm: row.start_term || "",
    startYear: row.start_year || "",
    expectedGraduationYear: row.expected_graduation_year || "",
    graduationYear: row.graduation_year || "",
    office: row.office || "",
    phone: row.phone || "",
    profilePhoto: row.profile_photo || null,
    shortBio: row.short_bio || "",
    researchInterests: asArray(row.research_interests),
    skills: asArray(row.skills),
    notes: row.notes || "",
    programId: row.program_id || "",
    studyProgress: row.study_progress && typeof row.study_progress === "object" ? row.study_progress : {},
    deadlineAlertsEnabled: row.deadline_alerts_enabled !== false,
    deadlineLeadDays: asArray(row.deadline_lead_days).length ? asArray(row.deadline_lead_days) : [30, 14, 7, 1],
    verificationStatus: row.verification_status || "Pending",
    publicReady: Boolean(row.public_ready),
    verifiedByEmail: row.verified_by_email || "",
    verifiedAt: row.verified_at || "",
    ownerEmail: row.owner_email || "",
    sample: Boolean(row.sample),
    createdAt: String(row.created_at || "").slice(0, 10),
    updatedAt: String(row.updated_at || "").slice(0, 10)
  });

  const optionalYear = value => value ? Number(value) : null;
  const optionalTerm = value => ["1", "2", "3"].includes(String(value || "")) ? Number(value) : null;

  const snakeStudent = student => ({
    id: student.id,
    student_code: student.studentCode || null,
    name: student.name,
    preferred_name: student.preferredName || null,
    email: student.email || null,
    record_type: student.recordType || "physics",
    level: student.level === "Undergraduate" ? "Bachelor" : student.level || "Bachelor",
    status: student.status || "Active",
    advisor_id: student.advisorId || null,
    advisor_role: student.advisorRole || "Primary advisor",
    coadvisor: student.coadvisor || null,
    research_group_id: student.researchGroupId || null,
    research_group: student.researchGroup || null,
    home_school: student.recordType === "sut-external" ? student.homeSchool || null : null,
    home_program: student.recordType === "sut-external" ? student.homeProgram || null : null,
    project_title: student.projectTitle || null,
    thesis_title: student.thesisTitle || null,
    start_term: optionalTerm(student.startTerm),
    start_year: optionalYear(student.startYear),
    expected_graduation_year: optionalYear(student.expectedGraduationYear),
    graduation_year: optionalYear(student.graduationYear),
    office: student.office || null,
    phone: student.phone || null,
    profile_photo: student.profilePhoto || null,
    short_bio: String(student.shortBio || "") || null,
    research_interests: asArray(student.researchInterests).slice(0, 5).filter(Boolean),
    skills: asArray(student.skills).filter(Boolean),
    notes: student.notes || null,
    program_id: student.programId || null,
    study_progress: student.studyProgress && typeof student.studyProgress === "object" ? student.studyProgress : {},
    deadline_alerts_enabled: student.deadlineAlertsEnabled !== false,
    deadline_lead_days: asArray(student.deadlineLeadDays).length ? asArray(student.deadlineLeadDays) : [30, 14, 7, 1],
    verification_status: student.verificationStatus || "Pending",
    public_ready: Boolean(student.publicReady),
    verified_by_email: student.verifiedByEmail || null,
    verified_at: student.verifiedAt || null,
    owner_email: student.ownerEmail || student.email || null,
    sample: Boolean(student.sample)
  });

  const camelResearcher = row => ({
    id: row.id,
    name: row.name,
    type: row.type || "Postdoctoral Researcher",
    email: row.email || "",
    status: row.status || "Active",
    hostFacultyId: row.host_faculty_id || "",
    hostRole: row.host_role || "Host faculty / PI",
    researchGroupId: row.research_group_id || "",
    researchGroup: row.research_group || "",
    office: row.office || "",
    phone: row.phone || "",
    profilePhoto: row.profile_photo || null,
    projectTitle: row.project_title || "",
    fundingSource: row.funding_source || "",
    startDate: row.start_date || "",
    endDate: row.end_date || "",
    shortBio: row.short_bio || "",
    researchInterests: asArray(row.research_interests),
    skills: asArray(row.skills),
    notes: row.notes || "",
    publicReady: Boolean(row.public_ready),
    reviewStatus: row.review_status || "Draft",
    ownerEmail: row.owner_email || "",
    sample: Boolean(row.sample),
    createdAt: String(row.created_at || "").slice(0, 10),
    updatedAt: String(row.updated_at || "").slice(0, 10)
  });

  const snakeResearcher = researcher => ({
    id: researcher.id,
    name: researcher.name,
    type: researcher.type || "Postdoctoral Researcher",
    email: researcher.email || null,
    status: researcher.status || "Active",
    host_faculty_id: researcher.hostFacultyId || null,
    host_role: researcher.hostRole || "Host faculty / PI",
    research_group_id: researcher.researchGroupId || null,
    research_group: researcher.researchGroup || null,
    office: researcher.office || null,
    phone: researcher.phone || null,
    profile_photo: researcher.profilePhoto || null,
    project_title: researcher.projectTitle || null,
    funding_source: researcher.fundingSource || null,
    start_date: researcher.startDate || null,
    end_date: researcher.endDate || null,
    short_bio: String(researcher.shortBio || "") || null,
    research_interests: asArray(researcher.researchInterests).slice(0, 5).filter(Boolean),
    skills: asArray(researcher.skills).filter(Boolean),
    notes: researcher.notes || null,
    public_ready: Boolean(researcher.publicReady),
    review_status: researcher.reviewStatus || "Draft",
    owner_email: researcher.ownerEmail || researcher.email || null,
    sample: Boolean(researcher.sample)
  });

  const camelService = row => ({
    id: row.id,
    title: row.title,
    category: row.category || "workshops",
    summary: row.summary || "",
    details: row.details || "",
    audience: row.audience || "",
    duration: row.duration || "",
    schedule: row.schedule || "",
    fee: row.fee || "",
    location: row.location || "",
    contactName: row.contact_name || "",
    contactEmail: row.contact_email || "",
    facultyId: row.faculty_id || "",
    ownerEmail: row.owner_email || "",
    publicReady: Boolean(row.public_ready),
    reviewStatus: row.review_status || "Draft",
    submitterNotes: row.submitter_notes || "",
    sample: Boolean(row.sample),
    createdAt: String(row.created_at || "").slice(0, 10),
    updatedAt: String(row.updated_at || "").slice(0, 10)
  });

  const snakeService = service => ({
    id: service.id,
    title: service.title,
    category: service.category || "workshops",
    summary: service.summary || null,
    details: service.details || null,
    audience: service.audience || null,
    duration: service.duration || null,
    schedule: service.schedule || null,
    fee: service.fee || null,
    location: service.location || null,
    contact_name: service.contactName || null,
    contact_email: service.contactEmail || null,
    faculty_id: service.facultyId || null,
    owner_email: service.ownerEmail || null,
    public_ready: Boolean(service.publicReady),
    review_status: service.reviewStatus || "Draft",
    submitter_notes: service.submitterNotes || null,
    sample: Boolean(service.sample)
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

  const uploadStudentMedia = async student => ({
    ...student,
    profilePhoto: student.profilePhoto ? await uploadPhoto(`students/${student.id}`, student.profilePhoto, "profile", 0) : null
  });

  const uploadResearcherMedia = async researcher => ({
    ...researcher,
    profilePhoto: researcher.profilePhoto ? await uploadPhoto(`researchers/${researcher.id}`, researcher.profilePhoto, "profile", 0) : null
  });

  const loadRegistry = async ({ publicOnly = false } = {}) => {
    const supabase = getClient();
    if (!supabase) throw new Error("Supabase is not configured");

    const facilitiesQuery = supabase.from("facilities").select("*").order("id", { ascending: true });
    let facultyQuery = supabase.from("faculty").select("*").order("name", { ascending: true });
    let equipmentQuery = supabase.from("equipment").select("*").order("updated_at", { ascending: false });
    let servicesQuery = supabase.from("services").select("*").order("updated_at", { ascending: false });
    let researchersQuery = supabase.from("researchers").select("*").order("updated_at", { ascending: false });
    let studentsQuery = publicOnly ? null : supabase.from("students").select("*").order("updated_at", { ascending: false });
    if (publicOnly) {
      facultyQuery = facultyQuery.eq("public_ready", true);
      equipmentQuery = equipmentQuery.eq("review_status", "Verified").eq("public_ready", true);
      servicesQuery = servicesQuery.eq("review_status", "Verified").eq("public_ready", true);
      researchersQuery = researchersQuery.eq("review_status", "Verified").eq("public_ready", true);
    }

    const [{ data: facilities, error: facilityError }, { data: faculty, error: facultyError }, { data: equipment, error: equipmentError }, { data: services, error: servicesError }, { data: researchers, error: researchersError }, studentsResult] = await Promise.all([
      facilitiesQuery,
      facultyQuery,
      equipmentQuery,
      servicesQuery,
      researchersQuery,
      studentsQuery || Promise.resolve({ data: [], error: null })
    ]);
    const { data: students, error: studentsError } = studentsResult;

    if (facilityError) throw facilityError;
    const facultyTableMissing = facultyError && ["42P01", "PGRST205"].includes(facultyError.code);
    const servicesTableMissing = servicesError && ["42P01", "PGRST205"].includes(servicesError.code);
    const researchersTableMissing = researchersError && ["42P01", "PGRST205"].includes(researchersError.code);
    const studentsTableMissing = studentsError && ["42P01", "PGRST205"].includes(studentsError.code);
    if (facultyError && !facultyTableMissing) throw facultyError;
    if (equipmentError) throw equipmentError;
    if (servicesError && !servicesTableMissing) throw servicesError;
    if (researchersError && !researchersTableMissing) throw researchersError;
    if (studentsError && !studentsTableMissing) throw studentsError;

    return {
      meta: {
        version: 6,
        institution: "Suranaree University of Technology",
        program: "Physics Program",
        backend: "supabase",
        loadedAt: new Date().toISOString()
      },
      facilities: (facilities || []).map(camelFacility),
      faculty: facultyTableMissing ? [] : (faculty || []).map(camelFaculty),
      students: studentsTableMissing ? [] : (students || []).map(camelStudent),
      researchers: researchersTableMissing ? [] : (researchers || []).map(camelResearcher),
      equipment: (equipment || []).map(camelEquipment),
      services: servicesTableMissing ? [] : (services || []).map(camelService)
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

  const deleteFacility = async id => {
    const supabase = getClient();
    const { error } = await supabase.from("facilities").delete().eq("id", id);
    if (error) throw error;
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

  const saveStudent = async student => {
    const supabase = getClient();
    const hasLocalProfilePhoto = student.profilePhoto?.data?.startsWith("data:image/");
    if (hasLocalProfilePhoto) {
      let uploadedStudent;
      try {
        uploadedStudent = await uploadStudentMedia(student);
      } catch (uploadError) {
        const policyBlocked = /row-level|policy|not authorized|unauthorized|forbidden/i.test(String(uploadError.message || ""));
        if (!policyBlocked) throw uploadError;
        const { data: initialData, error: initialError } = await supabase
          .from("students")
          .upsert(snakeStudent({ ...student, profilePhoto: null }), { onConflict: "id" })
          .select()
          .single();
        if (initialError) throw initialError;
        uploadedStudent = await uploadStudentMedia({ ...student, id: initialData.id });
      }
      const { data, error } = await supabase
        .from("students")
        .upsert(snakeStudent(uploadedStudent), { onConflict: "id" })
        .select()
        .single();
      if (error) throw error;
      return camelStudent(data);
    }
    const { data, error } = await supabase
      .from("students")
      .upsert(snakeStudent(student), { onConflict: "id" })
      .select()
      .single();
    if (error) throw error;
    return camelStudent(data);
  };

  const loadMyStudentRecord = async () => {
    const supabase = getClient();
    const session = await getSession();
    const email = String(session?.user?.email || "").trim().toLowerCase();
    if (!email) throw new Error("Sign in before loading a student record.");
    const { data, error } = await supabase
      .from("students")
      .select("*")
      .or(`owner_email.eq.${email},email.eq.${email}`)
      .order("updated_at", { ascending: false })
      .limit(1);
    if (error) throw error;
    return data?.[0] ? camelStudent(data[0]) : null;
  };

  const deleteStudent = async id => {
    const supabase = getClient();
    const { error } = await supabase.from("students").delete().eq("id", id);
    if (error) throw error;
  };

  const loadPublicStudents = async () => {
    const supabase = getClient();
    if (!supabase) throw new Error("Supabase is not configured");
    const publicStudentColumns = "id,student_code,name,preferred_name,record_type,level,status,advisor_id,advisor_role,coadvisor,research_group_id,research_group,home_school,home_program,project_title,thesis_title,start_term,start_year,profile_photo,short_bio,research_interests,program_id,skills,public_ready,verification_status,updated_at";
    const legacyPublicStudentColumns = "id,student_code,name,preferred_name,level,status,advisor_id,coadvisor,research_group_id,research_group,project_title,thesis_title,start_term,start_year,short_bio,program_id,skills,public_ready,verification_status,updated_at";
    const loadStudentRows = columns => supabase
      .from("students")
      .select(columns)
      .eq("verification_status", "Verified")
      .eq("public_ready", true)
      .order("name", { ascending: true });
    const studentsPromise = loadStudentRows(publicStudentColumns).then(result => {
      const message = String(result.error?.message || "");
      return /record_type|advisor_role|home_school|home_program|profile_photo|research_interests|schema cache|PGRST|42703/i.test(message) ? loadStudentRows(legacyPublicStudentColumns) : result;
    });
    const [{ data: students, error: studentsError }, { data: faculty, error: facultyError }, { data: facilities, error: facilityError }] = await Promise.all([
      studentsPromise,
      supabase.from("faculty").select("*").eq("public_ready", true).order("name", { ascending: true }),
      supabase.from("facilities").select("*").order("id", { ascending: true })
    ]);
    if (studentsError) throw studentsError;
    if (facultyError) throw facultyError;
    if (facilityError) throw facilityError;
    return {
      students: (students || []).map(camelStudent),
      faculty: (faculty || []).map(camelFaculty),
      facilities: (facilities || []).map(camelFacility)
    };
  };

  const saveResearcher = async researcher => {
    const supabase = getClient();
    const hasLocalProfilePhoto = researcher.profilePhoto?.data?.startsWith("data:image/");
    if (hasLocalProfilePhoto) {
      let uploadedResearcher;
      try {
        uploadedResearcher = await uploadResearcherMedia(researcher);
      } catch (uploadError) {
        const policyBlocked = /row-level|policy|not authorized|unauthorized|forbidden/i.test(String(uploadError.message || ""));
        if (!policyBlocked) throw uploadError;
        const { data: initialData, error: initialError } = await supabase
          .from("researchers")
          .upsert(snakeResearcher({ ...researcher, profilePhoto: null }), { onConflict: "id" })
          .select()
          .single();
        if (initialError) throw initialError;
        uploadedResearcher = await uploadResearcherMedia({ ...researcher, id: initialData.id });
      }
      const { data, error } = await supabase
        .from("researchers")
        .upsert(snakeResearcher(uploadedResearcher), { onConflict: "id" })
        .select()
        .single();
      if (error) throw error;
      return camelResearcher(data);
    }
    const { data, error } = await supabase
      .from("researchers")
      .upsert(snakeResearcher(researcher), { onConflict: "id" })
      .select()
      .single();
    if (error) throw error;
    return camelResearcher(data);
  };

  const loadMyResearcherRecord = async () => {
    const supabase = getClient();
    const session = await getSession();
    const email = String(session?.user?.email || "").trim().toLowerCase();
    if (!email) throw new Error("Sign in before loading a researcher profile.");
    const { data, error } = await supabase
      .from("researchers")
      .select("*")
      .or(`owner_email.eq.${email},email.eq.${email}`)
      .order("updated_at", { ascending: false })
      .limit(1);
    if (error) throw error;
    return data?.[0] ? camelResearcher(data[0]) : null;
  };

  const deleteResearcher = async id => {
    const supabase = getClient();
    const { error } = await supabase.from("researchers").delete().eq("id", id);
    if (error) throw error;
  };

  const loadPublicResearchers = async () => {
    const supabase = getClient();
    if (!supabase) throw new Error("Supabase is not configured");
    const [{ data: researchers, error: researchersError }, { data: faculty, error: facultyError }, { data: facilities, error: facilityError }] = await Promise.all([
      supabase
        .from("researchers")
        .select("*")
        .eq("review_status", "Verified")
        .eq("public_ready", true)
        .order("name", { ascending: true }),
      supabase.from("faculty").select("*").eq("public_ready", true).order("name", { ascending: true }),
      supabase.from("facilities").select("*").order("id", { ascending: true })
    ]);
    if (researchersError) throw researchersError;
    if (facultyError) throw facultyError;
    if (facilityError) throw facilityError;
    return {
      researchers: (researchers || []).map(camelResearcher),
      faculty: (faculty || []).map(camelFaculty),
      facilities: (facilities || []).map(camelFacility)
    };
  };

  const saveService = async service => {
    const supabase = getClient();
    const { data, error } = await supabase
      .from("services")
      .upsert(snakeService(service), { onConflict: "id" })
      .select()
      .single();
    if (error) throw error;
    return camelService(data);
  };

  const deleteService = async id => {
    const supabase = getClient();
    const { error } = await supabase.from("services").delete().eq("id", id);
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
      throw new Error(`Use an approved SUT email ending in ${allowedDomains.map(domain => `@${domain}`).join(" or ")}.`);
    }
    if (!password) throw new Error("Enter your password to sign in.");
    const { data, error } = await supabase.auth.signInWithPassword({ email: normalizedEmail, password });
    if (error) throw error;
    return data.session;
  };

  const signUp = async (email, password, metadata = {}, options = {}) => {
    const supabase = getClient();
    const allowedDomains = (Array.isArray(config.facultyEmailDomains) && config.facultyEmailDomains.length
      ? config.facultyEmailDomains
      : [config.facultyEmailDomain || "sut.ac.th"])
      .map(domain => String(domain).replace(/^@/, "").trim().toLowerCase())
      .filter(Boolean);
    const normalizedEmail = String(email || "").trim().toLowerCase();
    if (!allowedDomains.some(domain => normalizedEmail.endsWith(`@${domain}`))) {
      throw new Error(`Use an approved SUT email ending in ${allowedDomains.map(domain => `@${domain}`).join(" or ")}.`);
    }
    if (!password || password.length < 8) throw new Error("Use a password with at least 8 characters.");
    const { data, error } = await supabase.auth.signUp({
      email: normalizedEmail,
      password,
      options: {
        data: metadata && typeof metadata === "object" ? metadata : {},
        emailRedirectTo: options.emailRedirectTo || window.location.href.split("#")[0]
      }
    });
    if (error) throw error;
    return data.session;
  };

  const requestPasswordReset = async email => {
    const supabase = getClient();
    const allowedDomains = (Array.isArray(config.facultyEmailDomains) && config.facultyEmailDomains.length
      ? config.facultyEmailDomains
      : [config.facultyEmailDomain || "sut.ac.th"])
      .map(domain => String(domain).replace(/^@/, "").trim().toLowerCase())
      .filter(Boolean);
    const normalizedEmail = String(email || "").trim().toLowerCase();
    if (!allowedDomains.some(domain => normalizedEmail.endsWith(`@${domain}`))) {
      throw new Error(`Use an approved SUT email ending in ${allowedDomains.map(domain => `@${domain}`).join(" or ")}.`);
    }
    const redirectTo = window.location.href.split("#")[0].split("?")[0];
    const { error } = await supabase.auth.resetPasswordForEmail(normalizedEmail, { redirectTo });
    if (error) throw error;
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
    signUp,
    requestPasswordReset,
    signOut,
    updatePassword,
    loadRegistry,
    saveEquipment,
    deleteEquipment,
    saveFacility,
    deleteFacility,
    saveFaculty,
    deleteFaculty,
    saveStudent,
    loadMyStudentRecord,
    deleteStudent,
    loadPublicStudents,
    saveResearcher,
    loadMyResearcherRecord,
    deleteResearcher,
    loadPublicResearchers,
    saveService,
    deleteService,
    trackVisit,
    loadVisitorStats,
    refreshScopusMetrics,
    photoSrc
  };
})();
