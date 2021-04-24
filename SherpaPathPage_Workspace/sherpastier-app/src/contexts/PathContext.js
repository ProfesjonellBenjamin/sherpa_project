import Axios from "axios";
import { useState, createContext, useEffect } from "react";
import config from "../config";

export const PathContext = createContext();

export const PathProvider = (props) => {
  const [path, setPath] = useState({ id: "11111111", name: "Dummy 007", latitude: 60 , longitude: 2.6705961707866 , 
  description: "this is a description", fylke: "Møre og Romsdal", kommune: "Midsund" });

  const [paths, setPaths] = useState([
    { id: "12345678", name: "Dummy 1", latitude: 10, longitude: 60, description: "this is a description", fylke: "Møre og Romsdal", kommune: "Midsund" },
    { id: "23456789", name: "Dummy 2" },
    { id: "23456733", name: "Dummy 3" },
  ]);

  useEffect(() => {
    const url = config.endpoint + "/paths";

    Axios.get(url).then((response) => {
      setPaths(response.data);
    });
  }, []);

  return (
    <section>
      <PathContext.Provider
        value={{ paths: [paths, setPaths], path: [path, setPath] }}
      >
        {props.children}
      </PathContext.Provider>
    </section>
  );
};
