import React from 'react';
import { AdminContext, AdminProvider } from '../contexts/AdminContext';
import { useContext } from "react";
import { useState, createContext, useEffect } from "react";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Admin from './Admin';


const AdminView = () => {

    return (
        <section>
            <div>
                <AdminProvider>
                    <Admin />
                </AdminProvider>
                   
            </div>
            <div>Du befinner deg i adminview.</div>
            

        </section>
    )

}
export default AdminView;
