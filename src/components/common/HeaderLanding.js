import React from 'react';

import './../../../node_modules/bootstrap/dist/css/bootstrap.min.css'

// require('/bootstrap/css/bootstrap.min.cs');

var styles = {
  navBar: {
    backgroundColor: 'dark blue'
  },
  center: {
    textAlign: 'center'
  },
  rightNav: {
  },
  verticalLine: {
  },
};

class HeaderLanding extends React.Component {


  render() {
      return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
          <div className="container">
            <a className="navbar-brand js-scroll-trigger" href="#page-top">Start Bootstrap</a>

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
      )
  }
}

export default HeaderLanding
