const storyText = document.getElementById("story-text");
const choices = document.getElementById("choices");

function continuarPara(proximaFuncao) {
  choices.innerHTML = "";
  const btnContinuar = document.createElement("button");
  btnContinuar.textContent = "Continuar";
  btnContinuar.onclick = proximaFuncao;
  choices.appendChild(btnContinuar);
}

// Game
function startGame() {
  document.getElementById("bg-music").play();
  resetarEstado();

  const textoInicial = `Você abre os olhos. A luz amarelada de uma lamparina pendurada ilumina um quarto velho e a poeira ofusca sua visão.

Está frio, e um vento congelante sopra por uma fresta na parede de madeira.
Mas sua dor de cabeça é tão forte que você mal consegue sentir outra coisa.

A última coisa de que você se lembra é do seu sétimo drink na noite passada 
- "Que drink foi aquele?".`;

  typeText(storyText, choices, textoInicial, () => {
    choices.innerHTML = "";

    const btnSentar = document.createElement("button");
    btnSentar.textContent = "Sentar-se";
    btnSentar.onclick = sentar;

    const btnCelular = document.createElement("button");
    btnCelular.textContent = "Pegar o celular";
    btnCelular.onclick = pegarCelular;

    choices.appendChild(btnSentar);
    choices.appendChild(btnCelular);
  });
}

function pegarCelular() {
  const texto = `Você busca nos bolsos da calça ou na cama, mas não encontra nada...`;

  typeText(storyText, choices, texto, () => {
    choices.innerHTML = "";

    const btnSentar = document.createElement("button");
    btnSentar.textContent = "Sentar-se";
    btnSentar.onclick = sentar;
    choices.appendChild(btnSentar);
  });
}

function sentar() {
  const texto = `Você se senta na beirada da cama, as tábuas rangendo sob o seu peso.

Você está zonzo, com sede e com medo — "Como eu vim parar aqui?!"

Do seu lado, há uma pequena mesa com um copo d'água e um bilhete embaixo.`;

  typeText(storyText, choices, texto, mostrarOpcoesMesa);
}

function mostrarOpcoesMesa() {
  choices.innerHTML = "";

  let algumaOpcao = false;

  if (!estado.pegouCopo) {
    const btnCopo = document.createElement("button");
    btnCopo.textContent = "Pegar copo";
    btnCopo.onclick = pegarCopo;
    choices.appendChild(btnCopo);
    algumaOpcao = true;
  }

  if (!estado.leuBilhete) {
    const btnBilhete = document.createElement("button");
    btnBilhete.textContent = "Pegar bilhete";
    btnBilhete.onclick = lerBilhete;
    choices.appendChild(btnBilhete);
    algumaOpcao = true;
  }

  if (!algumaOpcao) {
    continuarPara(cenaQuartoInicial);
  }
}

function pegarCopo() {
  estado.pegouCopo = true;

  const texto = `Você pega o copo. Sua boca está seca com um gosto amargo.
  A água parece limpa e não tem cheiro.`;

  typeText(storyText, choices, texto, () => {
    choices.innerHTML = "";

    const btnBeber = document.createElement("button");
    btnBeber.textContent = "Beber água";
    btnBeber.onclick = beberCopo;

    const btnManter = document.createElement("button");
    btnManter.textContent = "Manter copo na mesa";
    btnManter.onclick = manterCopo;

    const btnJogar = document.createElement("button");
    btnJogar.textContent = "Jogar água fora";
    btnJogar.onclick = jogarAguaFora;

    choices.appendChild(btnBeber);
    choices.appendChild(btnManter);
    choices.appendChild(btnJogar);
  });
}

function beberCopo() {
  const somMorteAgua = new Audio("audio/death-water.mp3");
  somMorteAgua.play();

  const texto = `Você leva o copo à boca e bebe tudo de uma vez só.
Por um momento, sente alívio... mas logo seu estômago queima, sua visão escurece.

Você não deveria ter confiado na aparência da água.

Fim de jogo.`;

  typeText(storyText, choices, texto, () => {
    choices.innerHTML = "";

    somMorteAgua.onended = () => {
      const btnRecomeçar = document.createElement("button");
      btnRecomeçar.textContent = "Recomeçar";
      btnRecomeçar.onclick = startGame;

      choices.appendChild(btnRecomeçar);
    };
  });
}

function manterCopo() {
  const texto = `Você decide deixar o copo na mesa.
- "Estou com sede mas não posso confiar..."`;

  typeText(storyText, choices, texto, () => {
    adicionarItem("copo com água");
    estado.temAgua = true;
    continuarPara(mostrarOpcoesMesa);
  });
}

function jogarAguaFora() {
  const texto = `Você despeja a água no chão.
- "Droga! Acham que sou besta!?"`;

  typeText(storyText, choices, texto, () => {
    estado.copoJogadoFora = true;
    continuarPara(mostrarOpcoesMesa);
  });
}

function lerBilhete() {
  estado.leuBilhete = true;
  adicionarItem("Bilhete");

  const somBilhete = new Audio("audio/bilhete.mp3");
  somBilhete.play();

  const texto = `
"Olá, John.

Soube que se divertiu bastante na noite passada...
Nem percebeu o que eu coloquei na sua bebida.

Você realmente não mudou. Nem me reconheceu.

Espero que ainda esteja vivo o suficiente pra ler isso.
Você me matou aos poucos — agora será a sua vez.

Ou prove que merece sua vida medíocre e sofra o que te falta sofrer."

- "Que porra é essa?? Sofrer por quê? Por quem? O que eu fiz, caralho?
A letra é familiar, mas o nome..."

-"Vou guardar comigo."`;

  typeText(storyText, choices, texto, mostrarOpcoesMesa);
}

function cenaQuartoInicial() {
  const texto = `
Você respira fundo e observa o quarto.
Uma porta a esquerda, uma janela de madeira a frente.
Encostado à parede, há um filtro azul de água preso por correntes, sua tampa virada para baixo.

-"Posso beber dali?"`;

  typeText(storyText, choices, texto, mostrarOpcoesBarrilPrimeiro);
}

function mostrarOpcoesBarrilPrimeiro() {
  choices.innerHTML = "";

  const btnBarril = document.createElement("button");
  btnBarril.textContent = "Examinar o barril";
  btnBarril.onclick = abrirBarril;
  choices.appendChild(btnBarril);
}

function abrirBarril() {
  const texto = `
Você se aproxima do barril com a boca seca. 
Força a tampa... mas o cheiro que invade o ar não é de água... é gasolina.

O líquido escorre pelo chão e forma uma poça, brilhando à luz da lamparina.
Você ouve algo cair junto do líquido escorrendo.`;

  typeText(storyText, choices, texto, mostrarOpcoesQuartoPosBarril);
}

function mostrarOpcoesQuartoPosBarril() {
  choices.innerHTML = "";

  const btnPorta = document.createElement("button");
  btnPorta.textContent = "Tentar abrir a porta";
  btnPorta.onclick = () => {
    if (!estado.chavePegou) {
      typeText(storyText, choices, "A porta está trancada. Precisa de uma chave.", mostrarOpcoesQuartoPosBarril);
    } else {
      abrirPortaQuartoComChave();
    }
  };
  choices.appendChild(btnPorta);

  const btnJanela = document.createElement("button");
  btnJanela.textContent = "Tentar abrir a janela";
  btnJanela.onclick = () => {
    typeText(storyText, choices, "A janela está trancada e não cede. Precisa de algo para forçar.", mostrarOpcoesQuartoPosBarril);
  };
  choices.appendChild(btnJanela);

  const btnBarril = document.createElement("button");
  btnBarril.textContent = "Examinar o barril";
  btnBarril.onclick = () => {
    typeText(storyText, choices, "O barril está vazio agora, só o cheiro forte de gasolina permanece.", mostrarOpcoesQuartoPosBarril);
  };
  choices.appendChild(btnBarril);

  if (!estado.pegouChaveGasolina) {
    const btnGasolina = document.createElement("button");
    btnGasolina.textContent = "Examinar a poça de gasolina";
    btnGasolina.onclick = pegarChaveDebaixoDaCama;
    choices.appendChild(btnGasolina);
  }
}

function pegarChaveDebaixoDaCama() {
  estado.chavePegou = true;
  estado.pegouChaveGasolina = true;
  adicionarItem("Chave enferrujada");
  typeText(storyText, choices, "Você se ajoelha e alcança a chave que escorreu para debaixo da cama.", mostrarOpcoesQuartoPosBarril);
}

function abrirPortaQuartoComChave() {
  const somPorta = new Audio("audio/bedroom-door.mp3");
  const somLampada = new Audio("audio/lamp-fall.mp3");
  const somFogo = new Audio("audio/fire.mp3");

  somPorta.play();

  typeText(storyText, choices, `
Você gira a chave na fechadura e empurra a porta...
Mas um mecanismo escondido faz a lamparina pendurada cair sobre a cama. O fogo se espalha rapidamente!

- "Preciso apagar antes de atingir a gasolina!!!"
  `, () => {
    somLampada.play();
    setTimeout(() => {
      somFogo.play();
    }, 1000);

    choices.innerHTML = ""; // limpa as opções

    if (estado.temAgua && !estado.copoJogadoFora) {
      const btnUsarAgua = document.createElement("button");
      btnUsarAgua.textContent = "Usar água do copo para apagar o fogo";
      btnUsarAgua.onclick = () => apagarFogo(mostrarOpcoesQuartoPosBarril); // Passa a próxima cena
      choices.appendChild(btnUsarAgua);

      const btnNaoUsar = document.createElement("button");
      btnNaoUsar.textContent = "Apagar com as mãos";
      btnNaoUsar.onclick = () => morteFogo();
      choices.appendChild(btnNaoUsar);
    } else {
      const btnApagarMaos = document.createElement("button");
      btnApagarMaos.textContent = "Apagar com as mãos";
      btnApagarMaos.onclick = () => morteFogo();
      choices.appendChild(btnApagarMaos);
    }
  });
}

function apagarFogo() {
  typeText(storyText, choices, `
Você joga a água do copo sobre as chamas no lençol, enquanto abafa com as mãos o restante. 
Você apaga o fogo antes de se alastrar, mas suas mãos estão machucadas.
-"Meu Deus... querem mesmo me matar!"`, mostrarOpcaoDescerEscadas);
}

function mostrarOpcaoDescerEscadas() {
  choices.innerHTML = "";

  const btnDescer = document.createElement("button");
  btnDescer.textContent = "Descer escadas";
  btnDescer.onclick = descerEscadas;

  choices.appendChild(btnDescer);
}

function morteFogo() {
  const somGrito = new Audio("audio/scream-fear.mp3");
  somGrito.play();

  const texto = `
Você queima suas mãos sem sucesso...
As chamas tomam o quarto em segundos ao atingir a gasolina.

Fim de jogo.`;
  typeText(storyText, choices, texto, () => {
    choices.innerHTML = "";
    const btnRecomecar = document.createElement("button");
    btnRecomecar.textContent = "Recomeçar";
    btnRecomecar.onclick = startGame;
    choices.appendChild(btnRecomecar);
  });
}

// Sala de estar
function descerEscadas() {
  //som escada
  const somEscadas = new Audio("audio/stairs.mp3");
  somEscadas.play();

  //texto ao descer
  const texto = `
  Você desce a escada cuidadosamente. 
  O som dos seus passos ecoa pela cabana, mas finalmente você chega à sala de estar. 
  A luz é fraca, e o ar sombrio do ambiente te arrepia.
  `;

  // ao terminar audio
  somEscadas.onended = () => {
    typeText(storyText, choices, texto, mostrarOpcoesSalaEstar);
  };
}

function mostrarOpcoesSalaEstar() {
  choices.innerHTML = "";

  const btnOlharSala = document.createElement("button");
  btnOlharSala.textContent = "Olhar ao redor";
  btnOlharSala.onclick = () => {
    typeText(storyText, choices, "Você olha ao redor da sala de estar, mas nada se destaca por enquanto.", mostrarOpcoesSalaEstar);
  };
  choices.appendChild(btnOlharSala);

  // Botão para voltar ao andar de cima (quarto)
  const btnAndarCima = document.createElement("button");
  btnAndarCima.textContent = "Voltar para o andar de cima";
  btnAndarCima.onclick = () => {
    subirEscadasParaQuarto(); // retorna para a cena do quarto
  };
  choices.appendChild(btnAndarCima);
}

function subirEscadasParaQuarto() {
  // som de escadas
  const somEscadas = new Audio("audio/stairs.mp3");
  somEscadas.play();

  const texto = `
Você volta ao andar de cima. 
Está escuro, mas uma luz pela janela ilumina parcialmente a cama queimada. 
O cheiro de gasolina ainda persiste no ar.
  `;

  // espera o áudio terminar antes de mostrar o texto
  somEscadas.onended = () => {
    typeText(storyText, choices, texto, mostrarOpcoesJanela);
  };
}


function mostrarOpcoesJanela() {
  choices.innerHTML = "";

  // Botão para observar a janela
  const btnObservarJanela = document.createElement("button");
  btnObservarJanela.textContent = "Observar a janela";
  btnObservarJanela.onclick = () => {
    const textoJanela = `
Você se aproxima da janela. 
Ela está emperrada; a madeira inchou com a umidade e a ferrugem travou as dobradiças. 
É impossível abrir sem algum tipo de ferramenta para forçar a abertura.
    `;
    typeText(storyText, choices, textoJanela, mostrarOpcoesJanela);
  };
  choices.appendChild(btnObservarJanela);

  // Botão para retornar ao andar de baixo
  const btnVoltarAndarBaixo = document.createElement("button");
  btnVoltarAndarBaixo.textContent = "Voltar para a sala de estar";
  btnVoltarAndarBaixo.onclick = descerEscadas; // ou outra função que retorna à sala
  choices.appendChild(btnVoltarAndarBaixo);
}
