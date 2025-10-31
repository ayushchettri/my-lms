import React, { useState } from "react";

const Courses = () => {
  const [materials, setMaterials] = useState("");
  const [status, setStatus] = useState("");

  const handleUpload = () => {
    if (materials.trim()) {
      setStatus(`Material "${materials}" uploaded successfully!`);
      setMaterials("");
    }
  };

  return (
    <div className="courses-page">
      <header className="page-header">
        <h2>Courses & Materials</h2>
      </header>

      <div className="upload-section">
        <input
          type="text"
          placeholder="Enter material name (e.g., Week 2 Notes)"
          value={materials}
          onChange={(e) => setMaterials(e.target.value)}
        />
        <button onClick={handleUpload}>Upload</button>
        {status && <p className="status-text">{status}</p>}
      </div>

      <h3>Uploaded Materials</h3>
      <ul className="uploaded-list">
        <li>Week 1 Notes</li>
        <li>Lab Manual</li>
        <li>Assignment Guidelines</li>
      </ul>
    </div>
  );
};

export default Courses;
