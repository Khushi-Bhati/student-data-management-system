import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar.jsx";
import "./../../styles/panel.css";
import "./../../styles/EditStudent.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EditStudent = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    course: "",
    enrollmentDate: "",
  });

 
  const getStudentProfilebystudentid = async () => {
    try {
      const res = await axios.get(
        `/Institute/student/getstudentbyid/${params.id}`
      );

      if (res.data.status === "success") {
        const student = res.data.existingstudent;

        // ✅ THIS IS THE FIX
        setFormValue({
          name: student.name || "",
          email: student.email || "",
          course: student.course || "",
          enrollmentDate: student.enrollmentDate?.slice(0, 10) || "",
        });
      }
    } catch (error) {
      console.log("error in fetch student profilebyid", error);
    }
  };

  useEffect(() => {
    getStudentProfilebystudentid();
  }, [params.id]);

  /* ================= INPUT CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.patch(
        `/Institute/student/editstudent/${params.id}`,
        formValue
      );

      if (res.data.status === "success") {
        Swal.fire({
          title: "Student updated successfully",
          icon: "success",
        });
        navigate("/dashboard");
      } else {
        Swal.fire({
          title: res.data.message,
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Something went wrong",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      <Sidebar />

      <main className="main-content">
        <div className="form-container">
          <h2>Edit Student Details</h2>

          <form className="student-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Student Name</label>
              <input
                type="text"
                name="name"
                value={formValue.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formValue.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Course</label>
              <select
                name="course"
                value={formValue.course}
                onChange={handleChange}
                required
              >
                <option value="">Select Course</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Data Science">Data Science</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Business Management">Business Management</option>
              </select>

            </div>

            <div className="form-group">
              <label>Enrollment Date</label>
              <input
                type="date"
                name="enrollmentDate"
                value={formValue.enrollmentDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Updating..." : "Update Student"}
              </button>

              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditStudent;
