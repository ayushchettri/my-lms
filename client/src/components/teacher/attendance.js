import React from "react";
import { useNavigate } from "react-router-dom";
import "./TeacherAttendance.css";

const TeacherAttendance = () => {
  const navigate = useNavigate();

  const subjects = ["Mathematics", "Science", "English", "History", "Computer Science"];

  return (
    <div className="teacher-attendance">
      <h1>Attendance</h1>
      <p className="subtitle">Click on a subject below to take attendance</p>

      <div className="subject-grid">
        {subjects.map((subject, index) => (
          <div
            key={index}
            className="subject-card"
            onClick={() => navigate(`/teacher/attendance/${subject.toLowerCase()}`)}
          >
            <h3>{subject}</h3>
            <p>Click to take attendance</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherAttendance;
