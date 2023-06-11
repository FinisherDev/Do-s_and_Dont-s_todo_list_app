import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import AuthService from '../tools/axiosAPI.js';

function Login (props) {
  const [email, setEmail] = useState(props.email || '');
  const [password, setPass] = useState(props.password || '');
  const [errors, setErrors] = useState('');

  var boxStyle = {
    flexGrow : 1
  }

  function submit(event){
    event.preventDefault();
    AuthService.post('/user/login/', {
      email: email,
      password: password
    }).then(
      (result) => {
        AuthService.defaults.headers['Authorization'] = 'Bearer ' + result.data.access;
        localStorage.setItem('access_token', result.data.access);
        localStorage.setItem('refresh_token', result.data.refresh);
        window.location.assign('/');
      })
      .catch (
        (error) => {
          console.log(error);
          setErrors(error.response.data);
        });
        setEmail('');
        setPass('');
      };

  return (
    <div className='login_box'>
      <div style={ boxStyle }></div>
      <form className="login" onSubmit={submit}>
        <h1 id='login-head'>Login</h1>
        <label className='labels'>Email</label>
        <span className="error">{errors.email}</span>
        <input type="email" name="email" onChange={(event) => setEmail(event.target.value)} value={email}>
        </input>
        <label className='labels'>Password</label>
        <span className="error">{errors.password}</span>
        <input type="password" name="password" onChange={(event) => setPass(event.target.value)} value={password}>
        </input>
        <input type="submit" name="login" value="Login" />
        <p>Don't have an account? <Link to='/signup'>Signup</Link></p>
      </form>
      <div style={ boxStyle }></div>
    </div>
  );
};

export default Login;
