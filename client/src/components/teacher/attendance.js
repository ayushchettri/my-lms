import React, { useState } from "react";

const Attendance = () => {
  const subjects = ["Computer Networks", "Operating Systems", "Database Systems"];
  const [selected, setSelected] = useState(null);

  return (
    <div className="attendance-page">
      <header className="page-header">
        <h2>Attendance Management</h2>
        <p>Select a subject to take attendance</p>
      </header>

      <div className="attendance-subjects">
        {subjects.map((sub, i) => (
          <div key={i} className="subject-card" onClick={() => setSelected(sub)}>
            <h4>{sub}</h4>
          </div>
        ))}
      </div>

      {selected && (
        <div className="attendance-panel">
          <h3>Taking Attendance for: {selected}</h3>
          <div className="attendance-actions">
            <button>Mark Present</button>
            <button>Mark Absent</button>
            <button>Save Attendance</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
