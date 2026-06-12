const startDate = new Date("2020-10-10T00:00:00");

function set(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function updateCounter() {
  const now = new Date();

  let years   = now.getFullYear() - startDate.getFullYear();
  let months  = now.getMonth()    - startDate.getMonth();
  let days    = now.getDate()     - startDate.getDate();
  let hours   = now.getHours()    - startDate.getHours();
  let minutes = now.getMinutes()  - startDate.getMinutes();
  let seconds = now.getSeconds()  - startDate.getSeconds();

  if (seconds < 0) { seconds += 60; minutes--; }
  if (minutes < 0) { minutes += 60; hours--; }
  if (hours   < 0) { hours   += 24; days--; }
  if (days    < 0) {
    // dias do mês anterior
    const prevMonthDays = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    days += prevMonthDays;
    months--;
  }
  if (months  < 0) { months += 12; years--; }

  set("cntAnos",  years);
  set("cntMeses", months);
  set("cntDias",  days);
  set("cntHoras", String(hours).padStart(2, "0"));
  set("cntMin",   String(minutes).padStart(2, "0"));
  set("cntSeg",   String(seconds).padStart(2, "0"));
}

setInterval(updateCounter, 1000);
updateCounter();

// ░░ Botão "mandar um beijo" — explosão de corações (clichê on) ░░
const kissBtn = document.getElementById("kissBtn");
if (kissBtn) {
  const EMOJIS = ["❤️", "😘", "💋", "💕", "💖", "🥰"];
  kissBtn.addEventListener("click", () => {
    const rect = kissBtn.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;
    for (let i = 0; i < 18; i++) {
      const k = document.createElement("span");
      k.className = "kiss-burst";
      k.textContent = EMOJIS[i % EMOJIS.length];
      k.style.left = originX + "px";
      k.style.top = originY + "px";
      const angle = Math.random() * Math.PI * 2;
      const dist = 60 + Math.random() * 140;
      k.style.setProperty("--dx", Math.cos(angle) * dist + "px");
      k.style.setProperty("--dy", (Math.sin(angle) * dist - 80) + "px");
      k.style.fontSize = (16 + Math.random() * 18) + "px";
      document.body.appendChild(k);
      setTimeout(() => k.remove(), 1300);
    }
  });
}

const frases = [
  "“I wanna be yours” — e sou.",
  "Baby, I'm yours.",
  "R U mine? Sempre.",
  "Você é a minha trilha sonora.",
  "505 quilômetros ou nenhum: é você.",
  "Do nosso jeito, fora do tom.",
  "Meu lugar favorito é do seu lado.",
  "A gente combina como vinil e agulha.",
  "Te amo no volume máximo.",
  "Pedro & Amanda — sem refrão pra acabar."
];

const slideContainer = document.getElementById("slideContainer");
const caption = document.getElementById("caption");

let slideIndex = 0;
let autoSlideActive = true;
const slides = [];

const midias = [
  "20240705_224556.jpg",
  "20240706_204801.jpg",
  "20240706_205025.jpg",
  "20240721_150131.jpg",
  "20240824_152552(0).jpg",
  "20240831_225659.jpg",
  "20250914_153319.jpg",
  "20251012_152052.jpg",
  "20251024_181122.jpg",
  "20251115_155839.jpg",
  "20251115_155845.jpg",
  "20251207_143724.jpg",
  "20251227_222139.jpg",
  "20260109_203208.jpg",
  "20260210_155855.mp4",
  "20260315_164807.jpg",
  "20260420_134312(0).jpg",
  "20260606_161625.jpg",
  "IMG-20201229-WA0103.jpeg",
  "IMG-20211222-WA0018.jpg",
  "IMG-20211222-WA0026.jpg",
  "IMG-20211222-WA0029.jpg",
  "IMG-20211222-WA0058.jpg",
  "IMG-20211222-WA0064.jpg",
  "IMG-20220108-WA0094.jpg",
  "IMG-20220108-WA0097.jpg",
  "IMG-20220212-WA0073.jpg",
  "IMG-20220227-WA0065.jpeg",
  "IMG_20210522_185703.jpg",
  "IMG_20211128_200656.jpg",
  "IMG_20211210_190429.jpg",
  "IMG_20211210_190541.jpg",
  "IMG_20211224_222100.jpg",
  "IMG_20220304_232120.jpg",
  "IMG_20220304_232134.jpg",
  "IMG_20220807_155402.jpg",
  "IMG_20221001_222055.jpg",
  "IMG_20221001_222103.jpg",
  "IMG_20231112_204240.jpg",
  "Screenshot_20260311_094816_WhatsApp.jpg"
];

for (const nome of midias) {
  const ehVideo = nome.toLowerCase().endsWith(".mp4");
  const el = document.createElement(ehVideo ? "video" : "img");
  el.src = `assets/fotos/${encodeURIComponent(nome)}`;
  el.className = "slide";
  el.style.display = "none";
  el.style.cursor = "pointer";

  if (ehVideo) {
    el.muted = true;
    el.loop = true;
    el.playsInline = true;
    el.setAttribute("controls", "");
  }

  el.addEventListener("click", () => {
    autoSlideActive = false;
  });

  slideContainer.appendChild(el);
  slides.push(el);
}

function showSlide(n) {
  slides.forEach(slide => {
    slide.style.display = "none";
    if (slide.tagName === "VIDEO") slide.pause();
  });
  slides[n].style.display = "block";
  if (slides[n].tagName === "VIDEO") slides[n].play().catch(() => {});
  caption.innerText = frases[n % frases.length];
}

function changeSlide(n) {
  autoSlideActive = false; // clicou nas setas -> modo manual
  slideIndex += n;
  if (slideIndex >= slides.length) slideIndex = 0;
  if (slideIndex < 0) slideIndex = slides.length - 1;
  showSlide(slideIndex);
}

function autoSlide() {
  if (autoSlideActive) {
    slideIndex++;
    if (slideIndex >= slides.length) slideIndex = 0;
    showSlide(slideIndex);
  }
  setTimeout(autoSlide, 3000);
}

showSlide(slideIndex);
setTimeout(autoSlide, 3000);
