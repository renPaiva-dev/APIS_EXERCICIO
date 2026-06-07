function getByID(id) {
    return document.getElementById(id);
}

let botaoConsultar = getByID('botaoConsultar');
let botaoLimpar = getByID('botaoLimpar');

botaoConsultar.addEventListener('click', consultarCachorro);
botaoLimpar.addEventListener('click', limparConsulta);

async function consultarCachorro() {
    try {

        let raca = getByID('raca').value.toLowerCase();
        let resultado = getByID('resultado');

        if (raca === "") {
            throw new Error("Digite uma raça.");
        }

        let url = `https://dog.ceo/api/breed/${raca}/images/random`;

        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error("Não foi possível consultar.");
        }

        const dados = await resposta.json();

        if (dados.status !== "success") {
            throw new Error("Raça não encontrada.");
        }

        resultado.innerHTML = `
            <img src="${dados.message}" alt="Cachorro" width="300">
        `;

    } catch (erro) {
        getByID('resultado').innerHTML = erro.message;
    }
}

function limparConsulta() {
    getByID('raca').value = "";
    getByID('resultado').innerHTML = "";
}