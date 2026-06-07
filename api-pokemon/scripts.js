function getByID(id) {
    return document.getElementById(id);
}

let botaoConsultar = getByID('botaoConsultar');
let botaoLimpar = getByID('botaoLimpar');

botaoConsultar.addEventListener('click', consultarPokemon);
botaoLimpar.addEventListener('click', limparConsulta);

async function consultarPokemon() {
    try {

        let pokemon = getByID('pokemon').value.toLowerCase();
        let resultado = getByID('resultado');

        if (pokemon === "") {
            throw new Error("Digite um Pokémon.");
        }

        let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error("Pokémon não encontrado.");
        }

        const dados = await resposta.json();

        resultado.innerHTML = `
            <h2>${dados.name.toUpperCase()}</h2>
            <img src="${dados.sprites.front_default}" alt="${dados.name}">
            <p><strong>Altura:</strong> ${dados.height}</p>
            <p><strong>Peso:</strong> ${dados.weight}</p>
            <p><strong>ID:</strong> ${dados.id}</p>
        `;

    } catch (erro) {
        getByID('resultado').innerHTML = erro.message;
    }
}

function limparConsulta() {
    getByID('pokemon').value = "";
    getByID('resultado').innerHTML = "";
}