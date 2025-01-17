﻿using AutomatizacionTela.Service.Interface;
using Dapper;
using System.Collections.Generic;
using System.Data;
using System;
using Newtonsoft.Json;
using AutomatizacionTela.Model.ViewModel.AuditpriaRollo;
using Project.Models.SetModels.Auditoria_Calidad;
using AutomatizacionTela.Models.SetModels.Auditoria_Calidad;
using AutomatizacionTela.Models.ViewModels.Auditoria_Calidad;
using AutomatizacionTela.Service.DapperService;
using System.Net;
using AutomatizacionTela.Model.ViewModel;
using System.IO;
using System.Net.Mail;
using AutomatizacionTela.Model.SetModel;

namespace AutomatizacionTela.Service
{
    public class AuditoriaCalidadService
    {
        private readonly IDapperDedalo2008 _dapperDedalo2008;

        public AuditoriaCalidadService(IDapperDedalo2008 dapperDedalo2008)
        {
            _dapperDedalo2008 = dapperDedalo2008;
        }

        public List<GetPlantas> GetPlantas()
        {

            var parametros = new DynamicParameters();

            try
            {
                parametros.Add("@Option", "GetPlantas");
                return _dapperDedalo2008.GetAll<GetPlantas>($"SpCal_AuditoriaCalidad", parametros, commandTimeout: 5000, CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public List<GetModulos> GetModulos(int plantaId)
        {

            var parametros = new DynamicParameters();

            try
            {
                parametros.Add("@Option", "GetModulos");
                parametros.Add("@PlantaId", plantaId);
                return _dapperDedalo2008.GetAll<GetModulos>($"SpCal_AuditoriaCalidad", parametros, commandTimeout: 5000, CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public List<GetTipoPrendas> GetTipoPrendas()
        {

            var parametros = new DynamicParameters();

            try
            {
                parametros.Add("@Option", "GetTipoPrendas");
                return _dapperDedalo2008.GetAll<GetTipoPrendas>($"SpCal_AuditoriaCalidad", parametros, commandTimeout: 5000, CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public List<GetPrendas> GetPrendas(int prendaId)
        {

            var parametros = new DynamicParameters();

            try
            {
                parametros.Add("@Option", "GetPrendas");
                parametros.Add("@PrendaId", prendaId);
                return _dapperDedalo2008.GetAll<GetPrendas>($"SpCal_AuditoriaCalidad", parametros, commandTimeout: 5000, CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public List<GetTipoDefectos> GetTipoDefectos()
        {

            var parametros = new DynamicParameters();

            try
            {
                parametros.Add("@Option", "GetTipoDefectos");
                return _dapperDedalo2008.GetAll<GetTipoDefectos>($"SpCal_AuditoriaCalidad", parametros, commandTimeout: 5000, CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public List<GetDefectos> GetDefectos(int tipoDefectoId)
        {

            var parametros = new DynamicParameters();

            try
            {
                parametros.Add("@Option", "GetDefectos");
                parametros.Add("@TipoDefectoId", tipoDefectoId);
                return _dapperDedalo2008.GetAll<GetDefectos>($"SpCal_AuditoriaCalidad", parametros, commandTimeout: 5000, CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public int EnviarDatos(Calidad calidad)
        {
            var parametros = new DynamicParameters();

            try
            {
                double porcentajeDefectuosos = ((Convert.ToDouble(calidad.Cantidad) / Convert.ToDouble(calidad.UndRevisadas)) * 100);

                parametros.Add("@Option", "PostDatosDefectos");
                parametros.Add("@PlantaId", calidad.PlantaId);
                parametros.Add("@Modulo", calidad.Modulo);
                parametros.Add("@OrdenCorteCalidad", calidad.OrdenCorte);
                parametros.Add("@NumeroArte", calidad.NumeroArte);
                parametros.Add("@Referencia", calidad.Referencia);
                parametros.Add("@PrendaId", calidad.PrendaId);
                parametros.Add("@PrendasDetalleId", calidad.PrendasDetalleId);
                parametros.Add("@TipoDefectoId", calidad.TipoDefectoId);
                parametros.Add("@DefectoId", calidad.DefectoId);
                parametros.Add("@Cantidad", calidad.Cantidad);
                parametros.Add("@PorcentajeDef", porcentajeDefectuosos);
                parametros.Add("@UndRevisadas", calidad.UndRevisadas);
                parametros.Add("@AuditoraId", calidad.AuditoraId);

                return _dapperDedalo2008.Insert<int>($"SpCal_AuditoriaCalidad", parametros, CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {

                throw ex;
            }

            return 1;
        }
        public List<GetOrdenCorte> GetOrdenCorteServ(int orden)
        {

            var parametros = new DynamicParameters();

            try
            {
                parametros.Add("@Option", "GetOrdenCorte");
                parametros.Add("@OrdenCorte", orden);
                return _dapperDedalo2008.GetAll<GetOrdenCorte>($"SpCal_AuditoriaCalidad", parametros, commandTimeout: 5000, CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public List<GetTelas> GetTelas()
        {

            var parametros = new DynamicParameters();

            try
            {
                parametros.Add("@Option", "GetTelas");
                return _dapperDedalo2008.GetAll<GetTelas>($"SpCal_AuditoriaCalidad", parametros, commandTimeout: 5000, CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public int SetReposicionTelasServ(SetReposicionTelas reposicion)
        {
            try
            {
                string json = JsonConvert.SerializeObject(reposicion);
                var parameter = new DynamicParameters();
                parameter.Add("@Option", "SetReposicionTelas");
                parameter.Add("@Json", json);

                var response = _dapperDedalo2008.Insert<int>($"SpCal_AuditoriaCalidad", parameter, commandType: CommandType.StoredProcedure);

                return response;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        public List<GetReposicionTelas> GetReposicionTelasServ()
        {

            var parametros = new DynamicParameters();

            try
            {
                parametros.Add("@Option", "GetReposicionTelas");
                return _dapperDedalo2008.GetAll<GetReposicionTelas>($"SpCal_AuditoriaCalidad", parametros, commandTimeout: 5000, CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public List<GetDetallesReposicion> GetDetallesReposicionServ()
        {

            var parametros = new DynamicParameters();

            try
            {
                parametros.Add("@Option", "GetDetallesReposicion");
                return _dapperDedalo2008.GetAll<GetDetallesReposicion>($"SpCal_AuditoriaCalidad", parametros, commandTimeout: 5000, CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public List<GetArtes> GetArtes(string ordenCorte)
        {

            var parametros = new DynamicParameters();

            try
            {
                parametros.Add("@Option", "GetArtes");
                parametros.Add("@OrdenCorte", ordenCorte);
                return _dapperDedalo2008.GetAll<GetArtes>($"SpCal_AuditoriaCalidad", parametros, commandTimeout: 5000, CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public bool UpdateEstadoReposicionServ(SetUpdateEstadoReposicion setUpdateEstadoReposicion)
        {
            var parameter = new DynamicParameters();
            parameter.Add("@Option", "UpdateEstadoReposicion");
            parameter.Add("@IdRows", setUpdateEstadoReposicion.IdRows);
            parameter.Add("@Estado", setUpdateEstadoReposicion.Estado);
            parameter.Add("@Aprobador", setUpdateEstadoReposicion.Aprobador);

            var response = _dapperDedalo2008.Insert<int>($"SpCal_AuditoriaCalidad", parameter, commandType: CommandType.StoredProcedure);

            if (response == 0)
                return false;
            else
                return true;
        }

        public List<GetOperarios> GetOperariosServ()
        {

            var parametros = new DynamicParameters();

            try
            {
                parametros.Add("@Option", "GetOperarios");
                return _dapperDedalo2008.GetAll<GetOperarios>($"SpCal_AuditoriaCalidad", parametros, commandTimeout: 5000, CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
  

        public List<GetPermission> GetPermission(string Email)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@Option", "GetPermission");
            parameters.Add("@Email", Email);
            var response = _dapperDedalo2008.GetAll<GetPermission>($"SpCal_AuditoriaCalidad", parameters, commandType: CommandType.StoredProcedure);
            return response;
        }

        public bool SendMail(SetEmailRespData data)
        {
            MemoryStream obj_stream = new MemoryStream();
            byte[] byteCol = obj_stream.ToArray();
            List<Attachments> files = new List<Attachments>();
            List<EmailTo> emailTo = new List<EmailTo>();
            emailTo.Add(new EmailTo { Email = data.EmailUserToSend });

            List<string> parameters = new List<string>
            {
               data.EmailUserToSend,
               data.JobTitle,
               data.Telas,
               data.Url,
               data.Planta,
               data.Estado,
               data.Username

            };
            SendEmailWithAttachments sendEmailModel = new SendEmailWithAttachments
            {
                EmailTo = emailTo,
                Parameters = parameters,
                Asunto = data.Subject,
                Attachments = files,
                PathTemplate = data.Template
            };
            //object o = JsonConvert.DeserializeObject(json1);
            string json = JsonConvert.SerializeObject(sendEmailModel, Newtonsoft.Json.Formatting.Indented);
            var responseBody = string.Empty;
            var url = "https://miclocal.com.co:9354/api/Email/SendEmailWithAttachments";
            var request = (HttpWebRequest)WebRequest.Create(url);
            request.Method = "POST";
            request.Headers.Add("Content-Type: application/json; charset=utf-8");
            using (var streamWriter = new StreamWriter(request.GetRequestStream()))
            {
                streamWriter.Write(json);
                streamWriter.Flush();
                streamWriter.Close();
            }
            using (WebResponse response = request.GetResponse())
            {
                using (Stream strReader = response.GetResponseStream())
                {
                    //if (strReader == null) return 0;
                    using (StreamReader objReader = new StreamReader(strReader))
                    {
                        responseBody = objReader.ReadToEnd();
                    }
                }
            }
            return true;
        }
    }
}
