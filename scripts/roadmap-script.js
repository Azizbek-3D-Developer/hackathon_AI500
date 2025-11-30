/* CANVAS SETUP (unchanged) */
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");
let particles = [];
const particleCount = 55;

function resizeCanvas() {
    const main = document.querySelector(".main-content");
    canvas.width = main.clientWidth;
    canvas.height = main.clientHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random()-0.5)*0.7;
        this.vy = (Math.random()-0.5)*0.7;
        this.size = 3;
        this.trail = [];
    }
    move() {
        this.trail.push({x:this.x,y:this.y});
        if(this.trail.length>8) this.trail.shift();
        this.x += this.vx;
        this.y += this.vy;
        if(this.x<0||this.x>canvas.width) this.vx*=-1;
        if(this.y<0||this.y>canvas.height) this.vy*=-1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.fillStyle = "#00b7ff";
        ctx.shadowBlur=8;
        ctx.shadowColor="#00b7ff";
        ctx.fill();

        ctx.beginPath();
        for(let i=0;i<this.trail.length;i++){
            const p=this.trail[i];
            ctx.lineTo(p.x,p.y);
        }
        ctx.strokeStyle="rgba(0,183,255,0.4)";
        ctx.lineWidth=1.2;
        ctx.stroke();
    }
}

for(let i=0;i<particleCount;i++) particles.push(new Particle());

function connectParticles(){
    for(let i=0;i<particles.length;i++){
        for(let j=i+1;j<particles.length;j++){
            const dx=particles[i].x-particles[j].x;
            const dy=particles[i].y-particles[j].y;
            const dist=Math.sqrt(dx*dx+dy*dy);
            if(dist<140){
                ctx.beginPath();
                ctx.strokeStyle="rgba(57,255,20,0.4)";
                ctx.lineWidth=1.2;
                ctx.moveTo(particles[i].x,particles[i].y);
                ctx.lineTo(particles[j].x,particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{p.move();p.draw();});
    connectParticles();
    requestAnimationFrame(animate);
}
animate();

/* CARD CONNECTION LINES */
function drawCardConnections(){
    const cards=document.querySelectorAll(".roadmap-card");
    cards.forEach((card,i)=>{
        if(i===cards.length-1)return;
        const next=cards[i+1];
        const rect1=card.getBoundingClientRect();
        const rect2=next.getBoundingClientRect();
        const parentRect=card.parentElement.getBoundingClientRect();
        const line=document.createElement("div");
        line.classList.add("card-connection-line");
        line.style.top=(rect1.bottom-parentRect.top)+"px";
        line.style.height=(rect2.top-rect1.bottom)+"px";
        card.parentElement.appendChild(line);
    });
}

window.addEventListener("load", drawCardConnections);
window.addEventListener("resize", ()=>{
    document.querySelectorAll(".card-connection-line").forEach(x=>x.remove());
    drawCardConnections();
});

/* CARD CLICK EXPAND LOGIC */
const cards = document.querySelectorAll(".roadmap-card");
cards.forEach(card => {
    card.addEventListener("click", () => {
        const expandedCard = document.querySelector(".roadmap-card.expanded");
        if(expandedCard && expandedCard !== card){
            expandedCard.classList.remove("expanded");
        }
        card.classList.toggle("expanded");
    });
});

/* 3D PARALLAX */
cards.forEach(card=>{
    card.addEventListener("mousemove", e=>{
        const centerX=window.innerWidth/2;
        const centerY=window.innerHeight/2;
        const dx=e.clientX-centerX;
        const dy=e.clientY-centerY;
        const baseRotate=8;
        const extraX=(dy/centerY)*baseRotate;
        const extraY=(dx/centerX)*baseRotate;
        card.style.transform=`translateY(-5px) rotateX(${-extraX}deg) rotateY(${extraY}deg)`;
    });
    card.addEventListener("mouseleave", ()=>{
        card.style.transform="";
    });
});
