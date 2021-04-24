import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';

import 'bootstrap/dist//css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

import Home from './views/Home.js';
import About from './views/About.js';
import Kart from './views/Kart.js';
import Admin from './views/Admin.js';
import { Jumbotron } from './components/Jumbotron.js';
import AllPaths from './views/AllPaths.js';
import PathView from './views/PathView';
import { PathProvider } from './contexts/PathContext.js';
import AdminView from './views/AdminView.js';


const Styles = styled.div`
.navbar {
  background-color: #222;
}
.navbar-brand, .navbar-nav .nav-link {
  color: #bbb;
  &:hover {
    color: white;
  }
}

`;

function App() {
  return (
    <React.Fragment>


      <Router>
        <Styles>
          <Navbar expand="lg">
            <Navbar.Brand as={Link} to="/">Sherpastier</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">


              <Nav className="ml-auto">
                <Nav.Link as={Link} to="/">Hjem</Nav.Link>
                <Nav.Link as={Link} to="/about">Om oss</Nav.Link>
                <Nav.Link as={Link} to="/kart">Kart</Nav.Link>
                <Nav.Link as={Link} to="/admin">admin</Nav.Link>
                <Nav.Link as={Link} to="/list">list</Nav.Link>
                <Nav.Link as={Link} to="/path">path</Nav.Link>



              </Nav>

            </Navbar.Collapse>
          </Navbar >
        </Styles>
        <Jumbotron />

        <Container>
          <main>
            <Switch>

              <Route exact path="/" component={Home}></Route>
              <Route path="/about" component={About}></Route>
              <Route path="/kart" component={Kart}></Route>
              <Route path="/admin" component={AdminView}></Route>
              <Route path="/list" component={AllPaths}></Route>
              
                <Route path="/path" component={PathView}></Route>


            </Switch>
          </main>
        </Container>

      </Router>

    </React.Fragment>
  );
}



export default App;

