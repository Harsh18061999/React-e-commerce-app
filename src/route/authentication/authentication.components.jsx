import SignUpForm from "../../components/signup-form/signup-form.component";
import SignInForm from "../../components/sign-in/sign-in.component";
import './authentication.style.scss'
const Authentication = () => {
    
    // const GoogleRedirectUser = async() => { //google login with redirect need to use useeffect and firebase auth to identifay login user
    //     const {user} = await singnInWithGoogleRedirct();
    //     console.log(user)
    //     // const userDocRef = await createUserDocumentFromAuth(user);
    // }
    return (
        <div className="authentication-container">
            {/* <h1>Sign In Page</h1> */}
            <SignInForm />
            {/* <button onClick={logGoogleUser}>Login Wit Google</button> */}
            <SignUpForm />
            {/* <button onClick={GoogleRedirectUser}>Login Wit GoogleRedirect</button> */}
        </div>
    );
}

export default Authentication;