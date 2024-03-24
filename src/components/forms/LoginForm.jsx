import { Link } from 'react-router-dom';

// Login function
const handLogin = () => {
    console.log('submit');
    // Navigate to home page
    
}

// Login form component
function LoginForm() {
    return (
      <div className="h-dvh flex justify-center">
          <form className="form lg:px-20 lg:py-14 mx-6 p-10 w-full lg:max-w-[426px] my-auto " onSubmit={() => handLogin()}>
            <p className='text-2xl'>Login</p>
            <div className="group">
              <input required={true} className="main-input" type="email" />
              <span className="highlight-span"></span>
              <label className="label-email">Email</label>
            </div>
            <div className="container-1">
              <div className="group">
                <input required={true} className="main-input" type="password" />
                <span className="highlight-span"></span>
                <label className="label-email">Password</label>
              </div>
            </div>
            {/* Login button */}
            <button className="submit text-white">Submit</button>
            <p>Don&apos;t have an account yet?</p>
            <Link to={`/signup`} className='text-[#1b79ab] font-extrabold'>Create one now!</Link>
          </form>
      </div>
    );
  }
  
  export default LoginForm;
  