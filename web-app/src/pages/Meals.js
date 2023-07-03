import { useEffect, useState } from "react";
import Header from "../components/header";
import axios from "axios";
import Card from "../components/card";
import { Button } from "react-bootstrap";
import CustomModal from "../components/Modal";
import { getMeals } from "../utils/getData";
import IfListEmpty from "../components/ifListISEmpty";

function Meals() {
  const token = localStorage.getItem("token");
  const [meals, setMeals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMealId, setSelectedMealId] = useState(null);

  useEffect(() => {
    getMeals()
      .then((data) => setMeals(data))
      .catch(() => {});
  }, []);

  const handleModalBtnClick = async () => {
    const API_URL = "http://oicar-22-433a6d03acdd.herokuapp.com/meal";

    try {
      await axios.delete(`${API_URL}/${selectedMealId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getMeals()
        .then((data) => setMeals(data))
        .catch(() => {});
      setShowModal(false);
    } catch (error) {
      alert("Greska prilikom brisanja programa!");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleDeleteClick = (selectedMealId) => {
    setSelectedMealId(selectedMealId);
    setShowModal(true);
  };
  const handleEditClick = (selectedMealId) => {
    window.location.href = `/mealDetails/${selectedMealId}`;
  };

  return (
    <div className="container">
      <CustomModal
        deleteModal
        modalTitle="Brisanje"
        modalBody={`Jeste li sigurni da želite izbrisati obrok?`}
        showModal={showModal}
        onModalClose={handleModalClose}
        onModalBtnClick={handleModalBtnClick}
        modalBtnText="Izbriši"
      />
      <Header />

      <div
        className="row py-5 center gapMobile-2"
        style={{ justifyContent: "center" }}
      >
        <h1 className="col-12 col-md-9">Obroci:</h1>
        <Button
          href="/newMeal"
          className="col-10 col-md-3"
          key={"btn"}
          style={{ height: "min-content" }}
        >
          Dodaj novi obrok
        </Button>
      </div>

      <div className="row">
        <IfListEmpty list={meals} msgEnd="nijedan upisan obrok" />

        {meals.map((meal) => (
          <Card
            btnText="Pregledaj"
            category={meal.programName}
            key={meal.mealID}
            description={meal.mealDescription}
            name={meal.mealName}
            onDeleteClick={() => handleDeleteClick(meal.MealID)}
            onEditClick={() => handleEditClick(meal.MealID)}
          />
        ))}
      </div>
    </div>
  );
}

export default Meals;
