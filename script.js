const contactDialog = document.querySelector("#contact-dialog");
document
  .querySelectorAll('a[href="mailto:xboxgoldser@hotmail.com"]')
  .forEach((link) => {
    if (!contactDialog.contains(link)) {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        contactDialog.showModal();
      });
    }
  });
document.querySelector(".dialog-close").onclick = () => contactDialog.close();
contactDialog.addEventListener("click", (event) => {
  if (event.target === contactDialog) {
    const r = contactDialog.getBoundingClientRect();
    if (
      event.clientX < r.left ||
      event.clientX > r.right ||
      event.clientY < r.top ||
      event.clientY > r.bottom
    )
      contactDialog.close();
  }
});
document.querySelector("#copy-email").onclick = async () => {
  const status = document.querySelector(".copy-status");
  try {
    await navigator.clipboard.writeText("xboxgoldser@hotmail.com");
    status.textContent = "E-mail copiado!";
  } catch {
    status.textContent = "Selecione e copie: xboxgoldser@hotmail.com";
  }
};

const canvas = document.querySelector("canvas"),
  ctx = canvas.getContext("2d");
let width,
  height,
  time = 0,
  mouseX = 0,
  mouseY = 0,
  paused = matchMedia("(prefers-reduced-motion: reduce)").matches;
const motion = document.querySelector("#motion");
function updateButton() {
  motion.textContent = paused ? "Retomar animação" : "Pausar animação";
  motion.setAttribute("aria-pressed", String(paused));
}
updateButton();
motion.onclick = () => {
  paused = !paused;
  updateButton();
};
function resize() {
  const r = canvas.getBoundingClientRect();
  width = r.width;
  height = r.height;
  const d = Math.min(devicePixelRatio || 1, 2);
  canvas.width = width * d;
  canvas.height = height * d;
  ctx.setTransform(d, 0, 0, d, 0, 0);
}
window.addEventListener("resize", resize);
resize();
canvas.addEventListener("pointermove", (e) => {
  const r = canvas.getBoundingClientRect();
  mouseX = ((e.clientX - r.left) / r.width - 0.5) * 0.8;
  mouseY = ((e.clientY - r.top) / r.height - 0.5) * 0.6;
});
canvas.addEventListener("pointerleave", () => {
  mouseX = mouseY = 0;
});
// A shaded torus knot, projected from 3D points with surface normals and depth sorting.
const N = 170,
  M = 22,
  mesh = [];
function center(t) {
  return [
    (2 + 0.62 * Math.cos(3 * t)) * Math.cos(2 * t),
    (2 + 0.62 * Math.cos(3 * t)) * Math.sin(2 * t),
    0.86 * Math.sin(3 * t),
  ];
}
function norm(v) {
  const l = Math.hypot(...v);
  return v.map((x) => x / l);
}
function cross(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}
for (let i = 0; i < N; i++) {
  let t = (i / N) * Math.PI * 2,
    c = center(t),
    c2 = center(t + 0.001),
    tangent = norm(c2.map((v, k) => v - c[k])),
    a = norm(cross(tangent, [0, 0, 1])),
    b = norm(cross(tangent, a));
  let ring = [];
  for (let j = 0; j < M; j++) {
    let q = (j / M) * Math.PI * 2,
      n = a.map((v, k) => v * Math.cos(q) + b[k] * Math.sin(q));
    ring.push({ p: c.map((v, k) => v + n[k] * 0.49), n });
  }
  mesh.push(ring);
}
let angleX = 0.5,
  angleY = 0,
  last = 0;
function draw(stamp) {
  requestAnimationFrame(draw);
  let dt = Math.min((stamp - last) / 1000, 0.04);
  last = stamp;
  if (!paused) time += dt;
  angleX += (0.55 + mouseY - angleX) * 0.035;
  angleY += (mouseX - angleY) * 0.035;
  let az = time * 0.17 + angleY,
    ax = angleX,
    cz = Math.cos(az),
    sz = Math.sin(az),
    cx = Math.cos(ax),
    sx = Math.sin(ax);
  function rotate(p) {
    let x = p[0] * cz - p[1] * sz,
      y = p[0] * sz + p[1] * cz;
    return [x, y * cx - p[2] * sx, y * sx + p[2] * cx];
  }
  const scale = Math.min(width / 7.8, height / 7.7);
  let v = mesh.map((r) =>
    r.map((o) => {
      let p = rotate(o.p),
        n = rotate(o.n),
        persp = 8 / (8 - p[2]);
      return {
        x: width * 0.51 + p[0] * scale * persp,
        y: height * 0.48 + p[1] * scale * persp,
        z: p[2],
        n,
      };
    }),
  );
  ctx.clearRect(0, 0, width, height);
  let glow = ctx.createRadialGradient(
    width / 2,
    height * 0.55,
    0,
    width / 2,
    height * 0.55,
    width * 0.48,
  );
  glow.addColorStop(0, "#a7d85013");
  glow.addColorStop(1, "#a7d85000");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);
  ctx.save();
  ctx.translate(width * 0.51, height * 0.86);
  ctx.scale(1, 0.12);
  let shadow = ctx.createRadialGradient(0, 0, 0, 0, 0, width * 0.3);
  shadow.addColorStop(0, "#0009");
  shadow.addColorStop(1, "#0000");
  ctx.fillStyle = shadow;
  ctx.fillRect(-width / 2, -width / 2, width, width);
  ctx.restore();
  let faces = [];
  for (let i = 0; i < N; i++)
    for (let j = 0; j < M; j++) {
      let pts = [
          v[i][j],
          v[(i + 1) % N][j],
          v[(i + 1) % N][(j + 1) % M],
          v[i][(j + 1) % M],
        ],
        z = pts.reduce((s, p) => s + p.z, 0) / 4;
      faces.push({ pts, z });
    }
  faces.sort((a, b) => a.z - b.z);
  for (const f of faces) {
    let n = f.pts[0].n,
      light = Math.max(0, n[0] * -0.35 + n[1] * -0.5 + n[2] * 0.8),
      spec = Math.pow(
        Math.max(0, n[0] * -0.1 + n[1] * -0.55 + n[2] * 0.83),
        24,
      ),
      r = 46 + light * 125 + spec * 65,
      g = 65 + light * 145 + spec * 48,
      b = 19 + light * 65 + spec * 52;
    ctx.beginPath();
    f.pts.forEach((p, k) => (k ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
    ctx.closePath();
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fill();
    ctx.strokeStyle = `rgba(${r},${g},${b},.55)`;
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }
}
requestAnimationFrame(draw);
const observer = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    }),
  { threshold: 0.1 },
);
document.querySelectorAll(".reveal").forEach((e) => observer.observe(e));
