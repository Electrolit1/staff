const firebaseConfig = {
  apiKey: "AIzaSyAbkpn2i02BQ4EdbxPRmjMTiJb_U32noZA",
  authDomain: "respuestas-a0c38.firebaseapp.com",
  databaseURL: "https://respuestas-a0c38-default-rtdb.firebaseio.com",
  projectId: "respuestas-a0c38",
  storageBucket: "respuestas-a0c38.appspot.com",
  messagingSenderId: "694006707121",
  appId: "1:694006707121:web:79267ca0496b935bd88390",
  measurementId: "G-FLNG6V9KMK"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let currentStep = 0;
const steps = document.querySelectorAll(".step");

function nextStep() {
    if (!steps[currentStep].querySelector("input, textarea").value) {
        alert("❌ Debes responder la pregunta antes de continuar");
        return;
    }
    steps[currentStep].classList.remove("active");
    currentStep++;
    if (currentStep < steps.length) {
        steps[currentStep].classList.add("active");
    }
}

function startForm() {
    document.getElementById("infoScreen").style.display = "none";
    document.getElementById("formScreen").style.display = "block";
}

document.getElementById("form").addEventListener("submit", function(e) {
    e.preventDefault();

    const formData = {
        nombre: e.target.nombre.value,
        correo: e.target.correo.value,
        pais: e.target.pais.value,
        cumpleanos: e.target.cumpleanos.value,
        edad: e.target.edad.value,
        discord: e.target.discord.value,
        minecraft: e.target.minecraft.value,
        tiempoLibre: e.target.tiempoLibre.value,
        fechaEnvio: new Date().toISOString()
    };

    db.ref("respuestas").push(formData, function(error) {
        const msg = document.getElementById("successMessage");
        if (error) {
            msg.innerHTML = "❌ Error al enviar: " + error;
            msg.style.background = "red";
        } else {
            document.getElementById("form").style.display = "none";
            msg.innerHTML = `
                ✅ ¡Respuestas enviadas correctamente!<br><br>
                📜 Tus respuestas son privadas y no serán reveladas a nadie.<br>
                🚫 No compartas este enlace para mantener la privacidad.
            `;
            msg.classList.add("permanent-message");
        }
    });
});

// Barra de carga
let progress = 0;
let loaderInterval = setInterval(() => {
    progress += 2;
    document.getElementById("progress").style.width = progress + "%";
    if (progress >= 100) {
        clearInterval(loaderInterval);
        document.getElementById("loaderScreen").style.display = "none";
        document.getElementById("infoScreen").style.display = "block";
    }
}, 50);
