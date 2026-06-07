/*
  add.js
  Sessões:
  - DOM refs
  - Helpers (form normalization, API call)
  - Bindings (submit, navigation)
*/

// DOM refs
const addForm = document.getElementById('addForm');
const listBtn = document.getElementById('listBtn');

// Helpers
function normalizePriceInput(value){
  if(typeof value !== 'string') return Number(value);
  // remove thousand separators and convert comma to dot
  const cleaned = value.replace(/\./g,'').replace(',','.');
  return Number(cleaned);
}

async function submitProduct(data){
  const res = await fetch('http://localhost:3000/produtos',{
    method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)
  });
  if(!res.ok) throw new Error('Erro ao salvar');
  return res.json();
}

// Bindings
document.addEventListener('DOMContentLoaded', ()=>{
  // navigation buttons
  document.querySelectorAll('.add-product').forEach(b=>b.addEventListener('click', ()=>location.href='add.html'));
  listBtn?.addEventListener('click', ()=>location.href='manage.html');

  // form submission
  addForm?.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form));
    data.preco = normalizePriceInput(data.preco);
    try{
      await submitProduct(data);
      alert('Produto salvo com sucesso');
      location.href = 'manage.html';
    }catch(err){console.error(err); alert('Erro ao salvar produto');}
  });
});
