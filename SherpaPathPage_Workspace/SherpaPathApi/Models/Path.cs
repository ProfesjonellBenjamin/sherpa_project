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
        
        // Добавляем список ключевых свойств (в MongoDB это Array).
        public List<string> Keywords { get; set; }
    }

}