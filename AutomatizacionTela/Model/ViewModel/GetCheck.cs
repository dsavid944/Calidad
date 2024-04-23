using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutomatizacionTela.Model.ViewModel
{
    public class GetCheck
    {  
        public int IdRowsRevision { get; set; }
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
        public int QuantityRoll { get; set; }
    }
}
