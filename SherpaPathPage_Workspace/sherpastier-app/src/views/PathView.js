import React from 'react';
import { PathContext, PathProvider } from '../contexts/PathContext';
import { useContext } from "react";
import { useState, createContext, useEffect } from "react";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PathSingle from '../components/path/PathSingle';


const PathView = () => {


    return (



        <section>
            <div>
                <PathProvider>

                    <PathSingle />

                </PathProvider>
            </div>
            <div>Du befinner deg i pathview.</div>
            

        </section>
    )

}
export default PathView;
