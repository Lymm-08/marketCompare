// Lógica dos formulários de cadastro
async function carregarOpcoes() {
  const selProduto = document.getElementById("produto_id");
  const selMercado = document.getElementById("mercado_id");
  if (selProduto) {
    const produtos = await buscarJson(`${API_BASE}/produtos`);
    selProduto.innerHTML = '<option value="">Selecione um produto</option>' + produtos.map(p => `<option value="${p.id}">${p.nome}</option>`).join("");
  }
  if (selMercado) {
    const mercados = await buscarJson(`${API_BASE}/mercados`);
    selMercado.innerHTML = '<option value="">Selecione um supermercado</option>' + mercados.map(m => `<option value="${m.id}">${m.nome} - ${m.endereco}</option>`).join("");
  }
}

function validar(form, ids) {
  let ok = true;
  ids.forEach(id => {
    const el = form.querySelector(`#${id}`);
    if (!el || !String(el.value).trim()) { ok = false; if (el) el.classList.add("is-invalid"); }
    else if (el) el.classList.remove("is-invalid");
  });
  return ok;
}

async function enviarFormulario(event, url, payload) {
  event.preventDefault();
  try {
    await buscarJson(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    mostrarMensagem(document.getElementById("feedback"), "Cadastro realizado com sucesso.", "success");
    event.target.reset();
  } catch (e) {
    mostrarMensagem(document.getElementById("feedback"), e.message, "error");
  }
}

function vincularFormulario(idForm, url, campos) {
  const f = document.getElementById(idForm);
  if (!f) return;
  f.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validar(f, campos)) { mostrarMensagem(document.getElementById("feedback"), "Preencha todos os campos.", "error"); return; }
    const payload = {};
    campos.forEach(c => { const el = f.querySelector(`#${c}`); payload[c] = el ? el.value.trim() : ""; });
    if (payload.valor) payload.valor = parseFloat(payload.valor.replace(",", "."));
    await enviarFormulario(e, `${API_BASE}/${url}`, payload);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  vincularFormulario("form-produto", "produtos", ["nome","categoria"]);
  vincularFormulario("form-mercado", "mercados", ["nome","endereco"]);
  vincularFormulario("form-preco", "precos", ["produto_id","mercado_id","valor","data_registro"]);
  if (document.getElementById("form-preco")) carregarOpcoes().catch(e => mostrarMensagem(document.getElementById("feedback"), e.message, "error"));
});
