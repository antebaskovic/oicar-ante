import React from "react";
import { Button } from "react-bootstrap";

const MealComponent = ({ name, id, type }) => {
  return (
    <div className="py-3">
      <p>{type}:</p>
      <h5>{name}</h5>
      <Button href={`/mealDetails/${id}`}>Detalji</Button>
    </div>
  );
};

export default MealComponent;

