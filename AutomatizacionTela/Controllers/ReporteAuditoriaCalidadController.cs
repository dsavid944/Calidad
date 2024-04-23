using AutomatizacionTela.Models.ViewModels.Auditoria_Calidad;
using AutomatizacionTela.Service;
using AutomatizacionTela.Service.Interface;
using Microsoft.AspNetCore.Mvc;
using System;

namespace AutomatizacionTela.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class ReporteAuditoriaCalidadController:Controller
    {
        private readonly IDapperDedalo2008 _dapperDedalo2008;
        private readonly ReporteAuditoriaCalidadService reporteAuditoriaCalidad;

        public ReporteAuditoriaCalidadController(IDapperDedalo2008 dapperDedalo2008)
        {
            _dapperDedalo2008 = dapperDedalo2008;

            reporteAuditoriaCalidad = new ReporteAuditoriaCalidadService(_dapperDedalo2008);
        }

        [HttpPost("[action]")]
        public ActionResult GetDatosDefecto([FromBody] Filter filter)
        {
            try
            {
                var result = reporteAuditoriaCalidad.GetDatosDefecto(filter);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("[action]")]
        public ActionResult GetDatosPrimeraGrafica([FromBody] Filter filter)
        {
            try
            {
                var result = reporteAuditoriaCalidad.GetDatosPrimeraGrafica(filter);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("[action]")]
        public ActionResult GetDatosNivelCalidad()
        {
            try
            {
                var result = reporteAuditoriaCalidad.GetDatosNivelCalidad();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("[action]")]
        public ActionResult GetDatosPlanta()
        {
            try
            {
                var result = reporteAuditoriaCalidad.GetDatosPlanta();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
