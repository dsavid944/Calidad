using AutomatizacionTela.Model.SetModel;
using AutomatizacionTela.Model.ViewModel;
using AutomatizacionTela.Service.Interface;
using Dapper;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using System;

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

        public List<Defect> GetAllDefects()
        {
            var sql = "Select IdRows, Descripcion, Proveedor from AutoTel_tblDefecto";
            var response = _dapperDedalo2008.GetAll<Defect>(sql, null, commandType: CommandType.Text);
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

        public async Task<bool> SaveUpdateRollAsync(List<RollSave> rolls)
        {

            foreach (var roll in rolls)
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Option", "SaveRoll");
                parameters.Add("@IdRowCloth", roll.IdRowCloth);
                parameters.Add("@IdRowColor", roll.IdRowColor);
                parameters.Add("@IdRowUser", roll.IdRowUsuario);
                parameters.Add("@IdRowProvider", roll.IdRowProvider);
                parameters.Add("@IdRowDefect", roll.IdRowDefect);
                parameters.Add("@MeterFicha", roll.MtsFicha);
                parameters.Add("@MeterProvider", roll.MtsProvider);
                parameters.Add("@WidthProvider", roll.widthProvider);
                parameters.Add("@MeterRoyal", roll.MtsReal);
                parameters.Add("@WidthRoyal", roll.WidthReal);
                parameters.Add("@MeterDefect", roll.Mtsdeficient);
                parameters.Add("@Observation", roll.Observation);
                parameters.Add("@Lot", roll.Lot);
                parameters.Add("@Roll", roll.Roll);
                parameters.Add("@KiloRoll", roll.KiloRoll);
                parameters.Add("@Request", roll.Request);
                parameters.Add("@Reference", roll.Reference);
                parameters.Add("@Remision", roll.Remision);
                _dapperDedalo2008.GetAll<GetRoll>("AutoTelSP_Roll_Type", parameters, commandType: CommandType.StoredProcedure);
            } 
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
                parameters.Add("@IdRowsRevision", roll.IdRowsRevision);
                parameters.Add("@IdRowDefect", roll.IdRowDefecto);
                parameters.Add("@IdRowUser", roll.IdRowUsuario);
                parameters.Add("@Weight", roll.Peso);
                parameters.Add("@Rto", roll.Rto);
                parameters.Add("@Ea", roll.Ea);
                parameters.Add("@El", roll.El);
                parameters.Add("@Viro", roll.Viro);
                parameters.Add("@WidthElongation", roll.ElongacionAncho);
                parameters.Add("@LongElongation", roll.ElongacionLargo);
                parameters.Add("@ObservationCheck", roll.Observacion);
                parameters.Add("@State", roll.Estado);
                _dapperDedalo2008.GetAll<SaveCheck>("AutoTelSP_Roll_Type", parameters, commandType: CommandType.StoredProcedure);
            }
            return true;
        }

        public List<GetDetailCheck> GetDetailCheck(int IdRowsRevision)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@Option", "GetDetailCheck");
            parameters.Add("@@IdRowsRevision", IdRowsRevision);
            var response = _dapperDedalo2008.GetAll<GetDetailCheck>("AutoTelSP_Roll_Type", parameters, commandType: CommandType.StoredProcedure);
            return response;
        }
    }
}
