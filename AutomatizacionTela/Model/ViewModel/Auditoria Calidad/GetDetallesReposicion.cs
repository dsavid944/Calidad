using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutomatizacionTela.Models.ViewModels.Auditoria_Calidad
{
    public class GetDetallesReposicion
    {
        public int Radicado { get; set; }
        public int OrdenCorte { get; set; }
        public string ReferenciaPrenda { get; set; }
        public string CodigoTela { get; set; }
        public string DescripcionTela { get; set; }
        public string Piezas { get; set; }
        public string CodigoColor { get; set; }
        public string DescripcionColor { get; set; }
        public decimal Metros { get; set; }
        public int Unidades { get; set; }
        public string? Arte { get; set; }

    }
}
