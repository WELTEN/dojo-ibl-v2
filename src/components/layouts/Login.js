import React, { Component } from 'react';

import { login, loginGoogle, resetPassword } from '../../helpers/auth'

function setErrorMsg(error) {
  return {
    loginMessage: error
  }
}

class Login extends Component {
  state = { loginMessage: null }

  buttonGoogle = (e) => {
    e.preventDefault()
    loginGoogle()
      .catch((error) => {
          this.setState(setErrorMsg('Invalid username/password.'))
        })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    login(this.email.value, this.pw.value)
      .catch((error) => {
          this.setState(setErrorMsg('Invalid username/password.'))
        })
  }
  resetPassword = () => {
    resetPassword(this.email.value)
      .then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.email.value}.`)))
      .catch((error) => this.setState(setErrorMsg(`Email address not found.`)))
  }
  render () {
    return (
      <div className="loginColumns animated fadeInDown">
        <div className="row ibox-content-login">
            <div className="col-md-6 ">
                <h2 className="font-bold">Welcome to DojoIBL</h2>
                <img className="logoFamilyGuy" src="/src/assets/img/corporate/logodojo.png" alt=""/>
                <p>
                  <small>This platform has been created for research purposes, by using your are accepting being part of a research experiment and your contributions on the platform can be used for research.</small>
                </p>
            </div>
            <div className="col-md-6">
                <div>
                  <a onClick={this.buttonGoogle} className="btn btn-primary block full-width m-b"><i className="fa fa-google"></i> Login with Google</a>
                  <form className="m-t" role="form" onSubmit={this.handleSubmit}>
                      <div className="form-group">
                          <input className="form-control" ref={(email) => this.email = email} placeholder="Type your email" required="true" />
                      </div>
                      <div className="form-group">
                          <input type="password" className="form-control" placeholder="Type your password" required="true" ref={(password) => this.password = password} />
                      </div>
                      <button type="submit" className="btn btn-primary block full-width m-b"><i className="fa fa-google"></i>Login</button>

                      <a onClick={this.resetPassword} >
                          <small>Forgot password?</small>
                      </a>

                      <p className="text-muted text-center">
                          <small>Do not have an account?</small>
                      </p>
                      <a className="btn btn-sm btn-white btn-block" href="/#/register">Create an account in DojoIBL</a>
                  </form>
                  <p className="m-t"> <small>DojoIBL &copy; 2015-2017</small> </p>
                </div>
            </div>
        </div>
        <hr/>
        <div className="row">
            <div className="col-md-6">
                Copyright DojoIBL
            </div>
            <div className="col-md-6 text-right">
                <small>© 2015-2017</small>
            </div>
        </div>
    </div>

    )
  }
}

export default Login
