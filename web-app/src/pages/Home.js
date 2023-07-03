import { useEffect, useState } from "react";
import Header from "../components/header";
import jwt_decode from "jwt-decode";
import HomeCard from "../components/HomeCard";
import {
  getClients,
  getMeals,
  getPrograms,
  getTrainings,
} from "../utils/getData";

function Home() {
  const [greeting, setGreeting] = useState("");
  const [programs, setPrograms] = useState([]);
  const [clients, setClients] = useState([]);
  const [meals, setMeals] = useState([]);
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    getPrograms()
      .then((data) => setPrograms(data))
      .catch(() => {});

    getClients()
      .then((data) => setClients(data))
      .catch(() => {});

    getMeals()
      .then((data) => setMeals(data))
      .catch(() => {});
    getTrainings()
      .then((data) => setTrainings(data))
      .catch(() => {});

    const decodedToken = jwt_decode(token);
    const email = decodedToken.email;

    const name = email.split("@")[0];

    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    if (currentHour >= 6 && currentHour < 12) {
      setGreeting(`Dobro jutro, ${name}!`);
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting(`Dobar dan, ${name}!`);
    } else {
      setGreeting(`Dobro veče, ${name}!`);
    }
  }, []);

  return (
    <div className="container">
      <Header />
      <h1 className="text-left py-5">{greeting}</h1>

      <div className="row">
        <HomeCard
          edit
          allHref="/programs"
          emptyText={"Još nemate nijedan program!"}
          href="programDetails"
          list={programs.map((item, index) => ({
            id: item.ProgramID,
            name: item.Name,
          }))}
          category="Programi"
          btnText="Svi programi"
          btnAddText="Dodaj program"
          addHref="newProgram"
        />

        <HomeCard
          allHref="/clients"
          emptyText={"Još nemate nijednog klijenta!"}
          href="clientDetails"
          list={clients.map((item, index) => ({
            id: item.UserID,
            name: item.FirstName + " " + item.LastName,
          }))}
          category="Klijenti"
          btnText="Svi klijenti"
        />

        <HomeCard
          edit
          allHref="/meals"
          emptyText={"Još nemate nijedan obrok!"}
          href="mealDetails"
          list={meals.map((item, index) => ({
            id: item.MealID,
            name: item.mealName,
            0: index,
          }))}
          category="Obroci"
          btnText="Svi obroci"
          btnAddText="Dodaj obrok"
          addHref="newMeal"
        />

        <HomeCard
          edit
          allHref="/trainings"
          emptyText={"Još nemate nijedan trening!"}
          href="trainingDetails"
          list={trainings.map((item, index) => ({
            id: item.TrainingID,
            name: item.trainingsName,
            0: index,
          }))}
          category="Treninzi"
          btnText="Svi treninzi"
          btnAddText="Dodaj trening"
          addHref="newTraining"
        />
      </div>
    </div>
  );
}

export default Home;
