


import Axios from 'axios';
import {useState, createContext, useEffect} from 'react';

export const PathContext = createContext();

export const PathProvider = ( props ) => {

    const [path, setPath] = useState( { id: "11111111", name: "Dummy 0"} );

    const [ paths, setPaths ] = useState([


        { id: "12345678", name: "Dummy 1"},
        { id: "23456789", name: "Dummy 2"},
        { id: "23456733", name: "Dummy 3"}



    ]);

    useEffect( () => {

        const url = "https://localhost:5001/Paths";

        Axios.get(url)
            .then( response => {
                setPaths(response.data);
            })

    }, [])

    return (
        <section>

        <PathContext.Provider value={ { paths: [paths, setPaths], path: [path, setPath ] } }>

            { props.children }

        </PathContext.Provider>

        </section>
    )

}