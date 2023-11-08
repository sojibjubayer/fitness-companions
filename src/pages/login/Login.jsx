
import { useContext, useRef } from 'react';
import googlelogo from '../../assets/googlelogo.webp'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../provider/AuthProvider';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const Login = () => {
    const { signIn, signInWithGoogle, user } = useContext(AuthContext);
    const emailRef = useRef(null)
    const navigate = useNavigate()
    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        <Navigate to='/'></Navigate>
        signIn(email, password)
            .then(result => {
                console.log(result.user);
                toast.success('Successfully signed in.');

                //get access token
                const user = { email }
                axios.post('http://localhost:5000/jwt', user, { withCredentials: true })
                    .then(res => {
                        console.log(res.data);
                        if (res.data.success) {
                            navigate(location?.state ? location.state : '/')
                        }
                    })
                navigate('/')
            })
            .catch(error => {
                console.error(error)
                toast.error('Email or Password does not match!')
            })
    }
    const handleSignInWithGoogle = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user.email);
                //get access token
                const user = result.user.email
                axios.post('http://localhost:5000/jwt', user, { withCredentials: true })
                    .then(res => {
                        console.log(res.data);
                        if (res.data.success) {
                            navigate(location?.state ? location.state : '/')
                        }
                    })
            })
            .catch()
    }
    const handleLogin2 = () => {
        if (user)
            return <Navigate to='/'></Navigate>
    }
    return (
        <div >
            <div className="hero md:min-h-screen  ">
                <div className="hero-content flex-col bg-teal-400 rounded my-5">
                    <div className="text-center lg:text-left">
                        <h1 className="text-2xl  font-bold ">Login now!</h1>
                    </div>
                    <div className="card md:w-full w-[250px] shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    ref={emailRef}
                                    placeholder="email"
                                    className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-6">
                                <button onClick={handleLogin2} className="btn bg-teal-400">Login</button>
                                <button onClick={handleSignInWithGoogle}
                                    className="btn btn-ghost mt-3 bg-teal-400 text-white">Login with Google
                                    <img className="w-6" src={googlelogo} alt="" /></button>
                            </div>
                            <Link to='/register'>
                                <p>Have not an account? Please <span className="text-blue-600">Register</span></p>
                            </Link>
                        </form>
                        <Toaster />
                    </div>
                </div>
            </div>
            <Helmet>
                <title>FC | Login </title>
            </Helmet>
        </div>
    );
};

export default Login;