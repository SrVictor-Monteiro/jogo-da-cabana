// Digitação e caixa de texto
function typeText(containerText, containerChoices, text, callback = null) {
  // Limpa o texto atual e esconde os botões
  containerText.textContent = "";
  containerChoices.classList.add("hidden");

  let index = 0;
  const typing = setInterval(() => {
    // Adiciona uma letra por vez
    containerText.textContent += text.charAt(index);
    index++;

    // Quando o texto termina, para a animação e mostra os botões novamente
    if (index === text.length) {
      clearInterval(typing);
      containerChoices.classList.remove("hidden");
      if (callback) callback();
    }
  }, 1);
}
//regular para "30" quando acabar