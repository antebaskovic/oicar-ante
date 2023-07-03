import Header from "../components/header";
import React, { useState } from "react";
import InputField from "../components/InputField";

import axios from "axios";
import { Button } from "react-bootstrap";
import CustomModal from "../components/Modal";

function Password() {
  const [showModal, setShowModal] = useState(false);

  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [oldError, setOldError] = useState("");
  const [matchError, setMatchError] = useState("");

  const handleModalBtnClick = () => {
    window.location.href = "/Home";
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const validatePassword = (passwordValue) => {
    const isValidLength = passwordValue.length >= 8;
    setError(isValidLength ? "" : "Lozinka mora sadržavati barem 8 znakova.");
  };

  const validateOldPassword = (passwordValue) => {
    const isValidLength = passwordValue.length >= 8;
    setOldError(
      isValidLength ? "" : "Lozinka mora sadržavati barem 8 znakova."
    );
  };

  const validateConfirmPassword = (confirmPasswordValue) => {
    const isPasswordMatch = password === confirmPasswordValue;
    setMatchError(isPasswordMatch ? "" : "Lozinka se ne podudara.");
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    validatePassword(passwordValue);
  };

  const handleOldPasswordChange = (e) => {
    const passwordValue = e.target.value;
    setOldPassword(passwordValue);
    validateOldPassword(passwordValue);
  };
  const handleConfirmPasswordChange = (e) => {
    const confirmPasswordValue = e.target.value;
    setConfirmPassword(confirmPasswordValue);
    validateConfirmPassword(confirmPasswordValue);
  };

  const API_URL = "http://oicar-22-433a6d03acdd.herokuapp.com/changePassword";

  const handleChange = () => {
    const data = {
      oldPassword: oldPassword,
      newPassword: password,
    };

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .put(API_URL, data, config)
      .then((response) => {
        setShowModal(true);
      })
      .catch((error) => {
        alert("Greška prilikom mjenjanja lozinke", error);
      });
  };

  return (
    <div className="container">
      <CustomModal
        modalTitle="Uspješno"
        modalBody="Lozinka uspješno promjenjena"
        showModal={showModal}
        onModalClose={handleModalClose}
        onModalBtnClick={handleModalBtnClick}
        modalBtnText="Naslovna"
      />
      <Header />

      <form className="d-flex flex-column gap-2">
        <h5 className="py-2">Lozinka</h5>

        <InputField
          label="Trenutna Lozinka"
          type="password"
          placeholder="Unesite lozinku"
          value={oldPassword}
          onChange={handleOldPasswordChange}
          error={oldError}
        />

        <InputField
          label="Nova Lozinka"
          type="password"
          placeholder="Unesite lozinku"
          value={password}
          onChange={handlePasswordChange}
          error={error}
        />

        <InputField
          label="Potvrdi lozinku"
          type="password"
          placeholder="Potvrdite lozinku"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          error={matchError}
        />
      </form>

      <div className="py-5">
        <Button variant="success" className="col-12" onClick={handleChange}>
          Promjeni lozinku
        </Button>
      </div>
    </div>
  );
}

export default Password;
