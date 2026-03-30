
const btns = document.querySelectorAll('.navigation-btn');
btns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    btns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const href = btn.getAttribute('href');
    if (href && href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', href);
      }
    }
  });
});


const titles = [
    "Software Engineer",
    "Frontend Developer",
    "UI/UX Designer",
    "Web Developer"
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const heroTitle = document.getElementById('hero-title');

function typeWriter() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
        heroTitle.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
    } else {
        heroTitle.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 80 : 120;

    if (!isDeleting && charIndex === currentTitle.length) {
        speed = 1500;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        speed = 400;
    }

    setTimeout(typeWriter, speed);
}

typeWriter();