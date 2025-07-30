let numeroSecreto = 0;
let intentos = 0;
let listaNumeros = [];
let numeroMaximo = 10;

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

function verificarIntento() {
  let numeroUsuario = parseInt(document.getElementById("valorUsuario").value);
  if (numeroUsuario === "" || isNaN(numeroUsuario)) {
    // No hacer nada, o mostrar mensaje de error
    asignarTextoElemento("p", "Por favor asigne un número valido.");
    return; // Salir sin seguir
  }

  if (numeroUsuario < numeroSecreto) {
    mostrarPista("Muy bajo... ¡subí!", "frio");
  } else if (numeroUsuario > numeroSecreto) {
    mostrarPista("Muy alto... ¡bajá!", "caliente");
  } else {
    mostrarPista("¡Adivinaste el número!", "acierto");
    document.getElementById("reiniciar").removeAttribute("disabled");
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
  condicionesIniciales();
  document.querySelector("#reiniciar").setAttribute("disabled", "true");
  const pista = document.getElementById("pista");
  pista.classList.remove("pista--mayor", "pista--menor", "pista--acierto");
  pista.style.color = ""; // para asegurarte que no haya estilos inline persistentes
  // si querés limpiar el texto también
}

function mostrarPista(mensaje, tipo) {
  const pista = document.getElementById("pista");

  // Limpiamos clases anteriores
  pista.classList.remove("pista--frio", "pista--caliente", "pista--acierto");

  // Seteamos nueva clase según tipo
  if (tipo === "frio") {
    pista.classList.add("pista--frio");
  } else if (tipo === "caliente") {
    pista.classList.add("pista--caliente");
  } else if (tipo === "acierto") {
    pista.classList.add("pista--acierto");
  }

  // Actualizamos el texto
  pista.textContent = mensaje;
}
