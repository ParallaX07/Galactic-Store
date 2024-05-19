
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthProvider";
import { useContext } from "react";
import { MessageContext } from "../../Pages/Root";
import useAxiosSecure from './../../hooks/useAxiosSecure';

// Login form component
function LoginForm() {

    const { notifyError, notifySuccess } = useContext(MessageContext);
    const { login, user, setUserType, userType } = useContext(AuthContext);

    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    if (user) {
        navigate("/");
    }
    // post to database function
    const handleLogin = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get("email");
        const password = formData.get("password");  
        axiosSecure.get(`/users?email=${email}&value=${"User_Type"}`)
            .then((res) => {
                setUserType(res.data[0].User_Type);
                
            })
            .catch((error) => {
                notifyError(error.message);
            });
            console.log(userType);
        login(email, password)
            .then(() => {
                notifySuccess("Login successful");
                navigate("/");
            })
            .catch((error) => {
                notifyError(error.message);
            });


    };

    return (
        <div className="h-dvh flex justify-center mt-10">
            <form
                className="form lg:px-20 lg:py-14 m-6 p-10 w-full lg:max-w-[567.6px] lg:h-[570.6px] my-auto "
                onSubmit={handleLogin}
            >
                <div className="flex justify-between items-center">
                    <p className="">
                        <span className="text-xl lg:text-4xl font-black bg-gradient-to-r from-tertiary via-secondary to-primary text-transparent bg-clip-text animate-gradient bg-300%">
                            Galactic Store
                        </span>{" "}
                        <br />
                        <span className="text-gray-400 text-sm">
                            Home to your all your interstellar needs!
                        </span>
                    </p>
                    <img className="lg:size-28 size-20 shadow-2xl rounded-full" src="https://i.ibb.co/Wg43jL4/logo.png" alt="" />
                </div>
                <p className="text-2xl">Login</p>
                <div className="group">
                    <input
                        required={true}
                        className="main-input"
                        name="email"
                        type="email"
                    />
                    <span className="highlight-span"></span>
                    <label className="label-email">Email</label>
                </div>
                <div className="container-1">
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
                </div>
                {/* Login button */}
                <button type="submit" className="submit text-white hover:bg-black hover:bg-opacity-40">Login</button>
                <p>Don&apos;t have an account yet?</p>
                <Link to={`/signup`} className="text-accent font-extrabold">
                    Create one now!
                </Link>
            </form>
        </div>
    );
}

export default LoginForm;
