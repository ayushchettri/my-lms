import React, { useState, useEffect } from "react";

const ManageTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [newTeacher, setNewTeacher] = useState({
    id: "",
    name: "",
    username: "",
    password: "",
  });

  // ✅ Fetch and sort all teachers
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/admins/teachers");
        const data = await res.json();

        if (Array.isArray(data)) {
          // ✅ Sort teacher IDs like T001, T002, ...
          const sorted = data.sort((a, b) =>
            a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: "base" })
          );
          setTeachers(sorted);
        } else {
          setTeachers([]);
        }
      } catch (err) {
        console.error("Error fetching teachers:", err);
      }
    };
    fetchTeachers();
  }, []);

  // ✅ Add new teacher
  const handleAdd = async () => {
    const { id, name, username, password } = newTeacher;

    if (!id || !name || !username || !password) {
      alert("All fields are required!");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/admins/teachers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTeacher),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add teacher");

      // ✅ Add and re-sort
      const updated = [...teachers, data.teacher].sort((a, b) =>
        a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: "base" })
      );

      setTeachers(updated);
      setNewTeacher({ id: "", name: "", username: "", password: "" });
    } catch (error) {
      console.error("Error adding teacher:", error);
      alert(error.message);
    }
  };

  // ✅ Delete teacher
  const handleDelete = async (teacherId) => {
    if (!window.confirm("Are you sure you want to delete this teacher?")) return;

    try {
      const res = await fetch(`http://localhost:4000/api/admins/teachers/${teacherId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("✅ Teacher deleted successfully!");
        setTeachers((prev) =>
          prev
            .filter((t) => t.id !== teacherId)
            .sort((a, b) =>
              a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: "base" })
            )
        );
      } else {
        const data = await res.json();
        console.error("Error deleting teacher:", data.message);
        alert("❌ " + (data.message || "Failed to delete teacher"));
      }
    } catch (err) {
      console.error("Error deleting teacher:", err);
      alert("❌ Failed to delete teacher");
    }
  };

  return (
    <div className="manage-page">
      <header className="page-header">
        <h2>Manage Teachers</h2>
        <p>Add, remove, or view teacher records</p>
      </header>

      {/* ✅ Add Teacher Form */}
      <div className="add-user">
        <input
          type="text"
          placeholder="Teacher ID (e.g., T006)"
          value={newTeacher.id}
          onChange={(e) => setNewTeacher({ ...newTeacher, id: e.target.value })}
        />
        <input
          type="text"
          placeholder="Full Name"
          value={newTeacher.name}
          onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Username"
          value={newTeacher.username}
          onChange={(e) => setNewTeacher({ ...newTeacher, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={newTeacher.password}
          onChange={(e) => setNewTeacher({ ...newTeacher, password: e.target.value })}
        />
        <button onClick={handleAdd}>Add Teacher</button>
      </div>

      {/* ✅ Teachers Table */}
      <h3>All Teachers</h3>
      <table>
        <thead>
          <tr>
            <th>Teacher ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.user?.name || t.name || "N/A"}</td>
              <td>{t.user?.username || t.username || "N/A"}</td>
              <td>
                <button onClick={() => handleDelete(t.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageTeachers;
