import React, { useContext, useState, useEffect } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import axios from "axios";
import PathCreate from "../components/path/PathCreate";
import PathUpdate from "../components/path/PathUpdate";
import PathList from "../components/path/PathList";
import { PathContext, PathProvider } from "../contexts/PathContext";
import { AdminContext, AdminProvider } from "../contexts/AdminContext";

import config from "../config";

//add / delete / update

const Admin = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  // TODO: change
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [registerAllowed, setRegisterAllowed] = useState(false);

  useEffect(() => {
    if (user) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get(config.endpoint + "/auth/me", {
          crossDomain: true,
          withCredentials: true,
        });
        setUser(response.data);
      } catch (ex) {
        console.error(ex);
      } finally {
        setLoading(false);
      }
    };

    const fetchRegisterAllowed = async () => {
      try {
        const response = await axios.get(
          config.endpoint + "/auth/registerallowed"
        );
        setRegisterAllowed(response.data.allowed);
      } catch (ex) {
        console.error(ex);
      }
    };

    fetchRegisterAllowed();
    fetchUser();
  }, []);

  if (loading) {
    return (
      <Row>
        Loading...
        <br />
        <Spinner animation="border" variant="primary" />
      </Row>
    );
  }

  const loginHandler = async () => {
    try {
      const data = {
        email: login,
        password,
      };
      setLoading(true);
      const response = await axios.post(config.endpoint + "/auth/login", data, {
        crossDomain: true,
        withCredentials: true,
      });
      setUser(response.data);
      setPassword("");
    } catch (ex) {
      console.error(ex);
    } finally {
      setLoading(false);
    }
  };

  const logoutHandler = async () => {
    try {
      setLoading(true);
      await axios.post(config.endpoint + "/auth/logout", null, {
        crossDomain: true,
        withCredentials: true,
      });
      setUser(null);
    } catch (ex) {
      console.error(ex);
    } finally {
      setLoading(false);
    }
  };

  const registerHandler = async () => {
    try {
      const data = {
        email: login,
        password,
      };
      setLoading(true);
      const response = await axios.post(
        config.endpoint + "/auth/register",
        data,
        {
          crossDomain: true,
          withCredentials: true,
        }
      );
      setUser(response.data);
      setPassword("");
    } catch (ex) {
      console.error(ex);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Row style={{ maxWidth: 480 }}>
        <Col>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">E-Mail</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Email"
              aria-label="Email"
              aria-describedby="basic-addon1"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon2">Password</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Password"
              aria-label="Password"
              aria-describedby="basic-addon2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <Button onClick={loginHandler}>Login</Button>
            {registerAllowed && (
              <Button onClick={registerHandler} style={{ marginLeft: 15 }}>
                Register
              </Button>
            )}
          </InputGroup>
        </Col>
      </Row>
    );
  }

  return (
    <Row>
      <Col>
        <section>
          <h3>Admin</h3>
          <Button onClick={logoutHandler} style={{ marginBottom: 20 }}>
            Logout
          </Button>
          <PathProvider>


          <Row>
            <Col >
              <Row >
                <PathList />
              </Row>
            </Col>
            <Col>
              <Row >
                <PathCreate />
              </Row>
            </Col>
          
          </Row>
          </PathProvider>
          <p>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum."
          </p>
        </section>
      </Col>
    </Row>
  );
}
export default Admin;
