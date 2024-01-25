const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header"); //Lista que contiene todos los elementos con la clase "btn-header".
let URL = "https://pokeapi.co/api/v2/pokemon/"; //Uso de la PokeAPI

for (let i = 1; i <= 50; i++) {  //Este for carga los primeros 50 pokemones en el html
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
}

function mostrarPokemon(poke) { //esta funcion se encarga de mostrar la informacion de cada uno de los pokemones a cargar, a la vez que crea los divs
 
    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }



//Acs se crea cada uno de los divs con informaci[on de los pokemones
    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}kg</p>
            </div>
        </div>
    `;
    listaPokemon.append(div);
}

//ACA VAN LAS FUNCIONES DE FILTRADO 

// Filtrar por peso
function filtrarPorPeso(min, max) {
    listaPokemon.innerHTML = ""; // Limpia la lista
//Este ciclo recorre cada pokemon buscando lo que se necesita
    for (let i = 1; i <= 50; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {
                const peso = data.weight;

                if (peso > min && peso < max) {
                    mostrarPokemon(data);
                }
            });
    }
}

// Filtrar por tipo "grass"
function filtrarPorTipoGrass() {
    listaPokemon.innerHTML = ""; // Limpia la lista
//Este ciclo recorre cada pokemon buscando lo que se necesita
    for (let i = 1; i <= 50; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {
                const tipos = data.types.map(type => type.type.name);

                if (tipos.includes("grass")) {
                    mostrarPokemon(data);
                }
            });
    }
}

// Filtrar por tipo "flying" con altura mayor a 10
function filtrarPorTipoFlyingAltura() {
    listaPokemon.innerHTML = ""; // Limpia la lista
//Este ciclo recorre cada pokemon buscando lo que se necesita
    for (let i = 1; i <= 50; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {
                const tipos = data.types.map(type => type.type.name);
                const altura = data.height;

                if (tipos.includes("flying") && altura > 10) {
                    mostrarPokemon(data);
                }
            });
    }
}

// Invertir nombres
function invertirNombres() {
    listaPokemon.innerHTML = ""; // Limpia la lista
 //Este ciclo recorre cada pokemon buscando lo que se necesita
    for (let i = 1; i <= 50; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {
                const nombreInvertido = data.name.split('').reverse().join(''); //.reverse sirve para invertir los caracteres en el texto, lo que permite invertir los nombrres

                data.name = nombreInvertido;
                mostrarPokemon(data);
            });
    }
}

// Asignacion eventos a los botones requeridos en el html
document.getElementById("filtro-peso").addEventListener("click", () => filtrarPorPeso(30, 80)); 
document.getElementById("grass").addEventListener("click", filtrarPorTipoGrass);
document.getElementById("filtro-flying-altura").addEventListener("click", filtrarPorTipoFlyingAltura);
document.getElementById("filtro-nombres-invertidos").addEventListener("click", invertirNombres);


//Se asigna un evento click a cada botón del header para filtrar los Pokémon según el tipo del botón presionado.
 botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = "";

    for (let i = 1; i <= 50; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                if(botonId === "ver-todos") {
                    mostrarPokemon(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        mostrarPokemon(data);
                    }
                }

            })
    }
 }))