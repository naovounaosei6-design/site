/* ==========================================================
   GRUPO POTENCIAL — script.js
   ========================================================== */

// --- Mobile menu --
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => nav.classList.toggle("open"));
  nav.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => nav.classList.remove("open"))
  );
}

// --- Scroll reveal ---
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(
  ".section-header, .card, .feature, .step, .segment, .testimonial," +
  ".form-container, .info-graphic, .stat"
).forEach(el => {
  el.classList.add("reveal");
  io.observe(el);
});

// --- Form validation + fake submit ---
const form = document.getElementById("briefingForm");
const feedback = document.getElementById("formFeedback");

if (form && feedback) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    feedback.className = "form-feedback";

    const data = new FormData(form);
    const required = ["nome", "empresa", "email", "telefone", "linha", "quantidade"];
    const missing = required.filter(k => !String(data.get(k) || "").trim());

    if (missing.length) {
      feedback.textContent = "Preencha todos os campos obrigatórios.";
      feedback.classList.add("error");
      return;
    }

    const email = String(data.get("email"));
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      feedback.textContent = "E-mail inválido.";
      feedback.classList.add("error");
      return;
    }

    const qty = Number(data.get("quantidade"));
    if (!Number.isFinite(qty) || qty < 100) {
      feedback.textContent = "Lote mínimo de 100 unidades.";
      feedback.classList.add("error");
      return;
    }

    // Backend real: trocar este bloco por fetch("/api/briefing", { ... })
    feedback.textContent = "Briefing recebido. Nossa engenharia têxtil responde em até 24h.";
    feedback.classList.add("success");
    form.reset();
  });
}

// --- Placeholder images: gradientes por linha até você colocar as fotos reais ---
const imageMaps = {
  corporate: "linear-gradient(135deg, #1E3A8A, #0D1A30)",
  sports: "linear-gradient(135deg, #D81B60, #7C0A35)",
  ppe: "linear-gradient(135deg, #B45309, #7C2D12)",
  promo: "linear-gradient(135deg, #0891B2, #0E7490)",
  school: "linear-gradient(135deg, #15803D, #14532D)",
  health: "linear-gradient(135deg, #7E22CE, #4C1D95)"
};

document.querySelectorAll(".card-image").forEach(el => {
  const key = el.getAttribute("data-img");
  if (key && imageMaps[key]) el.style.background = imageMaps[key];
});

// --- Smooth anchor offset (header sticky) ---
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.pageYOffset - 100;
    window.scrollTo({ top, behavior: "smooth" });
  });
});
