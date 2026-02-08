const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
let trail = [];
let hue = 45;

window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener("click", () => {
  hue = Math.random() * 360;
});

function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.12)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  trail.push({ x: mouse.x, y: mouse.y });
  if (trail.length > 40) trail.shift();

  ctx.beginPath();
  ctx.moveTo(trail[0]?.x, trail[0]?.y);

  for (let i = 1; i < trail.length; i++) {
    const p = trail[i];
    ctx.lineTo(p.x, p.y);
  }

  // Glow layers
  ctx.strokeStyle = `hsla(${hue},100%,70%,1)`;
  ctx.lineWidth = 10;
  ctx.shadowBlur = 30;
  ctx.shadowColor = `hsla(${hue},100%,60%,1)`;
  ctx.stroke();

  ctx.strokeStyle = `hsla(${hue},100%,85%,0.6)`;
  ctx.lineWidth = 4;
  ctx.shadowBlur = 15;
  ctx.stroke();

  requestAnimationFrame(animate);
}

animate();
