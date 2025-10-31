const http = require("node:http");
const fs = require("node:fs");
const jwt = require("jsonwebtoken");
const puerto = 3000;
const firma_jwt = "asdfghjklfwvrefhtrsnslihugdfdsfghgejw";

const server = http.createServer((request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  response.setHeader("Access-Control-Allow-HEADERS", "*");
  //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // este es para pruebas
  switch (request.method) {
    case "GET":
      var authHeader = request.headers["authorization"];
      if (authHeader === "null") {
        response.statusCode = 401;
        response.setHeader("Content-Type", "application/json");
        response.end(
          JSON.stringify({
            mensaje: "Token no proporcionado",
          })
        );
        return 0;
      }

      jwt.verify(authHeader, firma_jwt, (err, decoded) => {
        if (err) {
          response.statusCode = 401;
          response.setHeader("Content-Type", "application/json");
          response.end(
            JSON.stringify({
              mensaje: "Token invalido o expirado",
            })
          );
          return 0;
        } else {
          response.setHeader("Content-Type", "application/json");
          fs.readFile(
            "./ordenes/usuario_" + request.url.split("/")[1] + ".json",
            (err, file) => {
              if (err) {
                let objeto_respuesta = {
                  mensaje: "No se encontraron ordenes",
                };
                response.statusCode = 404;
                response.end(JSON.stringify(objeto_respuesta));
              } else {
                response.statusCode = 200;
                response.end(file.toString());
              }
            }
          );
        }
      });
      break;
    case "POST":
      if (request.url === "/login") {
        request.on("data", (info) => {
          let login = JSON.parse(info.toString());
          fs.readFile("./usuarios/usuarios.json", (err, file) => {
            if (err) {
              response.statusCode = 401;
              response.setHeader("Content-Type", "application/json");
              response.end(
                JSON.stringify({
                  mensaje: "Usuario y contraseñas incorrectos",
                })
              );
            } else {
              archivo_usuarios = JSON.parse(file.toString());
              for (i = 0; i < archivo_usuarios.usuarios.length; i++) {
                if (
                  archivo_usuarios.usuarios[i].nombre === login.nombre &&
                  archivo_usuarios.usuarios[i].contrasena === login.contrasena
                ) {
                  const token = jwt.sign(
                    { username: archivo_usuarios.usuarios[i].nombre },
                    firma_jwt,
                    { expiresIn: "15m" }
                  );
                  response.statusCode = 200;
                  response.setHeader("Content-Type", "application/json");
                  response.end(
                    JSON.stringify({
                      mensaje: "Usuario y contraseñas correctos",
                      id: archivo_usuarios.usuarios[i].id,
                      user: login.nombre,
                      admin: archivo_usuarios.usuarios[i].admin,
                      token_acceso: token,
                    })
                  );
                  return;
                } else {
                  response.statusCode = 401;
                  response.setHeader("Content-Type", "application/json");
                  response.end(
                    JSON.stringify({
                      mensaje: "Usuario y contraseñas incorrectos",
                    })
                  );
                }
              }
            }
          });
        });
      } else if (request.url === "/crear_orden") {
        let juntar_info = "";

        request.on("data", (info) => {
          juntar_info += info.toString();
        });

        request.on("end", () => {
          let informacion = JSON.parse(juntar_info);
          fs.readdir("./ordenes", (err, archivos) => {
            if (err) {
              console.log(err);
            } else {
              for (
                nombres_archivos = 0;
                nombres_archivos < archivos.length;
                nombres_archivos++
              ) {
                if (
                  archivos[nombres_archivos] ===
                  "usuario_" + informacion.user_id + ".json"
                ) {
                  fs.readFile(
                    "./ordenes/usuario_" + informacion.user_id + ".json",
                    (err, archivo) => {
                      if (err) {
                        console.log(err);
                      } else {
                        let ordenes_json = JSON.parse(archivo.toString());
                        let nueva_orden = {
                          Orden_id: revisar_id_ordenes(ordenes_json),
                          Precio: informacion.Precio,
                          Tamaño: informacion.Tamaño,
                          Igredientes: informacion.Igredientes,
                          Guarnicion: informacion.Guarnicion,
                          Imagen: informacion.Imagen,
                        };
                        ordenes_json.ordenes.push(nueva_orden);
                        fs.writeFile(
                          "./ordenes/usuario_" + informacion.user_id + ".json",
                          JSON.stringify(ordenes_json),
                          (err) => {
                            if (err) {
                              console.log(err);
                            } else {
                              response.statusCode = 200;
                              response.setHeader(
                                "Content-Type",
                                "application/json"
                              );
                              response.end(
                                JSON.stringify({
                                  mensaje: "Su orden fue creada",
                                })
                              );
                            }
                          }
                        );
                      }
                    }
                  );
                }
              }
            }
          });
        });
      }

      break;
    case "PUT":
      break;
    case "DELETE":
      break;
    case "OPTIONS":
      response.writeHead("204");
      response.end();
      break;
  }
});

server.listen(puerto, () => {
  console.log("Servidor a la escuha en http://localhost:" + puerto);
});

function revisar_id_ordenes(archivo_a_reviar) {
  let id_actualizar = 0;
  for (id = 0; id < archivo_a_reviar.ordenes.length; id++) {
    if (id_actualizar < archivo_a_reviar.ordenes[id].orden_id) {
      id_actualizar = archivo_a_reviar.ordenes[id].orden_id;
    }
  }
  if (id_actualizar === 0) {
    id_actualizar = 1;
  }
  return id_actualizar;
}
