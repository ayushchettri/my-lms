import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://localhost:4000/api";

const TeacherCourses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [newMaterialText, setNewMaterialText] = useState("");
  const [newMaterialFile, setNewMaterialFile] = useState(null);
  const [status, setStatus] = useState("");

  // ✅ Fetch logged-in teacher from localStorage
  const getTeacherId = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    return storedUser?.teacherId || null;
  };

  // 📦 Fetch teacher’s assigned courses
  const fetchCourses = async () => {
    const teacherId = getTeacherId();
    if (!teacherId) {
      console.error("Teacher ID not found in localStorage");
      setCourses([]);
      return;
    }

    try {
      const res = await axios.get(`${API_BASE}/teachers/${teacherId}/courses`);
      setCourses(res.data || []);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setCourses([]);
    }
  };

  // 📥 Fetch materials for selected course
  const fetchMaterials = async (courseId) => {
    try {
      const res = await axios.get(`${API_BASE}/courses/${courseId}/materials`);
      setMaterials(res.data || []);
    } catch (err) {
      console.error("Error fetching materials:", err);
      setMaterials([]);
    }
  };

  // 🧾 When clicking on a course card
  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    fetchMaterials(course.id);
    setStatus("");
  };

  // 📤 Upload new material (text + optional file)
  const handleUpload = async () => {
    if (!selectedCourse) return;
    if (!newMaterialText.trim() && !newMaterialFile) {
      setStatus("Please enter a message or choose a file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", newMaterialText || "Untitled Material");
    if (newMaterialFile) formData.append("file", newMaterialFile);

    try {
      const res = await axios.post(
        `${API_BASE}/courses/${selectedCourse.id}/materials`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setStatus(res.data.message || "Uploaded successfully!");
      setNewMaterialText("");
      setNewMaterialFile(null);
      fetchMaterials(selectedCourse.id);
    } catch (err) {
      console.error("Error uploading material:", err);
      setStatus("Upload failed.");
    }
  };

  // ❌ Delete uploaded material
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/courses/${selectedCourse.id}/materials/${id}`);
      fetchMaterials(selectedCourse.id);
    } catch (err) {
      console.error("Error deleting material:", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="p-6">
      {!selectedCourse ? (
        <>
          <h2 className="text-2xl font-bold mb-4">Your Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {courses.length === 0 ? (
              <p>No courses assigned yet.</p>
            ) : (
              courses.map((course) => (
                <div
                  key={course.id}
                  className="course-card"
                  onClick={() => handleSelectCourse(course)}
                >
                  <h3 className="text-lg font-semibold">{course.name}</h3>
                  <p className="text-gray-600">Code: {course.courseCode}</p>
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <>
          <button
            onClick={() => setSelectedCourse(null)}
            className="mb-4 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
          >
            ← Back to Courses
          </button>

          <h2 className="text-2xl font-bold mb-2">{selectedCourse.name}</h2>
          <p className="course-code">Code: {selectedCourse.courseCode}</p>

          {/* Upload Section */}
          <div className="upload-section mb-6 border-t pt-4">
            <h3 className="font-semibold mb-2">Upload Material</h3>

            <textarea
              placeholder="Type a message (optional)"
              value={newMaterialText}
              onChange={(e) => setNewMaterialText(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full mb-2"
              rows={3}
            />

            <input
              type="file"
              onChange={(e) => setNewMaterialFile(e.target.files[0])}
              className="mb-2"
            />

            <button
              onClick={handleUpload}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Upload
            </button>

            {status && <p className="mt-2 text-green-600">{status}</p>}
          </div>

          {/* Uploaded Materials */}
          <h3 className="text-lg font-semibold mb-2">Uploaded Materials</h3>
          <ul className="uploaded-materials">
  {materials.length === 0 ? (
    <p>No materials uploaded yet.</p>
  ) : (
    materials.map((mat) => (
      <li key={mat.id} className="material-item">
        <div className="material-info">
          <span className="material-title">{mat.title}</span>
          {mat.fileUrl && (
            <a
              href={mat.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="material-link"
            >
              📎 View File
            </a>
          )}
        </div>
        <button
          onClick={() => handleDelete(mat.id)}
          className="delete-btn"
        >
          Delete
        </button>
      </li>
    ))
  )}
</ul>

        </>
      )}
    </div>
  );
};

export default TeacherCourses;
