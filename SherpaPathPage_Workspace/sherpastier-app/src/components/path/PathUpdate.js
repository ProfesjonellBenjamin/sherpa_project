import {PathContext} from '../../contexts/PathContext';
import {useContext} from 'react';
import axios from 'axios';


const PathUpdate = () => {

    const {path} = useContext( PathContext );

    const [pathState, setPath] = path;

    const updatePath = () => {
        const url = "https://localhost:5001/Paths";
        alert(pathState.id);
        axios.put(`${url}/${pathState.id}`, pathState);
    }


    return (
        <section>
            <h3>Endre sti</h3>
            <label>Navn</label>
            <input onChange={(e) => setPath( {...pathState, name: e.target.value})} type ="text" value={pathState.name}></input>
            <input onClick={updatePath} type ="button" value="bytt"></input>


        </section>



    )



} 

export default PathUpdate;