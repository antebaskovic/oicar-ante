import React from "react";

const DaysOfWeek = ({ selectedDays, onDaySelect }) => {
  const daysOfWeekOptions = [
    { label: "Ponedjeljak", value: "Ponedjeljak" },
    { label: "Utorak", value: "Utorak" },
    { label: "Srijeda", value: "Srijeda" },
    { label: "Četvrtak", value: "Četvrtak" },
    { label: "Petak", value: "Petak" },
    { label: "Subota", value: "Subota" },
    { label: "Nedjelja", value: "Nedjelja" },
  ];

  return (
    <div className="form-group row">
      <label className="col-md-2 col-form-label text-start">
        Dani u tjednu:
      </label>
      <div className="col-md-10">
        {daysOfWeekOptions.map((option) => (
          <div key={option.value} className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id={option.value}
              value={option.value}
              checked={selectedDays.includes(option.value)}
              onChange={() => onDaySelect(option.value)}
            />
            <label className="form-check-label" htmlFor={option.value}>
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DaysOfWeek;
