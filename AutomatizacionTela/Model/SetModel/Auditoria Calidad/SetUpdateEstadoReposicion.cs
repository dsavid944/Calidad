using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project.Models.SetModels.Auditoria_Calidad
{
    public class SetUpdateEstadoReposicion
    {
        public int IdRows { get; set; }
        public int Estado { get; set; }
        public string Aprobador { get; set; }
    }
}
