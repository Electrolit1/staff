// api/guardar.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";

/**
 * Si prefieres, define estas variables como environment vars en Vercel:
 * FIREBASE_KEY  -> apiKey
 * FIREBASE_URL  -> databaseURL
 */
const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY || "AIzaSyAbkpn2i02BQ4EdbxPRmjMTiJb_U32noZA",
  databaseURL: process.env.FIREBASE_URL || "https://respuestas-a0c38-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Método no permitido");
  }

  try {
    // Read raw body (form-urlencoded)
    let body = "";
    for await (const chunk of req) body += chunk;
    const params = new URLSearchParams(body);

    const newEntry = {
      nombre: params.get("nombre") || "",
      edad: params.get("edad") ? Number(params.get("edad")) : null,
      pais: params.get("pais") || "",
      experiencia: params.get("experiencia") || "",
      motivo: params.get("motivo") || "",
      fecha: new Date().toISOString()
    };

    // push crea una key automática bajo /respuestas
    await push(ref(db, "respuestas"), newEntry);

    // Respuesta al usuario (puedes personalizar)
    res.status(200).send("<h3>✅ Respuesta guardada con éxito</h3><a href='/'>Volver</a>");
  } catch (err) {
    console.error("Error al guardar:", err);
    res.status(500).send("❌ Error al guardar la respuesta");
  }
}
