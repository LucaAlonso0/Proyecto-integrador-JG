const campeonesJG = [
    { nombre: "Warwick", tipo: "Tanque/Luchador", dificultad: "Fácil" },
    { nombre: "Amumu", tipo: "Tanque/Mago", dificultad: "Fácil" },
    { nombre: "Nocturne", tipo: "Asesino", dificultad: "Fácil" },
    { nombre: "Maestro Yi", tipo: "Luchador", dificultad: "Fácil" },
    { nombre: "Vi", tipo: "Luchador", dificultad: "Media" },
    { nombre: "Hecarim", tipo: "Luchador", dificultad: "Media" },
    { nombre: "Kayn", tipo: "Luchador/Asesino", dificultad: "Media" },
    { nombre: "Lillia", tipo: "Mago/Luchador", dificultad: "Media" },
    { nombre: "Lee Sin", tipo: "Luchador", dificultad: "Difícil" },
    { nombre: "Nidalee", tipo: "Asesino/Mago", dificultad: "Difícil" },
    { nombre: "Evelynn", tipo: "Asesino/Mago", dificultad: "Difícil" },
    { nombre: "Kindred", tipo: "Tirador/Asesino", dificultad: "Difícil" }
];

function normalizarTexto(texto) {
    return texto.toLowerCase()
        .replace(/á/g, "a").replace(/é/g, "e")
        .replace(/í/g, "i").replace(/ó/g, "o").replace(/ú/g, "u");
}

function actualizarContador(cantidad) {
    const contador = document.getElementById("contador-campeones");
    const total = campeonesJG.length;
    contador.textContent = "Mostrando " + cantidad + " de " + total + " campeones";
    contador.style.color = cantidad === 0 ? "#f44336" : "var(--color-texto-sec)";
}

function renderizarCampeones(lista) {
    const contenedor = document.getElementById("lista-campeones");
    contenedor.innerHTML = "";
    actualizarContador(lista.length);

    if (lista.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.classList.add("sin-resultados");
        mensaje.textContent = "No se encontraron campeones.";
        contenedor.appendChild(mensaje);
        return;
    }

    lista.forEach(function(campeon) {
        const card = document.createElement("div");
        card.classList.add("campeon-card");
        card.setAttribute("data-nombre", campeon.nombre);

        const nombre = document.createElement("h4");
        nombre.textContent = campeon.nombre;

        const tipo = document.createElement("p");
        tipo.innerHTML = `<span class="etiqueta">Tipo:</span> ${campeon.tipo}`;

        const difClass = "dif-" + normalizarTexto(campeon.dificultad);
        const dificultad = document.createElement("p");
        dificultad.innerHTML = `<span class="etiqueta">Dificultad:</span> <span class="${difClass}">${campeon.dificultad}</span>`;

        card.appendChild(nombre);
        card.appendChild(tipo);
        card.appendChild(dificultad);
        contenedor.appendChild(card);
    });
}

const consejosJG = [
    "Trackea al jungla enemigo para anticipar sus ganks.",
    "Coloca wards antes de intentar objetivos como el Dragón o el Barón.",
    "Farmea eficientemente entre ganks para no quedarte atrás en nivel.",
    "Comunica a tu equipo con pings cuando vayas a gankear.",
    "Si el jungla enemigo gankea top, aprovecha para hacer Dragón.",
    "Nunca fuerces un objetivo si no sabés dónde está el jungla rival.",
    "El Smite es tu hechizo más importante — usalo sabiamente.",
    "Aprendé los tiempos de reaparición de los campamentos.",
    "Invadir la jungla enemiga puede darle ventaja a tu equipo.",
    "Prioriza las líneas con ventaja para gankear primero."
];

function mostrarConsejoAleatorio() {
    const indice = Math.floor(Math.random() * consejosJG.length);
    const consejo = consejosJG[indice];
    const contenedor = document.getElementById("consejo-resultado");
    contenedor.textContent = "💡 " + consejo;
    contenedor.classList.remove("oculto");
}

function buscarCampeon() {
    const termino = normalizarTexto(document.getElementById("input-buscar").value);
    const filtrados = campeonesJG.filter(function(campeon) {
        return normalizarTexto(campeon.nombre).includes(termino) ||
            normalizarTexto(campeon.tipo).includes(termino) ||
            normalizarTexto(campeon.dificultad).includes(termino);
    });
    renderizarCampeones(filtrados);
}

function validarFormulario(e) {
    e.preventDefault();

    const nickname = document.getElementById("input-nickname");
    const email = document.getElementById("input-email");
    const errNick = document.getElementById("error-nickname");
    const errEmail = document.getElementById("error-email");
    const exito = document.getElementById("form-exito");

    errNick.textContent = "";
    errEmail.textContent = "";
    exito.classList.add("oculto");

    let valido = true;

    try {
        if (nickname.value.trim() === "") {
            throw new Error("El nickname no puede estar vacío.");
        }
        if (nickname.value.trim().length < 3) {
            throw new Error("El nickname debe tener al menos 3 caracteres.");
        }
    } catch (error) {
        errNick.textContent = error.message;
        valido = false;
    }

    try {
        if (email.value.trim() === "") {
            throw new Error("El email no puede estar vacío.");
        }
        if (!email.value.includes("@") || !email.value.includes(".")) {
            throw new Error("Ingresá un email válido.");
        }
    } catch (error) {
        errEmail.textContent = error.message;
        valido = false;
    }

    if (valido) {
        exito.textContent = "¡Gracias " + nickname.value.trim() + "! Tu comentario fue enviado.";
        exito.classList.remove("oculto");
        document.getElementById("formulario-contacto").reset();

        const btnEnviar = document.querySelector("#formulario-contacto input[type='submit']");
        btnEnviar.value = "¡Enviado!";
        btnEnviar.disabled = true;
        btnEnviar.style.opacity = "0.5";
        btnEnviar.style.cursor = "not-allowed";

        setTimeout(function() {
            btnEnviar.value = "Enviar";
            btnEnviar.disabled = false;
            btnEnviar.style.opacity = "1";
            btnEnviar.style.cursor = "pointer";
            exito.classList.add("oculto");
        }, 3000);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    renderizarCampeones(campeonesJG);

    document.getElementById("input-buscar").addEventListener("input", buscarCampeon);
    document.getElementById("btn-consejo").addEventListener("click", mostrarConsejoAleatorio);
    document.getElementById("formulario-contacto").addEventListener("submit", validarFormulario);
});