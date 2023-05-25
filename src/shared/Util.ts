import { randomBytes } from "crypto";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
export class Util {
  static generatePassword(length: number): string {
    const randomBytesBuffer = randomBytes(Math.ceil(length / 2));
    const randomString = randomBytesBuffer.toString("hex").slice(0, length);
    return randomString;
  }
  static gerarNumerosAleatorios() {
    let numeros = "";

    for (let i = 0; i < 4; i++) {
      const numero = Math.floor(Math.random() * 9) + 1; // Gera um número entre 1 e 9
      numeros += numero;
    }

    return Number(numeros);
  }
  static async encryptPassword(plainPassword) {
    try {
      const hash = bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(plainPassword, salt))
        .then((hash) => hash);
      return hash;
    } catch (error) {
      throw new Error("Erro ao criptografar a senha");
    }
  }

  static async comparePassword(userPassword, hashedPassword) {
    try {
      const result = await bcrypt.compare(userPassword, hashedPassword);
      return result;
    } catch (error) {
      throw new Error("Erro ao comparar as senhas");
    }
  }
}

export class UtilEmail {
  static enviarEmail(destinatario, assunto, conteudo) {
    const transporter = nodemailer.createTransport({
      secure: false,
      host: "us113-cp.valueserver.com.br",
      port: 587, // Porta padrão do SMTP
      auth: {
        user: "noreply@dho.sispacksoftware.com.br",
        pass: "9wY1gvNb8uTe",
      },
    });

    const mailOptions = {
      from: "noreply@dho.sispacksoftware.com.br",
      to: destinatario,
      subject: assunto,
      text: conteudo,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("E-mail enviado: " + info.response);
      }
    });
  }
}
