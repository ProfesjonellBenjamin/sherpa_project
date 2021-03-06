import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SearchBar from "../components/SearchBar";

const Home = () => {
  return (
    <>

      <Row>
        <Col>
          <section>
            <h3>Sherpastier</h3>
            <p></p>
            
            <p>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
            </p>
          </section>
        </Col>
      </Row>

      {/* Search  */}
      <Row>
        <Col>
          <SearchBar />
        </Col>
      </Row>
    </>
  );
};
export default Home;
