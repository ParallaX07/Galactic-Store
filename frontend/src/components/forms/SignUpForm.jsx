import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext } from "react";
import { MessageContext } from "../../Pages/Root";
import { AuthContext } from "../../Auth/AuthProvider";

// Sign up form component
const SignUpForm = () => {
  
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const {notifyError, notifySuccess} = useContext(MessageContext);    
    const { createUser, user, setUserType, userType } = useContext(AuthContext);

    // post to database function

    const handleSignUp = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const first_name = formData.get("first_name");
        const last_name = formData.get("last_name");
        const email = formData.get("email");
        const password = formData.get("password");
        const confirm_password = formData.get("confirm_password");
        if (password !== confirm_password) {
            notifyError("Passwords do not match");
            return;
        }
        // TODO: Add a post request to the database
        // TODO: add api endpoint
        // TODO: firebase sign up


    };
    
    return (
        <div className="h-dvh flex justify-center mt-10">
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
                            name="first_name"
                        />
                        <span className="highlight-span"></span>
                        <label className="label-email">First Name</label>
                    </div>
                    <div className="group">
                        <input
                            required={true}
                            className="main-input"
                            type="text"
                            name="last_name"
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
                        name="email"
                    />
                    <span className="highlight-span"></span>
                    <label className="label-email">Email</label>
                </div>
                <div className="group">
                    <input
                        required={true}
                        className="main-input"
                        type="password"
                        name="password"
                    />
                    <span className="highlight-span"></span>
                    <label className="label-email">Password</label>
                </div>
                <div className="group">
                    <input
                        required={true}
                        className="main-input"
                        type="password"
                        name="confirm_password"
                    />
                    <span className="highlight-span"></span>
                    <label className="label-email">Confirm Password</label>
                </div>
                {/* sign up button */}
                <button type="submit" className="submit text-white hover:bg-black hover:bg-opacity-40">Create Account</button>
                <p>Already have an account yet?</p>
                <Link to={`/login`} className="text-accent font-extrabold">
                    Login now!
                </Link>
            </form>
        </div>
    );
};

export default SignUpForm;
