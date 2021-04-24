import React from 'react';
import { PathContext, PathProvider } from '../../contexts/PathContext';
import { useContext } from "react";
import ImageItem from './ImageItem';
import MiniMapKartVerket from "../MiniMapKartVerket";


const PathSingle = () => {

    const { paths } = useContext(PathContext);
    const [ pathsState, setPaths ] = paths;

    const { path } = useContext(PathContext);
    const [ pathState, setPath ] = path;
    
    var obj;

    const getPathFromUrl = () => {

        //get id from url
        const url = window.location.href;
        const t = url.indexOf('path/');
        const cutUrl = url.slice(t + 5);
        obj = pathsState.find(x => { return x.id === cutUrl });

        //alert(obj.id);

        if(obj) return obj;
        // else say not found
        //else alert("no");
        return;

    }

    setPath(getPathFromUrl());

    if(pathState){
        return(
            <div>
                <h3>{ pathState.name } </h3>
                <MiniMapKartVerket
                  id={pathState.id}
                  name={pathState.name}
                  longitude={pathState.longitude}
                  latitude={pathState.latitude}
                  selectedPlaceId={pathState.id}
                  height={220} width ={440}
                />

                <p>Fylke: {pathState.fylke}</p>
                <p>Kommune: {pathState.kommune}</p>
                
                <h3>Beskrivelse:</h3>
                <p>{pathState.description}</p>
                <ImageItem/>
                <ImageItem name="test" 
                path=""/>
                
            </div>
        )
    } else return <div>Ingen sti funnet!</div>

}

export default PathSingle;