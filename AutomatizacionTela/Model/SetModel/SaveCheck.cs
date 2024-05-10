using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutomatizacionTela.Model.SetModel
{
    public class SaveCheck
    {
        public int IdRowRevision { get; set; }
        public int IdRowUsuario { get; set; }
        public int IdRowEstado { get; set; }
        public decimal Peso { get; set; }
        public decimal Rto { get; set; }
        public decimal Ea { get; set; }
        public decimal El { get; set; }
        public decimal Viro { get; set; }
        public decimal ElongacionAncho { get; set; }
        public decimal ElongacionLargo { get; set; }
        public string Observacion { get; set; }
    }
}
