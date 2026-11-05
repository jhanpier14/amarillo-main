const audio = document.querySelector("#background-audio");
const musicToggle = document.querySelector("#music-toggle");
const musicStatus = document.querySelector("#music-status");
const loveMessage = document.querySelector("#love-message");

const lovePhrases = [
  "Tu sonrisa ilumina mis días ✨",
  "Contigo todo florece 🌷",
  "Eres mi lugar favorito ❤️",
  "Cada día te quiero más 💖",
  "Tu corazón hace más bonito el mundo 💕",
  "Eres la flor más hermosa de mi jardín 🌹",
  "A tu lado, todo es más bonito ✨",
  "Mi cariño por ti no deja de crecer 💛"
];

let phraseIndex = 0;
let lastPhraseTime = 0;
let phraseTimeout;

function updateMusicControls() {
  const isPlaying = !audio.paused;
  musicToggle.textContent = isPlaying ? "Pausar música" : "Activar música";
  musicToggle.setAttribute("aria-pressed", String(isPlaying));
  musicStatus.textContent = isPlaying
    ? "♪ Reproduciendo"
    : "Música en pausa. Toca el botón para escucharla.";
}

async function playMusic() {
  try {
    await audio.play();
    updateMusicControls();
  } catch (error) {
    if (error.name === "NotAllowedError") {
      musicStatus.textContent =
        "Tu navegador bloquea el inicio automático. Toca el botón para escucharla.";
    } else {
      musicStatus.textContent =
        "No se pudo iniciar la música. Revisa tu conexión y el volumen del dispositivo.";
      console.error("No se pudo reproducir la música:", error);
    }
  }
}

function showLovePhrase() {
  const now = Date.now();
  if (now - lastPhraseTime < 1800) return;

  lastPhraseTime = now;
  loveMessage.textContent = lovePhrases[phraseIndex];
  phraseIndex = (phraseIndex + 1) % lovePhrases.length;
  loveMessage.classList.add("is-visible");

  window.clearTimeout(phraseTimeout);
  phraseTimeout = window.setTimeout(() => {
    loveMessage.classList.remove("is-visible");
  }, 1700);
}

document.body.classList.remove("container");

musicToggle.addEventListener("click", () => {
  if (audio.paused) {
    playMusic();
  } else {
    audio.pause();
    updateMusicControls();
  }
});

audio.addEventListener("play", updateMusicControls);
audio.addEventListener("pause", updateMusicControls);

document.querySelectorAll(".bubble").forEach((bubble) => {
  bubble.addEventListener("animationstart", (event) => {
    if (event.target === bubble && event.animationName === "love-burst") {
      showLovePhrase();
    }
  });
  bubble.addEventListener("animationiteration", (event) => {
    if (event.target === bubble && event.animationName === "love-burst") {
      showLovePhrase();
    }
  });
});

updateMusicControls();
playMusic();