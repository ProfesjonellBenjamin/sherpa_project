import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

import config from "../config";
import { Link } from "react-router-dom";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const performSearch = async () => {
    if (!query) {
      setResults([]);
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(config.endpoint + "/paths/find", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      const body = await response.json();
      setResults(body);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    performSearch();
    return null;
  }, [query]);

  return (
    <>
    <div>Søk på navn, fylke eller kommune</div>
      <Form inline>
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          value={query}
          onChange={(e) => {
            setQuery(e.currentTarget.value);
          }}
        />
        <Button
          variant="outline-success"
          onClick={performSearch}
          disabled={loading}
        >
          Search
        </Button>
      </Form>

      <ul style={{ marginTop: 20 }}>
        {results.map((place) => (
          <li key={place.id}>
            <Link to={"/kart/" + place.id}>{place.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default SearchBar;
