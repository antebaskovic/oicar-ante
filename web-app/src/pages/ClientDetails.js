import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/header";
import InputField from "../components/InputField";
import axios from "axios";
import TextArea from "../components/TextArea";
import { Button } from "react-bootstrap";

function UserDetails() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [miscellaneousLimits, setMiscellaneousLimits] = useState("");
  const { userId } = useParams();

  const API_URL = `http://oicar-22-433a6d03acdd.herokuapp.com/clientDetails/${userId}`;
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

      const {
        Email,
        FirstName,
        LastName,
        Height,
        Weight,
        Age,
        Gender,
        MiscellaneousLimits,
      } = response.data;

      setEmail(Email);
      setFirstName(FirstName);
      setLastName(LastName);

      setHeight(Height ? Height : "-");
      setWeight(Weight ? Weight : "-");
      setAge(Age ? Age : "-");
      setGender(Gender ? Gender : "-");
      setMiscellaneousLimits(MiscellaneousLimits ? MiscellaneousLimits : "-");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <Header />

      <div
        className="row py-5 center gapMobile-2"
        style={{ justifyContent: "center" }}
      >
        <h1 className="col-12 col-md-9">Detaljni pregled klijenta:</h1>
        <Button
          href="/clients"
          className="col-10 col-md-3"
          style={{ height: "min-content" }}
        >
          Svi klijent
        </Button>
      </div>

      <form className="d-flex flex-column gap-2 ">
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
          isDisabled="false"
        />

        <InputField
          label="Prezime"
          type="text"
          placeholder="Unesite prezime"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          isDisabled="false"
        />

        <h5 className="py-2">Dodatni podatci:</h5>

        <InputField
          label="Visina"
          type="text"
          placeholder="Unesite visinu"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          isDisabled="false"
        />

        <InputField
          label="Težina"
          type="text"
          placeholder="Unesite težinu"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          isDisabled="false"
        />

        <InputField
          label="Dob"
          type="text"
          placeholder="Unesite dob"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          isDisabled="false"
        />

        <InputField
          label="Spol"
          type="text"
          placeholder="Unesite spol"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          isDisabled="false"
        />

        <TextArea
          label="Razne napomene"
          placeholder="Unesite razne napomene"
          value={miscellaneousLimits}
          onChange={(e) => setMiscellaneousLimits(e.target.value)}
          isDisabled="false"
        />
      </form>
    </div>
  );
}

export default UserDetails;
