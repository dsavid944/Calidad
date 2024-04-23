using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutomatizacionTela.Models.ViewModels.Auditoria_Calidad
{
    public class Filter
    {
        public DateTime? Ano { get; set; }
        public DateTime? Mes { get; set; }
        public int? Semana { get; set; }
        public int? Planta { get; set; }
    }
}
