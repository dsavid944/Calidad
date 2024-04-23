using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutomatizacionTela.Models.SetModels.Auditoria_Calidad
{
    public class SetReposicionTelas
    {
        public int Planta { get; set; }
        public int Modulo { get; set; }
        public int Operario { get; set; }
        public int TipoDefecto { get; set; }
        public int Defecto { get; set; }
        public string Responsable { get; set; }
        public List<DatosGenerales> DatosGenerales { get; set; }
    }

    public class DatosGenerales
    {
        public int Ordencorte { get; set; }
        public string ReferenciaPrenda { get; set; }
        public string CodigoTela { get; set; }
        public string DescripcionTela { get; set; }
        public string Piezas { get; set; }
        public string CodigoColor { get; set; }
        public string DescripcionColor { get; set; }
        public string Arte { get; set; }
        public decimal Metros { get; set; }
        public int Unidades { get; set; }

    }
}
