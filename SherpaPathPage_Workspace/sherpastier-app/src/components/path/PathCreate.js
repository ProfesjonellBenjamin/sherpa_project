import { Row, Col } from "react-bootstrap";
import { useState, useContext } from "react";
import axios from "axios";
import { PathContext } from "../../contexts/PathContext";
import config from "../../config";
//create / update

const PathCreate = () => {
  const { path } = useContext(PathContext);
  const [pathState, setPath] = path;

  //for create
  const [name, setName] = useState(pathState.name);

  const handleChange = (e) => {
    switch (e.target.id) {
      case "name":
        //setName(e.target.value);
        setPath({ ...pathState, name: e.target.value });
        break;
      case "longitude":
        //if(e.target.value !== "") //NaN problem
        setPath({ ...pathState, longitude: parseFloat(e.target.value) });
        
        break;
      case "latitude":
        //if(e.target.value !== "")
        setPath({ ...pathState, latitude: parseFloat(e.target.value) });
        break;
      case "description":
        setPath({ ...pathState, description: e.target.value });
        break;
      case "fylke":
        setPath({ ...pathState, fylke: e.target.value });
        break;
      case "kommune":
        setPath({ ...pathState, kommune: e.target.value });
        break;
      default:
    }
  };

  const createOrUpdatePath = () => {

    if(pathState.id != "11111111") updatePath();
    else createPath();

  }

  const createPath = () => {
    alert("Creating f5 to see changes");
    const url = config.endpoint + "/paths";
    const newPath = {
      name: pathState.name,
      //keywords: pathState.keywords,
      longitude: pathState.longitude,
      latitude: pathState.latitude,
      description: pathState.description,
      fylke: pathState.fylke,
      kommune: pathState.kommune,
    };
    console.log(newPath);
    axios.post(url, newPath, {
      crossDomain: true,
      withCredentials: true,
    });
  };

  const updatePath = () => {
    const url = config.endpoint + "/paths";
    alert(pathState.id);
    axios.put(`${url}/${pathState.id}`, pathState, {
      crossDomain: true,
      withCredentials: true,
    });
  };

  return (

    <div class="create">

      <h2>Legg til eller oppdater sti</h2>
      <form id="createForm">
      <label>Name</label>
          <input
            id="name"
            onChange={handleChange}
            type="text"
            value={pathState.name}
          />
        <label>Description:</label>
          <textarea
            id="description"
            onChange={handleChange}
            type="text"
            value={pathState.description}
          />
        <label>Lat:</label>
          <input
            id="latitude"
            onChange={handleChange}
            type="text"
            value={pathState.latitude}
          />
        <label>Long:</label>
         <input
            id="longitude"
            onChange={handleChange}
            type="text"
            value={pathState.longitude}
          />
        <label>Fylke:</label>
        <select value={pathState.fylke} id="fylke" onChange={handleChange}>
          <option value="M??re og Romsdal">M??re og Romsdal</option>
          <option value="M??re">M??re</option>
          <option value="Romsdal">Romsdal</option>
          
        </select>
        
        <label>Kommune:</label>
        <select value={pathState.kommune} id="kommune" onChange={handleChange}>
          <option value="Midsund">Midsund</option>
          <option value="Otr??ya">Otr??ya</option>

        </select>
         <input onClick={createOrUpdatePath} type="button" value="Save" />
          <input onClick={createPath} type="button" value="Save copy" />

      </form >
    </div>
    
    /*<section>
      <Row>
        <h3>Create or edit Path</h3>
      </Row>
      <Row>
        <Col>
          <label>Name</label>
          <input
            id="name"
            onChange={handleChange}
            type="text"
            value={pathState.name}
          />
        </Col>

        <Col>
          <label>Description:</label>
          <input
            id="description"
            onChange={handleChange}
            type="text"
            value={pathState.description}
          />
        </Col>


        <Col>
          <label>Long:</label>
          <input
            id="longitude"
            onChange={handleChange}
            type="text"
            value={pathState.longitude}
          />
        </Col>
        <Col>
          <label>Lat:</label>
          <input
            id="latitude"
            onChange={handleChange}
            type="text"
            value={pathState.latitude}
          />
        </Col>
        

        <Col>
          <input onClick={createOrUpdatePath} type="button" value="Save" />
          <input onClick={createPath} type="button" value="Save copy" />
        </Col>
      </Row>
    </section>*/
  );
};

export default PathCreate;
