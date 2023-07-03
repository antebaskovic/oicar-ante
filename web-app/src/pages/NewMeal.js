import { useState } from "react";
import axios from "axios";
import InputField from "../components/InputField";

import CustomModal from "../components/Modal";
import Header from "../components/header";
import TextArea from "../components/TextArea";
import SelectProgram from "../components/SelectProgram";
import DaysOfWeek from "../components/daysOfWeek";

function NewMeal() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [type, setType] = useState("");
  const [calories, setCalories] = useState("");
  const [carbs, setCarbs] = useState("");
  const [protein, setProtein] = useState("");
  const [fats, setFats] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState("");

  const handleDaySelect = (value) => {
    if (daysOfWeek.includes(value)) {
      setDaysOfWeek(daysOfWeek.filter((day) => day !== value));
    } else {
      setDaysOfWeek([...daysOfWeek, value]);
    }
  };

  const token = localStorage.getItem("token");

  const resetForm = () => {
    setName("");
    setDescription("");
    setDaysOfWeek("");
    setType("");
    setCalories("");
    setCarbs("");
    setProtein("");
    setFats("");
  };

  const handleModalBtnClick = () => {
    resetForm();
    window.location.href = "/meals";
  };

  const handleSelect = (value) => {
    setSelectedProgram(value);
  };

  const handleModalClose = () => {
    resetForm();
    setShowModal(false);
  };

  const addProgram = async (e) => {
    e.preventDefault();
    console.log();
    const API_URL = `http://oicar-22-433a6d03acdd.herokuapp.com/program/${selectedProgram}/meal`;

    setIsLoading(true);

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
      await axios.post(`${API_URL}`, data, config);
      resetForm();
      setShowModal(true);
      setIsLoading(false);
    } catch (error) {
      alert("Dogodila se pogreska tjekom kreiranja novog programa!");
      setIsLoading(false);
    }
  };

  return (
    <div className="container justify-content-center">
      <Header></Header>
      <CustomModal
        modalTitle="Uspješno"
        modalBody={`Obrok pod nazivom ${name} je uspješno kreiran sad možete pregledati sve obroke!`}
        showModal={showModal}
        onModalClose={handleModalClose}
        onModalBtnClick={handleModalBtnClick}
        modalBtnText="Pregled obroka"
      />

      <div className="col-md-12">
        <h1 className="py-5">Dodavanje novog obroka</h1>
        <div className="row justify-content-center">
          <div className="col-md-10">
            <form className="d-flex flex-column gap-2" onSubmit={addProgram}>
              <div className="form-group row">
                <label className="col-md-2 col-form-label text-start">
                  Program:
                </label>
                <SelectProgram
                  value={selectedProgram}
                  onChange={handleSelect}
                />
              </div>

              <DaysOfWeek
                selectedDays={daysOfWeek}
                onDaySelect={handleDaySelect}
              />

              <div className="form-group row">
                <label className="col-md-2 col-form-label text-start">
                  Tip:
                </label>
                <div className="col-md-10">
                  <select
                    className="form-select"
                    aria-label="select type"
                    value={type}
                    required
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
                label="Naziv"
                type="text"
                placeholder="Unesite Naziv"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <InputField
                label="Kalorije"
                type="number"
                placeholder="Unesite kalorije"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
              />

              <InputField
                label="Ugljikohidrati"
                type="number"
                placeholder="Unesite ugljikohidrate"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
              />

              <InputField
                label="Proeteini"
                type="number"
                placeholder="Unesite proteine"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
              />
              <InputField
                label="Masti"
                type="number"
                placeholder="Unesite masti"
                value={fats}
                onChange={(e) => setFats(e.target.value)}
              />

              <TextArea
                label="Opis"
                type="text"
                placeholder="Unesite opis"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="py-2">
                <button className="btn btn-primary col-12" type="submit">
                  {isLoading ? (
                    <span
                      className="spinner-border spinner-border-md"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    "Dodaj obrok"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewMeal;
