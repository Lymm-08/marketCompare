const apiBase = '/api';

const form = document.getElementById('formPreco');
const produtoNome = document.getElementById('produtoNome');
const lojaNome = document.getElementById('lojaNome');
const precoValor = document.getElementById('precoValor');
const precosTabela = document.getElementById('precosTabela');
const resultadoComparacao = document.getElementById('resultadoComparacao');
const mensagemBusca = document.getElementById('mensagemBusca');
const mensagemFormulario = document.getElementById('mensagemFormulario');
const totalRegistros = document.getElementById('totalRegistros');
const produtoBusca = document.getElementById('produtoBusca');
const btnComparar = document.getElementById('btnComparar');
const btnCancelar = document.getElementById('btnCancelar');

let editarId = null;

function exibirMensagem(elemento, texto, tipo = 'info') {
  elemento.textContent = texto;
  elemento.classList.add('ativo');
  elemento.style.background = tipo === 'erro' ? 'rgba(231, 76, 60, 0.1)' : 'rgba(44, 123, 229, 0.08)';
  elemento.style.color = tipo === 'erro' ? '#c0392b' : '#1f3f82';
}

function limparMensagem(elemento) {
  elemento.textContent = '';
  elemento.classList.remove('ativo');
}

function atualizarTabela(precos) {
  precosTabela.innerHTML = '';
  totalRegistros.textContent = `${precos.length} registro(s)`;

  if (precos.length === 0) {
    precosTabela.innerHTML = '<tr><td colspan="4">Nenhum preço cadastrado ainda.</td></tr>';
    return;
  }

  precos.forEach((preco) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${preco.produto}</td>
      <td>${preco.loja}</td>
      <td>R$ ${preco.valor.toFixed(2)}</td>
      <td>
        <button class="action-button" onclick="editarPreco(${preco.id})">Editar</button>
        <button class="action-button danger" onclick="deletarPreco(${preco.id})">Excluir</button>
      </td>
    `;
    precosTabela.appendChild(row);
  });
}

async function carregarPrecos() {
  try {
    const resposta = await fetch(`${apiBase}/precos`);
    const dados = await resposta.json();
    atualizarTabela(dados);
  } catch (erro) {
    exibirMensagem(mensagemFormulario, 'Falha ao carregar preços. Tente novamente.', 'erro');
  }
}

async function comparar() {
  const termo = produtoBusca.value.trim();
  limparMensagem(mensagemBusca);
  resultadoComparacao.innerHTML = '';

  if (!termo) {
    exibirMensagem(mensagemBusca, 'Digite o nome do produto para comparar.', 'erro');
    return;
  }

  try {
    const resposta = await fetch(`${apiBase}/precos/comparar?nome=${encodeURIComponent(termo)}`);
    const dados = await resposta.json();

    if (!resposta.ok) {
      throw new Error(dados.erro || 'Erro ao buscar comparação.');
    }

    if (dados.length === 0) {
      resultadoComparacao.innerHTML = '<p>Nenhum preço encontrado para esse produto.</p>';
      return;
    }

    const lista = document.createElement('ul');
    dados.forEach((item) => {
      const itemLi = document.createElement('li');
      itemLi.textContent = `${item.loja} - R$ ${item.valor.toFixed(2)}`;
      lista.appendChild(itemLi);
    });

    resultadoComparacao.innerHTML = '';
    const melhor = dados[0];
    resultadoComparacao.appendChild(lista);
    const destaque = document.createElement('div');
    destaque.className = 'mensagem ativo';
    destaque.style.background = 'rgba(46, 204, 113, 0.12)';
    destaque.textContent = `Melhor preço: ${melhor.loja} - R$ ${melhor.valor.toFixed(2)}`;
    resultadoComparacao.appendChild(destaque);
  } catch (erro) {
    resultadoComparacao.innerHTML = '<p>Não foi possível buscar os preços. Tente novamente.</p>';
  }
}

function validarFormulario() {
  limparMensagem(mensagemFormulario);
  if (!produtoNome.value.trim() || !lojaNome.value.trim() || !precoValor.value.trim()) {
    exibirMensagem(mensagemFormulario, 'Preencha todos os campos antes de salvar.', 'erro');
    return false;
  }

  if (Number(precoValor.value) < 0) {
    exibirMensagem(mensagemFormulario, 'O preço deve ser um valor positivo.', 'erro');
    return false;
  }

  return true;
}

async function salvarPreco(event) {
  event.preventDefault();
  if (!validarFormulario()) return;

  const metodo = editarId ? 'PUT' : 'POST';
  const url = editarId ? `${apiBase}/precos/${editarId}` : `${apiBase}/precos`;

  try {
    const resposta = await fetch(url, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        produto: produtoNome.value.trim(),
        loja: lojaNome.value.trim(),
        valor: Number(precoValor.value),
      }),
    });

    const dados = await resposta.json();
    if (!resposta.ok) {
      throw new Error(dados.erro || 'Falha ao salvar.');
    }

    limparFormulario();
    carregarPrecos();
    exibirMensagem(mensagemFormulario, editarId ? 'Registro atualizado com sucesso.' : 'Produto salvo com sucesso.');
  } catch (erro) {
    exibirMensagem(mensagemFormulario, erro.message, 'erro');
  }
}

function limparFormulario() {
  editarId = null;
  produtoNome.value = '';
  lojaNome.value = '';
  precoValor.value = '';
  btnSalvar.textContent = 'Salvar';
  limparMensagem(mensagemFormulario);
}

window.editarPreco = async function (id) {
  try {
    const resposta = await fetch(`${apiBase}/precos`);
    const dados = await resposta.json();
    const item = dados.find((preco) => preco.id === id);

    if (!item) {
      exibirMensagem(mensagemFormulario, 'Registro não encontrado.', 'erro');
      return;
    }

    editarId = item.id;
    produtoNome.value = item.produto;
    lojaNome.value = item.loja;
    precoValor.value = item.valor;
    btnSalvar.textContent = 'Atualizar';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (erro) {
    exibirMensagem(mensagemFormulario, 'Erro ao carregar registro para edição.', 'erro');
  }
};

window.deletarPreco = async function (id) {
  if (!confirm('Deseja realmente excluir este preço?')) return;

  try {
    const resposta = await fetch(`${apiBase}/precos/${id}`, { method: 'DELETE' });
    const dados = await resposta.json();
    if (!resposta.ok) {
      throw new Error(dados.erro || 'Falha ao excluir.');
    }

    carregarPrecos();
    exibirMensagem(mensagemFormulario, 'Registro excluído com sucesso.');
  } catch (erro) {
    exibirMensagem(mensagemFormulario, erro.message, 'erro');
  }
};

btnComparar.addEventListener('click', comparar);
form.addEventListener('submit', salvarPreco);
btnCancelar.addEventListener('click', limparFormulario);

carregarPrecos();
