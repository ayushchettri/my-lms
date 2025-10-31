import React from "react";

const Assignments = () => {
  const assignments = [
    { title: "DCC Assignment 1", due: "Nov 5, 2025" },
    { title: "IS Lab Report", due: "Nov 10, 2025" },
    { title: "IoT Assignment 3", due: "Nov 12, 2025" },
  ];

  return (
    <div className="assignments-page">
      <header className="page-header">
        <h2>Assignments</h2>
      </header>

      <div className="assignment-list">
        {assignments.map((a, i) => (
          <div className="assignment-card" key={i}>
            <h3>{a.title}</h3>
            <p>Due Date: {a.due}</p>
            <button className="submit-btn">Submit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assignments;
