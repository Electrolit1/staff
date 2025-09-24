import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)),
    databaseURL: "https://respuestas-a0c38-default-rtdb.firebaseio.com"
  });
}

const db = admin.database();

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Método no permitido");

  try {
    let body = "";
    for await (const chunk of req) body += chunk;
    const params = new URLSearchParams(body);

    const newEntry = {
      nombre: params.get("nombre") || "",
      edad: params.get("edad") ? Number(params.get("edad")) : null,
      pais: params.get("pais") || "",
      experiencia: params.get("experiencia") || "",
      motivo: params.get("motivo") || "",
      fecha:
