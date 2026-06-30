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

document.addEventListener("DOMContentLoaded", function() {
    renderizarCampeones(campeonesJG);
});
