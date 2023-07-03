import { useEffect, useState } from "react";
import axios from "axios";
import InputField from "../components/InputField";

import CustomModal from "../components/Modal";
import Header from "../components/header";
import TextArea from "../components/TextArea";

function NewProgram() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {}, []);

  const restartForm = () => {
    setName("");
    setCategory("");
    setDescription("");
  };

  const handleModalBtnClick = () => {
    restartForm();
    window.location.href = "/programs";
  };

  const handleModalClose = () => {
    restartForm();
    setShowModal(false);
  };

  const API_URL = "http://oicar-22-433a6d03acdd.herokuapp.com/program";

  const handleRegister = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const data = {
      name,
      category,
      description,
      role: "Trainer",
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post(`${API_URL}`, data, config);
      setShowModal(true);

      console.log(response.data);
    } catch (error) {
      alert("Dogodila se pogreska tjekom kreiranja novog programa!");
    }

    setIsLoading(false);
  };

  return (
    <div className="container justify-content-center">
      <Header></Header>
      <CustomModal
        modalTitle="Uspješno"
        modalBody={`Program pod nazivom ${name} je uspješno kreiran sad mozete pregledati sve programe!`}
        showModal={showModal}
        onModalClose={handleModalClose}
        onModalBtnClick={handleModalBtnClick}
        modalBtnText="Pregled programa"
      />

      <div className="col-md-12">
        <h1 className="py-5">Dodavanje novog programa</h1>
        <div className="row justify-content-center">
          <div className="col-md-10">
            <form
              className="d-flex flex-column gap-2"
              onSubmit={handleRegister}
            >
              <InputField
                label="Naziv"
                type="name"
                placeholder="Unesite Naziv"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <InputField
                label="Kategorija"
                type="text"
                placeholder="Unesite kategoriju"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />

              <TextArea
                label="Opis"
                type="text"
                isRequired={true}
                placeholder="Unesite opis programa"
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
                    "Dodaj program"
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

export default NewProgram;
