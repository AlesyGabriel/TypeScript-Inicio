import { Request, Response } from "express";
import EmailService from "../services/EmailService";
const users =[
    {nome: "Alesy", email: "alesygabriel3@gmail.com"},
];

export default {
    async index(req: Request, res:Response){
        return res.json(users);
    },
    async create(req:Request, res:Response){
        const emailServise = new EmailService();

        emailServise.sendMail({
            to:{
                nome: "Alesy",
                email:"alesygabriel3@gmail.com"
            },
            message:{
                subject:"Bem vindo ao Sistema",
                 body:"Seja bem-vindo"
            }
            });
            return res.send();
    }
};