import React, { useState } from "react";

const ManageTeachers = () => {
  const [teachers, setTeachers] = useState([
    { name: "Prof. R. Sharma", email: "rsharma@sist.edu.in", department: "CSE" },
    { name: "Prof. K. Mehta", email: "kmehta@sist.edu.in", department: "IT" },
  ]);

  const [newTeacher, setNewTeacher] = useState({ name: "", email: "", department: "" });

  const handleAdd = () => {
    if (!newTeacher.name || !newTeacher.email || !newTeacher.department) return;
    setTeachers([...teachers, newTeacher]);
    setNewTeacher({ name: "", email: "", department: "" });
  };

  const handleDelete = (index) => {
    const updated = [...teachers];
    updated.splice(index, 1);
    setTeachers(updated);
  };

  return (
    <div className="manage-page">
      <header className="page-header">
        <h2>Manage Teachers</h2>
        <p>Add, remove, or edit teacher records</p>
      </header>

      <div className="add-user">
        <input
          type="text"
          placeholder="Full Name"
          value={newTeacher.name}
          onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newTeacher.email}
          onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Department"
          value={newTeacher.department}
          onChange={(e) => setNewTeacher({ ...newTeacher, department: e.target.value })}
        />
        <button onClick={handleAdd}>Add Teacher</button>
      </div>

      <h3>All Teachers</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((t, i) => (
            <tr key={i}>
              <td>{t.name}</td>
              <td>{t.email}</td>
              <td>{t.department}</td>
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

export default ManageTeachers;
