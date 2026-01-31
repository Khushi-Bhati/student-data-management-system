import React, { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import "./../../styles/panel.css";
import "./../../styles/Addform.css";
import axios from "axios";
import Swal from "sweetalert2";

const AddStudent = () => {
  const [loading, setLoading] = useState(false);

  const [formvalue, setFormValue] = useState({
    name: "",
    email: "",
    course: "",
    enrollmentDate: "",
  });

  const handelChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formvalue,
      [name]: value,
    });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const addstudentresponse = await axios.post(
        "/Institute/student/addstudent",
        formvalue,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      setLoading(false);

      if (addstudentresponse.data.status === "success") {
        Swal.fire({
          title: addstudentresponse.data.message,
          icon: "success",
        });

        setFormValue({
          name: "",
          email: "",
          course: "",
          enrollmentDate: "",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: addstudentresponse.data.message,
        });
      }
    } catch (error) {
      setLoading(false);
      console.log("Add student error:", error);

      Swal.fire({
        icon: "error",
        title: "Something went wrong",
      });
    }
  };

  return (
    <div className="main-container">
      <Sidebar />

      <main className="main-content">
        <div className="form-container">
          <h2>Add New Student</h2>

          <form className="student-form" onSubmit={handelSubmit}>
            <div className="form-group">
              <label>Student Name</label>
              <input
                type="text"
                placeholder="Enter full name"
                required
                name="name"
                value={formvalue.name}
                onChange={handelChange}
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter email"
                required
                name="email"
                value={formvalue.email}
                onChange={handelChange}
              />
            </div>

            <div className="form-group">
              <label>Course</label>
              <select
                required
                name="course"
                value={formvalue.course}
                onChange={handelChange}
              >
                <option value="">Select course</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Information Technology">
                  Information Technology
                </option>
                <option value="Data Science">Data Science</option>
                <option value="Business Management">
                  Business Management
                </option>
              </select>
            </div>

            <div className="form-group">
              <label>Enrollment Date</label>
              <input
                type="date"
                required
                name="enrollmentDate"
                value={formvalue.enrollmentDate}
                onChange={handelChange}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Saving..." : "Save Student"}
              </button>

              <button
                type="reset"
                className="btn-secondary"
                onClick={() =>
                  setFormValue({
                    name: "",
                    email: "",
                    course: "",
                    enrollmentDate: "",
                  })
                }
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddStudent;
