document.addEventListener("DOMContentLoaded", () => {
  const faders = document.querySelectorAll(".fade-in");

  const appearOptions = {
    threshold: 0.1,
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("appear");
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach((fader) => {
    appearOnScroll.observe(fader);
  });
});

const glowContainer = document.querySelector(".cursor-glow-container");
const foregroundContainer = document.querySelector(".cursor-foreground");
const body = document.body;

let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;
let foreX = 0, foreY = 0;

const speed = 0.15; 

document.addEventListener("mousemove", e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animate() {
  let dxGlow = mouseX - glowX;
  let dyGlow = mouseY - glowY;
  glowX += dxGlow * speed;
  glowY += dyGlow * speed;

  let dxFore = mouseX - foreX;
  let dyFore = mouseY - foreY;
  foreX += dxFore * speed;
  foreY += dyFore * speed;

  glowContainer.style.transform = `translate(${glowX}px, ${glowY}px)`;
  foregroundContainer.style.transform = `translate(${foreX}px, ${foreY}px)`;

  requestAnimationFrame(animate);
}
animate();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    body.classList.add('cursor-hovered');
  });
  el.addEventListener('mouseleave', () => {
    body.classList.remove('cursor-hovered');
  });
});

document.addEventListener('mousedown', () => {
  body.classList.add('cursor-clicked');
});
document.addEventListener('mouseup', () => {
  body.classList.remove('cursor-clicked');
});

const faders = document.querySelectorAll(".fade-in");

const appearOptions = { threshold: 0.1 };
const appearOnScroll = new IntersectionObserver((entries, observer) => {
entries.forEach((entry) => {
  if (!entry.isIntersecting) return;
  entry.target.classList.add("slide-in-right");
  observer.unobserve(entry.target);
});
}, appearOptions);

faders.forEach((fader) => {
appearOnScroll.observe(fader);
});

const arrow = document.querySelector('.scroll-arrow');
const nextSection = document.querySelector('#next-section');

const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
  if (entry.isIntersecting) {
    arrow.style.opacity = '0';
    arrow.classList.add('hidden');
  } else {
    arrow.style.opacity = '1';
    arrow.classList.remove('hidden');
  }
});
}, { threshold: 0.15 }); 

observer.observe(nextSection);

// Enhanced scroll animations
const scrollElements = document.querySelectorAll('.scroll-fade-in, .scroll-slide-left, .scroll-slide-right, .scroll-scale-in, .scroll-rotate-in');
const skillGroups = document.querySelectorAll('.skill-group');
const orgCards = document.querySelectorAll('.org-card');
const certItems = document.querySelectorAll('.cert-item');
const timelineItems = document.querySelectorAll('.timeline-item');

// Scroll animation observer
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      scrollObserver.unobserve(entry.target);
    }
  });
}, { 
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

// Observe all scroll elements
scrollElements.forEach(element => {
  scrollObserver.observe(element);
});

// Skills grid animation with stagger
skillGroups.forEach((group, index) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100); // 100ms stagger
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  observer.observe(group);
});

// Organization cards animation
orgCards.forEach((card, index) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 150); // 150ms stagger
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  observer.observe(card);
});

// Certification items animation
certItems.forEach((item, index) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 80); // 80ms stagger
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  observer.observe(item);
});

// Timeline line animation with enhanced effects
const timelineObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
  if (entry.isIntersecting) {
    // Add delay for each item
    const index = Array.from(timelineItems).indexOf(entry.target);
    setTimeout(() => {
      entry.target.classList.add('line-animated', 'visible');
    }, index * 200); // 200ms delay between each item
    timelineObserver.unobserve(entry.target);
  }
});
}, { 
threshold: 0.3,
rootMargin: '0px 0px -50px 0px'
});

timelineItems.forEach(item => {
timelineObserver.observe(item);
});

// Parallax scrolling effects
const parallaxElements = document.querySelectorAll('.parallax-slow, .parallax-medium, .parallax-fast');

function updateParallax() {
  const scrolled = window.pageYOffset;
  
  parallaxElements.forEach(element => {
    const speed = element.classList.contains('parallax-slow') ? 0.5 : 
                  element.classList.contains('parallax-medium') ? 0.3 : 0.1;
    const yPos = -(scrolled * speed);
    element.style.transform = `translateY(${yPos}px)`;
  });
}

// Throttled scroll event for better performance
let ticking = false;
function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
}

function handleScroll() {
  requestTick();
  ticking = false;
}

window.addEventListener('scroll', handleScroll);

// Advanced glass effect is static, no animation needed
// The chromatic aberration and displacement is handled by the SVG filter

// Project modal logic
(function(){
  const modal = document.getElementById('projectModal');
  if(!modal) return;

  const dialog = modal.querySelector('.project-modal__dialog');
  const closeEls = modal.querySelectorAll('[data-close-modal]');

  // Simple data source; extend as needed
  const PROJECTS = {
    alerto: {
      title: 'Alerto MNL',
      role: 'Lead Mobile Developer',
      description: 'Safety and awareness mobile application for Manila citizens featuring an SOS button that alerts nearby officers within a 3km radius. Built with React Native and real-time mapping.',
      skills: ['React Native','Mapbox API','Realtime','UI/UX'],
      published: 'Published on May 12, 2024',
      gallery: [
        'assets/images/alertomnl/img_1.jpg',
        'assets/images/alertomnl/img_2.jpg',
        'assets/images/alertomnl/img_3.jpg',
        'assets/images/alertomnl/img_4.jpg',
        'assets/images/alertomnl/img_5.jpg',
        'assets/images/alertomnl/img_6.jpg',
        'assets/images/alertomnl/img_7.jpg',
        'assets/images/alertomnl/img_8.jpg',
        'assets/images/alertomnl/img_9.jpg',
        'assets/images/alertomnl/img_10.jpg',
        'assets/images/alertomnl/img_11.jpg',
        'assets/images/alertomnl/img_12.jpg',
        'assets/images/alertomnl/img_13.jpg',
        'assets/images/alertomnl/img_14.jpg',
        'assets/images/alertomnl/img_15.jpg',
        'assets/images/alertomnl/img_16.jpg',
        'assets/images/alertomnl/img_17.jpg',
        'assets/images/alertomnl/img_18.png'
      ]
    },
    appointmate: {
      title: 'AppointMate',
      role: 'Full‑stack Developer',
      description: 'Conflict‑free booking system that simplifies scheduling and communication across teams and clients.',
      skills: ['Full Stack','Booking','MySQL'],
      published: 'Published on Aug 21, 2024',
      gallery: []
    },
    intelligloves: {
      title: 'Intelligloves Project',
      role: '3D Designer',
      description: 'IntelliGloves is a wearable system that translates sign language into audible or textual formats via motion‑sensing hardware and AI. Embedded flex, gyroscopic, and accelerometer sensors capture gestures in real time for ML processing. The companion app ensures instant output for inclusivity across diverse sign languages and communities.',
      skills: ['Blender','3D Design','Prototype Design'],
      published: 'Published on Jan 9, 2025',
      gallery: [
        'assets/images/intelligloves/img_1.png',
        'assets/images/intelligloves/img_2.png',
        'assets/images/intelligloves/img_3.png',
        'assets/images/intelligloves/img_4.png',
        'assets/images/intelligloves/img_5.png',
        'assets/images/intelligloves/img_6.png'
      ]
    },
    inventory: {
      title: 'Inventory Management',
      role: 'Frontend Developer',
      description: 'Real‑time web‑based solution for monitoring and managing business stock levels.',
      skills: ['JavaScript','Realtime'],
      published: 'Published on Jun 2, 2024',
      gallery: [
        'assets/images/invmanagement/img_1.jpeg',
        'assets/images/invmanagement/img_2.jpeg',
        'assets/images/invmanagement/img_3.jpeg',
        'assets/images/invmanagement/img_4.jpeg',
        'assets/images/invmanagement/img_5.jpeg',
        'assets/images/invmanagement/img_6.jpeg',
        'assets/images/invmanagement/img_7.jpeg'
      ]
    },
    studyplan: {
      title: 'Re‑engineering Study Plan System',
      role: 'Full‑stack Developer',
      description: 'Responsive UI with automated priority‑subject generation from Excel‑based curricula.',
      skills: ['PHP','MySQL','Excel API'],
      published: 'Published on Nov 10, 2024',
      gallery: [
        'assets/images/studyplan/img_1.jpg',
        'assets/images/studyplan/img_2.jpg',
        'assets/images/studyplan/img_3.jpg',
        'assets/images/studyplan/img_4.jpg',
        'assets/images/studyplan/img_5.jpg',
        'assets/images/studyplan/img_6.jpg',
        'assets/images/studyplan/img_7.jpg',
        'assets/images/studyplan/img_8.jpg',
        'assets/images/studyplan/img_9.jpg',
        'assets/images/studyplan/img_10.jpg',
        'assets/images/studyplan/img_11.jpg',
        'assets/images/studyplan/img_12.jpg',
      ]
    },
    realestate: {
      title: 'Real Estate Platform',
      role: 'Frontend Developer',
      description: 'Property listing website with intuitive navigation and comprehensive search.',
      skills: ['HTML/CSS','JavaScript'],
      published: 'Published on Feb 14, 2024',
      gallery: []
    },
    beanvision: {
      title: 'Coffee Bean Scanner',
      role: 'Mobile Developer',
      description: 'A Dart/Flutter mobile application that scans coffee beans to identify bean type (e.g., Arabica, Robusta) and detects surface defects such as cracks, discoloration, insect damage, and mold using deep learning with CNN and Fast R-CNN. Supports live camera and gallery input with offline inference.',
      skills: ['Flutter','Dart','CNN','Fast R-CNN','Deep Learning'],
      published: 'Currently in development',
      gallery: [
        'assets/images/beanscan/img_1.png',
        'assets/images/beanscan/img_2.png',
        'assets/images/beanscan/img_3.png',
        'assets/images/beanscan/img_4.png',
        'assets/images/beanscan/img_5.png',
        'assets/images/beanscan/img_6.png',
        'assets/images/beanscan/img_7.jpg',
        'assets/images/beanscan/img_8.jpg',
        'assets/images/beanscan/img_9.png',
        'assets/images/beanscan/img_10.png'
      ]
    }
  };

  function setField(selector, value) {
    const el = modal.querySelector(`[data-field="${selector}"]`);
    if(!el) return;
    if(selector === 'skills') {
      el.innerHTML = '';
      (value || []).forEach(text => {
        const span = document.createElement('span');
        span.className = 'chip';
        span.textContent = text;
        el.appendChild(span);
      });
      return;
    }
    if(selector === 'gallery') {
      el.innerHTML = '';
      (value || []).forEach(src => {
        const img = document.createElement('img');
        img.loading = 'lazy';
        img.src = src;
        img.alt = '';
        el.appendChild(img);
      });
      return;
    }
    el.textContent = value || '';
  }

  function openModal(projectKey){
    const data = PROJECTS[projectKey];
    if(!data) return;
    setField('title', data.title);
    setField('role', data.role);
    setField('description', data.description);
    setField('skills', data.skills);
    setField('published', data.published);
    setField('gallery', data.gallery);
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    dialog.focus();
  }

  function closeModal(){
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.bento-item').forEach(card => {
    card.addEventListener('click', () => {
      const key = card.getAttribute('data-project');
      openModal(key);
    });
  });

  closeEls.forEach(el => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape') closeModal();
  });
})();