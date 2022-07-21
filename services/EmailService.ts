interface IMailTo{
    nome: string,
    email: string;
}
interface IMailMessage{
    subject: string;
    body:string;
    attachment?: string[];
}
interface MessageDTO{
    to: IMailTo;
    message: IMailMessage;
}
interface IEmailService {
    sendMail(request: MessageDTO):void;
}
// Data Transfer Object (DDD)
class EmailService implements IEmailService{
    sendMail({to, message}: MessageDTO){
        console.log(`Email Enviado para ${to.nome}:${message.subject}`)
    }
}

export default EmailService;
/*
class EmailService{
    sendMail(to:IMailTo, message:IMailMessage){
        console.log(`Email Enviado para ${to.nome}:${message.subject}`)
    }
}
*/