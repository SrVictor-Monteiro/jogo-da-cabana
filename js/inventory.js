const btnInventario = document.getElementById("btnInventario");
const inventarioBox = document.getElementById("inventarioBox");
const listaInventario = document.getElementById("listaInventario");
const popup = document.getElementById("popup");
const popupTexto = document.getElementById("popupTexto");
const fecharPopup = document.getElementById("fecharPopup");


let inventario = [];

function adicionarItem(item) {
  if (!inventario.includes(item)) {
    inventario.push(item);
  }
}

//função para atualizar a lista de intens visiveis no inventario
function atualizarInventario(){
  listaInventario.innerHTML = ""; //limpa a lista
  
  //Se o inventario estiver vazio mostra a mensagem
  if (inventario.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Inventário vazio";
    listaInventario.appendChild(li);
    return;
  }

//cria um <li> e adiciona a lista, para cada item no inventario
inventario.forEach(item => {
  const li = document.createElement("li");
  li.textContent = item;

  //quando o usuario clicar em um item mostra descricao
  li.onclick = () => {
    popupTexto.textContent = getDescricaoItem(item);
    popup.classList.remove("hidden");
  };
  
  listaInventario.appendChild(li);
});
}

//Funcao que retorna a descricao de cada item
function getDescricaoItem(item) {
  switch(item) {
    case "Bilhete":
      return `Olá, John.

Soube que se divertiu bastante na noite passada...
Nem percebeu o que eu coloquei na sua bebida.

Você realmente não mudou. Nem me reconheceu.

Espero que ainda esteja vivo o suficiente pra ler isso.
Você me matou aos poucos — agora será a sua vez.

Ou prove que merece sua vida medíocre e sofra o que te falta sofrer.`;
    default:
      return "Um item misterioso.";
  }
}

//Mostra ou esconde inventario
btnInventario.addEventListener("click", () => {
  inventarioBox.classList.toggle("hidden");

  atualizarInventario();
})

//Pop-up
// botão de fechar
fecharPopup.onclick = () => {
  popup.classList.add("hidden");
};