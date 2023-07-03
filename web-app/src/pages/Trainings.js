import { useEffect, useState } from "react";
import Header from "../components/header";
import axios from "axios";
import Card from "../components/card";
import { Button } from "react-bootstrap";
import CustomModal from "../components/Modal";
import { getTrainings } from "../utils/getData";
import IfListEmpty from "../components/ifListISEmpty";

function Trainings() {
  const token = localStorage.getItem("token");
  const [trainings, setTrainings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTrainingsId, setselectedTrainingsId] = useState(null);

  useEffect(() => {
    getTrainings()
      .then((data) => setTrainings(data))
      .catch(() => {});
  }, []);

  const handleModalBtnClick = async () => {
    const API_URL = "http://oicar-22-433a6d03acdd.herokuapp.com/training";

    try {
      await axios.delete(`${API_URL}/${selectedTrainingsId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getTrainings()
        .then((data) => setTrainings(data))
        .catch(() => {});
      setShowModal(false);
    } catch (error) {
      alert("Greska prilikom brisanja treninga!");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleDeleteClick = (selectedTrainingsId) => {
    setselectedTrainingsId(selectedTrainingsId);
    setShowModal(true);
  };
  const handleEditClick = (selectedTrainingsId) => {
    window.location.href = `/trainingDetails/${selectedTrainingsId}`;
  };

  return (
    <div className="container">
      <CustomModal
        deleteModal
        modalTitle="Brisanje"
        modalBody={`Jeste li sigurni da želite izbrisati trening?`}
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
        <h1 className="col-12 col-md-9">Treninzi:</h1>
        <Button
          href="/newTraining"
          className="col-10 col-md-3"
          key={"btn"}
          style={{ height: "min-content" }}
        >
          Dodaj novi trening
        </Button>
      </div>

      <div className="row">
        <IfListEmpty list={trainings} msgEnd="nijedan upisan trening" />

        {trainings.map((training) => (
          <Card
            btnText="Pregledaj"
            category={training.programName}
            key={training.TrainingID}
            description={training.Notes}
            name={training.trainingsName}
            onDeleteClick={() => handleDeleteClick(training.TrainingID)}
            onEditClick={() => handleEditClick(training.TrainingID)}
          />
        ))}
      </div>
    </div>
  );
}

export default Trainings;
