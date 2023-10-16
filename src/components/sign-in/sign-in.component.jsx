import { useState } from "react";
import FormInput from "../form-input/form-input.component"; //common input field component
import './signin-form.style.scss'
import Button from "../button/button.component";
import { useDispatch } from "react-redux/es/exports";
import { 
    singnInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
 } from "../../route/utils/firebase/firebase.utils";
import { googleSignInStart,emailSignInStart } from "../../store/user/user.action";


const defaultFormFields = { //by default from input field set to empty
    email: "",
    password: "",
}

const SignInForm = () => {
    const dispatch = useDispatch();
    const [formFields,setFormFields] = useState(defaultFormFields); //mange from field
  
    const {email,password} = formFields;

    const handelChange = (event) => { //input change triger event
        const {name,value} = event.target;
        setFormFields({...formFields,[name]:value});
    }

    const resetFromField =() => {
        setFormFields(defaultFormFields);
    }

    const handelSubmit = async(event) => { //from submit event
        event.preventDefault();
        try{
            // const {user} = await signInAuthUserWithEmailAndPassword(email,password);
            dispatch(emailSignInStart(email,password));
            resetFromField();
        }catch (error){
            switch(error.code){ //error message
                case 'auth/wrong-password':
                    alert("Incorrect password for email")
                    break
                case 'auth/user-not-found':
                    alert("no user associated with this email")
                    break
                default:
                    console.log(error)
            }
        }
    };

    const logGoogleUser = async() => {
        dispatch(googleSignInStart());
        // await singnInWithGooglePopup(); //google popup
    }

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Signin with your email and password</span>
            <form onSubmit={handelSubmit}>
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

                <div className="buttons-container">
                    <Button type="submit">Sing In</Button>
                    <Button type="button" buttonType="google" onClick={logGoogleUser}>Google Sign In </Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;