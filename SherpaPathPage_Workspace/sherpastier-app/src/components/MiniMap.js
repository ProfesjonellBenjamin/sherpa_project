import React, {useEffect, useState} from 'react'
import { InfoWindow, Marker, GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import config from '../config'

// const googleMapsApiKey = "AIzaSyBGNSt2WMl3K2QkrgNlyRsIaqWBq8SYoSU";



const MiniMap = (props) => {

    const containerStyle = {
        width: '20px%',
        height: '200px'
    };

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

    return isLoaded ? (


    <GoogleMap
            mapContainerStyle={containerStyle}
            center={config.googleMaps.center}
            zoom={config.googleMaps.zoom}
            onLoad={onLoad}
            onUnmount={onUnmount}
            mapTypeId={config.googleMaps.mapTypeId}
        >
            { 
        (() => {
          if(config.googleMaps.useMarkers) {
            return <Marker key={props.id}
            position={{lat: props.latitude, lng: props.longitude}}
        >
            <div>
                {props.name}
            </div>
        </Marker>
          } else {
            return <Marker>
                <InfoWindow key={props.id}
                        position={{lat: props.latitude, lng: props.longitude}}
                    >
                        <div>
                            {props.name}
                        </div>
                    </InfoWindow>
                </Marker>
                
          }
        })()
      }

            
    )
            

            <></>
        </GoogleMap>
    ): <>no map</>


}


export default MiniMap;