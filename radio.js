// ░░ RÁDIO — player de áudio local (toca a música COMPLETA) ░░
// Coloque os arquivos .mp3 na pasta /musicas com EXATAMENTE estes nomes:
const TRACKS = [
  { src: "musicas/baby-im-yours.mp3",   name: "Baby I'm Yours",  artist: "Arctic Monkeys" },
  { src: "musicas/r-u-mine.mp3",        name: "R U Mine?",       artist: "Arctic Monkeys" },
  { src: "musicas/i-wanna-be-yours.mp3", name: "I Wanna Be Yours", artist: "Arctic Monkeys" }
];

const audio = new Audio();
audio.preload = "metadata";
let current = 0;
let started = false;

const elTrack    = document.getElementById("radioTrack");
const elArtist   = document.getElementById("radioArtist");
const btnPlay    = document.getElementById("btnPlay");
const btnPrev    = document.getElementById("btnPrev");
const btnNext    = document.getElementById("btnNext");
const radioEl    = document.getElementById("radio");
const progress   = document.getElementById("progress");
const progressFl = document.getElementById("progressFill");

function syncMeta() {
  elTrack.textContent  = TRACKS[current].name;
  elArtist.textContent = TRACKS[current].artist;
}

function setPlayingUI(playing) {
  btnPlay.innerHTML = playing ? "&#10073;&#10073;" : "&#9654;"; // ❚❚ / ▶
  radioEl.classList.toggle("is-playing", playing);
  document.body.classList.toggle("playing", playing);
}

function loadTrack(index, autoplay) {
  current = (index + TRACKS.length) % TRACKS.length;
  audio.src = TRACKS[current].src;
  syncMeta();
  if (autoplay) audio.play().catch(() => {});
}

// Toca na 1ª interação do usuário (exigência dos navegadores).
function ensureStarted() {
  if (started) return false;
  started = true;
  if (!audio.src) audio.src = TRACKS[current].src;
  audio.play().catch(() => {});
  return true;
}

audio.addEventListener("play",  () => setPlayingUI(true));
audio.addEventListener("pause", () => setPlayingUI(false));
audio.addEventListener("ended", () => loadTrack(current + 1, true)); // toca a próxima
audio.addEventListener("error", () => {
  elArtist.textContent = "coloque o .mp3 em /musicas";
});
audio.addEventListener("timeupdate", () => {
  const pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
  progressFl.style.width = pct + "%";
});

btnPlay.addEventListener("click", () => {
  if (ensureStarted()) return;
  if (audio.paused) audio.play().catch(() => {});
  else audio.pause();
});
btnNext.addEventListener("click", () => { started = true; loadTrack(current + 1, true); });
btnPrev.addEventListener("click", () => {
  started = true;
  // se passou de 3s, volta pro início da faixa; senão vai pra anterior
  if (audio.currentTime > 3) { audio.currentTime = 0; audio.play().catch(() => {}); }
  else loadTrack(current - 1, true);
});

// clicar na barra para avançar/retroceder
progress.addEventListener("click", (e) => {
  if (!audio.duration) return;
  const rect = progress.getBoundingClientRect();
  audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
});

["click", "keydown", "touchstart"].forEach((ev) =>
  document.addEventListener(ev, () => ensureStarted(), { passive: true })
);

// pré-carrega a 1ª faixa (Baby I'm Yours)
audio.src = TRACKS[0].src;
syncMeta();

// ░░ Waveform estilo AM (estática + reativa ao play) ░░
(function buildWave() {
  const wave = document.getElementById("wave");
  if (!wave) return;
  const N = 48;
  for (let i = 0; i < N; i++) {
    const bar = document.createElement("span");
    const t = i / (N - 1);
    const sym = 1 - Math.abs(t - 0.5) * 2;
    const jitter = 0.35 + 0.65 * Math.abs(Math.sin(i * 1.7));
    const h = 12 + sym * 60 * jitter + (i % 2 ? 6 : 0);
    bar.style.height = h.toFixed(0) + "px";
    bar.style.animationDelay = (i * 0.04).toFixed(2) + "s";
    wave.appendChild(bar);
  }
})();

// ░░ Chuva de corações (sutil) ░░
(function buildHearts() {
  const layer = document.getElementById("hearts");
  if (!layer) return;
  const N = 16;
  for (let i = 0; i < N; i++) {
    const h = document.createElement("span");
    h.className = "heart";
    h.textContent = "♥";
    h.style.left = (Math.random() * 100).toFixed(2) + "%";
    h.style.fontSize = (10 + Math.random() * 22).toFixed(0) + "px";
    h.style.animationDuration = (9 + Math.random() * 11).toFixed(1) + "s";
    h.style.animationDelay = (-Math.random() * 18).toFixed(1) + "s";
    h.style.opacity = (0.05 + Math.random() * 0.12).toFixed(2);
    layer.appendChild(h);
  }
})();
