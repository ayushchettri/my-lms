import React from "react";

const TeacherDashboard = () => {
  const courses = [
    { name: "Computer Networks", students: 60 },
    { name: "Operating Systems", students: 58 },
    { name: "Database Systems", students: 62 },
  ];

  return (
    <div className="dashboard-page">
      <header className="page-header">
        <h2>Teacher Dashboard</h2>
        <p>Welcome back, <strong>Prof. Sharma</strong> 👋</p>
      </header>

      <section className="dashboard-stats">
        <div className="stat-card">
          <h3>📚 Courses Assigned</h3>
          <p>{courses.length}</p>
        </div>
        <div className="stat-card">
          <h3>👩‍🎓 Total Students</h3>
          <p>180+</p>
        </div>
        <div className="stat-card">
          <h3>🕒 Pending Attendance</h3>
          <p>2</p>
        </div>
      </section>

      <section className="teacher-courses">
        <h3>Assigned Courses</h3>
        <div className="courses-grid">
          {courses.map((course, i) => (
            <div className="course-card" key={i}>
              <h4>{course.name}</h4>
              <p>Students: {course.students}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TeacherDashboard;
