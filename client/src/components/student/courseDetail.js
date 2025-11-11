import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_BASE = "http://localhost:4000/api";

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 📦 Fetch course info and materials
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const [courseRes, materialsRes] = await Promise.all([
          axios.get(`${API_BASE}/courses/${courseId}`),
          axios.get(`${API_BASE}/courses/${courseId}/materials`),
        ]);

        setCourse(courseRes.data.data || courseRes.data);
        setMaterials(materialsRes.data || []);
      } catch (err) {
        console.error("Error fetching course data:", err);
        setError("Failed to load course details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId]);

  if (loading) return <p className="loading-text">Loading course details...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!course) return <p className="not-found-text">Course not found.</p>;

  return (
    <div className="course-detail-container">
      {/* ===== Course Header ===== */}
      <header className="course-header">
        <h2 className="course-title">{course.name}</h2>
        <p className="course-code">Code: {course.courseCode}</p>
      </header>

      {/* ===== Materials Section ===== */}
      <section className="materials-section">
        <h3 className="materials-heading">📘 Course Materials</h3>

        {materials.length > 0 ? (
          <div className="materials-grid">
            {materials.map((mat, i) => (
              <div key={i} className="material-card">
                <div className="material-info">
                  <h4 className="material-title">{mat.title}</h4>
                  {mat.fileUrl && (
                    <a
                      href={mat.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="material-link"
                    >
                      View / Download
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-materials">No materials uploaded yet.</p>
        )}
      </section>
    </div>
  );
};

export default CourseDetail;
