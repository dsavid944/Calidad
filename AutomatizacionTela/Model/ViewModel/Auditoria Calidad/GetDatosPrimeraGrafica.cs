using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutomatizacionTela.Models.ViewModels.Auditoria_Calidad
{
    public class GetDatosPrimeraGrafica
    {
        public string NombreDefecto { get; set; }
        public int Cantidad { get; set; }
        public int Revisadas { get; set; }
        public double PorcentajeDef { get; set; }
    }
}
