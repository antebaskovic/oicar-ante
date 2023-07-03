import React from "react";
import { Button } from "react-bootstrap";

const TrainingComponent = ({ name, id, type }) => {
  return (
    <div className="py-3">
      <p>TRENING:</p>
      <p>{type}:</p>
      <h5>{name}</h5>
      <Button href={`/trainingDetails/${id}`}>Detalji</Button>
    </div>
  );
};

export default TrainingComponent;
