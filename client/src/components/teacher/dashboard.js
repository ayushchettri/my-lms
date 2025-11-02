import React, { useEffect, useState } from "react";
import axios from "axios";

const TeacherDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 👇 Get logged-in teacher from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
  const fetchTeacherCourses = async () => {
    try {
      if (!user?.id) {
        setError("Teacher information not found");
        setLoading(false);
        return;
      }

      // 1️⃣ Get the teacher record using userId
      const teacherRes = await axios.get(
        `http://localhost:4000/api/teachers/user/${user.id}`
      );

      const teacher = teacherRes.data;
      if (!teacher || !teacher.id) {
        setError("Teacher record not found");
        setLoading(false);
        return;
      }

      // 2️⃣ Fetch only the courses assigned to this teacher
      const courseRes = await axios.get(
        `http://localhost:4000/api/courses?teacherId=${teacher.id}`
      );

      const data = courseRes.data.data || [];
      setCourses(data);

      // 🧮 Count unique students across all teacher’s courses
      const totalUniqueStudents = new Set(
        data.flatMap((course) => course.students.map((s) => s.id))
      ).size;

      setTotalStudents(totalUniqueStudents);
    } catch (err) {
      console.error("❌ Error fetching courses:", err);
      setError("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  fetchTeacherCourses();
}, [user?.id]);


  if (loading) return <p className="loading">Loading dashboard...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="dashboard-page">
      <header className="page-header">
        <h2>Teacher Dashboard</h2>
        <p>
          Welcome back, <strong>{user.username}</strong> 👋
        </p>
      </header>

      <section className="dashboard-stats">
        <div className="stat-card">
          <h3>📚 Courses Assigned</h3>
          <p>{courses.length}</p>
        </div>
        <div className="stat-card">
          <h3>👩‍🎓 Total Students</h3>
          <p>{totalStudents}</p>
        </div>
        <div className="stat-card">
          <h3>🕒 Pending Attendance</h3>
          <p>0</p>
        </div>
      </section>

      <section className="teacher-courses">
        <h3>Your Assigned Courses</h3>
        <div className="courses-grid">
          {courses.length === 0 ? (
            <p>No courses assigned to you yet.</p>
          ) : (
            courses.map((course) => (
              <div className="course-card" key={course.id}>
                <h4>{course.name}</h4>
                <p><strong>Course Code:</strong> {course.courseCode}</p>
                <p><strong>Semester:</strong> {course.semester}</p>
                <p><strong>Students:</strong> {course.students.length}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default TeacherDashboard;
