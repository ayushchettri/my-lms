import React, { useState } from "react";

const Courses = () => {
  const [courses, setCourses] = useState([
    { name: "Database Systems", teacher: "Prof. Sharma", semester: "Sem 4" },
    { name: "Computer Networks", teacher: "Prof. Mehta", semester: "Sem 5" },
  ]);

  const [newCourse, setNewCourse] = useState("");
  const [newSemester, setNewSemester] = useState("");
  const [newTeacher, setNewTeacher] = useState("");

  const handleAddCourse = () => {
    if (!newCourse || !newSemester || !newTeacher) return;
    const newItem = { name: newCourse, teacher: newTeacher, semester: newSemester };
    setCourses([...courses, newItem]);
    setNewCourse(""); setNewTeacher(""); setNewSemester("");
  };

  const handleDelete = (index) => {
    const updated = [...courses];
    updated.splice(index, 1);
    setCourses(updated);
  };

  return (
    <div className="courses-page">
      <header className="page-header">
        <h2>Manage Courses</h2>
      </header>

      <div className="add-course">
        <input
          type="text"
          placeholder="Course Name"
          value={newCourse}
          onChange={(e) => setNewCourse(e.target.value)}
        />
        <input
          type="text"
          placeholder="Semester"
          value={newSemester}
          onChange={(e) => setNewSemester(e.target.value)}
        />
        <input
          type="text"
          placeholder="Assign Teacher"
          value={newTeacher}
          onChange={(e) => setNewTeacher(e.target.value)}
        />
        <button onClick={handleAddCourse}>Add Course</button>
      </div>

      <h3>Available Courses</h3>
      <table>
        <thead>
          <tr>
            <th>Course</th>
            <th>Semester</th>
            <th>Teacher</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c, i) => (
            <tr key={i}>
              <td>{c.name}</td>
              <td>{c.semester}</td>
              <td>{c.teacher}</td>
              <td>
                <button onClick={() => handleDelete(i)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Courses;
