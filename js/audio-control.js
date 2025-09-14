document.addEventListener("DOMContentLoaded", () => {
  const btnMute = document.getElementById("audio-toggle");
  const bgMusic = document.getElementById("bg-music");

  // Inicializa música com volume reduzido em 40%
  bgMusic.volume = 0.6; // 60% do volume total

  // Estado do mute
  let isMuted = false;

  // Função para alternar mute
  btnMute.addEventListener("click", () => {
    isMuted = !isMuted;      // alterna entre true e false
    bgMusic.muted = isMuted; // ativa ou desativa o mute
  });
});
