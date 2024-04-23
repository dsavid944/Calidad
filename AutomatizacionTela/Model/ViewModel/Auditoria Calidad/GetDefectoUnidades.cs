using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutomatizacionTela.Models.ViewModels.Auditoria_Calidad
{
    public class GetDefectoUnidades
    {
        public int Semana { get; set; }
        public int Mes { get; set; }
        public int Year { get; set; }
        public int Unidades { get; set; }
        public int Causas { get; set; }
    }
}
