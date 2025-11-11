import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [student, setStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [attendance, setAttendance] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user?.studentId) return;

    // ✅ 1️⃣ Fetch student profile
    const fetchStudent = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/students/profile/${user.studentId}`
        );
        setStudent(res.data.data);
      } catch (error) {
        console.error("❌ Error fetching student profile:", error);
      }
    };
    if (user?.studentId) fetchStudent();

    // ✅ 2️⃣ Fetch enrolled courses
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/students/${user.studentId}/courses`);
        setCourses(res.data.data || []);
      } catch (err) {
        console.error("❌ Error fetching courses:", err);
      }
    };

    // ✅ 3️⃣ Fetch assignments (optional API route)
    const fetchAssignments = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/assignments/student/${user.studentId}`);
        setAssignments(res.data.data || []);
      } catch (err) {
        console.error("❌ Error fetching assignments:", err);
      }
    };
    //Fetch Student profile

    const fetchDashboardData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return;

        // ✅ Fetch student courses
        const res = await axios.get(`http://localhost:4000/api/students/${user.id}/courses`);
        setCourses(res.data.data.courses || []);
        setStudent(res.data.data.student || null);
      } catch (error) {
        console.error("❌ Error loading dashboard:", error);
      }
    };

    

    // ✅ 4️⃣ Fetch attendance summary (overall)
    const fetchAttendance = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/attendance/student/${user.studentId}`);
        setAttendance(res.data.percentage || 0);
      } catch (err) {
        console.error("❌ Error fetching attendance:", err);
      }
    };

    fetchDashboardData();
    fetchStudent();
    fetchCourses();
    fetchAssignments();
    fetchAttendance();
  }, [user]);

  return (
    <div className="dashboard-page">
      <main className="main-area">
        {/* Header Section */}
        <header className="header">
          <div>
            <h2>Welcome Back 👋</h2>
            <p>
              {student?.name || user?.name} | {student?.id || "N/A"} |{" "}
              {student?.semester || "N/A"} Semester
            </p>
          </div>
        </header>

        {/* Stats Cards */}
        <section className="stats">
          <div className="stat-card" onClick={() => navigate(`/student/courses`)}>
            <h3>📚 Courses Enrolled</h3>
            
            <p className="stat-number">{courses.length}</p>
          </div>
          <div className="stat-card" onClick={() => navigate(`/student/assignments`)}>
            <h3>📝 Assignments Due</h3>
            <p className="stat-number">{assignments.length}</p>
          </div>
        </section>

        {/* Courses Section */}
        <section className="courses-section">
          <h2>My Courses</h2>
          <div className="courses-grid">
            {courses.map((course) => (
              <div
                className="course-card"
                key={course.id}
                onClick={() => navigate(`/student/courses/${course.id}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="course-image">
                  {course.name?.split(" ").map((w) => w[0]).join("")}
                </div>
                <h4>{course.name}</h4>
                <p>{course.courseCode}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
