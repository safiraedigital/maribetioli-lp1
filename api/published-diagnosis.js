import { hasValidSession, sendJson } from "./_auth.js";
import { publishedDiagnosis } from "./_published-diagnosis.js";

const PUBLISHED_DIAGNOSIS_ID = "published-mari-betioli-2026-06-01-1333";
const PUBLISHED_DIAGNOSIS_SAVED_AT = "2026-06-01T13:33:00-03:00";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return sendJson(res, 405, { ok: false, message: "Método não permitido." });
  }

  if (!hasValidSession(req)) {
    return sendJson(res, 401, { ok: false, message: "Acesso não autorizado." });
  }

  return sendJson(res, 200, {
    ok: true,
    diagnosis: {
      id: PUBLISHED_DIAGNOSIS_ID,
      name: "Diagnóstico Mari Betioli — 01/06/2026 13:33",
      savedAt: PUBLISHED_DIAGNOSIS_SAVED_AT,
      updatedAt: PUBLISHED_DIAGNOSIS_SAVED_AT,
      data: publishedDiagnosis
    }
  });
}
