document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('.add-product').forEach(b=>b.addEventListener('click', ()=>location.href='add.html'));

  document.getElementById('addForm')?.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form));
    // allow comma as decimal separator (e.g., 19,90)
    if(typeof data.preco === 'string') data.preco = data.preco.replace(',','.');
    data.preco = Number(data.preco);
    try{
      const res = await fetch('http://localhost:3000/produtos',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
      if(!res.ok) throw new Error('Erro ao salvar');
      alert('Produto salvo com sucesso');
      location.href = 'manage.html';
    }catch(err){console.error(err);alert('Erro ao salvar produto')}
  });

  document.getElementById('listBtn')?.addEventListener('click', ()=>location.href='manage.html');
});
