import React, { useEffect, useState, useMemo } from "react";
import {
  InfoWindow,
  Marker,
  GoogleMap,
  useJsApiLoader,
} from "@react-google-maps/api";
import config from "../config";

const containerStyle = {
  width: "100%",
  height: config.googleMaps.height,
};

function GoogleMapComponent(props) {
  const zoom = props.zoom || config.googleMaps.zoom;
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

  const [places, setPlaces] = useState([]);
  useEffect(() => {
    fetch(config.endpoint + "/paths").then(async (response) =>
      setPlaces(await response.json())
    );
  }, []);

  const center = {
    lng: config.googleMaps.center.longitude,
    lat: config.googleMaps.center.latitude,
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      mapTypeId={config.googleMaps.mapTypeId}
    >
      {places.map((place) => {
        return config.googleMaps.useMarkers ? (
          <Marker
            key={place.id}
            title={place.name}
            name={place.name}
            position={{ lat: place.latitude, lng: place.longitude }}
          />
        ) : (
          <InfoWindow
            key={place.id}
            position={{ lat: place.latitude, lng: place.longitude }}
          >
            <div>{place.name}</div>
          </InfoWindow>
        );
      })}

      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(GoogleMapComponent);
