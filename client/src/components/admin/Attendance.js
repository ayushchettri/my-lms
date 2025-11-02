import React, { useState } from "react";

const Attendance = () => {
  const semesters = [
    { semester: "Semester 1", students: 80 },
    { semester: "Semester 2", students: 75 },
    { semester: "Semester 3", students: 78 },
    { semester: "Semester 4", students: 70 },
  ];

  const [selectedSem, setSelectedSem] = useState(null);

  const studentsData = [
    { name: "Riya Patel", attendance: "92%" },
    { name: "Arjun Mehta", attendance: "88%" },
    { name: "Sneha Reddy", attendance: "95%" },
  ];

  return (
    <div className="attendance-page">
      <header className="page-header">
        <h2>Attendance Overview</h2>
        <p>Click on a semester to view detailed attendance</p>
      </header>

      <div className="semester-grid">
        {semesters.map((s, i) => (
          <div
            key={i}
            className="semester-card"
            onClick={() => setSelectedSem(s.semester)}
          >
            <h4>{s.semester}</h4>
            <p>Students: {s.students}</p>
          </div>
        ))}
      </div>

      {selectedSem && (
        <div className="attendance-details">
          <h3>Attendance - {selectedSem}</h3>
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {studentsData.map((st, i) => (
                <tr key={i}>
                  <td>{st.name}</td>
                  <td>{st.attendance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Attendance;
