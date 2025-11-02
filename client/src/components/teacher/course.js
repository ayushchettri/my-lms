import React, { useState, useEffect } from "react";
import axios from "axios";

const Courses = ({ courseId = "CSE301" }) => {
  const [materials, setMaterials] = useState([]);
  const [newMaterial, setNewMaterial] = useState("");
  const [status, setStatus] = useState("");

  const API_BASE = "http://localhost:4000/api";

  // 📥 Fetch materials
  const fetchMaterials = async () => {
    try {
      const res = await axios.get(`${API_BASE}/courses/${courseId}/materials`);
      setMaterials(res.data);
    } catch (err) {
      console.error("Error fetching materials:", err);
    }
  };

  // 📤 Upload new material
  const handleUpload = async () => {
    if (!newMaterial.trim()) {
      setStatus("Please enter a material name.");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE}/courses/${courseId}/materials`, {
        title: newMaterial,
      });
      setStatus(res.data.message);
      setNewMaterial("");
      fetchMaterials(); // refresh list
    } catch (err) {
      console.error("Error uploading material:", err);
      setStatus("Upload failed.");
    }
  };

  // ❌ Delete material
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/courses/${courseId}/materials/${id}`);
      fetchMaterials();
    } catch (err) {
      console.error("Error deleting material:", err);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  return (
    <div className="courses-page p-6">
      <header className="page-header mb-4">
        <h2 className="text-2xl font-bold">Courses & Materials</h2>
      </header>

      <div className="upload-section mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Enter material name (e.g., Week 2 Notes)"
          value={newMaterial}
          onChange={(e) => setNewMaterial(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg w-full"
        />
        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Upload
        </button>
      </div>

      {status && <p className="text-green-600 mb-4">{status}</p>}

      <h3 className="text-lg font-semibold mb-2">Uploaded Materials</h3>
      <ul className="uploaded-list space-y-2">
        {materials.length === 0 ? (
          <p>No materials uploaded yet.</p>
        ) : (
          materials.map((mat) => (
            <li
              key={mat.id}
              className="border border-gray-300 p-3 rounded-lg flex justify-between items-center"
            >
              <span>{mat.title}</span>
              <button
                onClick={() => handleDelete(mat.id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Courses;
