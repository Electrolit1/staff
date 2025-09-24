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
    const input = steps[currentStep].querySelector("input, textarea");
    if (!input.value.trim()) {
        showErrorModal("❌ Por favor completa la pregunta antes de continuar.");
        return;
    }
    steps[currentStep].classList.remove("active");
    currentStep++;
    if (currentStep < steps.length) {
        steps[currentStep].classList.add("active");
    }
}

function prevStep() {
    if (currentStep > 0) {
        steps[currentStep].classList.remove("active");
        currentStep--;
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
        if (error) {
            showErrorModal("❌ Error al enviar: " + error);
        } else {
            document.getElementById("form").style.display = "none";
            document.getElementById("successMessage").innerHTML = "✅ ¡Respuestas enviadas correctamente!<br>No serán reveladas a nadie.<br><b>Por favor no compartas este enlace.</b>";
        }
    });
});

function showErrorModal(message) {
    document.getElementById("errorText").innerText = message;
    document.getElementById("errorModal").style.display = "block";
}
function closeErrorModal() {
    document.getElementById("errorModal").style.display = "none";
}

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
