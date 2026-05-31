// Utilitários usados no frontend
const API_BASE = "/api";

function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);
}

function mostrarMensagem(container, texto, tipo = "success") {
  if (!container) return;
  const classe = tipo === "error" ? "alert-danger" : "alert-success";
  container.innerHTML = `<div class="alert ${classe} alert-dismissible fade show" role="alert">${texto}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
}

async function buscarJson(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || "Erro na requisição.");
  }
  return res.json();
}
