import { useState } from "react";
import axios from "axios";
import InputField from "../components/InputField";

import CustomModal from "../components/Modal";
import Header from "../components/header";
import TextArea from "../components/TextArea";
import SelectProgram from "../components/SelectProgram";
import DaysOfWeek from "../components/daysOfWeek";

function NewTraining() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [daysOfWeek, setDaysOfWeek] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [plan, setPlan] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState("");

  const token = localStorage.getItem("token");

  const resetForm = () => {
    setName("");
    setType("");
    setDaysOfWeek("");
    setDifficulty("");
    setPlan("");
    setNotes("");
  };

  const handleModalBtnClick = () => {
    resetForm();
    window.location.href = "/trainings";
  };

  const handleModalClose = () => {
    resetForm();
    setShowModal(false);
  };

  const handleSelect = (value) => {
    setSelectedProgram(value);
  };

  const handleDaySelect = (value) => {
    if (daysOfWeek.includes(value)) {
      setDaysOfWeek(daysOfWeek.filter((day) => day !== value));
    } else {
      setDaysOfWeek([...daysOfWeek, value]);
    }
  };

  const addTraining = async (e) => {
    e.preventDefault();
    const API_URL = `http://oicar-22-433a6d03acdd.herokuapp.com/program/${selectedProgram}/training`;

    setIsLoading(true);

    const data = {
      type,
      daysOfWeek: daysOfWeek.join(", "),
      name,
      plan,
      notes,
      difficulty,
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
      alert("Dogodila se pogreska tjekom kreiranja novog trening!");
      setIsLoading(false);
    }
  };

  return (
    <div className="container justify-content-center">
      <Header></Header>
      <CustomModal
        modalTitle="Uspješno"
        modalBody={`Trening pod nazivom ${name} je uspješno kreiran sad mozete pregledati sve treninge!`}
        showModal={showModal}
        onModalClose={handleModalClose}
        onModalBtnClick={handleModalBtnClick}
        modalBtnText="Pregled treninga"
      />

      <div className="col-md-12">
        <h1 className="py-5">Dodavanje novog treninga</h1>
        <div className="row justify-content-center">
          <div className="col-md-10">
            <form className="d-flex flex-column gap-2" onSubmit={addTraining}>
              <div className="form-group row">
                <label className="col-md-2 col-form-label text-start">
                  Program:
                </label>

                <SelectProgram
                  value={selectedProgram}
                  onChange={handleSelect}
                />
              </div>

              <InputField
                label="Naiv"
                type="text"
                placeholder="Unesite Naziv"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <InputField
                label="Tip"
                type="text"
                placeholder="Unesite tip"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />

              <DaysOfWeek
                selectedDays={daysOfWeek}
                onDaySelect={handleDaySelect}
              />

              <div className="form-group row">
                <label className="col-md-2 col-form-label text-start">
                  Zahtjevnost:
                </label>
                <div className="col-md-10">
                  <select
                    className="form-select"
                    aria-label="select type"
                    value={difficulty}
                    required
                    onChange={(e) => setDifficulty(e.target.value)}
                  >
                    <option disabled value="">
                      Odaberite razinu
                    </option>
                    <option value={"Easy"}>Lagano</option>
                    <option value={"Medium"}>Srednje</option>
                    <option value={"Hard"}>Teško</option>
                  </select>
                </div>
              </div>

              <TextArea
                label="Plan treninga"
                placeholder="Unesite plan treninga"
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
              />

              <TextArea
                label="Napomene"
                placeholder="Unesite napomene"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
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
                    "Dodaj trening"
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

export default NewTraining;
