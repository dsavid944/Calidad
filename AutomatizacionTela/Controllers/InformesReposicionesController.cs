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
    public class InformesReposicionesController : Controller
    {
        private readonly IDapperConsultasIcg _dapperConsultasIcg;
        private readonly IDapperConsultasUnoeeC _dapperConsultasUnoeeC;
        private readonly IDapperConsultasUnoeeE _dapperConsultasUnoeeE;
        private readonly IDapperDedalo _dapperDedalo;
        private readonly IDapperDedalo2008 _dapperDedalo2008;

        private readonly InformesReposicionesService informesReposiciones;

        public InformesReposicionesController(IDapperConsultasIcg dapperConsultasIcg, IDapperConsultasUnoeeC dapperConsultasUnoeeC, IDapperConsultasUnoeeE dapperConsultasUnoeeE, IDapperDedalo dapperDedalo, IDapperDedalo2008 dapperDedalo2008)
        {
            _dapperConsultasIcg = dapperConsultasIcg;
            _dapperConsultasUnoeeC = dapperConsultasUnoeeC;
            _dapperConsultasUnoeeE = dapperConsultasUnoeeE;
            _dapperDedalo = dapperDedalo;
            _dapperDedalo2008 = dapperDedalo2008;

            informesReposiciones = new InformesReposicionesService(dapperDedalo2008);
        }

        [HttpGet("[action]")]
        public ActionResult GetListadoReposicionesGeneral()
        {
            try
            {
                var response = informesReposiciones.GetLitsadoGeneralServ();
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
                var response = informesReposiciones.GetCalidadReposicionSemanaServ();
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
                var response = informesReposiciones.GetCalidadReposicionMesServ();
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
                var response = informesReposiciones.GetReposicionMetrosSemanaServ();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpGet("[action]")]
        public ActionResult GetReposicionMetrosMes()
        {
            try
            {
                var response = informesReposiciones.GetReposicionMetrosMesServ();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpGet("[action]")]
        public ActionResult GetReferencia_Unidades_Metros()
        {
            try
            {
                var response = informesReposiciones.GetReferencia_Unidades_MetrosServ();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpGet("[action]")]
        public ActionResult GetOperario_Unidades_Metros()
        {
            try
            {
                var response = informesReposiciones.GetOperario_Unidades_MetrosServ();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpGet("[action]")]
        public ActionResult GetTiempoOperario()
        {
            try
            {
                var response = informesReposiciones.GetTiempoOperarioServ();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpGet("[action]")]
        public ActionResult GetDefectoUnidades()
        {
            try
            {
                var response = informesReposiciones.GetDefectoUnidadesServ();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpGet("[action]")]
        public ActionResult GetReposicionesOperarioNumeroSolicitudes()
        {
            try
            {
                var response = informesReposiciones.GetReposicionesOperarioNumeroSolicitudesServ();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }



    }
}
