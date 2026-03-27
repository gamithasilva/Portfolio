
  const btns = document.querySelectorAll('.navigation-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
