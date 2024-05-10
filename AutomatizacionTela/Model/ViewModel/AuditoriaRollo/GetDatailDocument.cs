using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutomatizacionTela.Model.ViewModel.AuditpriaRollo
{
    public class GetDatailDocument
    {
        public int IdRowUsuario { get; set; }
        public int IdRowProvider { get; set; }
        public int IdRowCloth { get; set; }
        public int IdRowColor { get; set; }
        public int IdDefectProvider { get; set; }
        public string Defect { get; set; }
        public int IdRowEstado { get; set; }
        public int Roll { get; set; }
        public string Lot { get; set; }
        public decimal MtsFicha { get; set; }
        public decimal MtsProvider { get; set; }
        public decimal WidthProvider { get; set; }
        public decimal MtsReal { get; set; }
        public decimal WidthReal { get; set; }
        public decimal Mtsdeficient { get; set; }
        public string Observation { get; set; }
    }
}
