import React, { useState, useEffect, useRef } from 'react';
import { client } from '../utils/clientUtil';
import { Link} from "react-router-dom";
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../Styles/RegistrationForm.css";

function RegistrationForm() {

  const baseURL = "http://localhost:8000/register"
  const USER_REGEX = /^[a-zA-Z0-9]{6,16}$/
  const PWD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z0-9_@./#&+-]{6,16}$/
  const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);



  const handleSubmit = async (e) => {
    e.preventDefault();
   

    const validUsername = USER_REGEX.test(user);
    const validPassword = PWD_REGEX.test(pwd);
    const validEmail = EMAIL_REGEX.test(email)

    if (!validUsername | !validPassword | !validEmail) {
      setErrMsg('Invalid Username or Email or Password.')
      return
    }


    client
      .post('/register', {
        username: user,
        password: pwd,
        email: email
      })
      .then((response) => {
        console.log(response)
        console.log(response.status)
        if (response.status == '201') {
          setSuccess(true);
          setUser('');
          setPwd('');
          setEmail('');
          setMatchPwd('');
        }
      }).catch(err => {
        if (!err?.response) {
          setErrMsg('No Server Response');
        } else {
          setErrMsg(err.response.data.message);
        }
      });


  }

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email])

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd && pwd != '');
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd])



  return (

    <div className='register'>
      {success ? (<section>

      <p> success</p>
      </section>) :

        <section className='register-form'>
          <p className={errMsg ? "errmsg" : "hide"} aria-live="assertive">{errMsg}</p>
          <form className='m-2' onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
            <div className="mb-3">
              <label htmlFor='username'>
                Username
                <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
              </label>
              <input
                type="text"
                id='username'
                value={user}
                autoComplete='off'
                onChange={(e) => setUser(e.target.value)}
                required
                className="form-control"
                placeholder="Enter username"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              <p id="usernote" className={userFocus && !validName ? "warn" : "safe"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                6 to 16 characters.<br />
              </p>
            </div>
            <div className="mb-3">
              <label htmlFor='email'>
                Email
                <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
              </label>
              <input
                type="email"
                id='email'
                value={email}
                autoComplete='off'
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control"
                placeholder="Enter Email"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
              <p id="usernote" className={emailFocus && !validEmail ? "warn" : "safe"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Must be a valid email<br />
              </p>
            </div>
            <div className="mb-3">
              <label htmlFor='password'>Password
                <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
              </label>
              <input
                id='password'
                type="password"
                value={pwd}
                autoComplete='off'
                onChange={(e) => setPwd(e.target.value)}
                required
                className="form-control"
                placeholder="Enter password"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              <p id="pwdnote" className={pwdFocus && !validPwd ? "warn" : "safe"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                6 to 16 characters.<br />
                Must include uppercase and lowercase letters and a number.<br />
                Can include special characters: <span aria-label="substract mark">-</span><span aria-label="add mark">+</span><span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
              </p>
            </div>
            <div className="mb-3">
              <label htmlFor='confirm-password'>Confirm Password
                <FontAwesomeIcon icon={faCheck} className={validMatch ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
              </label>
              <input
                id='confirm-password'
                type="password"
                value={matchPwd}
                onChange={(e) => setMatchPwd(e.target.value)}
                required
                className="form-control"
                placeholder="Re-enter password"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <p id="matchpwdnote" className={matchFocus && !validMatch ? "warn" : "safe"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                The password do not match <br />
              </p>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
            <p className="forgot-password text-right">
              Already registered <Link to={`/auth/login`}>Sign in</Link>
            </p>
          </form>
        </section>

      }


    </div>



  )
}
export default RegistrationForm;