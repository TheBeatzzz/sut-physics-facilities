import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

type FacultyProfile = {
  id: string;
  name: string;
  profile_links?: Record<string, string>;
};

type MetricResult = {
  scopusAuthorId: string;
  hIndex: number | null;
  citationCount: number | null;
  documentCount: number | null;
  source: string;
  updatedAt: string;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });

const extractScopusAuthorId = (value: unknown) => {
  const text = String(value || "").trim();
  if (!text) return "";
  try {
    const url = new URL(text);
    const direct = url.searchParams.get("authorId") || url.searchParams.get("author_id") || url.searchParams.get("authid");
    if (direct && /^\d{6,20}$/.test(direct)) return direct;
  } catch {
    // Non-URL strings are handled by the fallback regex below.
  }
  const decoded = decodeURIComponent(text);
  const match = decoded.match(/(?:authorId|author_id|authid)[=/:%?&]+(\d{6,20})/i) || decoded.match(/\b(\d{8,20})\b/);
  return match ? match[1] : "";
};

const walk = (value: unknown, visitor: (key: string, value: unknown) => number | null): number | null => {
  if (!value || typeof value !== "object") return null;
  if (Array.isArray(value)) {
    for (const item of value) {
      const found = walk(item, visitor);
      if (found !== null) return found;
    }
    return null;
  }
  for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
    const visited = visitor(key, entry);
    if (visited !== null) return visited;
    const found = walk(entry, visitor);
    if (found !== null) return found;
  }
  return null;
};

const numberFrom = (value: unknown) => {
  const number = Number(String(value ?? "").replace(/,/g, ""));
  return Number.isFinite(number) ? number : null;
};

const findNumber = (payload: unknown, patterns: RegExp[]) => walk(payload, (key, value) => {
  if (!patterns.some(pattern => pattern.test(key))) return null;
  return numberFrom(value);
});

const fetchScopusMetrics = async (apiKey: string, scopusAuthorId: string): Promise<MetricResult> => {
  const endpoint = `https://api.elsevier.com/content/author/author_id/${encodeURIComponent(scopusAuthorId)}?view=METRICS&httpAccept=application/json`;
  const response = await fetch(endpoint, {
    headers: {
      Accept: "application/json",
      "X-ELS-APIKey": apiKey
    }
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Scopus API returned ${response.status}: ${text.slice(0, 240)}`);
  }
  const payload = await response.json();
  return {
    scopusAuthorId,
    hIndex: findNumber(payload, [/^h-?index$/i, /hindex/i]),
    citationCount: findNumber(payload, [/citation.*count/i, /cited.?by.*count/i, /^citedby-count$/i]),
    documentCount: findNumber(payload, [/document.*count/i, /^doc-count$/i, /scholarly.*output/i]),
    source: "Scopus",
    updatedAt: new Date().toISOString()
  };
};

Deno.serve(async request => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const elsevierApiKey = Deno.env.get("ELSEVIER_API_KEY");
  if (!supabaseUrl || !supabaseAnonKey) return json({ error: "Missing Supabase function environment" }, 500);
  if (!elsevierApiKey) return json({ error: "Missing ELSEVIER_API_KEY secret" }, 500);

  const authorization = request.headers.get("Authorization") || "";
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: authorization } },
    auth: { persistSession: false }
  });

  const { data: allowed, error: editorError } = await supabase.rpc("is_sut_editor");
  if (editorError) return json({ error: editorError.message }, 500);
  if (!allowed) return json({ error: "Not authorized" }, 403);

  const body = await request.json().catch(() => ({}));
  let query = supabase
    .from("faculty")
    .select("id,name,profile_links")
    .eq("public_ready", true);
  if (body.facultyId) query = query.eq("id", String(body.facultyId));

  const { data: faculty, error: facultyError } = await query;
  if (facultyError) return json({ error: facultyError.message }, 500);

  const results = [];
  let updated = 0;
  let skipped = 0;
  let failed = 0;

  for (const profile of (faculty || []) as FacultyProfile[]) {
    const scopusAuthorId = extractScopusAuthorId(profile.profile_links?.scopus);
    if (!scopusAuthorId) {
      skipped += 1;
      results.push({ id: profile.id, name: profile.name, status: "skipped", reason: "No Scopus Author ID in Scopus link" });
      continue;
    }
    try {
      const metrics = await fetchScopusMetrics(elsevierApiKey, scopusAuthorId);
      const { error: updateError } = await supabase
        .from("faculty")
        .update({ scopus_metrics: metrics })
        .eq("id", profile.id);
      if (updateError) throw updateError;
      updated += 1;
      results.push({ id: profile.id, name: profile.name, status: "updated", scopusAuthorId, metrics });
    } catch (error) {
      failed += 1;
      results.push({ id: profile.id, name: profile.name, status: "failed", scopusAuthorId, reason: error instanceof Error ? error.message : String(error) });
    }
  }

  return json({ updated, skipped, failed, results });
});
