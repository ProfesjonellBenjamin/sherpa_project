import {Col, Card, Button, ButtonGroup} from 'react-bootstrap';
import MiniMap from '../MiniMap';
import axios from 'axios';
import {PathContext} from '../../contexts/PathContext';
import {useContext} from 'react';

const PathItem = ( {id, name, keywords, longitude, latitude }) => {


    const {path} = useContext( PathContext );
    const {paths} = useContext( PathContext );

    const [pathState, setPath] = path;

    const [pathsState, setPaths] = paths;


    const SetSelectedPath = () =>{

        setPath({id: id, name: name, keywords: keywords, longitude: longitude, latitude: latitude});

    }

    const deletePath = () =>{

        const url = "https://localhost:5001/Paths";
        axios.delete(`${url}/${id}`);

        axios.get( url )
            .then(response => {
                setPaths(response.data);
            });
    }

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
                <ButtonGroup>
                    <Button onClick={SetSelectedPath}>Oppdater</Button>
                    <Button onClick={deletePath}>Delete</Button>
                </ButtonGroup>

            </Card>
        </Col>


        </section>

    )

}

export default PathItem;