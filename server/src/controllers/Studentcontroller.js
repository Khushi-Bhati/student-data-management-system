import { Studentmodel } from "../models/Studentmodel.js";

const AddStudentController = async (req, res) => {
  try {
    const { name, email, course, enrollmentDate } = req.body;
    if ([name, email, course, enrollmentDate].some((field) => {
      field.trim() === ""
    })) {
      res.status(200).send({
        message: "All fields are required",
        status: "notsuccess"
      })
    }


    const student = await Studentmodel.findOne({ email });

    if (student) {
      res.status(200).send({
        message: "student already added",
        status: 'notsuccess'
      })
    }


    const addstudent = await Studentmodel.create({
      name, email, course, enrollmentDate

    })



    res.status(200).send({
      message: "student added  successfully",
      status: 'success',
      addstudent
    })
  } catch (error) {
    res.status(500).send({
      message: `student not addederror:${error}`,
      status: "failed"
    })
  }


}
const getaStudentslist = async (req, res) => {
  try {
    const page = req.query.page
    const limit = req.query.limit


    const pageskip = (page - 1) * limit


    const students = await Studentmodel.find().skip(pageskip).limit(limit)
    const total = await Studentmodel.countDocuments();

    res.status(200).send({
      status: "success",
      totalpages: Math.ceil(total / limit),
      currentpage: page,
      totalrecords: total,
      students
    })


  } catch (error) {
    res.status(500).send(
      {
        message: `student list error:${error}`,
        status: "notsuccess"
      }
    )

  }

}


const EditStudentController = async (req, res) => {
  try {
    const { studentID } = req.params;
    const { name, email, course, enrollmentDate } = req.body;

    const updatestudent = await Studentmodel.findByIdAndUpdate(
      studentID,
      {
        name,
        email,
        course,
        enrollmentDate,
      },
      { new: true, runValidators: true }
    );

    if (!updatestudent) {
      return res.status(404).send({
        message: "Student profile not found",
        status: "notsuccess",
      });
    }

    res.status(200).send({
      message: "Student profile updated successfully",
      status: "success",
      updatestudent,
    });
  } catch (error) {
    console.error("Edit student error:", error);

    res.status(500).send({
      message: "Internal server error",
      status: "error",
    });
  }
};

const getStudentByStudentid = async (req, res) => {
  try {
    const studentID = req.params.id;

    const existingstudent = await Studentmodel.findById(studentID)

    if (!existingstudent) {
      return res.status(200).send({
        message: "Student not found",
        status: "notsuccess"
      });
    }

    return res.status(200).send({
      message: "Profile fetched successfully",
      status: "success",
      existingstudent
    });



  } catch (error) {
    res.status(500).send(
      {
        message: `getstudentbyid error ${error}`,
        status: "notsuccess"
      }
    )

  }
}
const DeleteStudentController = async (req, res) => {
  try {
    const { studentID } = req.params;

    const deletedStudent = await Studentmodel.findByIdAndDelete(studentID);

    if (!deletedStudent) {
      return res.status(404).json({
        message: "Student profile not found",
        status: "notsuccess",
      });
    }

    return res.status(200).json({
      message: "Student deleted successfully",
      status: "success",
      deletedStudent,
    });
  } catch (error) {
    console.error("Delete student error:", error);

    return res.status(500).json({
      message: "Internal server error",
      status: "error",
    });
  }
};


const getstudentbyemail = async (req, res) => {
  try {
    const { email } = req.params;

    const existingstudent = await Studentmodel.findOne({ email });

    if (!existingstudent) {
      return res.status(404).send({
        message: "Student not found",
        status: "notsuccess",
      });
    }

    return res.status(200).send({
      message: "Profile fetched successfully",
      status: "success",
      existingstudent,
    });

  } catch (error) {
    res.status(500).send({
      message: `getstudentbyemail error: ${error.message}`,
      status: "error",
    });
  }
};

const EditStudentByEmailController = async (req, res) => {
  try {
    const { email } = req.params; // email from URL
    const { name, course, enrollmentDate } = req.body; // only editable fields

    const updatestudent = await Studentmodel.findOneAndUpdate(
      { email }, // filter by email
      { name, course, enrollmentDate },
      { new: true, runValidators: true }
    );

    if (!updatestudent) {
      return res.status(404).send({
        message: "Student profile not found",
        status: "notsuccess",
      });
    }

    res.status(200).send({
      message: "Student profile updated successfully",
      status: "success",
      updatestudent,
    });
  } catch (error) {
    console.error("Edit student error:", error);

    res.status(500).send({
      message: "Internal server error",
      status: "error",
    });
  }
};



export { AddStudentController, EditStudentController, getaStudentslist, getStudentByStudentid,DeleteStudentController,getstudentbyemail ,EditStudentByEmailController}