import nodemailer from "nodemailer";
import { ENV_CONFIG } from "../config/config.js"

export const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: ENV_CONFIG.EMAIL_USER,
    pass: ENV_CONFIG.EMAIL_PASS,
  },
});


transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

const mailOptions = {
  from: "Coder Test " + ENV_CONFIG.EMAIL_USER,
  to: ENV_CONFIG.EMAIL_USER,
  subject: "Correo de prueba Coderhouse Programacion Backend.",
  html: "<div><h1>Esto es un Test de envio de correos con Nodemailer!</h1></div>",
  attachments: [],
};

const mailOptionsWithAttachments = {
  from: "Coder Test " + ENV_CONFIG.EMAIL_USER,
  to: ENV_CONFIG.EMAIL_USER,
  subject: "Correo de prueba Coderhouse Programacion Backend.",
  html: `<div>
              <h1>Esto es un Test de envio de correos con Nodemailer!</h1>
              <p>Ahora usando imagenes: </p>
              <img src="cid"/>
          </div>`,
  attachments: [
    {
      filename: "Meme de Programacion",
      cid: "meme",
    },
  ],
};

export const sendEmail = (req, res) => {
  try {
    let result = transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        req.logger.error(error);
        res.status(400).send({ message: "Error", payload: error });
      }
      req.logger.info("Message sent: %s", info.messageId);
      res.send({ message: "Success!", payload: info });
    });
  } catch (error) {
    req.logger.error(error);
    res
      .status(500)
      .send({
        error: error,
        message: "No se pudo enviar el email desde:" + config.gmailAccount,
      });
  }
};

export const sendEmailWithAttachments = (req, res) => {
  try {
    let result = transporter.sendMail(
      mailOptionsWithAttachments,
      (error, info) => {
        if (error) {
          console.log(error);
          res.status(400).send({ message: "Error", payload: error });
        }
        console.log("Message sent: %s", info.messageId);
        res.send({ message: "Success!", payload: info });
      }
    );
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({
        error: error,
        message: "No se pudo enviar el email desde:" + config.gmailAccount,
      });
  }
};

