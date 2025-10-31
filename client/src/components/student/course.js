import React from "react";

const Courses = () => {
  const courses = [
    { title: "Deep Learning", code: "MTH101" },
    { title: "Distributed and Cloud Computing", code: "PHY102" },
    { title: "Essentials of Management", code: "CHE103" },
    { title: "Engineering Research Methodology", code: "CSE104" },
    { title: "Internet of Things", code: "ENG105" },
  ];

  return (
    <div className="courses-page">
      <header className="page-header">
        <h2>Courses Enrolled</h2>
      </header>

      <div className="courses-grid">
        {courses.map((course, i) => (
          <div className="course-card" key={i}>
            <h3>{course.title}</h3>
            <p>{course.code}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
