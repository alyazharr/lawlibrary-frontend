import axios from 'axios';
import AuthContext from '../context/GlobalStates';
import '../Styles/LoginForm.css'

import React, { useState, useEffect,useContext } from 'react';
function LoginForm() {

  const {setAuthState} = useContext(AuthContext);
  const baseURL = "http://localhost:8000/auth"
  const [user, setUser] = useState('');

  const [pwd, setPwd] = useState('');

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(baseURL, {
        username: user,
        password: pwd
      })
      .then((response) => {
        if (response.status == '200') {
          setSuccess(true);
          setAuthState({ username: user, password: pwd, refreshToken: response.data.refreshToken })
          setUser('');
          setPwd('');
          setSuccess(true);
      
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
      {success ? 
        <section>
          <div><p>login success</p></div>
        </section>
      :
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
      }
    </div>
   

  )
}

export default LoginForm