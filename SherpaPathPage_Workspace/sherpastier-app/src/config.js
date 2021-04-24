const config = {
  // Адрес Backend без / на конце
  endpoint: "https://localhost:5001",

  // Тип используемых карт: "kartverketMaps" или "googleMaps"
  mapsType: "kartverketMaps",

  // Тип используемых карт для админки: "kartverketMaps" или "googleMaps"
  miniMapsType: "kartverketMaps",

  // Настройки карт Google Maps
  googleMaps: {
    // API ключ карт Google Maps
    apiKey: "AIzaSyBGNSt2WMl3K2QkrgNlyRsIaqWBq8SYoSU",
    // Начальное положение на карте
    center: {
      latitude: 64.2,
      longitude: 11.1,
    },
    // Начальный масштаб карты
    zoom: 6,
    // Высота карты
    height: 600,
    // Ширина, высота, масштаб для карты в админке
    miniMapWidth: 200,
    miniMapHeight: 200,
    miniMapZoom: 12,
    // Использовать красные маркеры вместо отображения информации
    useMarkers: false,
    // Тип карты: roadmap / satellite / hybrid / terrain
    mapTypeId: "hybrid",
  },

  // Настройки карт Kartverket
  kartverketMaps: {
    // Начальное положение на карте
    center: {
      latitude: 61.2,
      longitude: 11.1,
    },
    // Начальный масштаб карты
    zoom: 6,
    // Масштаб карты при открытии определённой точки из поиска или по ссылке
    // http://localhost:3000/kart/{id места из mondgodb}
    placeZoom: 12,
    // Высота карты
    height: 600,
    // Ширина, высота, масштаб для карты в админке
    miniMapWidth: 140,
    miniMapHeight: 140,
    miniMapZoom: 12,
    // Разрешить приближение колёсиком мыши
    scrollWheelZoom: true,
  },
};

export default config;
