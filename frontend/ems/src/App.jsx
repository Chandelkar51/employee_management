import './App.css'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/Login.jsx'
import AdminDashboard from './pages/adminDashboard.jsx'
import EmployeeeDashboard from './pages/employeeeDashboard.jsx'
import PrivateRoutes from '../util/PrivateRoutes.jsx'
import RoleBaseRoute from '../util/RoleBaseRoute.jsx'
import { AdminSummary } from './components/AdminSummary.jsx'
import { Departments } from './components/Departments.jsx'
import { AddDepartment } from './components/AddDepartment.jsx'
import EditDepartment from './components/EditDepartment.jsx'
import { EmployeeList } from './components/EmployeeList.jsx'
import { AddEmployee } from './components/AddEmployee.jsx'
import { ViewEmployee } from './components/ViewEmployee.jsx'
import { EditEmployee } from './components/EditEmployee.jsx'
import { AddSalary } from './components/AddSalary.jsx'
import {ViewSalary} from './components/ViewSalary.jsx'
import { SummaryCard } from './components/SummaryCard.jsx'
import { LeaveList } from './components/LeaveList.jsx'
import { ApplyLeave } from './components/ApplyLeave.jsx'
import { Setting } from './components/Setting.jsx'
import { LeaveMange } from './components/LeaveMange.jsx'
import { ViewLeave } from './components/ViewLeave.jsx'
import { EmployeeSummary } from './components/EmployeeSummary.jsx'
import LandingPage from './pages/LandingPage.jsx'
import { RegistrationForm } from './components/RegistrationForm.jsx'
import { FrorgetPassword } from './components/ForgetPassword.jsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/registration" element={<RegistrationForm />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forget-password" element={<FrorgetPassword />}></Route>

        <Route path="/admin-dashboard" element={
          <PrivateRoutes>
            <RoleBaseRoute requiredrole={["admin"]}>
              <AdminDashboard />
            </RoleBaseRoute>
          </PrivateRoutes>
          }>
          <Route index element={<AdminSummary />}></Route>
          <Route path='/admin-dashboard/departments' index element={<Departments />}></Route>
          <Route path='/admin-dashboard/add-department' index element={<AddDepartment />}></Route>
          <Route path='/admin-dashboard/department/:id' index element={<EditDepartment />}></Route>
          
          <Route path='/admin-dashboard/employee' index element={<EmployeeList />}></Route>
          <Route path='/admin-dashboard/add-employee' index element={<AddEmployee />}></Route>
          <Route path='/admin-dashboard/employee/:id' index element={<ViewEmployee />}></Route>
          <Route path='/admin-dashboard/employee/edit/:id' index element={<EditEmployee />}></Route>
          <Route path='/admin-dashboard/employee/salary/:id' index element={<ViewSalary />}></Route>
          <Route path='/admin-dashboard/employee/leave/:id' index element={<LeaveList />}></Route>

          <Route path='/admin-dashboard/leave' index element={<LeaveMange />}></Route>
          <Route path='/admin-dashboard/leave/:id' index element={<ViewLeave />}></Route>

          <Route path='/admin-dashboard/salary/add' index element={<AddSalary />}></Route>

          <Route path='/admin-dashboard/setting' index element={<Setting />}></Route>
        </Route>
        
        <Route path='/employee-dashboard' element={
          <PrivateRoutes>
            <RoleBaseRoute requiredrole={["admin","employee"]}>
              <EmployeeeDashboard />
            </RoleBaseRoute>
          </PrivateRoutes>
          }>
          <Route index element={  <EmployeeSummary/>}></Route>
          <Route path='/employee-dashboard/employee/:id' index element={<ViewEmployee />}></Route>
          <Route path='/employee-dashboard/leave' index element={<LeaveList />}></Route>
          <Route path='/employee-dashboard/apply-leave' index element={<ApplyLeave />}></Route>
          <Route path='/employee-dashboard/salary' index element={<ViewSalary />}></Route>
          <Route path='/employee-dashboard/setting' index element={<Setting />}></Route>

        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
