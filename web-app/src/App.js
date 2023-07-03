import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Meals from "./pages/Meals";
import Clients from "./pages/Clients";
import Programs from "./pages/Programs";
import Password from "./pages/Password";
import NewProgram from "./pages/NewProgram";
import ProgramDetails from "./pages/ProgramDetails";
import NewMeal from "./pages/NewMeal";
import MealDetails from "./pages/MealDetails";
import UserDetails from "./pages/ClientDetails";
import { isLogin } from "./utils/getData";
import Trainings from "./pages/Trainings";
import NewTraining from "./pages/NewTraining";
import TrainingDetails from "./pages/TrainingDetail";
import Week from "./pages/Week";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/" &&
      window.location.pathname !== "/register"
    ) {
      setIsLoggedIn(isLogin());
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {isLoggedIn && (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/meals" element={<Meals />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/week" element={<Week />} />
            <Route path="/trainings" element={<Trainings />} />
            <Route path="/password" element={<Password />} />
            <Route path="/newProgram" element={<NewProgram />} />
            <Route path="/newMeal" element={<NewMeal />} />
            <Route path="/newTraining" element={<NewTraining />} />
            <Route
              path="/programDetails/:programId"
              element={<ProgramDetails />}
            />
            <Route path="/mealDetails/:mealId" element={<MealDetails />} />
            <Route path="/clientDetails/:userId" element={<UserDetails />} />
            <Route
              path="/trainingDetails/:trainingId"
              element={<TrainingDetails />}
            />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
