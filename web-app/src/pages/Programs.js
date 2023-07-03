import { useEffect, useState } from "react";
import Header from "../components/header";
import axios from "axios";
import Card from "../components/card";
import { Button } from "react-bootstrap";
import CustomModal from "../components/Modal";
import { getPrograms } from "../utils/getData";
import IfListEmpty from "../components/ifListISEmpty";

function Programs() {
  const token = localStorage.getItem("token");
  const API_URL = "http://oicar-22-433a6d03acdd.herokuapp.com/program";

  const [programs, setPrograms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProgramId, setSelectedProgramId] = useState(null);

  useEffect(() => {
    getPrograms()
      .then((data) => setPrograms(data))
      .catch(() => {});
  }, []);

  const handleModalBtnClick = async () => {
    try {
      await axios.delete(`${API_URL}/${selectedProgramId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getPrograms()
        .then((data) => setPrograms(data))
        .catch(() => {});
      setShowModal(false);
    } catch (error) {
      alert("Greska prilikom brisanja programa!");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleDeleteClick = (programId) => {
    setSelectedProgramId(programId);
    setShowModal(true);
  };
  const handleEditClick = (programId) => {
    window.location.href = `/programDetails/${programId}`;
  };

  return (
    <div className="container">
      <CustomModal
        deleteModal
        modalTitle="Brisanje"
        modalBody={`Jeste li sigurni da želite izbrisati program?`}
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
        <h1 className="col-12 col-md-9">Programi:</h1>
        <Button
          href="/newProgram"
          className="col-10 col-md-3"
          style={{ height: "min-content" }}
        >
          Dodaj novi program
        </Button>
      </div>

      <div className="row">
        <IfListEmpty list={programs} msgEnd="nijedan upisan program" />

        {programs.map((program) => (
          <Card
            btnText="Uredi"
            category={program.Category}
            key={program.ProgramID}
            description={program.Description}
            name={program.Name}
            onDeleteClick={() => handleDeleteClick(program.ProgramID)}
            onEditClick={() => handleEditClick(program.ProgramID)}
          />
        ))}
      </div>
    </div>
  );
}

export default Programs;
