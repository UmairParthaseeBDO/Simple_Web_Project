import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home'; 
import EmployeeForm from './Pages/EmployeeForm'
import LoginForm from './Pages/LoginForm'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/employeeForm" element={<EmployeeForm/>} />
        <Route path="/home" element={<Home/>} />
        <Route  path="loginForm" element={<LoginForm/>} />
      </Routes>
    </Router>

    // <Home/>
    // <EmployeeForm/>
    // <div> abc</div>
  );
}

export default App;

