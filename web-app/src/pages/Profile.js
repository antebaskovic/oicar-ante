import { useEffect, useState } from "react";
import Header from "../components/header";
import InputField from "../components/InputField";
import axios from "axios";
import { Button } from "react-bootstrap";
import TextArea from "../components/TextArea";
import CustomModal from "../components/Modal";

function Profile() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [licence, setLicence] = useState("");
  const [focusArea, setFocusArea] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleModalBtnClick = () => {
    window.location.href = "/Home";
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const API_URL = "http://oicar-22-433a6d03acdd.herokuapp.com/account";
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

      const { Email, FirstName, LastName, trainerDetails } = response.data;

      setEmail(Email);
      setFirstName(FirstName);
      setLastName(LastName);

      if (trainerDetails) {
        const { Bio, FocusArea, LicensesAndCertificates } = trainerDetails;

        setBio(Bio);
        setFocusArea(FocusArea);
        setLicence(LicensesAndCertificates);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const data = {
      firstName,
      lastName,
      bio,
      licensesAndCertificates: licence,
      focusArea,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.put(`${API_URL}`, data, config);
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
        modalBody="Promjene su uspješno spremljene na vaš račun!"
        showModal={showModal}
        onModalClose={handleModalClose}
        onModalBtnClick={handleModalBtnClick}
        modalBtnText="Naslovna"
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
          label="Email"
          type="email"
          placeholder="Unesite email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          isDisabled={true}
        />

        <InputField
          label="Ime"
          type="text"
          placeholder="Unesite ime"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          isDisabled={!isEditing}
        />

        <InputField
          label="Prezime"
          type="text"
          placeholder="Unesite prezime"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          isDisabled={!isEditing}
        />

        <h5 className="py-2">Profesionalni podatci:</h5>

        <TextArea
          label="Biografija"
          placeholder="Unesite biografiju"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          isDisabled={!isEditing}
        />

        <TextArea
          label="Licence i certifikati"
          placeholder="Opisite licence i certifikate"
          value={licence}
          onChange={(e) => setLicence(e.target.value)}
          isDisabled={!isEditing}
        />

        <TextArea
          label="Područja interesa"
          placeholder="Unesite područja interesa"
          value={focusArea}
          onChange={(e) => setFocusArea(e.target.value)}
          isDisabled={!isEditing}
        />

        <h5 className="py-2">Lozinka:</h5>
        <div className="form-group row">
          <label className="col-md-2 col-form-label text-start">Lozinka:</label>
          <div className="col-md-10">
            <Button className="col-12" href="/password" variant="primary">
              Promjeni lozinku
            </Button>
          </div>
        </div>
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

export default Profile;
