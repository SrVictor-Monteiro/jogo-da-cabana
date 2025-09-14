let estado;

function resetarEstado() {
  estado = {
    // Inventário e interações
    pegouCopo: false,
    temAgua: false,
    copoJogadoFora: false,
    leuBilhete: false,

    // Progressão da cena
    chavePegou: false,          // Pegou a chave da porta
    pegouChaveGasolina: false,  // Pegou a chave que estava na gasolina
  };
}

function adicionarItem(item) {
  console.log("Item adicionado ao inventário:", item);
}
