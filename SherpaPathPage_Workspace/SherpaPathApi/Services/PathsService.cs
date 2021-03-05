using System;
using MongoDB.Driver;
using SherpaPathApi.Models;
using System.Linq;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using MongoDB.Bson;

//Må skrives om når vi får tilgang på domenet

namespace SherpaPathApi.Services{
    public class PathsService {
        private readonly IMongoCollection<Path> _Paths;

        private readonly Collation _caseInsensitiveCollation = new Collation("en", strength: CollationStrength.Primary);

        
        public PathsService(ISherpaPathDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _Paths = database.GetCollection<Path>(settings.PathsCollectionName);
            
            // Необходимо подготовить поля "name" и "keywords" для быстрого поиска,
            // для этого создадим индексы для каждого из полей, по которым будут искаться данные

            // Объявим правило создания индексов
            var indexKeysDefinition = Builders<Path>.IndexKeys
                // укажем что нужно индексировать поле "name" в алфавитном порядке
                .Text(path => path.Name)
                // укажем что нужно индексировать поле "keywords" в алфавитном порядке
                .Text(path => path.Keywords);
            
            // Добавляем наше правило индексации в базу данных
            _Paths.Indexes.CreateOne(new CreateIndexModel<Path>(indexKeysDefinition));
        }

        public List<Path> Get(){
            return _Paths.Find( Path => true ).ToList();
        }
        public Path Get(string id){
            return _Paths.Find( Path => Path.Id == id ).SingleOrDefault();
        }

        public List<Path> Find(string query)
        {
            // Если строка для поиска не указана или пуста - просто выводим объекты из коллекции.
            if (string.IsNullOrEmpty(query))
                return Get();
            
            // Создаём регулярное вырашение для поиска в базе данных (для поиска без учёта ресстра символов).
            // Т.е. не важно, как искать "HeLLo" или "hello", результат должен быть схожим.
            
            // Используем функцию Regex.Escape(),
            // чтобы все символы были поисковой строкой (совпадение символов),
            // а не частью регулярного выражения.
            var caseInsensitiveRegExp = new BsonRegularExpression("/" + Regex.Escape(query) + "/i");

            // Создаём фильтр поиска элементов по полям "name" и "keywords"
            var filter =
                // Объединяем 2 условия через "ИЛИ", т.е. или "name" должен содержать поисковую фразу или "keywords" 
                Builders<Path>.Filter.Or(
                    // Path должен содержать поисковую фразу в поле "name"
                    Builders<Path>.Filter.Regex(path => path.Name, caseInsensitiveRegExp),
                    // Или Path должен содержать поисковую фразу в поле "keywords" (массив слов)
                    Builders<Path>.Filter.Regex(path => path.Keywords, caseInsensitiveRegExp)
                );

            // Выполняем поиск элементов с условиями:
            // .Name содержит поисковую фразу (без учётра реестра)
            // или .Keywords содержит поисковую фразу (без учётра реестра)
            // и сохраняем результат в список элементов.
            return _Paths.Find(filter).ToList();
        }

        public Path Create(Path Path){
            _Paths.InsertOne(Path);
            return Path;
        }

        public void Remove(string id){
            _Paths.DeleteOne( Path => Path.Id == id );
        }

        public void Update(string id, Path PathIn ){
            _Paths.ReplaceOne( Path => Path.Id == id, PathIn );
        }
    }
}