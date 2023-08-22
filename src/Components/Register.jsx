import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {

    let baseUrl = 'https://ecommerce.routemisr.com/';
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();
    let loginNavigate = useNavigate();

    const [user, setUser] = useState({
        "name": "",
        "email": "",
        "password": "",
        "rePassword": "",
        "phone": ""
});
    
    async function signUp(e) {
        e.preventDefault();
        try {
            setLoading(true);
            let { data } = await axios
                .post(baseUrl + 'api/v1/auth/signup', user);
                localStorage.setItem("userToken", data.token);
                setLoading(false);
                navigate('/login');
        } catch (error) {
            if (error.response) {
                setError('Error: ' + error.response.data.message);
            } else {
                setError('Error:', error.message);
            }
        }
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
                <form onSubmit={signUp}>
                    <div className="form-group">
                        <input onChange={getUser} placeholder="Name" name="name" type="text" className=" form-control py-2 my-2" />
                    </div>
                    <div className="form-group">
                        <input onChange={getUser} placeholder="Email" type="email" name="email" className="form-control py-2 my-2" />
                    </div>
                    <div className="form-group my-2">
                        <input onChange={getUser} placeholder="Password" type="password" name="password" className=" form-control py-2 my-2" />
                    </div>
                    <div className="form-group my-2">
                        <input onChange={getUser} placeholder="Password again" type="password" name="rePassword" className=" form-control py-2 my-2" />
                    </div>
                    <div className="form-group my-2 ">
                        <input onChange={getUser} placeholder="Number" name="phone" type="number" className="form-control py-2 my-2" />
                    </div>
                        <button type="submit" className={'btn btn-info w-100'}>{loading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'SignUp'}</button>
                        <div className="d-flex align-items-center my-2">
                            <p className='text-white my-2'>Have Account? </p>
                          <a onClick={() => loginNavigate('/login')} className='btnlog text-info mx-2 fs-5 border border-dark px-3'>Login</a>
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

export default Register
