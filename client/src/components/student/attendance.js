import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Student.css";

const StudentAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [message, setMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchAttendance = async () => {
      if (!user?.studentId) return;

      try {
        const res = await axios.get(`http://localhost:4000/api/attendance/student/${user.studentId}`);
        setAttendanceData(res.data.data || []);
        setMessage("");
      } catch (err) {
        console.error("❌ Error fetching student attendance:", err);
        setMessage("⚠️ Failed to fetch attendance records.");
      }
    };

    fetchAttendance();
  }, [user]);

  return (
    <div className="student-attendance-container">
      <div className="table-title"><h2>🎓 My Attendance Summary</h2></div>
      

      {message && <p className="message">{message}</p>}
      <div className="table-scroll">{attendanceData.length > 0 ? (
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Course ID</th>
              <th>Course Name</th>
              <th>Classes Attended</th>
              <th>Total Classes</th>
              <th>Attendance %</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((record) => (
              <tr key={record.courseId}>
                <td>{record.courseId}</td>
                <td>{record.courseName}</td>
                <td>{record.present}</td>
                <td>{record.total}</td>
                <td>{record.percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No attendance data found.</p>
      )}</div>
      
    </div>
  );
};

export default StudentAttendance;
