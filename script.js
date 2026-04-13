// Reveal sections on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));


// Dark mode toggle
const themeBtn = document.getElementById("theme-toggle");
const storedTheme = localStorage.getItem("theme");
if (storedTheme === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
  if (themeBtn) themeBtn.textContent = "☀️";
}
themeBtn?.addEventListener("click", () => {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  if (isDark) {
    document.documentElement.removeAttribute("data-theme");
    themeBtn.textContent = "🌙";
    localStorage.setItem("theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    themeBtn.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  }
});


// Nav border on scroll + bridge parallax
const nav = document.querySelector(".nav");
const bridge = document.querySelector(".bridge");
let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const y = window.scrollY;
      nav.classList.toggle("scrolled", y > 20);
      if (bridge && y < window.innerHeight) {
        bridge.style.transform = `translateY(${y * 0.25}px)`;
      }
      ticking = false;
    });
    ticking = true;
  }
});


// 3D tilt on hover
const tiltCards = document.querySelectorAll(".tilt");
const MAX_TILT = 8;

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotY = (x - 0.5) * 2 * MAX_TILT;
    const rotX = -(y - 0.5) * 2 * MAX_TILT;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});
