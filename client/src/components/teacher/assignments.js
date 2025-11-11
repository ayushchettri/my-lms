import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:4000/api";

const TeacherAssignments = () => {
  const [teacherId, setTeacherId] = useState(null);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const [status, setStatus] = useState("");

  // 🧠 Get teacherId from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.teacherId) {
      setTeacherId(storedUser.teacherId);
    } else {
      console.error("Teacher ID not found in localStorage:", storedUser);
    }
  }, []);

  // 📘 Fetch teacher's courses
  const fetchCourses = async (id) => {
    try {
      const res = await axios.get(`${API_BASE}/teachers/${id}/courses`);
      setCourses(res.data?.data || res.data || []);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setCourses([]);
    }
  };

  // 📚 Fetch assignments for a selected course
  const fetchAssignments = async (courseId) => {
    try {
      const res = await axios.get(`${API_BASE}/courses/${courseId}/assignments`);
      setAssignments(res.data?.data || res.data || []);
    } catch (err) {
      console.error("Error fetching assignments:", err);
      setAssignments([]);
    }
  };

  // 🖱️ When course is selected
  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    fetchAssignments(course.id);
    setStatus("");
  };

  // ➕ Add assignment
  const handleAddAssignment = async () => {
    const { title, description, dueDate } = newAssignment;
    if (!title || !description || !dueDate) {
      setStatus("Please fill all fields.");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE}/courses/${selectedCourse.id}/assignments`, {
        title,
        description,
        dueDate,
        teacherId,
      });
      setStatus(res.data.message || "Assignment created successfully!");
      setNewAssignment({ title: "", description: "", dueDate: "" });
      fetchAssignments(selectedCourse.id);
    } catch (err) {
      console.error("Error adding assignment:", err);
      setStatus("Failed to create assignment.");
    }
  };

  // 🔁 Load courses after teacherId is ready
  useEffect(() => {
    if (teacherId) fetchCourses(teacherId);
  }, [teacherId]);

  return (
    <div className="teacher-assignment-page">
      {!selectedCourse ? (
        <>
          <h2 className="page-title">Assignments</h2>
          <div className="course-grid">
            {courses.length === 0 ? (
              <p>No courses assigned yet.</p>
            ) : (
              courses.map((course) => (
                <div
                  key={course.id}
                  className="course-card"
                  onClick={() => handleSelectCourse(course)}
                >
                  <h3>{course.name}</h3>
                  <p>Code: {course.courseCode || course.code}</p>
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <>
          <button onClick={() => setSelectedCourse(null)} className="back-btn">
            ← Back to Courses
          </button>

          <h2 className="course-title">{selectedCourse.name}</h2>
          <p className="course-code">Code: {selectedCourse.courseCode || selectedCourse.code}</p>

          {/* Add Assignment Section */}
          <div className="add-assignment">
            <h3>Add New Assignment</h3>
            <input
              type="text"
              placeholder="Assignment Title"
              value={newAssignment.title}
              onChange={(e) =>
                setNewAssignment({ ...newAssignment, title: e.target.value })
              }
            />
            <textarea
              placeholder="Description"
              value={newAssignment.description}
              onChange={(e) =>
                setNewAssignment({ ...newAssignment, description: e.target.value })
              }
            ></textarea>
            <input
              type="date"
              value={newAssignment.dueDate}
              onChange={(e) =>
                setNewAssignment({ ...newAssignment, dueDate: e.target.value })
              }
            />
            <button onClick={handleAddAssignment}>Add Assignment</button>
            {status && <p className="status">{status}</p>}
          </div>

          {/* Assignments Section */}
          <div className="assignments-section">
            <h3>Assignments</h3>
            {assignments.length === 0 ? (
              <p>No assignments yet.</p>
            ) : (
              assignments.map((a) => (
                <div key={a.id} className="assignment-card">
                  <h4>{a.title}</h4>
                  <p className="desc">{a.description}</p>
                  <p className="due-date">
                    Due: {new Date(a.dueDate).toLocaleDateString()}
                  </p>

                  <div className="submissions">
                    <h5>Submissions</h5>
                    {a.submissions && a.submissions.length > 0 ? (
                      <ul>
                        {a.submissions
                          .sort((x, y) => x.studentId.localeCompare(y.studentId))
                          .map((s) => (
                            <li key={s.id}>
                              <strong>{s.studentId}</strong>:{" "}
                              <a
                                href={s.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="submission-link"
                              >
                                File
                              </a>{" "}
                              - {new Date(s.submittedAt).toLocaleString()}
                            </li>
                          ))}
                      </ul>
                    ) : (
                      <p className="no-submission">No submissions yet.</p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TeacherAssignments;
