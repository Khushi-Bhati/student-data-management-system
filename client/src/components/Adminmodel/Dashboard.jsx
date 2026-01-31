import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar.jsx";
import "./../../styles/panel.css";
import "./../../styles/Studentlist.css";
import axios from "axios";
import { Pagination } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Dashboard = () => {
  
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5);
  const [totalStudent, setTotalStudent] = useState(0);


  const getStudentlist = async () => {
    try {
      setLoading(true);
      const query = `/Institute/student/getstudentlist?page=${currentPage}&limit=${limit}`;
      const res = await axios.get(query);

      if (res.data.status === "success") {
        setStudents(res.data.students);
        setTotalStudent(res.data.totalrecords);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStudentlist();
  }, [currentPage]);

const handleDelete = async (studentId) => {
  try {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This student will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    setLoading(true);

    const res = await axios.delete(
      `/Institute/student/deletestudent/${studentId}`
    );

    if (res.data.status === "success") {
      Swal.fire("Deleted!", "Student deleted successfully.", "success");

      // refresh list instead of navigate
      getStudentlist();
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
      <Sidebar />

      <main className="main-content">
        <div className="list-container">
          <h2>Student List</h2>

          {loading ? (
            <p className="loading-text">Loading students...</p>
          ) : (
            <table className="student-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Course</th>
                  <th>Enrollment Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {students.length > 0 ? (
                  students.map((student) => (
                    <tr key={student._id}>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.course}</td>
                      <td>
                        {new Date(student.enrollmentDate).toLocaleDateString()}
                      </td>
                      <td>
                        <Link
                          className="btn-edit"
                          to={`/editstudent/${student._id}`}
                        >
                          Edit
                        </Link>

                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(student._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      No students found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}

          {/* Pagination */}
          <div className="pagination">
            <Pagination
              current={currentPage}
              pageSize={limit}
              total={totalStudent}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
