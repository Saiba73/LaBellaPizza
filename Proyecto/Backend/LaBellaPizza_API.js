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
                console.log(login.nombre);
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
