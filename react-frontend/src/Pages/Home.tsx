import React from 'react';
import '../Stylesheets/Home.css'
import { useNavigate } from 'react-router-dom'; //used to navigate to another page within this page
function Home(){

    const navigate=useNavigate();

    return (
        <div className="page-style-home">
            <div className="title">Welcome to the home page</div>
            <div className="container">

                <div>
                    <div className="button-description">New to the company? Register here</div>
                    <button className="button" onClick={() => navigate('/employeeForm')}>
                        Sign Up 
                    </button>
                </div>
                <div>
                    <div className="button-description">Already an employee? Login here</div>
                    <button className="button" onClick={() => navigate('/loginForm')}>
                        Log In
                    </button>
                </div>
            </div>
        </div>
      

        

    );
}

export default Home