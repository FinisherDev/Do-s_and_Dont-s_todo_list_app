import React from 'react';
import {Link} from 'react-router-dom';
import AuthService from '../tools/axiosAPI.js';

class Signup extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      errors: '',
    };
    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
  }

  change(e){
    this.setState({[e.target.name] : e.target.value});
  };

  submit(e){
    event.preventDefault();
    AuthService.post('/user/create/', {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    }).then(
      (result) => {
        console.log('success');
      })
      .catch (
        (error) => {
          console.log(error);
          this.setState({errors : error.response.data});
        });
      };

  render(){
    var boxStyle = {
      flexGrow : 1
    }
    return(
      <div className='signup_box'>
        <div style={ boxStyle }></div>
          <form className="signup" onSubmit={this.submit}>
            <h1 id='signup-head'>Signup</h1>
            <label htmlFor="username" className='labels'>Username</label>
            <span className="error">{this.state.errors.username}</span>
            <input type="text" name="username" onChange={this.change} value={this.state.username}/>
            <label htmlFor="email" className='labels'>Email</label>
            <span className="error">{this.state.errors.email}</span>
            <input type="email" name="email" onChange={this.change} value={this.state.email}/>
            <label htmlFor="password" className='labels'>Password</label>
            <span className="error">{this.state.errors.password}</span>
            <input type="password" name="password" onChange={this.change} value={this.state.password}/>
            <input type="submit" name="submit" value="Submit" />
            <p>Already have an account? <Link to = "/login">Login</Link></p>
          </form>
          <div style={ boxStyle }></div>
      </div>
    )
  }
}

export default Signup;
