using AutomatizacionTela.Model.SetModel;
using AutomatizacionTela.Model.ViewModel;
using AutomatizacionTela.Service;
using AutomatizacionTela.Service.Interface;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace AutomatizacionTela.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RollCntlr : Controller
    {
        private readonly IDapperDedalo2008 _dapperDedalo2008;
        private readonly RollService _rollService;

        public RollCntlr(IDapperDedalo2008 dapperDedalo2008)
        {
            _dapperDedalo2008 = dapperDedalo2008;
            _rollService = new RollService(dapperDedalo2008);
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
        public async Task<IActionResult> SaveUpdateRoll([FromBody] List<RollSave> rolls)
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
        public async Task<IActionResult> SaveUpdateCheck([FromBody] List<SaveCheck> rolls)
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


        [HttpGet("[Action]/{IdRowsRevision}")]
        public ActionResult GetDetailCheck(int IdRowsRevision)
        {
            try
            {
                var response = _rollService.GetDetailCheck(IdRowsRevision);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocurrió un error al procesar su solicitud: " + ex.Message);
            }
        }
    }

}

