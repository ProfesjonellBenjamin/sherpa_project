using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SherpaPathApi.Models{

    public class Path{

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Name { get; set; }
        //jeg kan sette required på felt for å gi feilmelding om det mangler
        public decimal Longitude { get; set; }
        public decimal Latitude { get; set; }
        public string Description { get; set; }
        
        public string Fylke {get; set;}
        public string Kommune {get; set;}

        // Добавляем список ключевых свойств (в MongoDB это Array).
        public List<string> Keywords { get; set; }
    }

}