import { Link, useHistory } from 'react-router-dom';

const handleSignUp = (e) => {
    e.preventDefault();
    let history = useHistory;
    console.log('submit');
    history.push('/'); // navigate to login page
}

// Sign up form component
const SignUpForm = () => {
    return (
        <div className="h-dvh flex justify-center lg:mx-[500px]">
          <form className="form lg:px-20 lg:py-14 mx-6 p-10 w-full my-auto" onSubmit={() => handleSignUp()}>
            <p className='text-2xl'>Sign up</p>
            <div className="group">
              <input required={true} className="main-input" type="text" />
              <span className="highlight-span"></span>
              <label className="label-email">First Name</label>
            </div>
            <div className="group">
              <input required={true} className="main-input" type="text" />
              <span className="highlight-span"></span>
              <label className="label-email">Last Name</label>
            </div>
            <div className="group">
              <input required={true} className="main-input" type="email" />
              <span className="highlight-span"></span>
              <label className="label-email">Email</label>
            </div>
            <div className="group">
              <input required={true} className="main-input" type="password" />
              <span className="highlight-span"></span>
              <label className="label-email">Password</label>
            </div>
            <div className="group">
              <input required={true} className="main-input" type="password" />
              <span className="highlight-span"></span>
              <label className="label-email">Confirm Password</label>
            </div>
            {/* sign up button */}
            <button className="submit text-white">Submit</button>
            <p>Already have an account yet?</p>
            <Link to={`/`} className='text-[#1b79ab] font-extrabold'>Login now!</Link>
          </form>
      </div>
    );
};

export default SignUpForm;