using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutomatizacionTela.Models.ViewModels.Auditoria_Calidad
{
    public class GetOperario_Unidades_Metros
    {
        public int Semana { get; set; }
        public string Operario { get; set; }
        public int Unidades { get; set; }
        public double Metros { get; set; }
    }
}
