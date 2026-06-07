
function getByID(id) {
    return document.getElementById(id);
}

let botaoConsultar = getByID('botaoConsultar');
let botaoLimpar = getByID('botaoLimpar');
let botaoInverter = getByID('botaoInverter')
botaoConsultar.addEventListener('click', consultarPreco);
botaoLimpar.addEventListener('click', limparConsulta);
botaoInverter.addEventListener('click', inverterPreco);

async function consultarPreco() {
    try {
          
      let moedaBase = getByID('moedaBase').value.toUpperCase();
      let moedaConversao = getByID('moedaConversao').value.toUpperCase();
      let resultado = getByID('resultado');
      let symbol = moedaBase + moedaConversao;
      let url = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`;
      if (moedaBase === "" || moedaConversao === "") {
        throw new Error("Preencha as duas moedas.");
      }
      const resposta = await fetch(url)

        if (!resposta.ok) {
            throw new Error('Nao foi possivel realizar conversão');
        }

        const dados = await resposta.json();

        resultado.innerHTML = Number(dados.price).toLocaleString('pt-BR');


    } catch (erro) {
        getByID('resultado').innerHTML = 'Erro ao realizar conversão ' + erro;
    }
}

function limparConsulta() {
    let resultado = getByID('resultado')
    let moedaBase = getByID('moedaBase');
    let moedaConversao = getByID('moedaConversao');
    moedaConversao.value = ''
    moedaBase.value = ''
    resultado.innerHTML = ''
}

function inverterPreco() {
    let moedaBase = getByID('moedaBase');
    let moedaConversao = getByID('moedaConversao');

    let temp = moedaBase.value;
    moedaBase.value = moedaConversao.value;
    moedaConversao.value = temp;

    consultarPreco();
}