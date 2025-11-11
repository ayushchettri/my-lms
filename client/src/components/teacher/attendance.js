import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TeacherAttendance.css";

const TeacherAttendance = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [existingAttendance, setExistingAttendance] = useState(false);
  const [attendanceSummary, setAttendanceSummary] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));

  // 🧠 Load courses for the logged-in teacher
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/courses?teacherId=${user.teacherId}`
        );
        setCourses(res.data.data || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    if (user?.teacherId) fetchCourses();
  }, [user]);

  // 🧠 Fetch attendance or student list based on course + date
  useEffect(() => {
    const fetchAttendanceOrStudents = async () => {
      if (!selectedCourse || !date) return;

      try {
        // ✅ Try fetching attendance first
        const res = await axios.get(
          `http://localhost:4000/api/attendance/course/${selectedCourse}?date=${date}`
        );

        // ✅ If attendance already exists
        if (res.data?.data && res.data.data.length > 0) {
          const existing = {};
          const summary = {};
          const studentList = [];

          res.data.data.forEach((record) => {
            existing[record.studentId] = record.status === "Present";
            summary[record.studentId] =
              record.attendancePercentage || record.record || "0%";
            if (record.student) studentList.push(record.student);
          });

          // ✅ Sort studentList by studentId (22CSEC01 → 22CSEC02 → ...)
          studentList.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));

          setStudents(studentList);
          setAttendance(existing);
          setAttendanceSummary(summary);
          setExistingAttendance(true);
          setMessage("✅ Attendance already recorded for this date.");
        } else {
          // 🆕 No attendance yet — fetch course student list
          const courseRes = await axios.get(
            `http://localhost:4000/api/courses/${selectedCourse}`
          );

          const studentList =
            courseRes.data?.students ||
            courseRes.data?.data?.students ||
            courseRes.data?.course?.students ||
            [];

          // ✅ Sort studentList by studentId
          studentList.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));

          setStudents(studentList);
          setAttendance({});
          setAttendanceSummary({});
          setExistingAttendance(false);
          setMessage("");
        }
      } catch (error) {
        console.error("❌ Error fetching attendance/students:", error);
        setMessage("⚠️ Error fetching attendance or student data. Check console for details.");
        setStudents([]);
      }
    };

    fetchAttendanceOrStudents();
  }, [selectedCourse, date]);

  // 🧠 Handle checkbox change (mark Present/Absent)
  const handleCheckboxChange = (studentId) => {
    if (existingAttendance) return;
    setAttendance((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
  };

  // 🧠 Submit attendance
  const handleSubmit = async () => {
    if (!selectedCourse || !date) {
      setMessage("⚠️ Please select both course and date!");
      return;
    }

    try {
      const attendanceData = students.map((s) => ({
        courseId: selectedCourse,
        studentId: s.id,
        status: attendance[s.id] ? "Present" : "Absent",
        date,
      }));

      const res = await axios.post("http://localhost:4000/api/attendance/bulk", {
        attendanceData,
      });

      setMessage("✅ Attendance submitted successfully!");
      setExistingAttendance(true);
    } catch (err) {
      console.error("❌ Error submitting attendance:", err.response?.data || err.message);
      setMessage(`❌ Failed to submit attendance: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="attendance-container">
      <h2>📅 Attendance Management</h2>

      <div className="attendance-controls">
        <select onChange={(e) => setSelectedCourse(e.target.value)} value={selectedCourse}>
          <option value="">-- Select Course --</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>

        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

        <button onClick={handleSubmit} disabled={existingAttendance}>
          {existingAttendance ? "Attendance Already Recorded" : "Submit Attendance"}
        </button>
      </div>

      {message && <p className="message">{message}</p>}

      {students.length > 0 ? (
        <div className="attendance-table">
          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Present</th>
                <th>Record</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.user?.username || "Unknown"}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={attendance[student.id] || false}
                      onChange={() => handleCheckboxChange(student.id)}
                      disabled={existingAttendance}
                    />
                  </td>
                  <td>{attendanceSummary[student.id] || "0%"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        selectedCourse && <p>No students found for this course.</p>
      )}
    </div>
  );
};

export default TeacherAttendance;
