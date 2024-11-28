function typeText(element, text, speed = 50) {
  let i = 0;
  element.innerHTML = '';
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

window.addEventListener('load', function() {
  setTimeout(function() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.style.opacity = '0';
      setTimeout(() => {
        loadingScreen.style.display = 'none';
        startTypingEffects();
      }, 500);
    } else {
      startTypingEffects();
    }
  }, 1000);
});

function startTypingEffects() {
  const typedTextElement = document.getElementById('typed-text');
  const typedYearElement = document.getElementById('typed-year');

  if (typedTextElement && !typedTextElement.dataset.typed) {
    typeText(typedTextElement, typedTextElement.dataset.content || typedTextElement.textContent);
    typedTextElement.dataset.typed = 'true';
  }

  if (typedYearElement && !typedYearElement.dataset.typed) {
    setTimeout(() => {
      typeText(typedYearElement, typedYearElement.dataset.content || typedYearElement.textContent);
      typedYearElement.dataset.typed = 'true';
    }, 100);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-bs-theme', savedTheme);
    updateSceneColor(savedTheme);
  }
});

document.getElementById('darkModeToggle').addEventListener('click', function() {
  const htmlElement = document.documentElement;
  const isDarkMode = htmlElement.getAttribute('data-bs-theme') === 'dark';
  
  const newTheme = isDarkMode ? 'light' : 'dark';
  htmlElement.setAttribute('data-bs-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateSceneColor(newTheme);
});

function updateSceneColor(theme) {
  if (theme === 'dark') {
    scene.background = new THREE.Color(0x1e1e1e);
    material.color.setHex(0x009900);
  } else {
    scene.background = new THREE.Color(0xf5f5f5);
    material.color.setHex(0x00CC00);
  }
}

const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

const cursorTrail = document.createElement('div');
cursorTrail.className = 'cursor-trail';
document.body.appendChild(cursorTrail);

const trailLength = 10;
let trailPositions = [];

document.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;

  trailPositions.unshift({ x: e.clientX, y: e.clientY });
  if (trailPositions.length > trailLength) {
    trailPositions.pop();
  }

  updateTrail();
});

function updateTrail() {
  cursorTrail.innerHTML = '';
  trailPositions.forEach((pos, index) => {
    const dot = document.createElement('div');
    dot.className = 'trail-dot';
    dot.style.left = `${pos.x}px`;
    dot.style.top = `${pos.y}px`;
    dot.style.opacity = 1 - index / trailLength;
    dot.style.transform = `scale(${1 - index * 0.1})`;
    cursorTrail.appendChild(dot);
  });
}

document.addEventListener('mousedown', () => cursor.classList.add('click'));
document.addEventListener('mouseup', () => cursor.classList.remove('click'));

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const sections = document.querySelectorAll('section');
  
  sections.forEach((section, index) => {
    const speed = 0.1;
    const yPos = -(scrollY * speed);
    section.style.transform = `translateY(${yPos}px)`;
  });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarNav = document.querySelector('.navbar-nav');

  navbarToggler.addEventListener('click', () => {
    navbarNav.classList.toggle('show');
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.custom-navbar')) {
      navbarNav.classList.remove('show');
    }
  });

  navbarNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navbarNav.classList.remove('show');
    });
  });
});
