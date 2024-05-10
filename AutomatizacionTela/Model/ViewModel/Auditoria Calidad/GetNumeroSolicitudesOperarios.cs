using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutomatizacionTela.Model.ViewModel.Auditoria_Calidad
{
    public class GetNumeroSolicitudesOperarios
    {
        public int Semana { get; set; }
        public string Mes { get; set; }
        public int Year { get; set; }
        public string Operario { get; set; }
        public int NumeroDeSolicitudes { get; set; }
    }

}
