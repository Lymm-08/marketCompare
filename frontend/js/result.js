/* result.js
   Sessões:
   1) Helpers: escapeHtml, formatPrice
   2) API: fetchResults
   3) Render: renderCards, renderBanner
   4) Bindings: DOMContentLoaded

   Responsabilidade: buscar resultados de preços e renderizar cards + banner de economia.
*/

// 1) Helpers
function escapeHtml(s){
  return String(s||'').replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;","\"":"&quot;"}[c]));
}

function formatPrice(v){
  return Number(v).toFixed(2).replace('.',',');
}

// 2) API
async function fetchResults(nome){
  try{
    const res = await fetch(`http://localhost:3000/produtos/busca/${encodeURIComponent(nome)}`);
    if(!res.ok) throw new Error('Erro na busca');
    return await res.json();
  }catch(e){ console.error(e); return {results:[], message:null}; }
}

// 3) Render
function renderCards(results){
  const cardsEl = document.getElementById('cards');
  cardsEl.innerHTML = '';
  results.forEach(r=>{
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<div class="meta"><strong>${escapeHtml(r.nome_mercado)}</strong><span>${escapeHtml(r.endereco)}</span></div><div class="price">R$ ${formatPrice(r.preco)}</div>`;
    cardsEl.appendChild(div);
  });
}

function renderBanner(message){
  const banner = document.getElementById('banner');
  if(message){ banner.hidden = false; banner.textContent = message; }
  else banner.hidden = true;
}

// 4) Bindings
document.addEventListener('DOMContentLoaded', async ()=>{
  const params = new URLSearchParams(location.search);
  const nome = params.get('nome') || '';
  document.getElementById('productTitle').textContent = nome || 'Resultado';

  const data = await fetchResults(nome);
  const results = data.results || [];
  renderCards(results);
  renderBanner(data.message);

  // ensure add-product buttons work on this page
  document.querySelectorAll('.add-product').forEach(b=>b.addEventListener('click', ()=>location.href='add.html'));
});
