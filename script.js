const header = document.getElementById('siteHeader');
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const scrollProgress = document.getElementById('scrollProgress');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setMenu(open) {
  header.classList.toggle('menu-visible', open);
  document.body.classList.toggle('menu-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
}

menuToggle.addEventListener('click', () => {
  setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
});

mobileNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 860) setMenu(false);
});

let scrollFrame;
function updateScrollState() {
  const scrollTop = window.scrollY;
  const available = document.documentElement.scrollHeight - window.innerHeight;
  const percentage = available > 0 ? (scrollTop / available) * 100 : 0;

  header.classList.toggle('is-scrolled', scrollTop > 24);
  scrollProgress.style.width = `${percentage}%`;
  scrollFrame = null;
}

window.addEventListener('scroll', () => {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollState);
}, { passive: true });
updateScrollState();

const revealElements = document.querySelectorAll('.reveal:not(.is-visible)');
if ('IntersectionObserver' in window && !reducedMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -55px' });

  revealElements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index % 3, 2) * 70}ms`;
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}

const observedSections = document.querySelectorAll('main section[id]');
const desktopLinks = document.querySelectorAll('.desktop-nav a');
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      desktopLinks.forEach((link) => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: '-40% 0px -52% 0px' });

  observedSections.forEach((section) => sectionObserver.observe(section));
}

document.querySelectorAll('.project-details').forEach((details) => {
  details.addEventListener('toggle', () => {
    if (!details.open) return;
    document.querySelectorAll('.project-details[open]').forEach((other) => {
      if (other !== details) other.removeAttribute('open');
    });
  });
});

const resumeText = `Lathasri Ravirala
AI Engineer | Data Scientist | Data Engineer
Hyderabad, Telangana, India

Email: lathasriravirala2003@gmail.com
LinkedIn: https://linkedin.com/in/lathasri-ravirala-06b606309
GitHub: https://github.com/RaviralaLathasri

PROFILE
AI engineer and data scientist building grounded LLM applications, computer-vision models, data pipelines, and decision-ready analytics. Experienced across experimentation, backend delivery, deployment, and technical research.

SELECTED WORK
- RAG Chatbot with Meta LLaMA: strict source-grounded document QA with Flask and OpenRouter.
- Air Quality & Environmental Insights: Power BI product modeling more than 28 million AQI observations.
- Respiratory Disease Detection: three-class chest X-ray CNN achieving 92% accuracy.
- Quantum Investment Recommendation: Qiskit QAOA, Gemini AI, and FastAPI fintech prototype.
- India Road Accident Analytics: interactive analysis of more than 30,000 accident records.

EDUCATION
BTech, Artificial Intelligence and Data Science
Methodist College of Engineering & Technology, Hyderabad | 2022-2026 | CGPA: 8.6/10

CORE SKILLS
Python, SQL, PostgreSQL, TensorFlow, Keras, RAG, NLP, Power BI, DAX, Tableau, FastAPI, Flask, Docker, Git, Qiskit

PUBLICATIONS
- Visualizing Retail Trends and Performance Using Tableau, ISJEM, 2025
- Quantum Enhancement Investment Recommendation, IJCRT, 2025
- Intelligent Machine Learning Approaches for Early Disease Prediction, 2025
`;

function downloadResume() {
  const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Lathasri-Ravirala-Resume.txt';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

['resumeBtn', 'resumeBtnFooter'].forEach((id) => {
  document.getElementById(id)?.addEventListener('click', downloadResume);
});

const systemCard = document.querySelector('.system-card');
if (systemCard && !reducedMotion && window.matchMedia('(pointer: fine)').matches) {
  systemCard.addEventListener('pointermove', (event) => {
    const bounds = systemCard.getBoundingClientRect();
    const rotateX = ((event.clientY - bounds.top) / bounds.height - 0.5) * -3;
    const rotateY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 4;
    systemCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  systemCard.addEventListener('pointerleave', () => {
    systemCard.style.transform = '';
  });
}

document.getElementById('currentYear').textContent = new Date().getFullYear();
