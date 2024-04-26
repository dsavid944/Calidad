using System.Collections.Generic;

namespace AutomatizacionTela.Model.SetModel
{
    public class SetEmailRespData
    {
        public string EmailUserToSend { get; set; }//Este es el correo de quien recibe
        public string Planta { get; set; }// El mensaje del encabezado sobre la accion que se realiza
        public string Subject { get; set; }// El Asunto del mensaje que se envía 
        public string Telas { get; set; }// El numero del consecutivo sobre el cual se hace referencia en el programa 
        public string JobTitle { get; set; }// El titulo del cargo sobre el que se esta hablando
        public string Url { get; set; }// La url a la cual se va a redireccionar la persona cuando presione el botón de Revisar en el correo
        public string Template { get; set; }
        public string Estado { get; set; }
        public string Username { get; set; }
    }

    public class SendEmailWithAttachments
    {
        public List<EmailTo> EmailTo { get; set; }
        public List<string> Parameters { get; set; }
        public string Asunto { get; set; }
        public List<Attachments> Attachments { get; set; }
        public string PathTemplate { get; set; }



    }
    public class Parameters
    {
        public string Value { get; set; }
    }
    public class EmailTo
    {
        public string Email { get; set; }
    }
    public class Attachments
    {
        public byte[] File { get; set; }
        public string Name { get; set; }
        public string Extension { get; set; }
    }
}
