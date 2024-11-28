window.addEventListener('load', function() {
    setTimeout(function() {
      const loadingScreen = document.getElementById('loading-screen');
      loadingScreen.style.opacity = '0';
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 500);
    }, 1000);
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

const certifications = [
    { title: 'Social Networks', image: 'static/cert/nptel.png', issuer: 'NPTEL' },
    { title: 'Introduction to Web Development', image: 'static/cert/web.png', issuer: 'Coursera' },
    { title: 'Java Language', image: 'static/cert/java.png', issuer: 'LearnQuest | Coursera' },
    { title: 'Introduction to Computer Vision', image: 'static/cert/cv.png', issuer: 'IBM | Coursera' },
    { title: 'ReactJS', image: 'static/cert/react.png', issuer: 'Coursera' },
];

const certificationSlider = document.querySelector('.certification-slider');

certifications.forEach(cert => {
    const certCard = document.createElement('div');
    certCard.className = 'certification-card';
    certCard.innerHTML = `
        <div class="card">
            <img src="${cert.image}" class="card-img-top" alt="${cert.title}">
            <div class="card-body">
                <h5 class="card-title">${cert.title}</h5>
                <p class="card-text">Issued by: ${cert.issuer}</p>
            </div>
        </div>
    `;
    certificationSlider.appendChild(certCard);
});

$('.certification-slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    prevArrow: '<button type="button" class="slick-prev btn btn-primary btn-lg"><i class="fas fa-chevron-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next btn btn-primary btn-lg"><i class="fas fa-chevron-right"></i></button>',
    responsive: [
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 1
            }
        }
    ]
});

const projectContainer = document.getElementById('projectContainer');

projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'col-md-4 col-sm-6 mb-4';
    projectCard.innerHTML = `
        <div class="card project-card">
            <img src="${project.image}" class="card-img-top" alt="${project.title}">
            <div class="card-body">
                <h5 class="card-title">${project.title}</h5>
                <div class="project-description">
                    <p class="card-text">${project.description}</p>
                    <a href="${project.link}" class="btn btn-primary btn-sm">View Project</a>
                </div>
            </div>
        </div>
    `;
    projectContainer.appendChild(projectCard);

    projectCard.addEventListener('mouseenter', () => {
        projectCard.querySelector('.project-description').style.maxHeight = '200px';
    });

    projectCard.addEventListener('mouseleave', () => {
        projectCard.querySelector('.project-description').style.maxHeight = '0';
    });
});

const canvas = document.getElementById('animationCanvas');
if (!canvas) {
    console.error('Animation canvas not found');
} else {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        alpha: true,
        antialias: true 
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const geometries = [
        new THREE.TorusKnotGeometry(10, 3, 100, 16),
        new THREE.IcosahedronGeometry(8),
        new THREE.OctahedronGeometry(8),
        new THREE.TetrahedronGeometry(8),
        new THREE.DodecahedronGeometry(8)
    ];

    const material = new THREE.MeshPhongMaterial({
        color: 0x9a2ecc,
        wireframe: true,
        wireframeLinewidth: 2
    });

    let currentGeometryIndex = 0;
    const mesh = new THREE.Mesh(geometries[currentGeometryIndex], material);
    scene.add(mesh);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(25, 25, 25);
    scene.add(pointLight);

    camera.position.z = 30;

    function changeShape() {
        currentGeometryIndex = (currentGeometryIndex + 1) % geometries.length;
        mesh.geometry.dispose();
        mesh.geometry = geometries[currentGeometryIndex];
    }

    function changeColor() {
        const hue = Math.random();
        const saturation = 0.7;
        const lightness = 0.6;
        material.color.setHSL(hue, saturation, lightness);
    }

    function handleResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);

        const size = Math.min(width, height) * 0.15;
        geometries[0] = new THREE.TorusKnotGeometry(size * 0.8, size * 0.2, 100, 16);
        geometries[1] = new THREE.IcosahedronGeometry(size);
        geometries[2] = new THREE.OctahedronGeometry(size);
        geometries[3] = new THREE.TetrahedronGeometry(size);
        geometries[4] = new THREE.DodecahedronGeometry(size);

        mesh.geometry = geometries[currentGeometryIndex];
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    function animate() {
        requestAnimationFrame(animate);
        
        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.005;
        
        renderer.render(scene, camera);
    }

    animate();

    setInterval(() => {
        changeShape();
        changeColor();
    }, 3000);

    function updateBackgroundColor(isDark) {
        scene.background = new THREE.Color(isDark ? 0x1f1f1f : 0xffffff);
    }

    const isDarkMode = document.documentElement.getAttribute('data-bs-theme') === 'dark';
    updateBackgroundColor(isDarkMode);

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'data-bs-theme') {
                const isDark = document.documentElement.getAttribute('data-bs-theme') === 'dark';
                updateBackgroundColor(isDark);
            }
        });
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-bs-theme']
    });
}

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
        const speed = 0.1;
        const yPos = -(scrollY * speed);
        section.style.transform = `translateY(${yPos}px)`;
    });
});

document.getElementById('darkModeToggle').addEventListener('click', function() {
    const htmlElement = document.documentElement;
    const isDarkMode = htmlElement.getAttribute('data-bs-theme') === 'dark';
    
    if (isDarkMode) {
        htmlElement.setAttribute('data-bs-theme', 'light');
        localStorage.setItem('theme', 'light');
        scene.background = new THREE.Color(0xf5f5f5);
    } else {
        htmlElement.setAttribute('data-bs-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        scene.background = new THREE.Color(0x1e1e1e);
    }
    
    const newColor = isDarkMode ? 0x00CC00 : 0x009900;
    material.color.setHex(newColor);
});

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-bs-theme', savedTheme);
        if (savedTheme === 'dark') {
            htmlElement.setAttribute('data-bs-theme', 'light');
            scene.background = new THREE.Color(0xf5f5f5);
        } else {
            htmlElement.setAttribute('data-bs-theme', 'dark');
            scene.background = new THREE.Color(0x1e1e1e);
        }
    }
});

scene.background = new THREE.Color(0xf5f5f5);

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = e.target;

    fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString()
    })
    .then(() => {
        console.log('Form successfully submitted');
        alert('Thank you for your message! We will get back to you soon.');
        form.reset();
    })
    .catch((error) => {
        console.error('Form submission error:', error);
        alert('Oops! There was a problem submitting your form. Please try again.');
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