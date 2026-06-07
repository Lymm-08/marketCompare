// Main script for index page: handle navigation and search
document.addEventListener('DOMContentLoaded', ()=>{
  const searchBtn = document.getElementById('searchBtn');
  const q = document.getElementById('q');

  // any button with class add-product navigates to add page
  document.querySelectorAll('.add-product').forEach(b=>b.addEventListener('click', ()=>location.href='add.html'));

  searchBtn?.addEventListener('click', ()=>{
    const val = q.value.trim();
    if(!val) return q.focus();
    location.href = `result.html?nome=${encodeURIComponent(val)}`;
  });
});
