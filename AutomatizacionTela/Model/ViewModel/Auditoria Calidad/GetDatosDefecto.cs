using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutomatizacionTela.Models.ViewModels.Auditoria_Calidad
{
    public class GetDatosDefecto
    {
        public string Mes { get; set; }
        public string Semana { get; set; }
        public DateTime Fecha { get; set; }
        public string Modulo { get; set; }
        public string Referencia { get; set; }
        public int PrendaId { get; set; }
        public string Descripcion { get; set; }
        public int TipoDefectoId { get; set; }
        public string Nombre { get; set; }
        public int PrendasDetalleId { get; set; }
        public string ParteDefecto { get; set; }
        public int DefectoId { get; set; }
        public string NombreDefecto { get; set; }
        public int Cantidad { get; set; }
        public decimal PorcentajeDef { get; set; }
        public int UndRevisadas { get; set; }
        public int PlantaId { get; set; }
        public string NombrePlanta { get; set; }
        public int AuditoriaId { get; set; }
        public string Usuario { get; set; }
        public string NumeroArte { get; set; }
        public string OrdenCorte { get; set; }

    }
}
