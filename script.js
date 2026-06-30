// Array de campeones de jungla
const campeonesJG = [
    { nombre: "Warwick",     tipo: "Tanque/Luchador",  dificultad: "Fácil"   },
    { nombre: "Amumu",       tipo: "Tanque/Mago",       dificultad: "Fácil"   },
    { nombre: "Nocturne",    tipo: "Asesino",           dificultad: "Fácil"   },
    { nombre: "Maestro Yi",  tipo: "Luchador",          dificultad: "Fácil"   },
    { nombre: "Vi",          tipo: "Luchador",          dificultad: "Media"   },
    { nombre: "Hecarim",     tipo: "Luchador",          dificultad: "Media"   },
    { nombre: "Kayn",        tipo: "Luchador/Asesino",  dificultad: "Media"   },
    { nombre: "Lillia",      tipo: "Mago/Luchador",     dificultad: "Media"   },
    { nombre: "Lee Sin",     tipo: "Luchador",          dificultad: "Difícil" },
    { nombre: "Nidalee",     tipo: "Asesino/Mago",      dificultad: "Difícil" },
    { nombre: "Evelynn",     tipo: "Asesino/Mago",      dificultad: "Difícil" },
    { nombre: "Kindred",     tipo: "Tirador",           dificultad: "Difícil" }
];

// Normaliza texto quitando tildes para comparaciones
function normalizarTexto(texto) {
    return texto.toLowerCase()
        .replace(/á/g, "a").replace(/é/g, "e")
        .replace(/í/g, "i").replace(/ó/g, "o").replace(/ú/g, "u");
}

// Crea y muestra las cards de campeones en el DOM
function renderizarCampeones(lista) {
    const contenedor = document.getElementById("lista-campeones");
    contenedor.innerHTML = "";

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

// Array de consejos de jungla
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

// Muestra un consejo aleatorio del array en el DOM
function mostrarConsejoAleatorio() {
    const indice = Math.floor(Math.random() * consejosJG.length);
    const consejo = consejosJG[indice];
    const contenedor = document.getElementById("consejo-resultado");
    contenedor.textContent = "💡 " + consejo;
    contenedor.classList.remove("oculto");
}

// Filtra el array de campeones según lo que escribe el usuario
function buscarCampeon() {
    const termino = normalizarTexto(document.getElementById("input-buscar").value);
    const filtrados = campeonesJG.filter(function(campeon) {
        return normalizarTexto(campeon.nombre).includes(termino) ||
               normalizarTexto(campeon.tipo).includes(termino) ||
               normalizarTexto(campeon.dificultad).includes(termino);
    });
    renderizarCampeones(filtrados);
}

document.addEventListener("DOMContentLoaded", function() {
    renderizarCampeones(campeonesJG);

    document.getElementById("input-buscar").addEventListener("input", buscarCampeon);
    document.getElementById("btn-consejo").addEventListener("click", mostrarConsejoAleatorio);
});
