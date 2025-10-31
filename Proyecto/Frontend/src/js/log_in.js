const input_usuario = document.querySelector("#input_usuario");
const input_contrasena = document.querySelector("#input_contrasena");
const btn_login = document.querySelector("#btn_login");

btn_login.addEventListener("click", () => {
  console.log(input_usuario.value);
  console.log(input_contrasena.value);
  const informacion_login = {
    nombre: input_usuario.value,
    contrasena: input_contrasena.value,
  };
  console.log(informacion_login);
  fetch("http://localhost:3000/login", {
    method: "POST",
    body: JSON.stringify(informacion_login),
  }).then((recurso) => {
    console.log(recurso);
    if (recurso.status === 200) {
      recurso.json().then((respuesta) => {
        sessionStorage.setItem("id", respuesta.id);
        sessionStorage.setItem("user_name", respuesta.user)
        sessionStorage.setItem("admin", respuesta.admin);
        sessionStorage.setItem("token", respuesta.token_acceso);
        console.log("JKLJDLKFJSLKF2");
        window.location.href = "/index.html";
      });
    } else {
      recurso.json().then((respuesta) => {
        alert(respuesta.mensaje);
      });
    }
  });
});
