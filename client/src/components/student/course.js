import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  // 🧠 Fetch courses dynamically for the logged-in student
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/students/${user.studentId}/courses`
        );
        setCourses(res.data.data || []);
      } catch (error) {
        console.error("❌ Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.studentId) fetchCourses();
  }, [user]);

  // 🧭 Navigate to course material page
  const handleCourseClick = (courseId) => {
    navigate(`/student/courses/${courseId}`);
  };

  return (
    <div className="courses-page">
      <header className="page-header">
        <h2>📚 My Courses</h2>
      </header>

      {loading ? (
        <p>Loading courses...</p>
      ) : courses.length > 0 ? (
        <div className="courses-grid">
          {courses.map((course) => (
            <div
              className="course-card"
              key={course.id}
              onClick={() => handleCourseClick(course.id)}
              style={{ cursor: "pointer" }}
            >
              <div className="course-image">
                {course.name?.split(" ").map((w) => w[0]).join("")}
              </div>
              <h3>{course.name}</h3>
              <p>{course.courseCode}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No courses found.</p>
      )}
    </div>
  );
};

export default Courses;
