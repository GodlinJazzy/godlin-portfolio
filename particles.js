/**
 * ====================================================================
 * NEURAL NETWORK CONSTELLATION CANVAS
 * Interactive particle network simulating AI synapses and nodes
 * ====================================================================
 */

(function () {
  const canvas = document.getElementById('neuralCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 150 };

  // Color palette matching dark navy and purple gradients
  const colors = [
    { r: 99, g: 102, b: 241 },   // Indigo
    { r: 168, g: 85, b: 247 },   // Violet / Purple
    { r: 6, g: 182, b: 212 },    // Cyan
    { r: 236, g: 72, b: 153 }    // Pink / Magenta accent
  ];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  }

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = Math.random() * 2.2 + 1.2;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.baseAlpha = Math.random() * 0.5 + 0.3;
      this.alpha = this.baseAlpha;
      this.pulseSpeed = Math.random() * 0.02 + 0.01;
      this.pulseAngle = Math.random() * Math.PI * 2;
    }

    update() {
      // Natural floating movement
      this.x += this.vx;
      this.y += this.vy;

      // Pulse alpha subtly
      this.pulseAngle += this.pulseSpeed;
      this.alpha = this.baseAlpha + Math.sin(this.pulseAngle) * 0.2;

      // Bounce smoothly off boundaries
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interactivity (subtle synaptic pull / interaction)
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          // Gentle pull towards cursor
          this.x += Math.cos(angle) * force * 1.2;
          this.y += Math.sin(angle) * force * 1.2;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${Math.max(0.1, this.alpha)})`;
      ctx.fill();

      // Subtle outer glow
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha * 0.15})`;
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    // Adjust density based on screen size: fewer on mobile for optimal battery and 60fps
    const densityDivisor = window.innerWidth < 768 ? 16000 : 9500;
    const count = Math.min(100, Math.floor((width * height) / densityDivisor));

    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles() {
    const maxDistance = window.innerWidth < 768 ? 95 : 135;

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.22;
          const p1 = particles[i];
          const p2 = particles[j];

          // Linear gradient line between two nodes
          const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
          grad.addColorStop(0, `rgba(${p1.color.r}, ${p1.color.g}, ${p1.color.b}, ${alpha})`);
          grad.addColorStop(1, `rgba(${p2.color.r}, ${p2.color.g}, ${p2.color.b}, ${alpha})`);

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      }

      // Connect to mouse if nearby
      if (mouse.x !== null && mouse.y !== null) {
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const alpha = (1 - dist / mouse.radius) * 0.45;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    connectParticles();
    requestAnimationFrame(animate);
  }

  // Mouse event listeners
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener('resize', () => {
    resize();
  });

  // Touch support for tablets/mobile
  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Initialize
  resize();
  animate();
})();
