function limpiarErrores() {
    document.getElementById("errorNombre").textContent = "";
    document.getElementById("errorApellido1").textContent = "";
    document.getElementById("errorApellido2").textContent = "";
    document.getElementById("errorFecha").textContent = "";
    document.getElementById("errorCorreo").textContent = "";
    document.getElementById("errorContrasena").textContent = "";
    document.getElementById("errorRepetirContrasena").textContent = "";
    document.getElementById("mensajeExito").textContent = "";
}

function correoValido(correo) {
    return correo.includes("@") && correo.includes(".");
}

function esMayorDeEdad(fechaNacimiento) {
    let hoy = new Date();
    let nacimiento = new Date(fechaNacimiento);

    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    let mes = hoy.getMonth() - nacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }

    return edad >= 18;
}

document.getElementById("formulario").addEventListener("submit", function(event) {
    event.preventDefault();

    limpiarErrores();

    let nombre = document.getElementById("nombre").value.trim();
    let apellido1 = document.getElementById("apellido1").value.trim();
    let apellido2 = document.getElementById("apellido2").value.trim();
    let fechaNacimiento = document.getElementById("fechaNacimiento").value;
    let correo = document.getElementById("correo").value.trim();
    let contrasena = document.getElementById("contrasena").value;
    let repetirContrasena = document.getElementById("repetirContrasena").value;

    let valido = true;
    let hoy = new Date().toISOString().split("T")[0];

    if (nombre === "") {
        document.getElementById("errorNombre").textContent = "El nombre es obligatorio.";
        valido = false;
    }

    if (apellido1 === "") {
        document.getElementById("errorApellido1").textContent = "El apellido 1 es obligatorio.";
        valido = false;
    }

    if (fechaNacimiento === "") {
        document.getElementById("errorFecha").textContent = "La fecha de nacimiento es obligatoria.";
        valido = false;
    } else if (fechaNacimiento > hoy) {
        document.getElementById("errorFecha").textContent = "La fecha no puede ser futura.";
        valido = false;
    } else if (!esMayorDeEdad(fechaNacimiento)) {
        document.getElementById("errorFecha").textContent = "Debes ser mayor de edad.";
        valido = false;
    }

    if (correo === "") {
        document.getElementById("errorCorreo").textContent = "El correo es obligatorio.";
        valido = false;
    } else if (!correoValido(correo)) {
        document.getElementById("errorCorreo").textContent = "El correo no tiene un formato válido.";
        valido = false;
    }

    if (contrasena === "") {
        document.getElementById("errorContrasena").textContent = "La contraseña es obligatoria.";
        valido = false;
    } else if (contrasena.length < 8) {
        document.getElementById("errorContrasena").textContent = "La contraseña debe tener al menos 8 caracteres.";
        valido = false;
    }

    if (repetirContrasena === "") {
        document.getElementById("errorRepetirContrasena").textContent = "Debes repetir la contraseña.";
        valido = false;
    } else if (contrasena !== repetirContrasena) {
        document.getElementById("errorRepetirContrasena").textContent = "Las contraseñas no coinciden.";
        valido = false;
    }

    if (valido) {
        document.getElementById("mensajeExito").textContent =
            "Se ha creado correctamente la cuenta de " + nombre + " " + apellido1;
        document.body.style.backgroundColor = "#bff0c6";
    }
});