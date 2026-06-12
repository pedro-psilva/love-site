// ░░ RÁDIO — Spotify IFrame API ░░
// Começa sempre em "Baby I'm Yours" e permite pular pela playlist.
const TRACKS = [
  { id: "0SzvmWfOhoxZVGrmvb56YL", name: "Baby I'm Yours", artist: "Arctic Monkeys" },
  { id: "2AT8iROs4FQueDv2c8q2KE", name: "R U Mine?",       artist: "Arctic Monkeys" },
  { id: "5XeFesFbtLpXzIVDNQP22n", name: "I Wanna Be Yours", artist: "Arctic Monkeys" }
];

let controller = null;
let current = 0;
let started = false;

const elTrack  = document.getElementById("radioTrack");
const elArtist = document.getElementById("radioArtist");
const btnPlay  = document.getElementById("btnPlay");
const btnPrev  = document.getElementById("btnPrev");
const btnNext  = document.getElementById("btnNext");
const radioEl  = document.getElementById("radio");

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
  syncMeta();
  if (!controller) return;
  controller.loadUri(`spotify:track:${TRACKS[current].id}`);
  if (autoplay) setTimeout(() => controller.play(), 350);
}

// Inicia a reprodução na 1ª interação do usuário (exigência dos navegadores).
function ensureStarted() {
  if (started || !controller) return false;
  started = true;
  controller.play();
  return true;
}

window.onSpotifyIframeApiReady = (IFrameAPI) => {
  const element = document.getElementById("spotify-embed");
  const options = {
    uri: `spotify:track:${TRACKS[0].id}`, // Baby I'm Yours
    width: "100%",
    height: 80
  };
  IFrameAPI.createController(element, options, (ctrl) => {
    controller = ctrl;
    ctrl.addListener("playback_update", (e) => {
      setPlayingUI(!e.data.isPaused);
    });
  });
};

btnPlay.addEventListener("click", () => {
  if (!ensureStarted() && controller) controller.togglePlay();
});
btnNext.addEventListener("click", () => { started = true; loadTrack(current + 1, true); });
btnPrev.addEventListener("click", () => { started = true; loadTrack(current - 1, true); });

["click", "keydown", "touchstart"].forEach((ev) =>
  document.addEventListener(ev, () => ensureStarted(), { passive: true })
);

// ░░ Waveform estilo AM (estática + reativa ao play) ░░
(function buildWave() {
  const wave = document.getElementById("wave");
  if (!wave) return;
  const N = 48;
  for (let i = 0; i < N; i++) {
    const bar = document.createElement("span");
    // perfil simétrico, pico no centro — lembra a capa do AM
    const t = i / (N - 1);
    const sym = 1 - Math.abs(t - 0.5) * 2;            // 0..1..0
    const jitter = 0.35 + 0.65 * Math.abs(Math.sin(i * 1.7));
    const h = 12 + sym * 60 * jitter + (i % 2 ? 6 : 0);
    bar.style.height = h.toFixed(0) + "px";
    bar.style.animationDelay = (i * 0.04).toFixed(2) + "s";
    wave.appendChild(bar);
  }
})();

syncMeta();
