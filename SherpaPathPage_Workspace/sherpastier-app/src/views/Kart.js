import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import GoogleMap from "../components/GoogleMap";
import KartverketMap from "../components/KartverketMap";
import "leaflet/dist/leaflet.css";
import config from "../config";
import { useParams } from "react-router-dom";

function Kart() {
  const { placeId } = useParams();

  const mapComponent =
    config.mapsType === "kartverketMaps" ? (
      <KartverketMap selectedPlaceId={placeId} />
    ) : (
      <GoogleMap />
    );

  return (
    <Row>
      <Col>
        <section>
          <h3>Kart</h3>
          <p> Kart fra google mæps eller Kartverket, to be determined.</p>

          {mapComponent}
          {/* <KartverketMap selectedPlaceId={placeId} /> */}
          {/* <GoogleMap /> */}
        </section>
      </Col>
    </Row>
  );
}

export default Kart;
