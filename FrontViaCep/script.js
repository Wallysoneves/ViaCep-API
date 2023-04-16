const enviar = document.getElementById('enviar');
const tabela = document.getElementById('tabela-corpo');
const mensagemErro = document.getElementById('mensagem-erro');
let listaCep = [];
const regexNumeros = /^[0-9]+$/;

enviar.addEventListener('click', function() {
  const cep = document.getElementById('cep').value;

  if (cep.length !== 8) {
    exibirErro(`CEP inválido ${cep}. O CEP tem que conter no minímo 8 digitos.`);
    return;
  }
  if (!regexNumeros.test(cep)) {
    exibirErro(`CEP inválido ${cep}. Por favor digite apenas numeros!`);
    return;
  }

  const xhr = new XMLHttpRequest();
  xhr.open('GET', `http://localhost:8080/viaCep/${cep}/json`);

  xhr.onload = function() {
    if (xhr.status === 200) {
      if (xhr.responseText) {
        const response = JSON.parse(xhr.responseText);
        listaCep.push(criarObject(response));
        exibirErro(false);
        adicionarLinhaTabela(listaCep);
      } else {
        exibirErro(`Nenhum CEP encontrado com esse numero: ${cep}`);
      }
    } else {
        exibirErro(`Erro na solicitação ${xhr.status}.`);
    }
  };
  
  xhr.send();
});

function adicionarLinhaTabela(lista) {
  const dados = lista[lista.length - 1];
  const novaLinha = tabela.insertRow(-1);
  novaLinha.insertCell().textContent = dados.cep;
  novaLinha.insertCell().textContent = dados.logradouro;
  novaLinha.insertCell().textContent = dados.complemento;
  novaLinha.insertCell().textContent = dados.bairro;
  novaLinha.insertCell().textContent = dados.localidade;
  novaLinha.insertCell().textContent = dados.uf;
  novaLinha.insertCell().textContent = dados.ibge;
  novaLinha.insertCell().textContent = dados.gia;
  novaLinha.insertCell().textContent = dados.siafi;
}

function exibirErro(mensagem) {
    const divCard = document.getElementById('card-erro');
    if (mensagem) {
        const texto = document.getElementById('texto');
        texto.innerText = mensagem;
        divCard.style.display = 'block';
    } else {
        divCard.style.display = 'none'
    }
}

function criarObject(response) {
  const obj = {
    bairro: response.bairro,
    cep: response.cep,
    complemento: response.complemento,
    ddd: response.ddd,
    gia: response.gia,
    ibge: response.ibge,
    id: response.id,
    localidade: response.localidade,
    logradouro: response.logradouro,
    siafi: response.siafi,
    uf: response.uf
  }
  return obj;
}
