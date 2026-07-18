// ==========================================================
// "OTHER PROJECTS" ro'yxati — shu massivga o'zgartirish kiritib,
// yangi loyiha qo'shishingiz yoki mavjudini tahrirlashingiz mumkin.
// ==========================================================
const PROJECTS = [
  {
    title: "Smart Office Monitoring System",
    description: "Ofis muhitidagi harorat, namlik va xavfsizlik parametrlarini masofadan kuzatish tizimi."
  },
  {
    title: "IoT Automation Projects",
    description: "Arduino va ESP32 asosidagi turli avtomatlashtirish tizimlari."
  },
  {
    title: "Embedded Systems",
    description: "Sensorlar, motorlar va boshqaruv modullaridan foydalanilgan amaliy elektronika loyihalari."
  },
  {
    title: "CAD Designs",
    description: "SolidWorks yordamida ishlab chiqilgan mexanik modellar va robot platformalari."
  }
];

function renderProjects() {
  const grid = document.getElementById("projectGrid");
  if (!grid) return;

  grid.innerHTML = PROJECTS.map((p) => `
    <article class="project-card">
      <span class="project-title">${p.title}</span>
      <p class="project-desc">${p.description}</p>
    </article>
  `).join("");

  observeReveal(grid.querySelectorAll(".project-card"), "visible");
}

// Umumiy fade-in kuzatuvchisi (sahifa yuklanganda va scroll paytida)
function observeReveal(elements, className = "visible") {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(className);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  elements.forEach((el) => io.observe(el));
}

function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

// 3D model mavjudligini tekshirish — models/afr.glb qo'yilgach
// bu funksiya avtomatik <model-viewer> ni ko'rsatadi.
function initModelViewer() {
  const wrap = document.getElementById("modelWrap");
  if (!wrap) return;
  const modelSrc = "models/afr.glb";

  fetch(modelSrc, { method: "HEAD" })
    .then((res) => {
      if (res.ok) {
        wrap.innerHTML = `
          <model-viewer src="${modelSrc}" alt="AFR robot 3D modeli"
            auto-rotate camera-controls shadow-intensity="1"
            style="width:100%;height:320px;">
          </model-viewer>`;
      }
    })
    .catch(() => { /* fayl topilmadi — placeholder qoladi */ });
}

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  setYear();
  initModelViewer();
  observeReveal(document.querySelectorAll(".reveal"), "visible");
});
