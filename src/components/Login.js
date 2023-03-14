import React from "react";
import { Link, withRouter } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: ''
        }
        this.handleLogin = this.handleChange.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        
      }
      handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
          [name]: value,
        });
      }
    
      handleSubmit = (e) => {
        e.preventDefault();
        this.handleLogin(this.state.email, this.state.password);
      }
      
      render() {
return(
        <div className="login-form" height="80" width="80" color="#fff">
      <h2 className="login-form__title">Log in</h2>
      <form className="login-form__form" onSubmit={this.handleSubmit}>
        <input
          type="email"
          name="email"
          className="login-form__input"
          placeholder="Email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <input
          type="password"
          name="password"
          className="login-form__input"
          placeholder="Password"
          value={this.state.password}
          onChange={this.handleChange}
        />

        <div className="login-form__footer">
          <div className="login-form__footer-wrapper">
            <button type="submit" className="login-form__submit-button">
              Log in
            </button>
            <p className="login-form__footer-text">
              Not a member yet?{" "}
              <Link to="/signup" className="login-form__footer-link">
                Sign up here!
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
)
}
}


export default withRouter(Login);