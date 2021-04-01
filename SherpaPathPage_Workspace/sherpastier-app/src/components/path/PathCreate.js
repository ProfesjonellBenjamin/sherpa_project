import {Row, Col} from 'react-bootstrap';
import {useState, useContext} from 'react';
import axios from 'axios';
import { PathContext } from '../../contexts/PathContext';


//create / update

const PathCreate = () => {

    
const { path } = useContext(PathContext);
const [ pathState, setPath ] = path;

//for create
//const [id, setId] = useState(pathState.id);
const [name, setName] = useState(pathState.name);
//const [price, setPrice] = useState(pathState.price);

const handleChange = ( e ) =>{
    switch(e.target.id){
        case "name":
            //setName(e.target.value);
            setPath( {...pathState, name: e.target.value}); 
            break;
        case "longitude":
            setPath( {...pathState, longitude: e.target.value}); 
            break;
        case "longitude":
            setPath( {...pathState, latitude: e.target.value}); 
            break;
        
        default:
    }
}

const createPath = () => {
    alert("Creating f5 to see changes");
    const url = "https://localhost:5001/Paths";
    const newPath = {name: pathState.name, keywords: pathState.keywords, longitude: pathState.longitude, latitude: pathState.latitude};

    axios.post(url, newPath);
}




    return (
        
        <section>
            <Row>
                <h3>Create or edit Path</h3>
            </Row>
                <Row >
                    <Col>
                    <label>Name</label>
                    <input id="name" onChange={ handleChange } type="text" value = {pathState.name}/>
                    </Col>
                    <Col>
                    <label>Long:</label>
                    <input id="longitude" onChange={ handleChange } type="text" value = {pathState.longitude}/>
                    </Col>
                    <Col>
                    <label>Lat:</label>
                    <input id="latitude" onChange={ handleChange } type="text" value = {pathState.latitude}/>
                    </Col>

                    <Col>
                    <input onClick={createPath} type="button" value="Save"/>
                    </Col>
                </Row>

        </section>



    )

}

export default PathCreate;