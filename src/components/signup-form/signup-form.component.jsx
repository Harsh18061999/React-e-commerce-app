import { useState } from "react";
import FormInput from "../form-input/form-input.component"; //common input field component
import './signup-form.style.scss'
import { useDispatch } from "react-redux/es/exports";
import Button from "../button/button.component";
import { signUpStart } from "../../store/user/user.action";
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from "../../route/utils/firebase/firebase.utils";
const defaultFormFields = { //by default from input field set to empty
    displayName : "",
    email: "",
    password: "",
    confirmPassword:""
}


const SignUpForm = () => {
    const dispatch = useDispatch();
    const [formFields,setFormFields] = useState(defaultFormFields); //mange from field
  
    const {displayName,email,password,confirmPassword} = formFields;

    const handelChange = (event) => { //input change triger event
        const {name,value} = event.target;
        setFormFields({...formFields,[name]:value});
    }

    const handelSubmit = async(event) => { //from submit event
        event.preventDefault();

        if(password !== confirmPassword){ //password do not match
            alert("password do not match");
            return;
        }

        try{
            // const {user} = await createAuthUserWithEmailAndPassword(email,password);
            // await createUserDocumentFromAuth(user,{displayName}) //pass dispaly name
            dispatch(signUpStart(email,password,displayName));
        }catch (error){
            if(error.code === "auth/email-already-in-use"){ //email already in use
                alert("Cannot create user,email already in use")
            }else{
                console.log("user created an encounterd error",error.message);
            }
                
        }
    };

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Singup with email and password</span>
            <form onSubmit={handelSubmit}>
                <FormInput 
                 label="Display Name"
                 type="text" 
                 required 
                 name="displayName" 
                 onChange={handelChange} 
                 value={displayName}
                 />

                <FormInput 
                label="Email"
                type="email" 
                required 
                name="email" 
                onChange={handelChange} 
                value={email} />

                <FormInput 
                label="Password"
                type="password" 
                required name="password" 
                onChange={handelChange} 
                value={password} />

               
                <FormInput 
                label="Confirm Password"
                type="password" 
                required 
                name="confirmPassword" 
                onChange={handelChange} 
                value={confirmPassword} />

                <Button type="submit">Sing Up</Button>
            </form>
        </div>
    );
}

export default SignUpForm;