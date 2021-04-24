import axios from "axios";
import { useState, createContext, useEffect } from "react";
import config from "../config";

export const AdminContext = createContext();

export const AdminProvider = (props) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    // TODO: change
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [registerAllowed, setRegisterAllowed] = useState(false);


    

      return(
          //nothing
          <section>
      <AdminContext.Provider
        value={{ user: [user, setUser], registerAllowed: [registerAllowed, setRegisterAllowed], loading: [loading, setLoading] }}
        >
        {props.children}
      </AdminContext.Provider>
      <div>admin context</div>
    </section>
      )


}