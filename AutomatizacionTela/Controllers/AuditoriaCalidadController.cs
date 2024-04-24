using AutomatizacionTela.Models.Interfaces;
using AutomatizacionTela.Models.SetModels.Auditoria_Calidad;
using AutomatizacionTela.Models.ViewModels.Auditoria_Calidad;
using AutomatizacionTela.Service;
using AutomatizacionTela.Service.Interface;
using Microsoft.AspNetCore.Mvc;
using Project.Models.SetModels.Auditoria_Calidad;
using System;

namespace AutomatizacionTela.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuditoriaCalidadController : Controller
    {
        private readonly IDapperConsultasIcg _dapperConsultasIcg;
        private readonly IDapperConsultasUnoeeC _dapperConsultasUnoeeC;
        private readonly IDapperConsultasUnoeeE _dapperConsultasUnoeeE;
        private readonly IDapperDedalo _dapperDedalo;
        private readonly IDapperDedalo2008 _dapperDedalo2008;

        private readonly AuditoriaCalidadService auditoriaCalidad;

        public AuditoriaCalidadController(IDapperConsultasIcg dapperConsultasIcg, IDapperConsultasUnoeeC dapperConsultasUnoeeC, IDapperConsultasUnoeeE dapperConsultasUnoeeE, IDapperDedalo dapperDedalo, IDapperDedalo2008 dapperDedalo2008)
        {
            _dapperConsultasIcg = dapperConsultasIcg;
            _dapperConsultasUnoeeC = dapperConsultasUnoeeC;
            _dapperConsultasUnoeeE = dapperConsultasUnoeeE;
            _dapperDedalo = dapperDedalo;
            _dapperDedalo2008 = dapperDedalo2008;

            auditoriaCalidad = new AuditoriaCalidadService(dapperDedalo2008);
        }

        [HttpGet("[action]")]
        public ActionResult GetPlantas()
        {
            try
            {
                var response = auditoriaCalidad.GetPlantas();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpGet("[action]/{plantaId}")]
        public ActionResult GetModulos(int plantaId)
        {
            try
            {
                var response = auditoriaCalidad.GetModulos(plantaId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpGet("[action]")]
        public ActionResult GetTipoPrendas()
        {
            try
            {
                var response = auditoriaCalidad.GetTipoPrendas();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpGet("[action]/{prendaId}")]
        public ActionResult GetPrendas(int prendaId)
        {
            try
            {
                var response = auditoriaCalidad.GetPrendas(prendaId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpGet("[action]")]
        public ActionResult GetTipoDefectos()
        {
            try
            {
                var response = auditoriaCalidad.GetTipoDefectos();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpGet("[action]/{ordenCorte}")]
        public ActionResult GetArtes(string ordenCorte)
        {
            try
            {
                var response = auditoriaCalidad.GetArtes(ordenCorte);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpGet("[action]/{tipoDefectoId}")]
        public ActionResult GetDefectos(int tipoDefectoId)
        {
            try
            {
                var response = auditoriaCalidad.GetDefectos(tipoDefectoId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpPost("[Action]")]
        public ActionResult PostDatos([FromBody] Calidad calidad)
        {
            try
            {
                var result = auditoriaCalidad.EnviarDatos(calidad);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpGet("[action]/{orden}")]
        public ActionResult GetOrdenCorte(int orden)
        {
            try
            {
                var response = auditoriaCalidad.GetOrdenCorteServ(orden);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpGet("[action]")]
        public ActionResult GetTelas()
        {
            try
            {
                var response = auditoriaCalidad.GetTelas();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpPost("[action]")]
        public ActionResult SetReposicionesTela([FromBody] SetReposicionTelas reposicion)
        {
            try
            {
                var response = auditoriaCalidad.SetReposicionTelasServ(reposicion);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpGet("[action]")]
        public ActionResult GetReposicionTelas()
        {
            try
            {
                var response = auditoriaCalidad.GetReposicionTelasServ();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpGet("[action]")]
        public ActionResult GetDetallesReposicion()
        {
            try
            {
                var response = auditoriaCalidad.GetDetallesReposicionServ();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpPost("[action]")]
        public ActionResult UpdateEstadoReposicion([FromBody] SetUpdateEstadoReposicion setUpdateEstadoReposicion)
        {
            try
            {
                var response = auditoriaCalidad.UpdateEstadoReposicionServ(setUpdateEstadoReposicion);
                return Ok(response);
            }
            catch (System.Exception ex)
            {
                return Ok(BadRequest(ex.ToString()));
            }
        }

        [HttpGet("[action]")]
        public ActionResult GetOperarios()
        {
            try
            {
                var response = auditoriaCalidad.GetOperariosServ();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpGet("[action]")]
        public ActionResult GetListadoReposicionesGeneral()
        {
            try
            {
                var response = auditoriaCalidad.GetLitsadoGeneralServ();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpGet("[action]")]
        public ActionResult GetCalidadReposicionSemana()
        {
            try
            {
                var response = auditoriaCalidad.GetCalidadReposicionSemanaServ();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpGet("[action]")]
        public ActionResult GetCalidadReposicionMes()
        {
            try
            {
                var response = auditoriaCalidad.GetCalidadReposicionMesServ();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpGet("[action]")]
        public ActionResult GetReposicionMetrosSemana()
        {
            try
            {
                var response = auditoriaCalidad.GetReposicionMetrosSemanaServ();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpGet("[Action]/{Email}")]
        public ActionResult GetPermission(string Email)
        {
            try
            {
                var response = auditoriaCalidad.GetPermission(Email);
                return Ok(response);

            }
            catch (Exception ex)
            {
                return BadRequest();
            }

        }



    }
}
