const Contenedor_ordenes = document.querySelector("#Contenedor_ordenes");
const plantilla_orden = document.querySelector(".plantilla_orden");
plantilla_orden.remove();

fetch(`http://localhost:3000/` + sessionStorage.getItem("id"), {
  method: "GET",
  headers: {
    Authorization: sessionStorage.getItem("token"),
  },
}).then((recurso) => {
  if (recurso.status === 200) {
    recurso.json().then((archivo_ordenes) => {
      console.log(archivo_ordenes);
      for (let i = 0; i < archivo_ordenes.ordenes.length; i++) {
        let clon = plantilla_orden.cloneNode(true);

        clon.querySelector(".imagen_de_orden").src =
          archivo_ordenes.ordenes[i].Imagen;

        clon.querySelector(".plantilla_precio").innerHTML =
          "Precio: " + archivo_ordenes.ordenes[i].Precio;

        clon.querySelector(".plantilla_tamano").innerHTML =
          "Tamaño: " + archivo_ordenes.ordenes[i].Tamaño;

        clon.querySelector(".plantillla_ingredientes").innerHTML =
          "Ingredientes: " +
          archivo_ordenes.ordenes[i].Igredientes[0] +
          ", " +
          archivo_ordenes.ordenes[i].Igredientes[1] +
          ", " +
          archivo_ordenes.ordenes[i].Igredientes[2];

        clon.querySelector(".plantilla_guarnicion").innerHTML =
          "Guarnicion: " + archivo_ordenes.ordenes[i].Guarnicion;

        Contenedor_ordenes.appendChild(clon);
      }
    });
  } else {
    recurso.json().then((respuesta) => {
      alert(respuesta.mensaje);
    });
  }
});

/*
    => recurso.json())
  .then((archivo_ordenes) => {
    for (let i = 0; i < archivo_ordenes.ordenes.length; i++) {
      let clon = plantilla_orden.cloneNode(true);

      const plantilla_precio = clon.querySelector(".plantilla_precio");
      plantilla_precio.innerHTML =
        "Precio: " + archivo_ordenes.ordenes[i].Precio;

      const plantilla_tamano = clon.querySelector(".plantilla_tamano");
      plantilla_tamano.innerHTML =
        "Tamaño: " + archivo_ordenes.ordenes[i].Tamaño;

      const plantillla_ingredientes = clon.querySelector(
        ".plantillla_ingredientes"
      );
      plantillla_ingredientes.innerHTML =
        "Ingredientes: " +
        archivo_ordenes.ordenes[i].Igredientes[0] +
        ", " +
        archivo_ordenes.ordenes[i].Igredientes[1] +
        ", " +
        archivo_ordenes.ordenes[i].Igredientes[2];

      const plantilla_guarnicion = clon.querySelector(".plantilla_guarnicion");
      plantilla_guarnicion.innerHTML =
        "Guarnicion: " + archivo_ordenes.ordenes[i].Guarnicion;

      Contenedor_ordenes.appendChild(clon);
    }
  });

  */
