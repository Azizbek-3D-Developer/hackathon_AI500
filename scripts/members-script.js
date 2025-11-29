const canvas = document.getElementById("particlesCanvas");
const ctx = canvas.getContext("2d");

let W = canvas.width = window.innerWidth;
let H = canvas.height = window.innerHeight;

// Particle settings
const numParticles = 60;          // number of particles
const maxVelocity = 0.3;          // speed of particle movement
const connectionDistance = 120;   // distance to draw connecting line

let particles = [];

// Particle constructor
class Particle {
    constructor() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.vx = (Math.random() - 0.5) * maxVelocity;
        this.vy = (Math.random() - 0.5) * maxVelocity;
        this.radius = 2 + Math.random() * 2;
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around edges
        if (this.x > W) this.x = 0;
        if (this.x < 0) this.x = W;
        if (this.y > H) this.y = 0;
        if (this.y < 0) this.y = H;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(57,255,20,0.8)";
        ctx.fill();
    }
}

// Initialize particles
for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, W, H);

    // Move and draw particles
    particles.forEach(p => p.move());
    particles.forEach(p => p.draw());

    // Draw connections
    for (let i = 0; i < numParticles; i++) {
        for (let j = i + 1; j < numParticles; j++) {
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < connectionDistance) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(57,255,20,${1 - dist / connectionDistance})`;
                ctx.lineWidth = 1;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animate);
}

animate();

// Handle window resize
window.addEventListener("resize", () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
});
