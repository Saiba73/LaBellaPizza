const btn_ordena = document.querySelector("#btn_ordena");
const btn_historial = document.querySelector("#btn_historial");
const boton_crear_cuenta = document.querySelector("#boton_crear_cuenta");
const boton_iniciar_session = document.querySelector("#boton_iniciar_session");
const advertencia_crear_cuenta_btn = document.querySelector("#advertencia_crear_cuenta_btn");
const crear_cuenta_advertencia = document.querySelector(
  "#crear_cuenta_advertencia"
);

btn_ordena.addEventListener("click", () => {
  if (sessionStorage.getItem("token") !== null) {
    window.location.href = "./src/ordenar.html";
  } else {
    crear_cuenta_advertencia.style.display = "block";
  }
});

btn_historial.addEventListener("click", () => {
  if (sessionStorage.getItem("token") !== null) {
    window.location.href = "./src/historial.html";
  } else {
    crear_cuenta_advertencia.style.display = "block";
  }
});

boton_crear_cuenta.addEventListener("click", () => {
  window.location.href = "./src/crearUsuario.html";
});

advertencia_crear_cuenta_btn.addEventListener("click", () => {
  window.location.href = "./src/crearUsuario.html";
});

boton_iniciar_session.addEventListener("click", () => {
  window.location.href = "./src/login.html";
});