import React, { useState, useEffect } from "react";
import axios from "axios";
import InputField from "../components/InputField";

import CustomModal from "../components/Modal";

function Login() {
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      window.location.href = "/home";
      return;
    }
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleModalBtnClick = () => {
    window.location.href = "/login";
    setEmail("");
    setPassword("");
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const API_URL = "http://oicar-22-433a6d03acdd.herokuapp.com/login";

  const validatePassword = (passwordValue) => {
    const isValidLength = passwordValue.length >= 8;
    setError(isValidLength ? "" : "Lozinka mora sadržavati barem 8 znakova.");
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (error === "") {
      setIsLoading(true);
      const data = {
        email,
        password,
      };

      try {
        const response = await axios.post(API_URL, data);

        if (response?.data) {
          localStorage.setItem("token", response.data.accessToken);
          window.location.href = "/home";
        }
      } catch (error) {
        alert(
          "Dogodila se pogreška prilikom prijave ili su netocni mail i lozinka."
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
        <h1 className="py-5">Prijavi se</h1>
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
                label="Lozinka"
                type="password"
                placeholder="Unesite lozinku"
                value={password}
                onChange={handlePasswordChange}
                error={error}
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
                    "Prijavi se"
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

export default Login;
