import React, { useState } from "react";
import axios from "axios";
import InputField from "../components/InputField";

import CustomModal from "../components/Modal";

function Register() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [matchError, setMatchError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const restartForm = () => {
    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleModalBtnClick = () => {
    restartForm();
    window.location.href = "/login";
  };

  const handleModalClose = () => {
    restartForm();
    setShowModal(false);
  };

  const API_URL = "http://oicar-22-433a6d03acdd.herokuapp.com/register";

  const validatePassword = (passwordValue) => {
    const isValidLength = passwordValue.length >= 8;
    setError(isValidLength ? "" : "Lozinka mora sadržavati barem 8 znakova.");
  };

  const validateConfirmPassword = (confirmPasswordValue) => {
    const isPasswordMatch = password === confirmPasswordValue;
    setMatchError(isPasswordMatch ? "" : "Lozinka se ne podudara.");
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (error === "" && matchError === "") {
      setIsLoading(true);
      const data = {
        email,
        firstName,
        lastName,
        password,
        role: "Trainer",
      };

      try {
        const response = await axios.post(API_URL, data);

        if (response?.data) {
          setShowModal(true);
        }
      } catch (error) {
        alert(
          "Dogodila se pogreska tjekom registracije ili već imate registraran račun s ovim mailom"
        );
      }

      setIsLoading(false);
    }
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    validatePassword(passwordValue);
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPasswordValue = e.target.value;
    setConfirmPassword(confirmPasswordValue);
    validateConfirmPassword(confirmPasswordValue);
  };

  return (
    <div className="container justify-content-center">
      <CustomModal
        modalTitle="Uspješno"
        modalBody="Vaš račun je uspješno kreiran sad se možete prijaviti!"
        showModal={showModal}
        onModalClose={handleModalClose}
        onModalBtnClick={handleModalBtnClick}
        modalBtnText="Prijavi se"
      />

      <div className="col-md-12">
        <h1 className="py-5">Registriraj se</h1>
        <div className="row justify-content-center">
          <div className="col-md-10">
            <form
              className="d-flex flex-column gap-2"
              onSubmit={handleRegister}
            >
              <InputField
                label="Email"
                type="email"
                placeholder="Unesite email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <InputField
                label="Ime"
                type="text"
                placeholder="Unesite ime"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />

              <InputField
                label="Prezime"
                type="text"
                placeholder="Unesite prezime"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />

              <InputField
                label="Lozinka"
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

              <div className="py-2">
                <button className="btn btn-primary col-12" type="submit">
                  {isLoading ? (
                    <span
                      className="spinner-border spinner-border-md"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    "Registriraj se"
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

export default Register;
