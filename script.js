document.addEventListener("DOMContentLoaded", function () {
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

    window.nextStep = function () {
        const inputs = steps[currentStep].querySelectorAll("input, textarea");
        let allFilled = true;
        inputs.forEach(input => {
            const errorMsg = input.parentElement.querySelector(".error-message");
            if (!input.value.trim()) {
                allFilled = false;
                if (!errorMsg) {
                    const err = document.createElement("div");
                    err.className = "error-message";
                    err.style.color = "red";
                    err.innerText = "❌ Esta pregunta es obligatoria.";
                    input.parentElement.appendChild(err);
                } else {
                    errorMsg.innerText = "❌ Esta pregunta es obligatoria.";
                    errorMsg.style.display = "block";
                }
                input.style.border = "2px solid red";
            } else {
                if (errorMsg) errorMsg.style.display = "none";
                input.style.border = "none";
            }
        });
        if (!allFilled) return;

        steps[currentStep].classList.remove("active");
        currentStep++;
        if (currentStep < steps.length) {
            steps[currentStep].classList.add("active");
        }
    };

    window.startForm = function () {
        document.getElementById("infoScreen").style.display = "none";
        document.getElementById("formScreen").style.display = "block";
    };

    document.getElementById("form").addEventListener("submit", function (e) {
        e.preventDefault();

        let allAnswered = true;
        steps.forEach(step => {
            const inputs = step.querySelectorAll("input, textarea");
            inputs.forEach(input => {
                if (!input.value.trim()) allAnswered = false;
            });
        });
        if (!allAnswered) {
            alert("❌ Debes responder todas las preguntas.");
            return;
        }

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

        db.ref("respuestas").push(formData, function (error) {
            if (error) {
                alert("❌ Error al enviar: " + error);
            } else {
                document.getElementById("form").style.display = "none";
                document.getElementById("successMessage").innerHTML = "✅ ¡Respuestas enviadas correctamente!";
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
});
