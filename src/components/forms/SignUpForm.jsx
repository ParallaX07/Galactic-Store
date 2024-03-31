import { Link, useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { NotifyContext } from "../../utils/NotifyContext";

// Sign up form component
const SignUpForm = () => {
    const notify = useContext(NotifyContext);
  
    const navigate = useNavigate();

    // post to database function

    const handleSignUp = (e) => {
        e.preventDefault();
        console.log("submit");
        //sign up toast 
        notify("signed up");

        // Navigate to login page
        navigate('/');
    };
    
    return (
        <div className="h-dvh flex justify-center">
            <form
                className="form lg:px-20 lg:py-14 m-6 p-10 w-full max-w-fit my-auto"
                onSubmit={(e) => handleSignUp(e)}
            >
                <p className="text-2xl">Sign up</p>
                <div className="flex gap-4 lg:flex-row flex-col">
                    <div className="group">
                        <input
                            required={true}
                            className="main-input"
                            type="text"
                        />
                        <span className="highlight-span"></span>
                        <label className="label-email">First Name</label>
                    </div>
                    <div className="group">
                        <input
                            required={true}
                            className="main-input"
                            type="text"
                        />
                        <span className="highlight-span"></span>
                        <label className="label-email">Last Name</label>
                    </div>
                </div>
                <div className="group">
                    <input
                        required={true}
                        className="main-input"
                        type="email"
                    />
                    <span className="highlight-span"></span>
                    <label className="label-email">Email</label>
                </div>
                <div className="group">
                    <input
                        required={true}
                        className="main-input"
                        type="password"
                    />
                    <span className="highlight-span"></span>
                    <label className="label-email">Password</label>
                </div>
                <div className="group">
                    <input
                        required={true}
                        className="main-input"
                        type="password"
                    />
                    <span className="highlight-span"></span>
                    <label className="label-email">Confirm Password</label>
                </div>
                {/* sign up button */}
                <button type="submit" className="submit text-white hover:bg-black hover:bg-opacity-40">Create Account</button>
                <p>Already have an account yet?</p>
                <Link to={`/`} className="text-accent font-extrabold">
                    Login now!
                </Link>
            </form>
        </div>
    );
};

export default SignUpForm;
