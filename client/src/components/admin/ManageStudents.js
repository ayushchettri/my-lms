import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    id: "",
    name: "",
    username: "",
    password: "",
    semester: "",
  });

  // ✅ Fetch all students (and sort)
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/admins/students");
        const data = Array.isArray(res.data) ? res.data : res.data.students || [];

        // ✅ Sort students like 22CSEC01, 22CSEC02, ..., 23CSEC01
        data.sort((a, b) =>
          a.id.localeCompare(b.id, undefined, {
            numeric: true,
            sensitivity: "base",
          })
        );

        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
        setStudents([]); // fallback
      }
    };
    fetchStudents();
  }, []);

  // ✅ Add student
  const handleAdd = async () => {
    const { id, name, username, password, semester } = newStudent;
    if (!id || !name || !username || !password || !semester) {
      alert("All fields are required!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:4000/api/admins/students", newStudent);
      const added = res.data.student;

      // ✅ Add and re-sort after adding
      const updated = [...students, added].sort((a, b) =>
        a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: "base" })
      );

      setStudents(updated);
      setNewStudent({ id: "", name: "", username: "", password: "", semester: "" });
    } catch (error) {
      console.error("Error adding student:", error);
      alert(error.response?.data?.message || "Error adding student");
    }
  };

  // ✅ Delete student
  const handleDelete = async (studentId) => {
    if (!studentId) {
      alert("Student ID is required");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      const res = await fetch(`http://localhost:4000/api/admins/students/${studentId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to delete student");
      }

      alert("✅ Student deleted successfully!");
      const updated = students.filter((s) => s.id !== studentId);
      setStudents(updated);
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("❌ " + error.message);
    }
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
          placeholder="Student ID"
          value={newStudent.id}
          onChange={(e) => setNewStudent({ ...newStudent, id: e.target.value })}
        />
        <input
          type="text"
          placeholder="Full Name"
          value={newStudent.name}
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Username"
          value={newStudent.username}
          onChange={(e) => setNewStudent({ ...newStudent, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={newStudent.password}
          onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
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
            <th>Student ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Semester</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr key={i}>
              <td>{s.id}</td>
              <td>{s.user?.name || s.name || "N/A"}</td>
              <td>{s.user?.username || s.username || "N/A"}</td>
              <td>{s.semester}</td>
              <td>
                <button onClick={() => handleDelete(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageStudents;
