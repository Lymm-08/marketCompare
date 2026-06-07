// Main script for index page: handle navigation and search
document.addEventListener('DOMContentLoaded', ()=>{
  const addBtn = document.getElementById('addBtn');
  const searchBtn = document.getElementById('searchBtn');
  const q = document.getElementById('q');

  addBtn?.addEventListener('click', ()=>{
    location.href = 'add.html';
  });

  searchBtn?.addEventListener('click', ()=>{
    const val = q.value.trim();
    if(!val) return q.focus();
    location.href = `result.html?nome=${encodeURIComponent(val)}`;
  });
});
