const startDate = new Date("2020-10-10T00:00:00");

function updateCounter() {
  const now = new Date();
  const diffTime = now - startDate;

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffTime / (1000 * 60 * 60)) % 24);
  const diffMinutes = Math.floor((diffTime / (1000 * 60)) % 60);
  const diffSeconds = Math.floor((diffTime / 1000) % 60);

  document.getElementById("daysTogether").textContent =
    `${diffDays} dias, ${String(diffHours).padStart(2, '0')}h ${String(diffMinutes).padStart(2, '0')}min ${String(diffSeconds).padStart(2, '0')}s`;
}

setInterval(updateCounter, 1000);
updateCounter();

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
