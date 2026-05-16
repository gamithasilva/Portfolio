
// Assignment modal (safe even if elements are missing)
const asgnOverlay = document.getElementById('assignment-overlay');
const asgnCloseBtn = document.getElementById('asgnCloseBtn');

function openAssignmentModal() {
  if (!asgnOverlay) return;
  asgnOverlay.classList.add('show');
}

function closeAssignmentModal() {
  if (!asgnOverlay) return;
  asgnOverlay.classList.remove('show');
}

if (asgnCloseBtn) {
  asgnCloseBtn.addEventListener('click', closeAssignmentModal);
}

if (asgnOverlay) {
  asgnOverlay.addEventListener('click', (e) => {
    if (e.target === asgnOverlay) closeAssignmentModal();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAssignmentModal();
});

const btns = document.querySelectorAll('.navigation-btn');
btns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    btns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const href = btn.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    // Assignment is a modal, not a real section.
    if (href === '#assignment-section') {
      e.preventDefault();
      openAssignmentModal();
      return;
    }

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.pushState(null, '', href);
  });
});


const titles = [
    "Software Engineer",
    "Fullstack Developer",
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
//side bar toggle
const menuBtn = document.getElementById('menu-btn');
const aside = document.querySelector('aside');
const overlay = document.getElementById('overlay');

menuBtn.addEventListener('click', () => {
    aside.classList.toggle('open');
    overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
    aside.classList.remove('open');
    overlay.classList.remove('active');
});

// Close sidebar when a nav link is clicked on mobile
document.querySelectorAll('.navigation-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            aside.classList.remove('open');
            overlay.classList.remove('active');
        }
    });
});

// skill section terminal
const data = {
 fe: {
    label: 'frontend',
    color: '#00f5ff',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
    lines: [
      { prompt: '~', cmd: '<span class="kw">import</span> { Frontend } <span class="kw">from</span> <span class="str">"./skills"</span>' },
      { prompt: '~', cmd: '<span class="fn">Frontend</span>.load(<span class="str">"HTML5"</span>, <span class="str">"CSS3"</span>, <span class="str">"JavaScript"</span>, <span class="str">"Bootstrap"</span>)' },
      { prompt: '~', cmd: '<span class="ok">✓</span> <span class="dim">4 modules loaded — pixel-perfect UIs ready</span>' },
    ]
  },
  be: {
    label: 'backend',
    color: '#7b61ff',
    skills: ['Node.js', 'Java', 'Python', 'C#'],
    lines: [
      { prompt: '~', cmd: '<span class="kw">import</span> { Backend } <span class="kw">from</span> <span class="str">"./skills"</span>' },
      { prompt: '~', cmd: '<span class="fn">Backend</span>.load(<span class="str">"Node.js"</span>, <span class="str">"Java"</span>, <span class="str">"Python"</span>, <span class="str">"C#"</span>)' },
      { prompt: '~', cmd: '<span class="ok">✓</span> <span class="dim">4 runtimes linked — server-side logic enabled</span>' },
    ]
  },
  db: {
    label: 'database',
    color: '#5de6ff',
    skills: ['MySQL', 'PostgreSQL'],
    lines: [
      { prompt: '~', cmd: '<span class="kw">import</span> { Database } <span class="kw">from</span> <span class="str">"./skills"</span>' },
      { prompt: '~', cmd: '<span class="fn">Database</span>.connect(<span class="str">"MySQL"</span>, <span class="str">"PostgreSQL"</span>)' },
      { prompt: '~', cmd: '<span class="ok">✓</span> <span class="dim">2 engines connected — schemas optimized</span>' },
    ]
  },
  ds: {
    label: 'design',
    color: '#ff61c8',
    skills: ['Figma', 'UI/UX Design', 'Wireframing'],
    lines: [
      { prompt: '~', cmd: '<span class="kw">import</span> { Design } <span class="kw">from</span> <span class="str">"./skills"</span>' },
      { prompt: '~', cmd: '<span class="fn">Design</span>.init(<span class="str">"Figma"</span>, <span class="str">"UI/UX"</span>, <span class="str">"Wireframing"</span>)' },
      { prompt: '~', cmd: '<span class="ok">✓</span> <span class="dim">3 tools loaded — design systems standing by</span>' },
    ]
  }
};

let current = 'fe';

function selectCat(el, cat) {
  document.querySelectorAll('.cat-card').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  current = cat;
  renderTerminal(cat);
}

function renderTerminal(cat) {
  const tb = document.getElementById('termBody');
  const tp = document.getElementById('tagsPanel');
  tb.innerHTML = '';
  tp.innerHTML = '';

  const d = data[cat];
  let delay = 0;

  d.lines.forEach((line, i) => {
    const div = document.createElement('div');
    div.className = 'terminal-line';
    div.style.animationDelay = delay + 'ms';
    div.innerHTML = `<span class="prompt">${line.prompt} $</span><span class="cmd">${line.cmd}</span>`;
    tb.appendChild(div);
    delay += 160;
  });

  const curDiv = document.createElement('div');
  curDiv.className = 'terminal-line';
  curDiv.style.animationDelay = delay + 'ms';
  curDiv.innerHTML = `<span class="prompt">~ $</span><span class="cursor-blink"></span>`;
  tb.appendChild(curDiv);

  delay += 200;
  d.skills.forEach((skill, i) => {
    setTimeout(() => {
      const pill = document.createElement('span');
      pill.className = 'skill-pill visible';
      pill.textContent = skill;
      pill.style.animationDelay = (i * 60) + 'ms';
      pill.style.borderColor = d.color + '33';
      pill.style.setProperty('--hover-color', d.color);
      tp.appendChild(pill);
    }, delay + i * 80);
  });
}

renderTerminal('fe');


function doSend() {
  const n = document.getElementById('fn').value.trim();
  const e = document.getElementById('fe').value.trim();
  const m = document.getElementById('fm').value.trim();
  if (!n || !e || !m) return;
  ['fn','fe','fs','fm'].forEach(id => document.getElementById(id).value = '');
  const ok = document.getElementById('okMsg');
  ok.style.display = 'flex';
  setTimeout(() => ok.style.display = 'none', 4500);
}

const sections = [
  { id: 'hero-section',       label: 'Home' },
  { id: 'about-section',      label: 'About' },
  { id: 'skill-section',      label: 'Skill' },
  { id: 'tools-section',      label: 'Tools' },
  { id: 'project-section',    label: 'Project' },
  { id: 'contact-section',    label: 'Contact' },
];

const navBtns   = document.querySelectorAll('.navigation-btn');
const topbarTitle = document.getElementById('topbar-title');

function getActiveSection() {
  const scrollY = window.scrollY + 80; 

  let current = sections[0];

  for (const sec of sections) {
    const el = document.getElementById(sec.id);
    if (!el) continue;
    if (el.offsetTop <= scrollY) {
      current = sec;
    }
  }

  return current;
}

function updateUI() {
  const active = getActiveSection();


  topbarTitle.textContent = active.label;


  navBtns.forEach(btn => {
    const href = btn.getAttribute('href');
    if (href === '#' + active.id) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}


window.addEventListener('scroll', updateUI, { passive: true });


updateUI();