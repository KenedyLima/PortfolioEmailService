const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();
const PORT = process.env.PORT || 3001;

const app = express();
app.use(
  express.urlencoded({
    extended: false,
  })
);

const baseUrl = "";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/sendEmail", async (req, res) => {
  if (!req.body.nome || !req.body.email || !req.body.mensagem)
    res.sendStatus(400);
  const html = `
  <h1>Nova proposta!</h1>
  <ul style="font-size: 14px; list-style: none;">
  <li>Enviado por: ${req.body.nome}</li>
  <li>Email para retorno: ${req.body.email}</li>
  </ul>
 <p font-size: 14px;>Mensagem:<br></br> ${req.body.mensagem}</p> 
  
  
  `;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    secure: "true",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.SENHA,
    },
  });

  const email = {
    from: process.env.EMAIL,
    to: "limaworkon@gmail.com",
    subject: "nova oportunidade em edificações!",
    html: html,
  };

  transporter.sendMail(email, (err) => {
    if (err) {
      console.log("Erro:", err);
      res.sendStatus(400);
    } else res.sendStatus(200);
  });
});

app.listen(PORT, () => {
  console.log("App is listening in port ", PORT);
});
