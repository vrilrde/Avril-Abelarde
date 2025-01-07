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