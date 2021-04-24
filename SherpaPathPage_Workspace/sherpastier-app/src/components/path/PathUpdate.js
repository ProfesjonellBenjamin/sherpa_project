import { PathContext } from "../../contexts/PathContext";
import { useContext } from "react";
import axios from "axios";
import config from "../../config";

const PathUpdate = () => {
  const { path } = useContext(PathContext);

  const [pathState, setPath] = path;

  const updatePath = () => {
    const url = config.endpoint + "/paths";
    alert(pathState.id);
    axios.put(`${url}/${pathState.id}`, pathState, {
      crossDomain: true,
      withCredentials: true,
    });
  };

  return (
    <section>
      <h3>Endre sti</h3>
      <label>Navn</label>
      <input
        onChange={(e) => setPath({ ...pathState, name: e.target.value })}
        type="text"
        value={pathState.name}
      ></input>

      <label>Beskrivelse</label>
      <input
        onChange={(e) => setPath({ ...pathState, description: e.target.value })}
        type="text"
        value={pathState.description}
      ></input>
      
      <input onClick={updatePath} type="button" value="bytt alt"></input>

    </section>
  );
};

export default PathUpdate;
