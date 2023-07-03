import { useState, useEffect } from "react";
import Header from "../components/header";
import SelectProgram from "../components/SelectProgram";
import axios from "axios";
import MealComponent from "../components/MealComponent";
import TrainingComponent from "../components/TrainingComponent";

function Week() {
  const [selectedProgram, setSelectedProgram] = useState("");
  const [daysMeals, setDaysMeals] = useState({});
  const [daysTrainings, setDaysTrainings] = useState({});

  const API_URL = `http://oicar-22-433a6d03acdd.herokuapp.com/week/${selectedProgram}/`;
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (selectedProgram !== "") {
      getData();
    }
  }, [selectedProgram]);

  const getData = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { meals, trainings } = response.data;
      const daysMeals = createMeals(meals);
      const daysTrainings = createTrainings(trainings);
      setDaysMeals(daysMeals);
      setDaysTrainings(daysTrainings);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelect = (value) => {
    setSelectedProgram(value);
  };

  const createMeals = (meals) => {
    var daysMeals = {};

    meals.forEach((meal) => {
      var days = meal.DaysOfWeek.split(", ");

      days.forEach((day) => {
        if (!daysMeals[day]) {
          daysMeals[day] = [];
        }

        daysMeals[day].push({
          name: meal.Name,
          type: getTranslatedType(meal.Type),
          id: meal.MealID,
        });
      });
    });

    Object.keys(daysMeals).forEach((day) => {
      daysMeals[day].sort((a, b) => {
        const typeOrder = {
          Doručak: 0,
          Ručak: 1,
          Užina: 2,
          Večera: 3,
        };
        return typeOrder[a.type] - typeOrder[b.type];
      });
    });

    console.log(daysMeals);
    return daysMeals;
  };

  const getTranslatedType = (type) => {
    switch (type) {
      case "Breakfast":
        return "Doručak";
      case "Lunch":
        return "Ručak";
      case "Snack":
        return "Užina";
      case "Dinner":
        return "Večera";
      default:
        return type;
    }
  };

  const createTrainings = (trainings) => {
    var daysTrainings = {};

    trainings.forEach((training) => {
      var days = training.DaysOfWeek.split(", ");

      days.forEach((day) => {
        if (!daysTrainings[day]) {
          daysTrainings[day] = [];
        }

        daysTrainings[day].push({
          name: training.Name,
          type: training.Type,
          id: training.TrainingID,
        });
      });
    });

    return daysTrainings;
  };

  return (
    <div className="container ">
      <Header></Header>

      <div className="row py-5 center gapMobile-2 justify-content-center">
        <h1 className="col-12 col-md-8">Tjedni pregled programa:</h1>

        <div className="form-group pull-right col-12 col-md-4">
          <SelectProgram value={selectedProgram} onChange={handleSelect} />
        </div>

        {selectedProgram === "" && (
          <h2 className="text-center py-5">
            Odaberite program koji želite pregledati
          </h2>
        )}

        {selectedProgram !== "" && (
          <div className="table-responsive text-center py-5">
            <table className="table table-striped table-dark border-dark">
              <thead>
                <tr>
                  <th scope="col">Ponedjeljak</th>
                  <th scope="col">Utorak</th>
                  <th scope="col">Srijeda</th>
                  <th scope="col">Četvrtak</th>
                  <th scope="col">Petak</th>
                  <th scope="col">Subota</th>
                  <th scope="col">Nedjelja</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {daysMeals["Ponedjeljak"]?.map((meal) => (
                      <MealComponent
                        key={meal.id}
                        id={meal.id}
                        type={meal.type}
                        name={meal.name}
                      />
                    ))}
                  </td>
                  <td>
                    {daysMeals["Utorak"]?.map((meal) => (
                      <MealComponent
                        key={meal.id}
                        id={meal.id}
                        type={meal.type}
                        name={meal.name}
                      />
                    ))}
                  </td>
                  <td>
                    {daysMeals["Srijeda"]?.map((meal) => (
                      <MealComponent
                        key={meal.id}
                        id={meal.id}
                        type={meal.type}
                        name={meal.name}
                      />
                    ))}
                  </td>
                  <td>
                    {daysMeals["Četvrtak"]?.map((meal) => (
                      <MealComponent
                        key={meal.id}
                        id={meal.id}
                        type={meal.type}
                        name={meal.name}
                      />
                    ))}
                  </td>
                  <td>
                    {daysMeals["Petak"]?.map((meal) => (
                      <MealComponent
                        key={meal.id}
                        id={meal.id}
                        type={meal.type}
                        name={meal.name}
                      />
                    ))}
                  </td>
                  <td>
                    {daysMeals["Subota"]?.map((meal) => (
                      <MealComponent
                        key={meal.id}
                        id={meal.id}
                        type={meal.type}
                        name={meal.name}
                      />
                    ))}
                  </td>
                  <td>
                    {daysMeals["Nedjelja"]?.map((meal) => (
                      <MealComponent
                        key={meal.id}
                        id={meal.id}
                        type={meal.type}
                        name={meal.name}
                      />
                    ))}
                  </td>
                </tr>
                <tr>
                  <td>
                    {daysTrainings["Ponedjeljak"]?.map((training) => (
                      <TrainingComponent
                        key={training.id}
                        id={training.id}
                        type={training.type}
                        name={training.name}
                      />
                    ))}
                  </td>
                  <td>
                    {daysTrainings["Utorak"]?.map((training) => (
                      <TrainingComponent
                        key={training.id}
                        id={training.id}
                        type={training.type}
                        name={training.name}
                      />
                    ))}
                  </td>
                  <td>
                    {daysTrainings["Srijeda"]?.map((training) => (
                      <TrainingComponent
                        key={training.id}
                        id={training.id}
                        type={training.type}
                        name={training.name}
                      />
                    ))}
                  </td>
                  <td>
                    {daysTrainings["Četvrtak"]?.map((training) => (
                      <TrainingComponent
                        key={training.id}
                        id={training.id}
                        type={training.type}
                        name={training.name}
                      />
                    ))}
                  </td>
                  <td>
                    {daysTrainings["Petak"]?.map((training) => (
                      <TrainingComponent
                        key={training.id}
                        id={training.id}
                        type={training.type}
                        name={training.name}
                      />
                    ))}
                  </td>
                  <td>
                    {daysTrainings["Subota"]?.map((training) => (
                      <TrainingComponent
                        key={training.id}
                        id={training.id}
                        type={training.type}
                        name={training.name}
                      />
                    ))}
                  </td>
                  <td>
                    {daysTrainings["Nedjelja"]?.map((training) => (
                      <TrainingComponent
                        key={training.id}
                        id={training.id}
                        type={training.type}
                        name={training.name}
                      />
                    ))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Week;
