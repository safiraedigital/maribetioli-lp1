import { createSessionToken, isAuthConfigured, sendJson, setSessionCookie, verifyPassword } from "./_auth.js";

async function readBody(req) {
  if (req.body && typeof req.body === "object") {
    return req.body;
  }

  if (typeof req.body === "string") {
    return JSON.parse(req.body || "{}");
  }

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }

  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return sendJson(res, 405, { ok: false, message: "Método não permitido." });
  }

  if (!isAuthConfigured()) {
    return sendJson(res, 500, {
      ok: false,
      message: "Senha de acesso não configurada na Vercel."
    });
  }

  try {
    const body = await readBody(req);

    if (!verifyPassword(body.password)) {
      return sendJson(res, 401, { ok: false, message: "Senha incorreta." });
    }

    setSessionCookie(res, createSessionToken());
    return sendJson(res, 200, { ok: true });
  } catch {
    return sendJson(res, 400, { ok: false, message: "Não foi possível ler a senha enviada." });
  }
}
