import React, { useEffect, useState } from "react";
import {
  InfoWindow,
  Marker,
  GoogleMap,
  useJsApiLoader,
} from "@react-google-maps/api";
import config from "../config";

// const googleMapsApiKey = "AIzaSyBGNSt2WMl3K2QkrgNlyRsIaqWBq8SYoSU";

const MiniMap = (props) => {
  const containerStyle = {
    width: config.googleMaps.miniMapWidth,
    height: config.googleMaps.miniMapHeight,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: config.googleMaps.apiKey,
  });

  const [_, setMap] = React.useState(null);
  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const center = {
    lng: props.longitude, // config.googleMaps.center.longitude,
    lat: props.latitude, // config.googleMaps.center.latitude,
  };
  const zoom = props.zoom || config.googleMaps.miniMapZoom;

  const options = {
    disableDefaultUI: true,
  };
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      mapTypeId={config.googleMaps.mapTypeId}
      options={options}
    >
      {(() => {
        if (config.googleMaps.useMarkers) {
          return (
            <Marker
              key={props.id}
              position={{ lat: props.latitude, lng: props.longitude }}
            >
              <div>{props.name}</div>
            </Marker>
          );
        } else {
          return (
            <Marker>
              <InfoWindow
                key={props.id}
                position={{ lat: props.latitude, lng: props.longitude }}
              >
                <div>{props.name}</div>
              </InfoWindow>
            </Marker>
          );
        }
      })()}
      )<></>
    </GoogleMap>
  ) : (
    <>no map</>
  );
};

export default MiniMap;
