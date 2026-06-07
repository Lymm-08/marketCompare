// Fetch results from backend and render cards + savings banner
async function fetchResults(nome){
  try{
    const res = await fetch(`http://localhost:3000/produtos/busca/${encodeURIComponent(nome)}`);
    if(!res.ok) throw new Error('Erro na busca');
    const data = await res.json();
    return data;
  }catch(e){console.error(e);return {results:[], message:null}}}

function formatPrice(v){ return v.toFixed(2).replace('.',','); }

document.addEventListener('DOMContentLoaded', async ()=>{
  const params = new URLSearchParams(location.search);
  const nome = params.get('nome') || '';
  document.getElementById('productTitle').textContent = nome || 'Resultado';
  const cardsEl = document.getElementById('cards');
  const banner = document.getElementById('banner');

  const data = await fetchResults(nome);
  const results = data.results || [];

  cardsEl.innerHTML = '';
  results.forEach(r=>{
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<div class="meta"><strong>${escapeHtml(r.nome_mercado)}</strong><span>${escapeHtml(r.endereco)}</span></div><div class="price">R$ ${formatPrice(Number(r.preco))}</div>`;
    cardsEl.appendChild(div);
  });

  if(results.length>0){
    banner.hidden = false;
    banner.textContent = data.message || '';
  }else{banner.hidden = true}
});

function escapeHtml(s){return String(s||'').replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\'":"&#39;","\"":"&quot;"}[c]))}
