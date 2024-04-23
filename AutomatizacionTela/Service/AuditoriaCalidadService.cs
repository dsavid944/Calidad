using AutomatizacionTela.Service.Interface;
using Dapper;
using System.Collections.Generic;
using System.Data;
using System;
using Newtonsoft.Json;
using AutomatizacionTela.Model.ViewModel.AuditpriaRollo;
using Project.Models.SetModels.Auditoria_Calidad;
using AutomatizacionTela.Models.SetModels.Auditoria_Calidad;
using AutomatizacionTela.Models.ViewModels.Auditoria_Calidad;

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
        public List<GetListadoGeneral> GetLitsadoGeneralServ()
        {

            var parametros = new DynamicParameters();

            try
            {
                parametros.Add("@Option", "GetListadoGeneral");
                return _dapperDedalo2008.GetAll<GetListadoGeneral>($"SpCal_AuditoriaCalidad", parametros, commandTimeout: 5000, CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public List<GetCalidadReposicionSemana> GetCalidadReposicionSemanaServ()
        {

            var parametros = new DynamicParameters();

            try
            {
                parametros.Add("@Option", "GetCalidadReposicionSemana");
                return _dapperDedalo2008.GetAll<GetCalidadReposicionSemana>($"SpCal_AuditoriaCalidad", parametros, commandTimeout: 5000, CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public List<GetCalidadReposicionMes> GetCalidadReposicionMesServ()
        {

            var parametros = new DynamicParameters();

            try
            {
                parametros.Add("@Option", "GetCalidadReposicionMes");
                return _dapperDedalo2008.GetAll<GetCalidadReposicionMes>($"SpCal_AuditoriaCalidad", parametros, commandTimeout: 5000, CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public List<GetReposicionMetrosSemana> GetReposicionMetrosSemanaServ()
        {

            var parametros = new DynamicParameters();

            try
            {
                parametros.Add("@Option", "GetReposicionMetrosSemana");
                return _dapperDedalo2008.GetAll<GetReposicionMetrosSemana>($"SpCal_AuditoriaCalidad", parametros, commandTimeout: 5000, CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public List<GetReposicionMetrosMes> GetReposicionMetrosMesServ()
        {

            var parametros = new DynamicParameters();

            try
            {
                parametros.Add("@Option", "GetReposicionMetrosMes");
                return _dapperDedalo2008.GetAll<GetReposicionMetrosMes>($"SpCal_AuditoriaCalidad", parametros, commandTimeout: 5000, CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public List<GetReferencia_Unidades_Metros> GetReferencia_Unidades_MetrosServ()
        {

            var parametros = new DynamicParameters();

            try
            {
                parametros.Add("@Option", "GetReferencia_Unidades_Metros");
                return _dapperDedalo2008.GetAll<GetReferencia_Unidades_Metros>($"SpCal_AuditoriaCalidad", parametros, commandTimeout: 5000, CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public List<GetOperario_Unidades_Metros> GetOperario_Unidades_MetrosServ()
        {

            var parametros = new DynamicParameters();

            try
            {
                parametros.Add("@Option", "GetOperario_Unidades_Metros");
                return _dapperDedalo2008.GetAll<GetOperario_Unidades_Metros>($"SpCal_AuditoriaCalidad", parametros, commandTimeout: 5000, CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public List<GetTiempoOperario> GetTiempoOperarioServ()
        {

            var parametros = new DynamicParameters();

            try
            {
                parametros.Add("@Option", "GetTiempoOperario");
                return _dapperDedalo2008.GetAll<GetTiempoOperario>($"SpCal_AuditoriaCalidad", parametros, commandTimeout: 5000, CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public List<GetDefectoUnidades> GetDefectoUnidadesServ()
        {

            var parametros = new DynamicParameters();

            try
            {
                parametros.Add("@Option", "GetDefectoUnidades");
                return _dapperDedalo2008.GetAll<GetDefectoUnidades>($"SpCal_AuditoriaCalidad", parametros, commandTimeout: 5000, CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }


    }
}
