const https = require("https");
const http = require("http");
const url = require("url");


http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });


    const apiUrl = `https://api.sampleapis.com/futurama/info`;


    https
      .get(apiUrl, (resp) => {
        let dados = "";


        resp.on("data", (chunk) => {
          dados += chunk;
        });


        resp.on("end", () => {
          const respostaJSON = JSON.parse(dados);
          const synopsis = respostaJSON[0].synopsis;
          const yearsAired = respostaJSON[0].yearsAired;


          res.write("<h1>" + yearsAired + "</h1>");
          res.write("<p>" + synopsis + "</p>");
          res.end();
        });
      })
      .on("error", (err) => {
        console.log("Error: " + err.message);
      });
  })
  .listen(8080);


console.log("Servidor rodando em http://localhost:8080");
