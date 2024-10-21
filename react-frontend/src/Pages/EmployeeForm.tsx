import React, {ReactEventHandler, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../Stylesheets/EmployeeForm.css'

function EmployeeForm(){
    const navigate=useNavigate();
    const [credential,setCredential] = useState( {firstName: "",
                                                    lastName:"",
                                                    email:"",
                                                    password:""});

    const [message,setMessage] = useState('Loading..');
    //useState can either be null or boolean
    const [isSuccess,setIsSuccess] = useState<boolean | null>(null); //not successful by default                                      
    const[isDisplaying,setIsDisplaying] = useState(false);

    //usestate on order to display the registered name and email
    //cant use the previous usestate because it changes everytime user change input even after registering  
    const [registerName, setRegisterName] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    
    //added the correct type for the event parameter.
    function handleAddFirstName(event: React.ChangeEvent<HTMLInputElement>){
        setCredential({...credential,firstName:event.target.value})

    }
    function handleAddLastName(event: React.ChangeEvent<HTMLInputElement>){
        setCredential({...credential,lastName:event.target.value})

    }
    function handleAddEmail(event: React.ChangeEvent<HTMLInputElement>){
        setCredential({...credential,email:event.target.value})

    }
    function handleAddPassword(event: React.ChangeEvent<HTMLInputElement>){
        setCredential({...credential,password:event.target.value})

    }

    const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        try {
            const response = await fetch('http://localhost:5000/registration', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credential),
            });
    
            if (!response.ok) {
                const data = await response.json(); // Parse error from backend
                throw new Error(data.error || 'Registration failed'); // Throw custom error message if exists

                
            }
    
            const data = await response.json();
            console.log(data);
            console.log(response);
            setMessage('User registered successfully');
            setIsSuccess(true);
            setRegisterName(credential.firstName + ' ' + credential.lastName);
            setRegisterEmail(credential.email);
             
        } catch (error) {

            console.error("Error during registration:", error);

            // Check if error is of type Error
            if (error instanceof Error) {
                setMessage(`Registration Failed: ${error.message}`);
            } else {
                setMessage('Registration Failed: Unknown error');
            }
            setIsSuccess(false);
        }
    };
    


    return (

        <div className="page-style">
  
        <div className="title">Sign up</div>


        <form className="grid-container" onSubmit={handleSubmit}>


            <div className="grid-item">
                <label>First Name:</label>
                <input className="input-box" type="text" value={credential.firstName}  onChange={handleAddFirstName} placeholder="John" required/>
            </div>

            <div className="grid-item">
                <label>Last Name:</label>
                <input className="input-box" type="text" value={credential.lastName}  onChange={handleAddLastName} placeholder="Deez" />
            </div>

            <div className="grid-item email">
                <label>Email:</label>
                <input className="input-box email-box" type="email" required value={credential.email}  onChange={handleAddEmail} placeholder="John@example.com" />
            </div>

            <div className="grid-item password">
                <label>Password:</label>
                <input className="input-box password-box" type="password"  name="employee-password" required value={credential.password}  onChange={handleAddPassword}  />
            </div>

            <button className="grid-item signup-button" type="submit" onClick={() => {
                setIsDisplaying(true);
                setTimeout(() => setIsDisplaying(false),20000);
            }}>
                 Sign Up
            </button>
            
            <div className={isDisplaying ? `display-status ${isSuccess ? 'success' : 'not-success'}` : 'display-none'}>
                {isDisplaying && <p>{message}</p>}
                
                <div className={isSuccess ? '' : 'display-none'}>Registered as : {registerName}</div>
                <div className={isSuccess ? '' : 'display-none'}>With email: {registerEmail}</div>
 
            </div>
       
        </form>
      
        </div>
        

    );
}

export default EmployeeForm