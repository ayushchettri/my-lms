import React, { useEffect, useState } from "react";
import axios from "axios";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [newCourse, setNewCourse] = useState("");
  const [newCourseCode, setNewCourseCode] = useState("");
  const [newSemester, setNewSemester] = useState("");
  const [newTeacherId, setNewTeacherId] = useState("");

  // ✅ Sort function for course codes like BTCO-UG-C701, BTCO-UG-P702, etc.
  const sortCourses = (arr) => {
    return arr.sort((a, b) =>
      a.courseCode.localeCompare(b.courseCode, undefined, { numeric: true, sensitivity: "base" })
    );
  };

  // ✅ Fetch courses
  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/admins/courses");
      const data = res.data.data || [];
      setCourses(sortCourses(data));
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  // ✅ Fetch teachers
  const fetchTeachers = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/admins/teachers");
      const data = await res.json();
      setTeachers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchTeachers();
  }, []);

  // ✅ Add new course
  const handleAddCourse = async () => {
    if (!newCourse || !newCourseCode || !newSemester || !newTeacherId) {
      alert("All fields are required!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:4000/api/admins/courses", {
        name: newCourse,
        courseCode: newCourseCode,
        semester: newSemester,
        teacherId: newTeacherId,
      });

      alert(res.data.message);
      setNewCourse("");
      setNewCourseCode("");
      setNewSemester("");
      setNewTeacherId("");

      // ✅ Re-fetch and sort after adding
      fetchCourses();
    } catch (err) {
      console.error("Error creating course:", err);
      alert("Failed to add course");
    }
  };

  // ✅ Delete course
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      await axios.delete(`http://localhost:4000/api/admins/courses/${id}`);
      fetchCourses();
    } catch (err) {
      console.error("Error deleting course:", err);
      alert("Failed to delete course");
    }
  };

  return (
    <div className="courses-page">
      <header className="page-header">
        <h2>Manage Courses</h2>
        <p>Add, remove, or view all courses with assigned teachers</p>
      </header>

      {/* ✅ Add Course Form */}
      <div className="add-course">
        <input
          type="text"
          placeholder="Course Name"
          value={newCourse}
          onChange={(e) => setNewCourse(e.target.value)}
        />
        <input
          type="text"
          placeholder="Course Code (e.g., BTCO-UG-C701)"
          value={newCourseCode}
          onChange={(e) => setNewCourseCode(e.target.value)}
        />
        <input
          type="text"
          placeholder="Semester (e.g., 7th)"
          value={newSemester}
          onChange={(e) => setNewSemester(e.target.value)}
        />
        <select
          value={newTeacherId}
          onChange={(e) => setNewTeacherId(e.target.value)}
        >
          <option value="">Select Teacher</option>
          {teachers.length > 0 ? (
            teachers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.user?.name || t.name || "Unknown Teacher"}
              </option>
            ))
          ) : (
            <option disabled>No teachers available</option>
          )}
        </select>
        <button onClick={handleAddCourse}>Add Course</button>
      </div>

      {/* ✅ Courses Table */}
      <h3>Available Courses</h3>
      <table>
        <thead>
          <tr>
            <th>Course</th>
            <th>Course Code</th>
            <th>Semester</th>
            <th>Teacher</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.length > 0 ? (
            courses.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.courseCode}</td>
                <td>{c.semester}</td>
                <td>{c.teacher?.user?.name || c.teacher || "N/A"}</td>
                <td>
                  <button onClick={() => handleDelete(c.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No courses available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Courses;
