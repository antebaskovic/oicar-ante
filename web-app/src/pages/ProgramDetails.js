import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/header";
import InputField from "../components/InputField";
import axios from "axios";
import { Button } from "react-bootstrap";
import TextArea from "../components/TextArea";
import CustomModal from "../components/Modal";

function ProgramDetails() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { programId } = useParams();

  const handleModalBtnClick = () => {
    window.location.href = "/programs";
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const API_URL = `http://oicar-22-433a6d03acdd.herokuapp.com/program/${programId}/details`;
  const API_URL_SAVE = `http://oicar-22-433a6d03acdd.herokuapp.com/program/${programId}`;
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

      const { Description, Category, Name } = response.data;

      setDescription(Description);
      setCategory(Category);
      setName(Name);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const data = {
      name,
      description,
      category,
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
          label="Kategorija"
          type="text"
          placeholder="Unesite Kategoriju"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          isDisabled={!isEditing}
        />

        <InputField
          label="Naziv"
          type="text"
          placeholder="Unesite naziv"
          value={name}
          onChange={(e) => setName(e.target.value)}
          isDisabled={!isEditing}
        />

        <TextArea
          label="Opis"
          placeholder="Unesite opis"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          isDisabled={!isEditing}
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

export default ProgramDetails;
