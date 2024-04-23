using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutomatizacionTela.Models.ViewModels.Auditoria_Calidad
{
    public class GetDatosNivelCalidad
    {
        public string Año { get; set; }
        public string Mes { get; set; }
        public int NivelCalidad { get; set; }
        public int Meta { get; set; }
    }
}
