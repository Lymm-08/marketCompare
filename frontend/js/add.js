document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('addForm')?.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form));
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
