import {Col, Card, Button} from 'react-bootstrap';
import MiniMap from '../MiniMap';

const PathItem = ( {id, name, keywords, longitude, latitude }) => {

    return (

        <section>

        <Col>
            <Card>

                <Card.Title>{name}</Card.Title>
                <Card.Body>
                <Card.Text>{id}</Card.Text>
                <Card.Text>keywords: {keywords }</Card.Text>
                <Card.Text>longitude: {longitude}</Card.Text>
                <Card.Text>latitude: {latitude}</Card.Text>
                <MiniMap id={id} name={name} longitude={longitude} latitude={latitude}/>
                </Card.Body>
                <Button>Oppdater Path</Button>

            </Card>
        </Col>


        </section>

    )



}

export default PathItem;