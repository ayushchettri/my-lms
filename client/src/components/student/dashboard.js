import React from "react";

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <main className="main-area">
        {/* Header Section */}
        <header className="header">
          <div>
            <h2>Welcome Back 👋</h2>
            <p>Ayush Chettri | 22CSEC34 | 7th Semester</p>
          </div>
          <div className="attendance-widget">
            <h4>Attendance</h4>
            <div className="circle">
              <div className="inner-circle"></div>
              <span className="attendance-value">90%</span>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <section className="stats">
          <div className="stat-card">
            <h3>📚 Courses Enrolled</h3>
            <p className="stat-number">5</p>
          </div>
          <div className="stat-card">
            <h3>📝 Assignments Due</h3>
            <p className="stat-number">2</p>
          </div>
          <div className="stat-card">
            <h3>⭐ GPA</h3>
            <p className="stat-number">7.6</p>
          </div>
        </section>

        {/* Courses Section */}
        <section className="courses-section">
          <h2>My Courses</h2>
          <div className="courses-grid">
            <div className="course-card">
              <div className="course-image">WEB</div>
              <h4>Web Development</h4>
              <p>HTML, CSS, JS, React</p>
            </div>
            <div className="course-card">
              <div className="course-image">DS</div>
              <h4>Data Structures</h4>
              <p>Arrays, Trees, Graphs</p>
            </div>
            <div className="course-card">
              <div className="course-image">DBMS</div>
              <h4>Database Systems</h4>
              <p>SQL, PostgreSQL</p>
            </div>
          </div>
        </section>

        {/* Assignment Section */}
        <section className="assignments-section">
          <h2>Recent Assignments</h2>
          <div className="assignment-list">
            <div className="assignment-card">
              <h4>IoT Project Report</h4>
              <p>Due: 5 Nov 2025</p>
              <button>Upload</button>
            </div>
            <div className="assignment-card">
              <h4>DBMS Mini Project</h4>
              <p>Due: 10 Nov 2025</p>
              <button>Upload</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
