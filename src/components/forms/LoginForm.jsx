import { Link, useNavigate } from "react-router-dom";

// Login form component
function LoginForm() {
    
    const nagivate = useNavigate();
    // Login function
    const handLogin = () => {
        console.log("submit");
        
        // Navigate to admin page
        nagivate("/admin");
    };
    
    return (
        <div className="h-dvh flex justify-center">
            <form
                className="form lg:px-20 lg:py-14 m-6 p-10 w-full lg:max-w-[567.6px] lg:h-[570.6px] my-auto "
                onSubmit={() => handLogin()}
            >
                <div className="flex justify-between items-center">
                    <p className="">
                        <span className="text-xl lg:text-4xl font-black bg-gradient-to-r from-[#62DFE8] via-[#325B72] to-[#15192D] text-transparent bg-clip-text animate-gradient bg-300%">
                            Galactic Store
                        </span>{" "}
                        <br />
                        <span className="text-[#acacac] text-sm">
                            Home to your all your interstellar needs!
                        </span>
                    </p>
                    <img src="" alt="" />
                </div>
                <p className="text-2xl">Login</p>
                <div className="group">
                    <input
                        required={true}
                        className="main-input"
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
                        />
                        <span className="highlight-span"></span>
                        <label className="label-email">Password</label>
                    </div>
                </div>
                {/* Login button */}
                <button className="submit text-white hover:bg-black hover:bg-opacity-40">Login</button>
                <p>Don&apos;t have an account yet?</p>
                <Link to={`/signup`} className="text-[#1b79ab] font-extrabold">
                    Create one now!
                </Link>
            </form>
        </div>
    );
}

export default LoginForm;
