import React, { Component } from "react";
import "./Register.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registerName: "",
      registerEmail: "",
      registerPassword: ""
    };
  }

  onNameChange = event => {
    this.setState({ registerName: event.target.value });
  };

  onEmailChange = event => {
    this.setState({ registerEmail: event.target.value });
  };

  onPasswordChange = event => {
    this.setState({ registerPassword: event.target.value });
  };

  onSubmitRegister = () => {
    const { registerName, registerEmail, registerPassword } = this.state;
    const { onRouteChange, loadUser } = this.props;

    fetch(`${window.BACKEND_PATH}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: registerName,
        email: registerEmail,
        password: registerPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user && user.name) {
          loadUser(user);
          onRouteChange("home");
        }
      });
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.onSubmitRegister();
    }
  };

  render() {
    return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <div className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Name
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.onNameChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                  onKeyPress={this.handleKeyPress}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
                onClick={this.onSubmitRegister}
              />
            </div>
          </div>
        </div>
      </article>
    );
  }
}

export default Register;
