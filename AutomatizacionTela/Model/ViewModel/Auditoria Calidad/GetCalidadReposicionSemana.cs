﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutomatizacionTela.Models.ViewModels.Auditoria_Calidad
{
    public class GetCalidadReposicionSemana
    {
        public int Semana { get; set; }
        public double Calidad { get; set; }
        public double Meta { get; set; }
    }
}
