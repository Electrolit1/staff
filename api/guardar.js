import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "POST") {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const params = new URLSearchParams(body);
      const data = {
        nombre: params.get("nombre"),
        edad: params.get("edad"),
        pais: params.get("pais"),
        experiencia: params.get("experiencia"),
        motivo: params.get("motivo"),
        fecha: new Date().toLocaleString("es-CO")
      };

      const logPath = path.join(process.cwd(), "respuestas.log");
      fs.appendFileSync(logPath, JSON.stringify(data) + "\n");

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("<h3>✅ Respuesta guardada con éxito</h3><a href='/'>Volver</a>");
    });
  } else {
    res.status(405).send("Método no permitido");
  }
}
