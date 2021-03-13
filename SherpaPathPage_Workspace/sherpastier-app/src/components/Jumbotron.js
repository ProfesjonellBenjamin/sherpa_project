import React from 'react';
import { Jumbotron as Jumbo, Container } from 'react-bootstrap';
import styled from 'styled-components';
import sherpaImage from '../assets/sherpasti.jpg';

const Styles = styled.div`
.jumbo {
    background: url(${sherpaImage}) no-repeat fixed bottom;
    background-size: cover;
    color: #ccc;
    height: 300px;
    position: relative;
    z-index: -2;
}
.overlay {
    background-color: #000;
    opacity: 0.3;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
}


`;

export const Jumbotron = () => (
    <Styles>
        <Jumbo fluid className="jumbo">
            <div className="overlay"></div>
            <Container>
                <h1>Velkommen</h1>
                <p>til Sherpastier</p>
            </Container>
        </Jumbo>
    </Styles>

)