import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate
} from "react-router-dom";

import App from "./App";
import Protectedroute from "./components/Protectedroute.jsx";

import Loginform from "./components/Loginform.jsx";
import Registerform from "./components/Registerform.jsx";

import Dashboard from "./components/Adminmodel/Dashboard.jsx";
import AddStudent from "./components/Adminmodel/AddStudent.jsx";
import EditStudent from "./components/Adminmodel/EditStudent.jsx";
import StudentDashboard from "./components/Studentmodel/StudentDashbaord.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(

    <Route element={<App />}>

      
      <Route index element={<Navigate to="/login" />} />

      {/* Public Routes */}
      <Route path="/login" element={<Loginform />} />
      <Route path="/register" element={<Registerform />} />

    
      <Route element={<Protectedroute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addstudent" element={<AddStudent />} />
        <Route path="/editstudent/:id" element={<EditStudent />} />
                <Route path="/studentdashboard/:email" element={<StudentDashboard />} />
      </Route>

    </Route>
  )
);

export default router;
