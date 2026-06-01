import { hasValidSession, isAuthConfigured, sendJson } from "./_auth.js";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return sendJson(res, 405, { ok: false, message: "Método não permitido." });
  }

  return sendJson(res, 200, {
    ok: true,
    configured: isAuthConfigured(),
    authenticated: hasValidSession(req)
  });
}
