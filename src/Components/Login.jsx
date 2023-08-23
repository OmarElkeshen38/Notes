import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login(props) {

    let baseUrl = 'https://ecommerce.routemisr.com/';
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();
    let registerNavigate = useNavigate();

    const [user, setUser] = useState({
        "email": "",
        "password": ""
    });

    async function signIn(e) {
        e.preventDefault();
        setLoading(true);
        let { data } = await axios
            .post(baseUrl + 'api/v1/auth/signin', user);
        if (data.token) {
            localStorage.setItem("userToken", data.token);
            props.saveUserData();
            navigate('/home');
        } else {
            setError(data.message);
        }
        setLoading(false);
    }

    function getUser(e) {
        let myUser = { ...user };
        myUser[e.target.name] = e.target.value;
        setUser(myUser);
    }

  return (
    <>
        <div className="container my-5 py-5">
              <div className="col-lg-7 col-md-9 m-auto text-center">
                <form onSubmit={signIn}>
                    <div className="form-group">
                          <input onChange={getUser} placeholder="Enter your email" type="email" name="email" className="form-control py-2 my-2" />
                    </div>
                    <div className="form-group my-2">
                          <input onChange={getUser} placeholder="Enter your password" type="password" name="password" className=" form-control py-2 my-2" />
                    </div>
                    <button type="submit" className={'btn btn-info w-100'}>{loading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'SignIn'}</button>
                    <div className="d-flex align-items-center my-2">
                        <p className='text-white my-2'>Don't have an Account?</p>
                          <a onClick={() => registerNavigate('/register')} className='btnlog text-info mx-2 fs-5 border border-dark px-3'>Register</a>
                    </div>
                    {error && <div className="alert alert-danger mt-2">
                        {error}
                    </div>}
                </form>
            </div>
        </div>
    </>
  )
}

export default Login
