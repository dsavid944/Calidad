using AutomatizacionTela.Model.SetModel;
using AutomatizacionTela.Service.Interface;
using Dapper;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using System;
using AutomatizacionTela.Model.ViewModel.AuditpriaRollo;
using AutomatizacionTela.Model.ViewModel.AuditoriaRollo;

namespace AutomatizacionTela.Service
{
    public class RollService
    {
        private IDapperDedalo2008 _dapperDedalo2008;

        public RollService(IDapperDedalo2008 dapperDedalo2008)
        {
            _dapperDedalo2008 = dapperDedalo2008;
        }

        public List<GetRoll> SearchRollLot(int? rollo, string lote)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@Option", "GetRoll", DbType.String);
            parameters.Add("@Roll", rollo, DbType.Int32);
            parameters.Add("@Lot", lote, DbType.String);
            var response = _dapperDedalo2008.GetAll<GetRoll>("AutoTelSP_Roll_Type", parameters, commandType: CommandType.StoredProcedure);
            return response;
        }

        public List<GetDefect> GetAllDefects()
        {
            var sql = "Select IdRows, IdRowProveedor, Descripcion from AutoTel_tblDefecto";
            var response = _dapperDedalo2008.GetAll<GetDefect>(sql, null, commandType: CommandType.Text);
            return response;
        }

        public List<GetProvider> GetAllProviders()
        {
            var sql = "Select IdRows, Proveedor from AutoTel_tblProveedor";
            var response = _dapperDedalo2008.GetAll<GetProvider>(sql, null, commandType: CommandType.Text);
            return response;
        }

        public List<GetState> GetAllStates()
        {
            var sql = "Select IdRows, Descripcion from AutoTel_tblEstado";
            var response = _dapperDedalo2008.GetAll<GetState>(sql, null, commandType: CommandType.Text);
            return response;
        }

        public List<GetDatailDocument> GetDatailDocument(int IdCloth, int IdRowColor, string Lot)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@Option", "GetDatailDocument");
            parameters.Add("@IdRowCloth", IdCloth);
            parameters.Add("@IdRowColor", IdRowColor);
            parameters.Add("@Lot", Lot);
            var response = _dapperDedalo2008.GetAll<GetDatailDocument>("AutoTelSP_Roll_Type", parameters, commandType: CommandType.StoredProcedure);
            return response;
        }

        public async Task<bool> SaveUpdateRollAsync(RollSave rolls)
        {          
            var parameters = new DynamicParameters();
            parameters.Add("@Option", "SaveRoll");
            parameters.Add("@Roll", rolls.Roll);
            parameters.Add("@Lot", rolls.Lot);
            parameters.Add("@IdRowCloth", rolls.IdRowCloth);
            parameters.Add("@IdRowColor", rolls.IdRowColor);
            parameters.Add("@IdRowUser", rolls.IdRowUsuario);
            parameters.Add("@IdRowProvider", rolls.IdRowProvider);
            parameters.Add("@IdRowDefect", string.Join(",", rolls.IdRowDefect));
            parameters.Add("@IdState", rolls.IdRowEstado);
            parameters.Add("@KiloRoll", rolls.KiloRoll);
            parameters.Add("@Request", rolls.Request);
            parameters.Add("@Reference", rolls.Reference);
            parameters.Add("@Remision", rolls.Remision);
            parameters.Add("@MeterFicha", rolls.MtsFicha);
            parameters.Add("@MeterProvider", rolls.MtsProvider);
            parameters.Add("@WidthProvider", rolls.WidthProvider);
            parameters.Add("@MeterRoyal", rolls.MtsReal);
            parameters.Add("@WidthRoyal", rolls.WidthReal);
            parameters.Add("@MeterDefect", rolls.Mtsdeficient);
            parameters.Add("@Observation", rolls.Observation);
            _dapperDedalo2008.GetAll<GetRoll>("AutoTelSP_Roll_Type", parameters, commandType: CommandType.StoredProcedure);
          

            return true;
        }


        public List<GetCheck> SearchRollCheck(int? rollo, string lote)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@Option", "GetRollCheck", DbType.String);
            parameters.Add("@Roll", rollo, DbType.Int32);
            parameters.Add("@Lot", lote, DbType.String);
            var response = _dapperDedalo2008.GetAll<GetCheck>("AutoTelSP_Roll_Type", parameters, commandType: CommandType.StoredProcedure);
            return response;
        }

        public async Task<bool> SaveUpdateCheckAsync(List<SaveCheck> rolls)
        {

            foreach (var roll in rolls)
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Option", "SaveCheck");
                parameters.Add("@IdRowRevision", roll.IdRowRevision);
                parameters.Add("@IdState", roll.IdRowEstado);
                parameters.Add("@IdRowUser", roll.IdRowUsuario);
                parameters.Add("@Weight", roll.Peso);
                parameters.Add("@Rto", roll.Rto);
                parameters.Add("@Ea", roll.Ea);
                parameters.Add("@El", roll.El);
                parameters.Add("@Viro", roll.Viro);
                parameters.Add("@WidthElongation", roll.ElongacionAncho);
                parameters.Add("@LongElongation", roll.ElongacionLargo);
                parameters.Add("@ObservationCheck", roll.Observacion);
                _dapperDedalo2008.GetAll<SaveCheck>("AutoTelSP_Roll_Type", parameters, commandType: CommandType.StoredProcedure);
            }
            return true;
        }

        public List<GetDetailCheck> GetDetailCheck(string lot)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@Option", "GetDetailCheck");
            parameters.Add("@Lot", lot);
            var response = _dapperDedalo2008.GetAll<GetDetailCheck>("AutoTelSP_Roll_Type", parameters, commandType: CommandType.StoredProcedure);
            return response;
        }

        public List<GetSummary> GetAllSummary()
        {
            var parameters = new DynamicParameters();
            parameters.Add("@Option", "GetSummary");
            var response = _dapperDedalo2008.GetAll<GetSummary>("AutoTelSP_Roll_Type", parameters, commandType: CommandType.StoredProcedure);
            return response;
        }
    }
}
