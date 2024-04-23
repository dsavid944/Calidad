using AutomatizacionTela.Models.ViewModels.Auditoria_Calidad;
using AutomatizacionTela.Service.Interface;
using Dapper;
using System.Collections.Generic;
using System.Data;
using System;

namespace AutomatizacionTela.Service
{
    public class ReporteAuditoriaCalidadService
    {
        private readonly IDapperDedalo2008 _dapperDedalo2008;

        public ReporteAuditoriaCalidadService(IDapperDedalo2008 dapperDedalo2008)
        {
            _dapperDedalo2008 = dapperDedalo2008;
        }

        public List<GetDatosDefecto> GetDatosDefecto(Filter filter)
        {
            DynamicParameters parameters = new DynamicParameters();

            try
            {
                parameters.Add("@Option", "DatosDefecto");
                parameters.Add("@Ano", filter.Ano == null ? null : Convert.ToDateTime(filter.Ano).ToString("yyyy"));
                parameters.Add("@Mes", filter.Mes == null ? null : Convert.ToDateTime(filter.Mes).ToString("MM"));
                parameters.Add("@Semana", filter.Semana == null ? null : filter.Semana);
                parameters.Add("@Planta", filter.Planta == null ? null : filter.Planta);

                return _dapperDedalo2008.GetAll<GetDatosDefecto>("SP_CalReporteAuditoriaCalidad", parameters, commandTimeout: 1000, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public List<GetDatosPrimeraGrafica> GetDatosPrimeraGrafica(Filter filter)
        {
            DynamicParameters parameters = new DynamicParameters();

            try
            {
                parameters.Add("@Option", "DatosPrimeraGrafica");
                parameters.Add("@Ano", filter.Ano);
                parameters.Add("@Mes", filter.Mes);
                parameters.Add("@Semana", filter.Semana);
                parameters.Add("@Modulo", filter.Planta);

                return _dapperDedalo2008.GetAll<GetDatosPrimeraGrafica>("SP_CalReporteAuditoriaCalidad", parameters, commandTimeout: 1000, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public List<GetDatosNivelCalidad> GetDatosNivelCalidad()
        {
            DynamicParameters parameters = new DynamicParameters();

            try
            {
                parameters.Add("@Option", "DatosNivelCalidad");

                return _dapperDedalo2008.GetAll<GetDatosNivelCalidad>("SP_CalReporteAuditoriaCalidad", parameters, commandTimeout: 1000, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public List<GetDatosPlanta> GetDatosPlanta()
        {
            DynamicParameters parameters = new DynamicParameters();

            try
            {
                parameters.Add("@Option", "DatosPlantas");
                return _dapperDedalo2008.GetAll<GetDatosPlanta>("SP_CalReporteAuditoriaCalidad", parameters, commandTimeout: 1000, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
