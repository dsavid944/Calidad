using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutomatizacionTela.Model.ViewModel.AuditoriaRollo
{
    public class GetSummary
    {
        public string DateCreate { get; set; }
        public string NameProvider { get; set; }
        public int Roll { get; set; }
        public string Lot { get; set; }
        public string CodeCloth { get; set; }
        public string NameCloth { get; }
        public string CodeColor { get; set; }
        public decimal KiloRoll { get; set; }
        public string Request { get; set; }
        public string Reference { get; set; }
        public string Remision { get; set; }
        public decimal MtsProvider { get; set; }
        public decimal WidthProvider { get; set; }
        public decimal MtsReal { get; set; }
        public decimal WidthReal { get; set; }
        public string StateRev { get; set; }
        public string UsuarioRoll { get; set; }
        public decimal Weight { get; set; }
        public decimal Rto { get; set; }
        public decimal Ea { get; set; }
        public decimal El { get; set; }
        public decimal Viro { get; set; }
        public decimal WidthElongation { get; set; }
        public decimal LongElongation { get; set; }
        public string StateCheck { get; set; }
        public string UsuarioCheck { get; set; }
    }
}
