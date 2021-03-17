import React, {useEffect, useState} from 'react'
import { InfoWindow, Marker, GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import config from '../config'

// const googleMapsApiKey = "AIzaSyBGNSt2WMl3K2QkrgNlyRsIaqWBq8SYoSU";

const containerStyle = {
    width: '100%',
    height: '400px'
};

function MyComponent() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: config.googleMaps.apiKey
    })

    const [_, setMap] = React.useState(null)
    const onLoad = React.useCallback(function callback(map) {
        setMap(map)
    }, [])
    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, [])

    const [places, setPlaces] = useState([]);
    useEffect(() => {
        fetch(config.endpoint + '/paths').then(async response => setPlaces(await response.json()));
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={config.googleMaps.center}
            zoom={config.googleMaps.zoom}
            onLoad={onLoad}
            onUnmount={onUnmount}
            mapTypeId={config.googleMaps.mapTypeId}
        >
            {places.map(place => {
                return config.googleMaps.useMarkers ? (
                    <Marker key={place.id}
                        title={place.name}
                        name={place.name}
                        position={{lat: place.latitude, lng: place.longitude}}
                    />
                ) : (
                    <InfoWindow key={place.id}
                        position={{lat: place.latitude, lng: place.longitude}}
                    >
                        <div>
                            {place.name}
                        </div>
                    </InfoWindow>
                )
            })}

            <></>
        </GoogleMap>
    ) : <></>
}

export default React.memo(MyComponent)