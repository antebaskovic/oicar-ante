import { useEffect, useState } from "react";
import axios from "axios";

function SelectProgram({ value, onChange }) {
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    getData();
  }, []); // Add an empty dependency array to run the effect only once

  const getData = async () => {
    const API_URL = "http://oicar-22-433a6d03acdd.herokuapp.com/program";

    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const programs = response.data.map((program) => program);
      setPrograms(programs);
    } catch (error) {
      alert("Greska prilikom dohvacanja programa!");
    }
  };

  useEffect(() => {
    onChange(selectedProgram);
  }, [selectedProgram, onChange]);

  return (
    <div className="col-md-10">
      <select
        className="form-select"
        aria-label="Default select example"
        value={value}
        required
        onChange={(e) => setSelectedProgram(e.target.value)}
      >
        <option value="">Izaberite program</option>
        {programs.map((program) => (
          <option key={program.ProgramID} value={program.ProgramID}>
            {program.Name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectProgram;
