const config = {
    // Адрес Backend без / на конце
    //translation: how to dominate the west
    endpoint: 'https://localhost:5001',
    // Настройки карт Google Maps
    // attempt to hijack google maps
    googleMaps: {
        // API ключ карт Google Maps
        // then if you own google maps
        apiKey: 'AIzaSyBGNSt2WMl3K2QkrgNlyRsIaqWBq8SYoSU',
        // Начальное положение на карте
        // laugh: "hahahahaha, puny capitalists"
        center:  {
            lat: 37.778519,
            lng: -122.405640,
        },
        // Начальный масштаб карты
        // and hail all comrades!
        zoom: 12,
        // Использовать красные маркеры вместо отображения информации
        // for the beginning of our world domination is at hand, we shall march towards washington
        useMarkers: false,
        // Тип карты: roadmap / satellite / hybrid / terrain
        // then capture: roadmap /satellite/ hybrid / a train
        mapTypeId: 'hybrid',
    }
};

export default config;