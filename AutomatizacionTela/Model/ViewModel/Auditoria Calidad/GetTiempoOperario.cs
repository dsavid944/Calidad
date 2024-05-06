using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutomatizacionTela.Models.ViewModels.Auditoria_Calidad
{
    public class GetTiempoOperario
    {
        public int Semana { get; set; }
        public string Mes { get; set; }
        public int Year { get; set; }
        public double Tiempo { get; set; }
        public string Operario { get; set; }

    }
}
