// Main script for index page: handle navigation and search
/*
  main.js
  Sessões:
  1) Imports / DOM references
  2) Helpers
  3) Event bindings

  Responsabilidade: gerenciar a página inicial (pesquisa) e navegação rápida.
*/

// 1) DOM references
const searchBtn = document.getElementById('searchBtn');
const q = document.getElementById('q');

// 2) Helpers
function goToAdd(){ location.href = 'add.html'; }
function goToResults(qstr){ location.href = `result.html?nome=${encodeURIComponent(qstr)}`; }

// 3) Event bindings (executa quando o DOM estiver pronto)
document.addEventListener('DOMContentLoaded', ()=>{
  // bind all add-product buttons to the same action
  document.querySelectorAll('.add-product').forEach(b=>b.addEventListener('click', goToAdd));

  // search button behavior
  searchBtn?.addEventListener('click', ()=>{
    const val = q.value.trim();
    if(!val) return q.focus();
    goToResults(val);
  });

  // accessible: allow Enter in search input to trigger search
  q?.addEventListener('keydown', (e)=>{ if(e.key === 'Enter') searchBtn?.click(); });
});
