import { Col, Card, Button, ButtonGroup } from "react-bootstrap";
import MiniMap from "../MiniMap";
import MiniMapKartVerket from "../MiniMapKartVerket";
import axios from "axios";
import { PathContext } from "../../contexts/PathContext";
import { useContext } from "react";
import config from "../../config";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from '../../views/Home.js';
import About from '../../views/About.js';
import PathView from "../../views/PathView";


const PathItem = ({ id, name, keywords, longitude, latitude, login, description, fylke, kommune }) => {
  const { path } = useContext(PathContext);
  const { paths } = useContext(PathContext);

  const [pathState, setPath] = path;

  const [pathsState, setPaths] = paths;

  const SetSelectedPath = () => {
    setPath({
      id: id,
      name: name,
      keywords: keywords,
      longitude: longitude,
      latitude: latitude,
      description: description,
      fylke: fylke,
      kommune: kommune,
    });
  };

  const deletePath = () => {
    const url = config.endpoint + "/paths";
    axios.delete(`${url}/${id}`, {
      crossDomain: true,
      withCredentials: true,
    });

    axios.get(url).then((response) => {
      setPaths(response.data);
    });
  };

  const showPathView = () => {

    //alert(name);
    //SetSelectedPath();
    
  }

  return (
    <section class="card">

      
      <Col>
        <Card>
          <Card.Title>{name}</Card.Title>
          <Card.Body>
            {/*<Card.Text>{id}</Card.Text>
            <Card.Text>keywords: {keywords}</Card.Text>
            <Card.Text>longitude: {longitude}</Card.Text>
            <Card.Text>latitude: {latitude}</Card.Text>
            */}
            {config.miniMapsType === "googleMaps" && (
              <MiniMap
                id={id}
                name={name}
                longitude={longitude}
                latitude={latitude}
              />
            )}

            {config.miniMapsType === "kartverketMaps" &&
              longitude &&
              latitude && (
                <MiniMapKartVerket
                  id={id}
                  name={name}
                  longitude={longitude}
                  latitude={latitude}
                  selectedPlaceId={id}
                />
              )}
          </Card.Body>
          <ButtonGroup>
            
            <Button variant="secondary" size="sm" onClick={SetSelectedPath} style={{ margin: '2px' }}>Oppdater</Button>
            <Button variant="secondary" size="sm" onClick={deletePath} style={{ margin: '2px' }}>Slett</Button>
            <Button variant="secondary" size="sm" as={Link} onClick={showPathView} to={"/path/" + id} style={{ margin: '2px' }}>Les mer</Button>

          </ButtonGroup>
          
        </Card>
      </Col>

    </section>
  );
};

export default PathItem;