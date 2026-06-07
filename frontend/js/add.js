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

async function fetchProduct(id){
  const res = await fetch(`http://localhost:3000/produtos/${id}`);
  if(!res.ok) throw new Error('Erro ao buscar produto');
  return res.json();
}

async function updateProduct(id, data){
  const res = await fetch(`http://localhost:3000/produtos/${id}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
  if(!res.ok) throw new Error('Erro ao atualizar');
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
      const params = new URLSearchParams(location.search);
      const id = params.get('id');
      if(id){
        await updateProduct(id, data);
      }else{
        await submitProduct(data);
      }
      alert('Produto salvo com sucesso');
      location.href = 'manage.html';
    }catch(err){console.error(err); alert('Erro ao salvar produto');}
  });
});

// On load: if `id` present in query, fetch product and prefill form
document.addEventListener('DOMContentLoaded', async ()=>{
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  if(id){
    try{
      const prod = await fetchProduct(id);
      if(prod){
        addForm.nome_produto.value = prod.nome_produto || '';
        addForm.nome_mercado.value = prod.nome_mercado || '';
        addForm.endereco.value = prod.endereco || '';
        addForm.preco.value = prod.preco !== undefined ? String(prod.preco).replace('.',',') : '';
      }
    }catch(e){console.error('Erro ao carregar produto:', e.message)}
  }
});
