import '../Styles/LoginForm.css'
import {useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/GlobalStates';
import { client } from '../utils/clientUtil';
function LoginForm() {

  const {authState, setAuthState} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [user, setUser] = useState('');

  const [pwd, setPwd] = useState('');

  const [errMsg, setErrMsg] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    client
      .post('/auth', {
        username: user,
        password: pwd
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    })
      .then((response) => {
        if (response.status == '200') {
          setAuthState({username: user, password: pwd,accessToken: response.data.accessToken })
          console.log(authState);
          setUser('');
          setPwd('');
          navigate(from, { replace: true });
      
        }
      }).catch(err => {
        if (!err?.response) {
          setErrMsg('No Server Response');
        } else {
          setErrMsg(err.response.data.message);
        }
      });




    console.log(e);
  }




  useEffect(() => {
    setErrMsg('');
  }, [user, pwd])


  return (
    <div className='login'>
     
      <section className='login-form'>
      <p className={errMsg ? "errmsg" : "hide"} aria-live="assertive">{errMsg}</p>
      <form className='m-2' onSubmit={handleSubmit}>
        <h3>Sign In</h3>
        <div className="mb-4">
          <label htmlFor='username'>Username</label>
          <input
            type="text"
            id='username'
            onChange={(e) => setUser(e.target.value)}
            required
            value={user}
            className="form-control"
            placeholder="Enter username"
          />
        </div>
        <div className="mb-4">
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            required
            className="form-control"
            placeholder="Enter password"
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
        </div>
        <p className="forgot-password text-right">
              Haven't Registered? <a href="/sign-in">sign Up?</a>
            </p>
      </form>

    </section>
  
    </div>
   

  )
}

export default LoginForm