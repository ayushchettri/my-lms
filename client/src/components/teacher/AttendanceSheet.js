import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AttendanceSheet.css";

const AttendanceSheet = () => {
  const { subject } = useParams();
  const navigate = useNavigate();

  const [month, setMonth] = useState("2025-11");
  const [grade, setGrade] = useState("");
  const [attendance, setAttendance] = useState([]);

  const students = [
    "Rahul S",
    "Harry Potter",
    "Michael L. Eby",
    "Edward C. Gonzalez",
    "Amanda M. McGee",
  ];

  const handleSearch = () => {
    if (!grade) {
      alert("Please select a grade first!");
      return;
    }

    const newAttendance = students.map((student) => ({
      name: student,
      days: Array(31).fill(false),
    }));
    setAttendance(newAttendance);
  };

  const handleCheckbox = (sIdx, dIdx) => {
    const updated = [...attendance];
    updated[sIdx].days[dIdx] = !updated[sIdx].days[dIdx];
    setAttendance(updated);
  };

  const saveAttendance = () => {
    console.log("Attendance saved:", attendance);
    alert("Attendance saved successfully!");
    navigate("/teacher/attendance");
  };

  return (
    <div className="attendance-sheet">
      <div className="header">
        <h2>Attendance - {subject.charAt(0).toUpperCase() + subject.slice(1)}</h2>
        <button className="back-btn" onClick={() => navigate("/teacher/attendance")}>
          ← Back
        </button>
      </div>

      <div className="filter-section">
        <div>
          <label>Select Month:</label>
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </div>

        <div>
          <label>Select Grade:</label>
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          >
            <option value="">-- Select --</option>
            <option value="1st">1st</option>
            <option value="2nd">2nd</option>
            <option value="3rd">3rd</option>
            <option value="4th">4th</option>
            <option value="5th">5th</option>
          </select>
        </div>

        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>

      {attendance.length > 0 && (
        <div className="attendance-table">
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                {Array.from({ length: 31 }, (_, i) => (
                  <th key={i}>{i + 1}</th>
                ))}
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((student, sIdx) => (
                <tr key={sIdx}>
                  <td className="name-cell">{student.name}</td>
                  {student.days.map((present, dIdx) => (
                    <td key={dIdx}>
                      <div
                        className={`checkbox ${present ? "checked" : ""}`}
                        onClick={() => handleCheckbox(sIdx, dIdx)}
                      >
                        {present ? "✔" : ""}
                      </div>
                    </td>
                  ))}
                  <td className="total-cell">
                    {student.days.filter(Boolean).length}/31
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="footer-buttons">
            <button className="cancel-btn" onClick={() => navigate("/teacher/attendance")}>
              Cancel
            </button>
            <button className="save-btn" onClick={saveAttendance}>
              Save Attendance
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceSheet;
