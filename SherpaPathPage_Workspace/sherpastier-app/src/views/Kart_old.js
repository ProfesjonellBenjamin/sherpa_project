import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Map from "../components/Map";

const Kart = () => {
    return (
        <Row>
            <Col>
                <section>
                    <h3>Kart</h3>
                    <p> Kart fra google mæps eller Kartverket, to be determined.</p>

                    <Map />

                </section>

            </Col>
        </Row>
    )
}
export default Kart;