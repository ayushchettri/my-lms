import React, { useState, useEffect } from "react";
import axios from "axios";

const Attendance = () => {
  const [semesters, setSemesters] = useState([]);
  const [selectedSem, setSelectedSem] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch semesters on load
  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/admins/semesters");
        setSemesters(res.data.data || []);
      } catch (err) {
        console.error("Error fetching semesters:", err);
      }
    };
    fetchSemesters();
  }, []);

  // ✅ Fetch and sort students by semester when a card is clicked
  const handleSemesterClick = async (semester) => {
    setSelectedSem(semester);
    setLoading(true);

    try {
      const res = await axios.get(
        `http://localhost:4000/api/admins/students-by-semester/${semester}`
      );

      let fetchedStudents = res.data.data || [];

      // ✅ Sort students by ID (e.g., 22CSEC01 → 22CSEC02 → 22CSEC10)
      fetchedStudents.sort((a, b) =>
        a.studentId.localeCompare(b.studentId, undefined, {
          numeric: true,
          sensitivity: "base",
        })
      );

      setStudents(fetchedStudents);
    } catch (err) {
      console.error("Error fetching students:", err);
      setStudents([]);
    }

    setLoading(false);
  };

  return (
    <div className="attendance-page">
      <header className="page-header">
        <h2>Attendance Overview</h2>
        <p>Click on a semester to view detailed attendance</p>
      </header>

      {/* ✅ Semester Cards */}
      <div className="semester-grid">
        {semesters.length > 0 ? (
          semesters.map((s, i) => (
            <div
              key={i}
              className="semester-card"
              onClick={() => handleSemesterClick(s.semester)}
            >
              <h4>{s.semester}</h4>
              <p>Students: {s.studentCount}</p>
            </div>
          ))
        ) : (
          <p>No semester data found</p>
        )}
      </div>

      {/* ✅ Student Table */}
      {selectedSem && (
        <div className="attendance-details">
          <h3>Attendance - {selectedSem}</h3>

          {loading ? (
            <p>Loading students...</p>
          ) : students.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody>
                {students.map((st, i) => (
                  <tr key={i}>
                    <td>{st.studentId}</td>
                    <td>{st.name}</td>
                    <td>{st.attendance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No student data available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Attendance;
