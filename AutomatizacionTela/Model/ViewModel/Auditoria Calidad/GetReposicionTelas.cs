using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutomatizacionTela.Models.ViewModels.Auditoria_Calidad
{
    public class GetReposicionTelas
    {
        public int Radicado { get; set; }
        public string Solicitante { get; set; }
        public string NombrePlanta { get; set; }
        public string Operario { get; set; }
        public string EstadoReposicion { get; set; }
        public string Defecto { get; set; }
        public string Modulo { get; set; }
        public string TipoDefecto { get; set; }
        public DateTime FechaSolicitud { get; set; }
        public DateTime? FechaAprobacion { get; set; }
        //public string Solicitante { get; set; }
        public string? Aprobador { get; set; }
    }
}
