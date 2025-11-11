import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:4000"; // ✅ remove `/api` — static files are served from base

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState({});
  const [selectedFiles, setSelectedFiles] = useState({});
  const [status, setStatus] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const studentId = user?.studentId || user?.id;

  // ✅ Fetch all assignments for this student's courses
  const fetchAssignments = async () => {
    if (!studentId) {
      console.warn("⚠️ Student ID is undefined — cannot fetch assignments");
      return;
    }

    try {
      const res = await axios.get(`${API_BASE}/api/students/${studentId}/assignments`);
      const data = res.data.data || res.data || [];
      setAssignments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("❌ Error fetching assignments:", err.response?.data || err.message);
      setAssignments([]);
    }
  };

  // ✅ Fetch student's submissions
  const fetchSubmissions = async () => {
    if (!studentId) {
      console.warn("⚠️ Student ID is undefined — cannot fetch submissions");
      return;
    }

    try {
      const res = await axios.get(`${API_BASE}/api/students/${studentId}/submissions`);
      const data = res.data.data || res.data || [];

      const subs = {};
      data.forEach((s) => {
        subs[s.assignmentId] = s;
      });
      setSubmissions(subs);
    } catch (err) {
      console.error("❌ Error fetching submissions:", err.response?.data || err.message);
      setSubmissions({});
    }
  };

  // ✅ Handle submission upload
  const handleSubmit = async (assignmentId) => {
    const file = selectedFiles[assignmentId];
    if (!file) {
      setStatus("Please select a file before submitting.");
      return;
    }
    if (!studentId) {
      setStatus("Student ID missing. Please log in again.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("studentId", studentId);

    try {
      const res = await axios.post(
        `${API_BASE}/api/assignments/${assignmentId}/submit`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setStatus(res.data.message || "✅ Assignment submitted successfully!");
      setSelectedFiles((prev) => ({ ...prev, [assignmentId]: null }));
      fetchSubmissions();
    } catch (err) {
      console.error("❌ Error submitting assignment:", err.response?.data || err.message);
      setStatus("Submission failed. Try again.");
    }
  };

  // ✅ Fetch data once studentId is available
  useEffect(() => {
    if (studentId) {
      fetchAssignments();
      fetchSubmissions();
    }
  }, [studentId]);

  return (
    <div className="assignments-page">
      <header className="page-header">
        <h2>Assignments</h2>
      </header>

      {status && <p className="status">{status}</p>}

      <div className="assignment-list">
        {assignments.length === 0 ? (
          <p>No assignments assigned yet.</p>
        ) : (
          assignments.map((a) => {
            const submission = submissions[a.id];
            return (
              <div className="assignment-card" key={a.id}>
                <h3>{a.title}</h3>
                <p className="desc">{a.description}</p>
                <p className="due-date">
                  Due: {new Date(a.dueDate).toLocaleDateString()}
                </p>

                {submission ? (
                  <div className="submission-info">
                    <p>
                      ✅ Submitted on:{" "}
                      {new Date(submission.submittedAt).toLocaleString()}
                    </p>
                    {submission.fileUrl && (
                      <a
                        href={`http://localhost:4000${submission.fileUrl}`} // ✅ Directly serve from /uploads/
                        target="_blank"
                        rel="noopener noreferrer"
                        className="submission-link"
                      >
                        View Submission
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="submission-form">
                    <input
                      type="file"
                      onChange={(e) =>
                        setSelectedFiles({
                          ...selectedFiles,
                          [a.id]: e.target.files[0],
                        })
                      }
                      className="file-input"
                    />
                    <button
                      onClick={() => handleSubmit(a.id)}
                      className="submit-btn"
                    >
                      Submit
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Assignments;
