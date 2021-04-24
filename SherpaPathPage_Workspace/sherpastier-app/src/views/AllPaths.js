import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {PathProvider} from '../contexts/PathContext';
import PathList from '../components/path/PathList';
import PathItem from '../components/path/PathItem';
import PathUpdate from '../components/path/PathUpdate';

const AllPaths = () => {
    return (
        <Row>
            <Col>
                <section>
                    <h3>Alle Stier Testing:</h3>

                    <PathProvider>
                        <PathList></PathList>

                    </PathProvider>

                </section>

            </Col>
        </Row>

        
    )
}
export default AllPaths;