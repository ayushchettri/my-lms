import React, { useState } from "react";

const Assignments = () => {
  const [newAssignment, setNewAssignment] = useState("");
  const [assigned, setAssigned] = useState([
    { title: "CN Assignment 1", due: "Nov 3, 2025" },
  ]);
  const [submissions, setSubmissions] = useState([
    { title: "OS Lab Report", student: "Riya Patel" },
  ]);

  const handleAdd = () => {
    if (newAssignment.trim()) {
      setAssigned([...assigned, { title: newAssignment, due: "Nov 10, 2025" }]);
      setNewAssignment("");
    }
  };

  return (
    <div className="assignments-page">
      <header className="page-header">
        <h2>Assignments</h2>
      </header>

      <section>
        <h3>Assign New Work</h3>
        <input
          type="text"
          placeholder="Enter assignment title"
          value={newAssignment}
          onChange={(e) => setNewAssignment(e.target.value)}
        />
        <button onClick={handleAdd}>Assign</button>
      </section>

      <section>
        <h3>Assigned Tasks</h3>
        <ul>
          {assigned.map((a, i) => (
            <li key={i}>
              {a.title} - Due: {a.due}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Submissions Received</h3>
        <ul>
          {submissions.map((s, i) => (
            <li key={i}>
              {s.student} submitted {s.title}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Assignments;
