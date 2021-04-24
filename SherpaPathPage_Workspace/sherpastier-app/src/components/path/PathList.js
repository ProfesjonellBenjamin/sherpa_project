import { Row } from "react-bootstrap";
import { useContext } from "react";
import { PathContext } from "../../contexts/PathContext";
import PathItem from "./PathItem";

const PathList = () => {
  const { paths } = useContext(PathContext);

  const [pathsState, setPaths] = paths;

  const generatePaths = () => {
    return pathsState.map((path, i) => {
      return (
        <div key={i}>
          <PathItem key={i} {...path}></PathItem>
        </div>
      );
    });
  };

  return (
    <section>
      <h3>Sti-Liste</h3>
      <Row>{generatePaths()}</Row>
    </section>
  );
};

export default PathList;
