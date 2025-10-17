const http = require("node:http");
const fs = require("node:fs");
const puerto = 3000;

const server = http.createServer((request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

  switch (request.method) {
    case "GET":
      response.setHeader("Content-Type", "application/json");
      fs.readFile(
        "./ordenes/usuario_" +request.url.split("/")[1]+".json",
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
