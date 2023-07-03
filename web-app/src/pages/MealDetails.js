import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/header";
import InputField from "../components/InputField";
import axios from "axios";
import { Button } from "react-bootstrap";
import TextArea from "../components/TextArea";
import CustomModal from "../components/Modal";
import DaysOfWeek from "../components/daysOfWeek";

function MealDetails() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [daysOfWeek, setDaysOfWeek] = useState("");
  const [type, setType] = useState("");
  const [calories, setCalories] = useState("");
  const [carbs, setCarbs] = useState("");
  const [protein, setProtein] = useState("");
  const [fats, setFats] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const { mealId } = useParams();

  const handleModalBtnClick = () => {
    window.location.href = "/meals";
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const API_URL = `http://oicar-22-433a6d03acdd.herokuapp.com/meal/${mealId}/details`;
  const API_URL_SAVE = `http://oicar-22-433a6d03acdd.herokuapp.com/meal/${mealId}`;
  const token = localStorage.getItem("token");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const mealData = response.data[0];

      setName(mealData.Name);
      setDescription(mealData.Description);
      setDaysOfWeek(mealData.DaysOfWeek);
      setType(mealData.Type);
      setCalories(mealData.Calories);
      setCarbs(mealData.Carbs);
      setProtein(mealData.Protein);
      setFats(mealData.Fats);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setDaysOfWeek("");
  };

  const handleDaySelect = (value) => {
    if (daysOfWeek.includes(value)) {
      setDaysOfWeek(daysOfWeek.filter((day) => day !== value));
    } else {
      setDaysOfWeek([...daysOfWeek, value]);
    }
  };

  const handleSave = async () => {
    const data = {
      daysOfWeek: daysOfWeek.join(", "),
      type,
      name,
      calories,
      carbs,
      protein,
      fats,
      description,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.put(`${API_URL_SAVE}`, data, config);
      setShowModal(true);
    } catch (error) {
      alert("Greška prilikom ažuriranja korisničkog računa:", error);
    }

    setIsEditing(false);
  };

  return (
    <div className="container">
      <CustomModal
        modalTitle="Uspješno"
        modalBody="Promjene su uspješno spremljene!"
        showModal={showModal}
        onModalClose={handleModalClose}
        onModalBtnClick={handleModalBtnClick}
        modalBtnText="Pregledaj programe"
      />
      <Header />

      <form className="d-flex flex-column gap-2 py-5">
        <div className="">
          {isEditing ? (
            <Button variant="success" onClick={handleSave}>
              Spremi promjene
            </Button>
          ) : (
            <Button variant="primary" onClick={handleEdit}>
              Uredi
            </Button>
          )}
        </div>
        <h5 className="py-2">Osnovni podatci:</h5>

        <InputField
          label="Naiv"
          type="text"
          placeholder="Unesite Naziv"
          value={name}
          isDisabled={!isEditing}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <DaysOfWeek selectedDays={daysOfWeek} onDaySelect={handleDaySelect} />

        <div className="form-group row">
          <label className="col-md-2 col-form-label text-start">Tip:</label>
          <div className="col-md-10">
            <select
              className="form-select"
              aria-label="select type"
              value={type}
              required
              disabled={!isEditing}
              onChange={(e) => setType(e.target.value)}
            >
              <option disabled value="">
                Izaberite tip
              </option>
              <option value={"Breakfast"}>Doručak</option>
              <option value={"Lunch"}>Ručak</option>
              <option value={"Dinner"}>Večera</option>
              <option value={"Snack"}>Užina</option>
            </select>
          </div>
        </div>

        <InputField
          label="Kalorije"
          type="number"
          placeholder="Unesite kalorije"
          value={calories}
          isDisabled={!isEditing}
          onChange={(e) => setCalories(e.target.value)}
        />

        <InputField
          label="Ugljikohidrati"
          type="number"
          placeholder="Unesite ugljikohidrate"
          value={carbs}
          isDisabled={!isEditing}
          onChange={(e) => setCarbs(e.target.value)}
        />

        <InputField
          label="Proeteini"
          type="number"
          placeholder="Unesite proteine"
          value={protein}
          isDisabled={!isEditing}
          onChange={(e) => setProtein(e.target.value)}
        />
        <InputField
          label="Masti"
          type="number"
          placeholder="Unesite masti"
          value={fats}
          isDisabled={!isEditing}
          onChange={(e) => setFats(e.target.value)}
        />

        <TextArea
          label="Opis"
          type="text"
          placeholder="Unesite opis"
          value={description}
          isDisabled={!isEditing}
          onChange={(e) => setDescription(e.target.value)}
        />
      </form>

      <div className="py-5">
        {isEditing ? (
          <Button variant="success" className="col-12" onClick={handleSave}>
            Spremi promjene
          </Button>
        ) : (
          <Button variant="primary" className="col-12" onClick={handleEdit}>
            Uredi
          </Button>
        )}
      </div>
    </div>
  );
}

export default MealDetails;
