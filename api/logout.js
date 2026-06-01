import { clearSessionCookie, sendJson } from "./_auth.js";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return sendJson(res, 405, { ok: false, message: "Método não permitido." });
  }

  clearSessionCookie(res);
  return sendJson(res, 200, { ok: true });
}
