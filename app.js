let numeroSecreto = 0;
let intentos = 0;
let listaNumeros = [];
let numeroMaximo = 10;
let limiteJuego = 25;

function asignarTextoElemento(elemento, texto) {
  let elementoHTML = document.querySelector(elemento);
  elementoHTML.innerHTML = texto;
}

function crearNumeroAleatorio() {
  let numeroGenerado = parseInt(Math.random() * numeroMaximo) + 1;

  if (listaNumeros.length == numeroMaximo) {
    asignarTextoElemento("p", "Ya tocaron todos los numeros posibles");
  } else {
    if (listaNumeros.includes(numeroGenerado)) {
      return crearNumeroAleatorio();
    } else {
      listaNumeros.push(numeroGenerado);
      return numeroGenerado;
    }
  }
}

function aplicarHover(idElemento, colorHover, colorOriginal) {
  const elem = document.getElementById(idElemento);

  if (!elem) {
    console.warn(`Elemento con id "${idElemento}" no encontrado.`);
    return;
  }

  elem.addEventListener("mouseenter", () => {
    elem.style.backgroundColor = colorHover;
  });

  elem.addEventListener("mouseleave", () => {
    elem.style.backgroundColor = colorOriginal;
  });
}

aplicarHover("reiniciar", "#9ca2afff", "#6b7280");
aplicarHover("intentar", "#3671f1ff", "#1253dfff");

function verificarIntento() {
  let numeroUsuario = parseInt(document.getElementById("valorUsuario").value);
  if (numeroUsuario === "" || isNaN(numeroUsuario)) {
    // No hacer nada, o mostrar mensaje de error
    asignarTextoElemento("p", "Por favor asigne un número valido.");
    return; // Salir sin seguir
  }

  if (numeroUsuario < numeroSecreto) {
    mostrarPista("¡Muy bajo, subí!", "error");
  } else if (numeroUsuario > numeroSecreto) {
    mostrarPista("¡Muy alto, bajá!", "error");
  } else {
    mostrarPista(
      `¡Adivinaste el número en ${intentos} ${
        intentos == 1 ? "intento" : "intentos"
      }! `,
      "acierto"
    );
    document.getElementById("reiniciar").removeAttribute("disabled");
    aplicarHover("reiniciar", "#3671f1ff", "#1253dfff");

    const contenedorInput = document.querySelector(".container__input");
    const contenedorIntentar = document.querySelector(".container__boton");

    contenedorInput.style.display = "none";
    contenedorIntentar.style.display = "none";
  }
  intentos++;
  limpiarCaja();
}

function limpiarCaja() {
  document.querySelector("#valorUsuario").value = "";
}

function condicionesIniciales() {
  asignarTextoElemento("h1", "Adivina!");
  asignarTextoElemento("p", `Ingrese un número del 1 al ${numeroMaximo} `);
  numeroSecreto = crearNumeroAleatorio();
  intentos = 1;
}
condicionesIniciales();

function reiniciarJuego() {
  limpiarCaja();
  aplicarHover("reiniciar", "#9ca2afff", "#6b7280");
  numeroMaximo += 5;
  const textArea = document.getElementById("valorUsuario");
  textArea.setAttribute("max", numeroMaximo);

  if (numeroMaximo == limiteJuego) {
    asignarTextoElemento("p", "Fin del juego");
    numeroMaximo = 5;
    return;
  }

  condicionesIniciales();
  document.querySelector("#reiniciar").setAttribute("disabled", "true");
  const pista = document.getElementById("pista");
  const contenedorInput = document.querySelector(".container__input");
  const contenedorIntentar = document.querySelector(".container__boton");
  contenedorInput.style.display = "block";
  contenedorIntentar.style.display = "block";
  pista.classList.remove("pista--mayor", "pista--menor", "pista--acierto");
  pista.style.color = "";
}

function mostrarPista(mensaje, tipo) {
  const pista = document.getElementById("pista");

  // Limpiamos clases anteriores
  pista.classList.remove("pista--error", "pista--acierto");

  // Seteamos nueva clase según tipo
  if (tipo === "error") {
    pista.classList.add("pista--error");
  } else if (tipo === "acierto") {
    pista.classList.add("pista--acierto");
  }

  // Actualizamos el texto
  pista.textContent = mensaje;
}
