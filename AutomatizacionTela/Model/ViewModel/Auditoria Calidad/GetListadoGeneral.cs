using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutomatizacionTela.Models.ViewModels.Auditoria_Calidad
{
    public class GetListadoGeneral
    {
        public int Mes { get; set; }
        public int Semana { get; set; }
        public DateTime Fecha { get; set; }
        public string Referencia { get; set; }
        public string Oc { get; set; }
        public int Unidades { get; set; }
        public double Metros { get; set; }
        public double TiempoPerdido { get; set; }
        public string Operario { get; set; }
        public string Causas { get; set; }
    }
}
