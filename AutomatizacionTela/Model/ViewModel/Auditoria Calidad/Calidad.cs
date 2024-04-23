using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutomatizacionTela.Models.ViewModels.Auditoria_Calidad
{
    public class Calidad
    {
        public int PlantaId { get; set; }
        public int Modulo { get; set; }
        public string OrdenCorte { get; set; }
        public string? NumeroArte { get; set; }
        public string Referencia { get; set; }
        public int PrendaId { get; set; }
        public int PrendasDetalleId { get; set; }
        public int? TipoDefectoId { get; set; }
        public int? DefectoId { get; set; }
        public int Cantidad { get; set; }
        public int UndRevisadas { get; set; }
        public string AuditoraId { get; set; }
    }
}
