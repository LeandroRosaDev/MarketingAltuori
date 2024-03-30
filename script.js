document.addEventListener("DOMContentLoaded", function () {
  var display = document.querySelector("#tempo");

  // Calcula a data de término como um timestamp (milissegundos desde a época do Unix)
  var agora = new Date().getTime();
  var tresDiasEmMilissegundos = 12 * 24 * 60 * 60 * 1000;
  var dataTerminoPromocao = agora + tresDiasEmMilissegundos;

  // Recupera a data de término do localStorage ou define se não existir
  var dataTerminoSalva = localStorage.getItem("dataTermino");
  if (!dataTerminoSalva) {
    localStorage.setItem("dataTermino", dataTerminoPromocao.toString());
  } else {
    // Usa a data salva se já existir
    dataTerminoPromocao = parseInt(dataTerminoSalva, 10);
  }

  // Inicia o cronômetro com a data de término
  iniciarCronometro(dataTerminoPromocao, display);
});

function iniciarCronometro(dataTermino, display) {
  var intervalo = setInterval(function () {
    var agora = new Date().getTime();
    var distancia = dataTermino - agora;

    // Calcula dias, horas, minutos e segundos
    var dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    var horas = Math.floor(
      (distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    var segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    // Formata o tempo para exibir com dois dígitos
    dias = dias < 10 ? "0" + dias : dias;
    horas = horas < 10 ? "0" + horas : horas;
    minutos = minutos < 10 ? "0" + minutos : minutos;
    segundos = segundos < 10 ? "0" + segundos : segundos;

    // Exibe o tempo
    display.textContent =
      dias + " Dias " + horas + ":" + minutos + ":" + segundos;

    // Verifica se o cronômetro chegou a zero
    if (distancia < 0) {
      clearInterval(intervalo);
      display.textContent = " 00:00:00:00";
      localStorage.removeItem("dataTermino"); // Limpa o armazenamento local após o término
    }
  }, 1000);
}

// AQUI É O JAVASCRIPT DO MENU RESPONSIVO

var abrirMenu = document.querySelector(".menuSeta");
var fecharMenu = document.querySelector(".menuFechar");
var navToSection = document.querySelectorAll(".menuLinks");

abrirMenu.addEventListener("click", () => {
  abrirMenu.style.display = "none";
  fecharMenu.style.display = "block";
  (document.querySelector(".menuResponsivo").style.width = "100%"),
    (document.querySelector(".menuSidebar").style.display = "flex");
});
fecharMenu.addEventListener("click", () => {
  fecharMenu.style.display = "none";
  abrirMenu.style.display = "block";
  (document.querySelector(".menuResponsivo").style.width = "0%"),
    (document.querySelector(".menuSidebar").style.display = "none");
});
navToSection.forEach(function (link) {
  link.addEventListener("click", () => {
    fecharMenu.style.display = "none";
    abrirMenu.style.display = "block";
    (document.querySelector(".menuResponsivo").style.width = "0%"),
      (document.querySelector(".menuSidebar").style.display = "none");
  });
});
