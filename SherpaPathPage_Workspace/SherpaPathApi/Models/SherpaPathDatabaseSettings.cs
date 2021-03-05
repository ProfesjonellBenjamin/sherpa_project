namespace SherpaPathApi.Models{

    public interface ISherpaPathDatabaseSettings{
        string PathsCollectionName { get; set; }
        //HER MÅ VI LEGGE TIL ALLE COLLECTIONS VI SKAL BRUKE
        //eks. Sherpaer trenger SherpaCollectionName osv
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }

    public class SherpaPathDatabaseSettings : ISherpaPathDatabaseSettings {
        public string PathsCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

}