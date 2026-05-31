// Lógica da busca e página de comparação
const produtosPopulares = ["Arroz 5kg","Feijão 1kg","Leite 1L","Açúcar 1kg","Café 500g"];

function montarBotoesPopulares() {
  const c = document.getElementById("produtos-populares");
  if (!c) return;
  c.innerHTML = produtosPopulares.map(n => `<button class="btn btn-outline-primary btn-sm m-1" onclick="buscarPorNome('${n}')">${n}</button>`).join("");
}

async function buscarPorNome(nome) {
  try {
    const r = await buscarJson(`${API_BASE}/pesquisa?q=${encodeURIComponent(nome)}`);
    if (!r.length) { alert("Nenhum produto encontrado."); return; }
    const id = r[0].id;
    window.location.href = `paginas/comparacao.html?produtoId=${id}`;
  } catch (e) { alert(e.message); }
}

async function tratarFormularioBusca(event) {
  event.preventDefault();
  const inpt = document.querySelector("#input-busca");
  const q = inpt && inpt.value.trim();
  if (!q) { alert("Digite o nome do produto."); return; }
  try {
    const r = await buscarJson(`${API_BASE}/pesquisa?q=${encodeURIComponent(q)}`);
    if (!r.length) { alert("Nenhum produto encontrado."); return; }
    window.location.href = `paginas/comparacao.html?produtoId=${r[0].id}`;
  } catch (e) { alert(e.message); }
}

function pegarQuery(name) { return new URLSearchParams(window.location.search).get(name); }

async function carregarPaginaComparacao() {
  const id = pegarQuery("produtoId");
  if (!id) return;
  try {
    const dados = await buscarJson(`${API_BASE}/pesquisa/comparar/${id}`);
    renderizarComparacao(dados);
  } catch (e) {
    document.getElementById("conteudo-comparacao").innerHTML = `<div class="alert alert-danger">${e.message}</div>`;
  }
}

function renderizarComparacao(dados) {
  const titulo = document.getElementById("titulo-comparacao");
  const corpo = document.getElementById("conteudo-comparacao");
  titulo.innerHTML = `<h2 class="fw-bold">${dados.produto.nome}</h2><p class="text-muted">Categoria: ${dados.produto.categoria}</p>`;
  if (!dados.precos.length) {
    corpo.innerHTML = `<div class="alert alert-info">Nenhum preço cadastrado.</div>`;
    return;
  }
  const linhas = dados.precos.map((p,i) => `<tr class="${p.valor === dados.melhor_preco ? "table-success" : ""}"><th>${i+1}</th><td>${p.supermercado}</td><td>${p.endereco}</td><td>${formatarMoeda(p.valor)}</td><td>${new Date(p.data_registro).toLocaleDateString("pt-BR")}</td></tr>`).join("");
  corpo.innerHTML = `<div class="row mb-4"><div class="col-md-4"><div class="card best-price-card p-3"><h5>Melhor preço</h5><p class="fs-3 fw-bold">${formatarMoeda(dados.melhor_preco)}</p></div></div><div class="col-md-4"><div class="card p-3"><h5>Economia possível</h5><p class="fs-3 fw-bold text-success">${formatarMoeda(dados.economia)}</p></div></div></div><div class="card"><div class="card-body"><h5>Preços encontrados</h5><div class="table-responsive"><table class="table table-hover"><thead><tr><th>#</th><th>Supermercado</th><th>Endereço</th><th>Valor</th><th>Data</th></tr></thead><tbody>${linhas}</tbody></table></div></div></div>`;
}

window.addEventListener("DOMContentLoaded", () => {
  montarBotoesPopulares();
  const form = document.querySelector("#form-busca");
  if (form) form.addEventListener("submit", tratarFormularioBusca);
  if (document.getElementById("conteudo-comparacao")) carregarPaginaComparacao();
});
