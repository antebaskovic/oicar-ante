import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/header";
import InputField from "../components/InputField";
import axios from "axios";
import { Button } from "react-bootstrap";
import TextArea from "../components/TextArea";
import CustomModal from "../components/Modal";
import DaysOfWeek from "../components/daysOfWeek";

function TrainingDetails() {
  const [type, setType] = useState("");
  const [daysOfWeek, setDaysOfWeek] = useState("");
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [notes, setNotes] = useState("");
  const [plan, setPlan] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const { trainingId } = useParams();

  const handleModalBtnClick = () => {
    window.location.href = "/trainings";
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const API_URL = `http://oicar-22-433a6d03acdd.herokuapp.com/training/${trainingId}/details`;
  const API_URL_SAVE = `http://oicar-22-433a6d03acdd.herokuapp.com/training/${trainingId}`;
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

      const trainingData = response.data[0];

      setType(trainingData.Type);
      setDaysOfWeek(trainingData.DaysOfWeek);

      setName(trainingData.Name);
      setNotes(trainingData.Notes);
      setPlan(trainingData.Plan);
      setDifficulty(trainingData.Difficulty);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    setDaysOfWeek("");
    setIsEditing(true);
  };

  const handleDaySelect = (value) => {
    if (daysOfWeek.includes(value)) {
      setDaysOfWeek(daysOfWeek.filter((day) => day !== value));
    } else {
      setDaysOfWeek([...daysOfWeek, value]);
    }
  };

  const handleSave = async () => {
    console.log(daysOfWeek);

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
        modalBtnText="Pregledaj treninge"
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
          label="Naziv treninga"
          type="text"
          placeholder="Unesite naziv treninga"
          value={name}
          isDisabled={!isEditing}
          onChange={(e) => setName(e.target.value)}
        />

        <InputField
          label="Tip"
          type="text"
          placeholder="Unesite tip"
          value={type}
          isDisabled={!isEditing}
          onChange={(e) => setType(e.target.value)}
        />

        <DaysOfWeek selectedDays={daysOfWeek} onDaySelect={handleDaySelect} />

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
              disabled={!isEditing}
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
          isDisabled={!isEditing}
          onChange={(e) => setPlan(e.target.value)}
        />

        <TextArea
          label="Napomene"
          placeholder="Unesite napomene"
          value={notes}
          isDisabled={!isEditing}
          onChange={(e) => setNotes(e.target.value)}
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

export default TrainingDetails;
