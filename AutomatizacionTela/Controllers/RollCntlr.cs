﻿using AutomatizacionTela.Model.SetModel;
using AutomatizacionTela.Model.ViewModel;
using AutomatizacionTela.Service;
using AutomatizacionTela.Service.Interface;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using AutomatizacionTela.Service.SingnalR;

namespace AutomatizacionTela.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RollCntlr : Controller
    {
        private readonly IDapperDedalo2008 _dapperDedalo2008;
        private readonly RollService _rollService;
        private readonly IHubContext<NotificationHub> _hubContext;

        public RollCntlr(IDapperDedalo2008 dapperDedalo2008, IHubContext<NotificationHub> hubContext)
        {
            _dapperDedalo2008 = dapperDedalo2008;
            _rollService = new RollService(dapperDedalo2008, hubContext);
        }

        
        [HttpGet("SearchRollLot")]
        public ActionResult SearchRollLot(int? rollo, string lote)
        {
            try
            {
                if (!rollo.HasValue && string.IsNullOrEmpty(lote))
                {
                    return BadRequest("Es necesario especificar al menos un criterio de búsqueda.");
                }

                var response = _rollService.SearchRollLot(rollo, lote);
                return Ok(response);
            }
            catch (Exception ex)
            {
                
                return StatusCode(500, "Ocurrió un error al procesar su solicitud." + ex.Message);
            }
        }

        [HttpGet("GetDefects")]
        public ActionResult GetDefects()
        {
            try
            {
                var response = _rollService.GetAllDefects();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocurrió un error al procesar su solicitud: " + ex.Message);
            }
        }
        [HttpGet("GetProviders")]
        public ActionResult GetProviders()
        {
            try
            {
                var response = _rollService.GetAllProviders();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocurrió un error al procesar su solicitud: " + ex.Message);
            }
        }

        [HttpGet("GetStates")]
        public ActionResult GetStates()
        {
            try
            {
                var response = _rollService.GetAllStates();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocurrió un error al procesar su solicitud: " + ex.Message);
            }
        }


        [HttpGet("[Action]/{IdCloth}/{IdRowColor}/{Lot}")]
        public ActionResult GetDatailDocument(int IdCloth, int IdRowColor, string Lot)
        {
            try
            {
                var response = _rollService.GetDatailDocument(IdCloth, IdRowColor, Lot);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocurrió un error al procesar su solicitud: " + ex.Message);
            }
        }



        [HttpPost("SaveUpdateRoll")]
        public async Task<IActionResult> SaveUpdateRoll([FromBody] RollSave rolls)
        {
            try
            {
                var isSaved = await _rollService.SaveUpdateRollAsync(rolls);
                if (isSaved)
                    return Ok(new { message = "Los datos se han guardado correctamente." });
                else
                    return BadRequest(new { message = "No se pudo guardar la información." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocurrió un error al procesar su solicitud: " + ex.Message);
            }
        }

        [HttpGet("SearchRollCheck")]
        public ActionResult GetRollsChecked(int? rollo, string lote)
        {
            try
            {
                if (!rollo.HasValue && string.IsNullOrEmpty(lote))
                {
                    return BadRequest("Es necesario especificar al menos un criterio de búsqueda.");
                }

                var response = _rollService.SearchRollCheck(rollo, lote);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocurrió un error al procesar su solicitud: " + ex.Message);
            }
        }

        [HttpPost("SaveUpdateCheck")]
        public async Task<IActionResult> SaveUpdateCheck([FromBody] SaveCheck rolls)
        {
            try
            {
                var isSaved = await _rollService.SaveUpdateCheckAsync(rolls);
                if (isSaved)
                    return Ok(new { message = "Los datos se han guardado correctamente." });
                else
                    return BadRequest(new { message = "No se pudo guardar la información." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocurrió un error al procesar su solicitud: " + ex.Message);
            }
        }


        [HttpGet("[Action]/{Lot}")]
        public ActionResult GetDetailCheck(string Lot)
        {
           try
            {
                var response = _rollService.GetDetailCheck(Lot);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocurrió un error al procesar su solicitud: " + ex.Message);
            }
        }


        [HttpGet("GetSummary")]
        public ActionResult GetSummary()
        {
            try
            {
                var response = _rollService.GetAllSummary();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocurrió un error al procesar su solicitud: " + ex.Message);
            }
        }

        [HttpGet("[Action]")]
        public ActionResult GetPersonal()
        {
            try
            {
                var response = _rollService.GetPersonal();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocurrió un error al procesar su solicitud: " + ex.Message);
            }
        }

        [HttpPost("[Action]/{IdUserAudit}")]
        public ActionResult PostAuditorSelected(int IdUserAudit)
        {
            try
            {
                var response = _rollService.PostAuditorSelected(IdUserAudit);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocurrió un error al procesar su solicitud: " + ex.Message);
            }
        }

        [HttpPost("[Action]")]
        public ActionResult PostEndTurn()
        {
            try
            {
                var response = _rollService.PostEndTurn();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocurrió un error al procesar su solicitud: " + ex.Message);
            }
        }
    }

}

