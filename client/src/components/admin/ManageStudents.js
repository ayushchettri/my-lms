import React, { useState } from "react";

const ManageStudents = () => {
  const [students, setStudents] = useState([
    { name: "Ayush Chettri", email: "ayush@sist.edu.in", semester: "5" },
    { name: "Sneha Reddy", email: "sneha@sist.edu.in", semester: "4" },
  ]);

  const [newStudent, setNewStudent] = useState({ name: "", email: "", semester: "" });

  const handleAdd = () => {
    if (!newStudent.name || !newStudent.email || !newStudent.semester) return;
    setStudents([...students, newStudent]);
    setNewStudent({ name: "", email: "", semester: "" });
  };

  const handleDelete = (index) => {
    const updated = [...students];
    updated.splice(index, 1);
    setStudents(updated);
  };

  return (
    <div className="manage-page">
      <header className="page-header">
        <h2>Manage Students</h2>
        <p>Add, remove, or update student data</p>
      </header>

      <div className="add-user">
        <input
          type="text"
          placeholder="Full Name"
          value={newStudent.name}
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newStudent.email}
          onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Semester"
          value={newStudent.semester}
          onChange={(e) => setNewStudent({ ...newStudent, semester: e.target.value })}
        />
        <button onClick={handleAdd}>Add Student</button>
      </div>

      <h3>All Students</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Semester</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr key={i}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.semester}</td>
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

export default ManageStudents;
