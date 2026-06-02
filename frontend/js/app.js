const apiBase = '/api';

// Views and navigation
const views = document.querySelectorAll('.view');
const navLinks = document.querySelectorAll('.nav-link');
const menuBtn = document.getElementById('menuBtn');

function showView(name) {
  views.forEach((v) => (v.style.display = v.id === `view-${name}` ? 'block' : 'none'));
  location.hash = `#${name}`;
}

function initRouting() {
  const hash = (location.hash || '#home').replace('#', '');
  showView(hash);
  navLinks.forEach((btn) => btn.addEventListener('click', () => showView(btn.dataset.view)));
  document.querySelectorAll('[data-view]').forEach((el) => el.addEventListener('click', (e) => showView(e.currentTarget.dataset.view)));
  menuBtn && menuBtn.addEventListener('click', () => {
    document.querySelector('.nav').classList.toggle('open');
  });
}

// Elements
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
  if (!elemento) return;
  elemento.textContent = texto;
  elemento.classList.add('ativo');
  elemento.style.background = tipo === 'erro' ? 'rgba(231, 76, 60, 0.1)' : 'rgba(44, 123, 229, 0.08)';
  elemento.style.color = tipo === 'erro' ? '#c0392b' : '#1f3f82';
}

function limparMensagem(elemento) {
  if (!elemento) return;
  elemento.textContent = '';
  elemento.classList.remove('ativo');
}

function atualizarTabela(precos) {
  if (!precosTabela) return;
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
      <td>R$ ${Number(preco.valor).toFixed(2)}</td>
      <td>
        <button class="action-button" data-edit="${preco.id}">Editar</button>
        <button class="action-button danger" data-delete="${preco.id}">Excluir</button>
      </td>
    `;
    precosTabela.appendChild(row);
  });

  // attach events
  precosTabela.querySelectorAll('[data-edit]').forEach((b) => b.addEventListener('click', (e) => editarPreco(Number(e.currentTarget.dataset.edit))));
  precosTabela.querySelectorAll('[data-delete]').forEach((b) => b.addEventListener('click', (e) => deletarPreco(Number(e.currentTarget.dataset.delete))));
}

async function carregarPrecos() {
  try {
    const resposta = await fetch(`${apiBase}/precos`);
    const dados = await resposta.json();
    atualizarTabela(dados);
    return dados;
  } catch (erro) {
    exibirMensagem(mensagemFormulario, 'Falha ao carregar preços. Tente novamente.', 'erro');
    return [];
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
      showView('results');
      return;
    }

    // lista de ofertas
    const lista = document.createElement('ul');
    dados.forEach((item) => {
      const itemLi = document.createElement('li');
      itemLi.textContent = `${item.loja} - R$ ${Number(item.valor).toFixed(2)}`;
      lista.appendChild(itemLi);
    });

    // melhor preço (primeiro da lista ordenada asc)
    const melhor = dados[0];

    // calcular economia: diferença entre maior e menor encontrado
    const valores = dados.map((d) => Number(d.valor));
    const maior = Math.max(...valores);
    const menor = Math.min(...valores);
    const economia = (maior - menor).toFixed(2);

    resultadoComparacao.innerHTML = '';
    resultadoComparacao.appendChild(lista);

    const destaque = document.createElement('div');
    destaque.className = 'melhor-preco-box';
    destaque.innerHTML = `<strong>Melhor Preço: ${melhor.loja} - R$ ${Number(melhor.valor).toFixed(2)}</strong>`;
    resultadoComparacao.appendChild(destaque);

    const economiaBox = document.createElement('div');
    economiaBox.className = 'economia-box';
    economiaBox.innerHTML = `Você economiza R$ ${economia} comprando na ${melhor.loja}!`;
    resultadoComparacao.appendChild(economiaBox);

    showView('results');
  } catch (erro) {
    resultadoComparacao.innerHTML = '<p>Não foi possível buscar os preços. Tente novamente.</p>';
    showView('results');
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
    await carregarPrecos();
    exibirMensagem(mensagemFormulario, editarId ? 'Registro atualizado com sucesso.' : 'Produto salvo com sucesso.');
    showView('home');
  } catch (erro) {
    exibirMensagem(mensagemFormulario, erro.message, 'erro');
  }
}

function limparFormulario() {
  editarId = null;
  produtoNome.value = '';
  lojaNome.value = '';
  precoValor.value = '';
  const btnSalvar = document.getElementById('btnSalvar');
  if (btnSalvar) btnSalvar.textContent = 'Salvar';
  limparMensagem(mensagemFormulario);
}

async function editarPreco(id) {
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
    const btnSalvar = document.getElementById('btnSalvar');
    if (btnSalvar) btnSalvar.textContent = 'Atualizar';
    showView('add');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (erro) {
    exibirMensagem(mensagemFormulario, 'Erro ao carregar registro para edição.', 'erro');
  }
}

async function deletarPreco(id) {
  if (!confirm('Deseja realmente excluir este preço?')) return;

  try {
    const resposta = await fetch(`${apiBase}/precos/${id}`, { method: 'DELETE' });
    const dados = await resposta.json();
    if (!resposta.ok) {
      throw new Error(dados.erro || 'Falha ao excluir.');
    }

    await carregarPrecos();
    exibirMensagem(mensagemFormulario, 'Registro excluído com sucesso.');
  } catch (erro) {
    exibirMensagem(mensagemFormulario, erro.message, 'erro');
  }
}

// init
initRouting();
btnComparar && btnComparar.addEventListener('click', comparar);
form && form.addEventListener('submit', salvarPreco);
btnCancelar && btnCancelar.addEventListener('click', limparFormulario);

carregarPrecos();
