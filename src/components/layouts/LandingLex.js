import React, { Component } from 'react';

import { login, loginGoogle, resetPassword } from '../../helpers/auth'

import './../../../node_modules/startbootstrap-freelancer/vendor/bootstrap/css/bootstrap.min.css';
// import './../../../node_modules/startbootstrap-freelancer/vendor/font-awesome/css/font-awesome.min.css';
//
// // import './../../../node_modules/startbootstrap-freelancer/vendor/popper/popper.min.js';
// // import './../../../node_modules/startbootstrap-freelancer/vendor/jquery-easing/jquery.easing.min.js';
import './../../styles/freelance.css';

function setErrorMsg(error) {
  return {
    loginMessage: error
  }
}

class LandingLex extends Component {
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
      <div>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
          <div className="container">
            <a className="navbar-brand js-scroll-trigger" href="#page-top">Start Bootstrap</a>
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              Menu
              <i className="fa fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link js-scroll-trigger" href="#portfolio">Portfolio</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link js-scroll-trigger" href="#about">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link js-scroll-trigger" href="#contact">Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <header className="masthead">
          <div className="container">
            <img className="img-fluid" src="img/profile.png" alt="" />
            <div className="intro-text">
              <span className="name">Start Bootstrap</span>
              <hr className="star-light" />
              <span className="skills">Web Developer - Graphic Artist - User Experience Designer</span>
            </div>
          </div>
        </header>

        <section id="portfolio">
          <div className="container">
            <h2 className="text-center">Portfolio</h2>
            <hr className="star-primary" />
            <div className="row">
              <div className="col-sm-4 portfolio-item">
                <a className="portfolio-link" href="#portfolioModal1" data-toggle="modal">
                  <div className="caption">
                    <div className="caption-content">
                      <i className="fa fa-search-plus fa-3x"></i>
                    </div>
                  </div>
                  <img className="img-fluid" src="img/portfolio/cabin.png" alt="" />
                </a>
              </div>
              <div className="col-sm-4 portfolio-item">
                <a className="portfolio-link" href="#portfolioModal2" data-toggle="modal">
                  <div className="caption">
                    <div className="caption-content">
                      <i className="fa fa-search-plus fa-3x"></i>
                    </div>
                  </div>
                  <img className="img-fluid" src="img/portfolio/cake.png" alt="" />
                </a>
              </div>
              <div className="col-sm-4 portfolio-item">
                <a className="portfolio-link" href="#portfolioModal3" data-toggle="modal">
                  <div className="caption">
                    <div className="caption-content">
                      <i className="fa fa-search-plus fa-3x"></i>
                    </div>
                  </div>
                  <img className="img-fluid" src="img/portfolio/circus.png" alt="" />
                </a>
              </div>
              <div className="col-sm-4 portfolio-item">
                <a className="portfolio-link" href="#portfolioModal4" data-toggle="modal">
                  <div className="caption">
                    <div className="caption-content">
                      <i className="fa fa-search-plus fa-3x"></i>
                    </div>
                  </div>
                  <img className="img-fluid" src="img/portfolio/game.png" alt="" />
                </a>
              </div>
              <div className="col-sm-4 portfolio-item">
                <a className="portfolio-link" href="#portfolioModal5" data-toggle="modal">
                  <div className="caption">
                    <div className="caption-content">
                      <i className="fa fa-search-plus fa-3x"></i>
                    </div>
                  </div>
                  <img className="img-fluid" src="img/portfolio/safe.png" alt="" />
                </a>
              </div>
              <div className="col-sm-4 portfolio-item">
                <a className="portfolio-link" href="#portfolioModal6" data-toggle="modal">
                  <div className="caption">
                    <div className="caption-content">
                      <i className="fa fa-search-plus fa-3x"></i>
                    </div>
                  </div>
                  <img className="img-fluid" src="img/portfolio/submarine.png" alt="" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="success" id="about">
          <div className="container">
            <h2 className="text-center">About</h2>
            <hr className="star-light" />
            <div className="row">
              <div className="col-lg-4 ml-auto">
                <p>Freelancer is a free bootstrap theme created by Start Bootstrap. The download includes the complete source files including HTML, CSS, and JavaScript as well as optional LESS stylesheets for easy customization.</p>
              </div>
              <div className="col-lg-4 mr-auto">
                <p>Whether you are a student looking to showcase your work, a professional looking to attract clients, or a graphic artist looking to share your projects, this template is the perfect starting point!</p>
              </div>
              <div className="col-lg-8 mx-auto text-center">
                <a href="#" className="btn btn-lg btn-outline">
                  <i className="fa fa-download"></i>
                  Download Theme
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="contact">
          <div className="container">
            <h2 className="text-center">Contact Me</h2>
            <hr className="star-primary" />
            <div className="row">
              <div className="col-lg-8 mx-auto">
                /* To configure the contact form email address, go to mail/contact_me.php and update the email address in the PHP file on line 19. */
                /* The form should work on most web servers, but if the form is not working you may need to configure your web server differently. */
                <form name="sentMessage" id="contactForm" noValidate>
                  <div className="control-group">
                    <div className="form-group floating-label-form-group controls">
                      <label>Name</label>
                      <input className="form-control" id="name" type="text" placeholder="Name" required data-validation-required-message="Please enter your name." />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="control-group">
                    <div className="form-group floating-label-form-group controls">
                      <label>Email Address</label>
                      <input className="form-control" id="email" type="email" placeholder="Email Address" required data-validation-required-message="Please enter your email address." />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="control-group">
                    <div className="form-group floating-label-form-group controls">
                      <label>Phone Number</label>
                      <input className="form-control" id="phone" type="tel" placeholder="Phone Number" required data-validation-required-message="Please enter your phone number." />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="control-group">
                    <div className="form-group floating-label-form-group controls">
                      <label>Message</label>
                      <textarea className="form-control" id="message" rows="5" placeholder="Message" required data-validation-required-message="Please enter a message."></textarea>
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <br />
                  <div id="success"></div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-success btn-lg" id="sendMessageButton">Send</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        <footer className="text-center">
          <div className="footer-above">
            <div className="container">
              <div className="row">
                <div className="footer-col col-md-4">
                  <h3>Location</h3>
                  <p>3481 Melrose Place
                    <br />Beverly Hills, CA 90210</p>
                </div>
                <div className="footer-col col-md-4">
                  <h3>Around the Web</h3>
                  <ul className="list-inline">
                    <li className="list-inline-item">
                      <a className="btn-social btn-outline" href="#">
                        <i className="fa fa-fw fa-facebook"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a className="btn-social btn-outline" href="#">
                        <i className="fa fa-fw fa-google-plus"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a className="btn-social btn-outline" href="#">
                        <i className="fa fa-fw fa-twitter"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a className="btn-social btn-outline" href="#">
                        <i className="fa fa-fw fa-linkedin"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a className="btn-social btn-outline" href="#">
                        <i className="fa fa-fw fa-dribbble"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="footer-col col-md-4">
                  <h3>About Freelancer</h3>
                  <p>Freelance is a free to use, open source Bootstrap theme created by
                    <a href="http://startbootstrap.com">Start Bootstrap</a>.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-below">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  Copyright &copy; Your Website 2017
                </div>
              </div>
            </div>
          </div>
        </footer>

        <div className="scroll-top d-lg-none">
          <a className="btn btn-primary js-scroll-trigger" href="#page-top">
            <i className="fa fa-chevron-up"></i>
          </a>
        </div>
      </div>
    )
  }
}

export default LandingLex
