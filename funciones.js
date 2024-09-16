document.getElementById('miFormulario').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que se recargue la página

    const numeroCorrecto = 12345; // El número correcto
    const numeroIngresado = document.getElementById('numeroInput').value;

    if (numeroIngresado == numeroCorrecto) {
        document.getElementById('resultado').textContent = "¡Número correcto!";
        // Aquí podrías redirigir a otro sitio si es correcto:
        // window.location.href = "https://tupagina.com/enlace.html";
    } else {
        document.getElementById('resultado').textContent = "Número incorrecto, intenta de nuevo.";
    }
});
