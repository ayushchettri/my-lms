import React from "react";

const Attendance = () => {
  const subjects = [
    { name: "Deep Learning", attendance: "95%" },
    { name: "Distributed and Cloud Computing", attendance: "88%" },
    { name: "Essentials of Management", attendance: "92%" },
    { name: "Engineering Research Methodology", attendance: "97%" },
    { name: "Internet of Things", attendance: "90%" },
  ];

  return (
    <div className="attendance-page">
      <header className="page-header">
        <h2>Attendance</h2>
      </header>

      <table className="attendance-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((sub, i) => (
            <tr key={i}>
              <td>{sub.name}</td>
              <td>{sub.attendance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
