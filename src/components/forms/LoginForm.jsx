import { Link } from "react-router-dom";

// Login function
const handLogin = () => {
    console.log("submit");
    // Navigate to home page
};

// Login form component
function LoginForm() {
    return (
        <div className="h-dvh flex justify-center">
            <form
                className="form lg:px-20 lg:py-14 m-6 p-10 w-full lg:max-w-[567.6px] my-auto "
                onSubmit={() => handLogin()}
            >
                <p className="">
                    <span className="text-4xl font-black bg-gradient-to-r from-[#62DFE8] via-[#325B72] to-[#15192D] text-transparent bg-clip-text animate-gradient bg-300%">
                        Galactic Store
                    </span>{" "}
                    <br />
                    <span className="text-[#acacac] text-sm">
                        Home to your all your intersellar needs!
                    </span>
                </p>
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
                <button className="submit text-white">Login</button>
                <p>Don&apos;t have an account yet?</p>
                <Link to={`/signup`} className="text-[#1b79ab] font-extrabold">
                    Create one now!
                </Link>
            </form>
        </div>
    );
}

export default LoginForm;
