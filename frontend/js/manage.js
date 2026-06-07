async function fetchAll(){
  const res = await fetch('http://localhost:3000/produtos');
  return res.json();
}

function createTable(products){
  const container = document.getElementById('tableContainer');
  if(!products || products.length===0){container.innerHTML='<p>Nenhum produto cadastrado.</p>';return}
  // Responsive: on mobile show cards
  if(window.innerWidth<600){
    container.innerHTML = products.map(p=>`<div class="card"><div><strong>${p.nome_produto}</strong><div>${p.nome_mercado}</div><div>${p.endereco}</div></div><div><div>R$ ${Number(p.preco).toFixed(2).replace('.',',')}</div><div style="margin-top:8px"><button class="btn btn-blue action-btn" onclick="edit(${p.id})">Editar</button><button class="btn btn-delete action-btn" onclick="remove(${p.id})">Excluir</button></div></div></div>`).join('');
    return;
  }
  const rows = products.map(p=>`<tr><td>${p.nome_produto}</td><td>${p.nome_mercado}</td><td>${p.endereco}</td><td>R$ ${Number(p.preco).toFixed(2).replace('.',',')}</td><td><button class="btn btn-blue action-btn" onclick="edit(${p.id})">Editar</button><button class="btn btn-delete action-btn" onclick="remove(${p.id})">Excluir</button></td></tr>`).join('');
  container.innerHTML = `<table class="table"><thead><tr><th>Produto</th><th>Mercado</th><th>Endereço</th><th>Preço</th><th>Ações</th></tr></thead><tbody>${rows}</tbody></table>`;
}

document.addEventListener('DOMContentLoaded', async ()=>{
  const data = await fetchAll();
  createTable(data || []);
});

function edit(id){
  const nome = prompt('Novo preço (apenas para demonstração). Deixe em branco para abrir edição completa.');
  if(nome){
    // Simple edit demo: only price
    fetch(`http://localhost:3000/produtos/${id}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({preco:Number(nome)})}).then(()=>location.reload());
  }else{
    location.href = `add.html`;
  }
}

function remove(id){if(!confirm('Excluir este produto?')) return;fetch(`http://localhost:3000/produtos/${id}`,{method:'DELETE'}).then(()=>location.reload());}
