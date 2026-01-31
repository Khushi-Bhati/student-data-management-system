import React, { useEffect, useState } from "react";
import StudentSidebar from "./StudentSidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const studentEmail = localStorage.getItem("email");

  const [loading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    course: "",
    enrollmentDate: "",
  });


  const getStudentProfileByEmail = async () => {
    try {
      const res = await axios.get(
        `/Institute/student/getstudentprofile/${encodeURIComponent(studentEmail)}`
      );

      if (res.data.status === "success") {
        const student = res.data.existingstudent;

        setFormValue({
          name: student.name || "",
          email: student.email || "",
          course: student.course || "",
          enrollmentDate: student.enrollmentDate?.slice(0, 10) || "",
        });
      }
    } catch (error) {
      console.error("Fetch student error", error);
    }
  };

  useEffect(() => {
    if (studentEmail) getStudentProfileByEmail();
  }, []);

  /* ================= INPUT CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  /* ================= UPDATE STUDENT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await axios.patch(
        `/Institute/student/editstudent/${encodeURIComponent(studentEmail)}`,
        formValue
      );

      if (res.data.status === "success") {
        Swal.fire("Updated!", "Profile updated successfully", "success");
      } else {
        Swal.fire("Error", res.data.message, "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      <StudentSidebar />

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
              <label>Email</label>
              <input type="email" value={formValue.email} disabled />
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
                <option value="Information Technology">
                  Information Technology
                </option>
                <option value="Business Management">
                  Business Management
                </option>
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
              <button className="btn-primary" disabled={loading}>
                {loading ? "Updating..." : "Update"}
              </button>

              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate("/studentdashboard")}
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

export default StudentDashboard;
