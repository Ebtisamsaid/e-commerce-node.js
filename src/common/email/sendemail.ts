import { SendMailOptions } from './../../../node_modules/@types/nodemailer/index.d';

import * as nodemailer from "nodemailer"
// Create a test account or replace with real credentials.
 export async function sendMail(SendMailOptions:SendMailOptions){

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.app_mail,
          pass: process.env.app_pass,
        },
      });
      
      // Wrap in an async IIFE so we can use await.
      
        const info = await transporter.sendMail(
        //   from: '"hello from ecommerce" <maddison53@ethereal.email>',
        //   to: "bar@example.com, baz@example.com",
        //   subject: "Hello ✔",
        //   text: "Hello world?", // plain‑text body
        //   html: "<b>Hello world?</b>", // HTML body
        SendMailOptions
        );
      
        console.log("Message sent:", info.messageId);
      
}

