import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TeacherDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const teacherId = user?.teacherId;

  useEffect(() => {
  const fetchCourses = async () => {
    try {
      console.log(JSON.parse(localStorage.getItem("user")));
      if (!user?.teacherId) {
        setError("Teacher information not found");
        setLoading(false);
        return;
      }

      // Use teacherId (T001) not user.id (U001)
      const res = await axios.get(
        `http://localhost:4000/api/courses?teacherId=${user.teacherId}`
      );

      const data = res.data.data || [];
      setCourses(data);

      // Count unique students
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

  fetchCourses();
}, [user?.teacherId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="dashboard-page">
      <header className="page-header">
        <h2>Teacher Dashboard</h2>
        <p>
          Welcome back, <strong>{user.name || user.username}</strong> 👋
        </p>
      </header>

      <section className="dashboard-stats">
        <div className="stat-card" onClick={() => navigate(`/teacher/courses`)}>
          <h3>📚 Courses Assigned</h3>
          <p>{courses.length}</p>
        </div>
        <div className="stat-card">
          <h3>👩‍🎓 Total Students</h3>
          <p>{totalStudents}</p>
        </div>
      </section>

      <section className="teacher-courses">
        <h3>Assigned Courses</h3>
        <div className="courses-grid">
          {courses.map((course) => (
            <div className="course-card" key={course.id} onClick={() => navigate(`/teacher/courses`)}>
              <h4>{course.name}</h4>
              <p>Code: {course.courseCode}</p>
              <p>Semester: {course.semester}</p>
              <p>Students: {course.students.length}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TeacherDashboard;
