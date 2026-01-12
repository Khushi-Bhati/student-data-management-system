import express from "express";
import { AddStudentController, DeleteStudentController, EditStudentByEmailController, EditStudentController, getaStudentslist, getstudentbyemail, getStudentByStudentid } from "../controllers/Studentcontroller.js";

const studentrouter = express.Router();

studentrouter.post("/addstudent", AddStudentController);
studentrouter.get("/getstudentlist",getaStudentslist)
studentrouter.patch("/editstudent/:studentID",EditStudentController)
studentrouter.get("/getstudentbyid/:id",getStudentByStudentid)
studentrouter.delete( "/deletestudent/:studentID",DeleteStudentController
);
studentrouter.get("/getstudentprofile/:email",getstudentbyemail)
studentrouter.patch("/editstudentprofile/:email",EditStudentByEmailController)




export default studentrouter;
