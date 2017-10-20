import React, { Component } from 'react';

import { login, loginGoogle, resetPassword } from '../../helpers/auth'
import Aux from 'react-aux';
import glamorous from 'glamorous';
import mockup from './mockup.png';
import PropTypes from 'prop-types';
import '../../styles/freelance.css';
import logo_black from '../../img/LEX20171030_Logo_Zwart_RGB.png'
import logo_orange from '../../img/LEX20171030_Logo_Wit+Oranje_RGB.png'
import Scroll from 'react-scroll';
import Contact from './Landing/Contact'

let Link       = Scroll.Link;
let Element    = Scroll.Element;
let scroll    = Scroll.animateScroll;

export default class LandingLex extends Component {
  state = {
    loginMessage: null,
    fixed: false
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (e) => {
    const scrollTop = document.documentElement.scrollTop;
    this.setState({ fixed: scrollTop >= 100 });
  }

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
    const fixed = this.state.fixed;
    return (
      <Aux>
        <Nav fixed={fixed} className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
          <div className="container">
            <NavTitle fixed={fixed} className="navbar-brand" href="#page-top">DLex</NavTitle>

            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link js-scroll-trigger" activeClass="active" to="pricing" spy={true} smooth={true} offset={50} duration={500} onSetActive={this.handleSetActive}>
                    Pricing
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link js-scroll-trigger" activeClass="active" to="services" spy={true} smooth={true} offset={50} duration={500} onSetActive={this.handleSetActive}>
                    Services
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link js-scroll-trigger" activeClass="active" to="contact" spy={true} smooth={true} offset={50} duration={500} onSetActive={this.handleSetActive}>
                    Contact
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link js-scroll-trigger" href="/login">Access</a>
                </li>
              </ul>
            </div>
          </div>
        </Nav>
        <Header className="masthead">
          <div className="container">
            <img className="img-fluid" src={logo_orange} alt="" />
            <div className="intro-text">
              <span className="name">Learning Xperience</span>
              <hr className="star-light" />
              <span className="skills">Student Centered - Learning Process - Personalized Experiences</span>
            </div>
          </div>
        </Header>

        <Element name="pricing" className="element">
          <Section className="portfolio">
            <h2 className="text-center">Pricing</h2>
            <hr className="star-primary" />
            <CardGrid>
              <PriceCard
                title="Basic"
                description="Lorem ipsum dolor sit amet, illum fastidii dissentias quo ne. Sea ne sint animal iisque, nam an soluta sensibus."
                price={16}
                features={['Dashboards', 'Projects view', 'Contacts', 'Calendar', 'ReactJS']}
                link="#"
              />
              <PriceCard
                title="Standard"
                description="Lorem ipsum dolor sit amet, illum fastidii dissentias quo ne. Sea ne sint animal iisque, nam an soluta sensibus."
                price={22}
                features={['Dashboards', 'Projects view', 'Contacts', 'Calendar', 'ReactJS']}
                additionalFeatures={['Support platform']}
                link="#"
                big
              />
              <PriceCard
                title="Premium"
                description="Lorem ipsum dolor sit amet, illum fastidii dissentias quo ne. Sea ne sint animal iisque, nam an soluta sensibus."
                price={160}
                features={['Dashboards', 'Projects view', 'Contacts', 'Calendar', 'ReactJS']}
                link="#"
              />
            </CardGrid>
          </Section>
        </Element>

        <Element name="services" className="element">
          <Section className="services">
            <h2 className="text-center">Services</h2>
            <hr className="star-primary" />
            <FeatureGrid>
              <Feature
                title="Experience"
                description="We bring experience in Agile Learning for education..."
              />
              <Feature
                title="Instruments"
                description="We use instruments..."
              />
              <Feature
                title="Research"
                description="We do research about "
              />
              <Feature
                title="Technology"
                description="We provide the technology "
              />
            </FeatureGrid>
          </Section>
        </Element>
        <Element name="contact" className="element">
          <Contact />
        </Element>



        <footer className="text-center">
          <div className="footer-above">
            <div className="container">
              <div className="row">
                <div className="footer-col col-md-4">
                  <h3>Location</h3>
                  <p>Ágora Roermond
                    <br/>Oranjelaan 300, 6043 GL Roermond</p>
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
                  <h3>DLex</h3>
                  <p>DLex is a company crafted with love in the NL.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-below">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  Copyright © DLex 2017
                </div>
              </div>
            </div>
          </div>
        </footer>
      </Aux>
    );
  }
}

const Nav = glamorous.nav({
  position: 'fixed !important',
  width: '100%'
}, ({ fixed }) => {
  if (fixed) return [{
    paddingTop: '10px !important',
    paddingBottom: '10px !important'
  }];
});

const NavTitle = glamorous.a(({ fixed }) => {
  if (fixed) return [{
    fontSize: '24px !important'
  }];
});

const Header = glamorous.header({
  paddingTop: '200px !important'
});

const Intro = glamorous.section({
  position: 'relative',
  width: '100vw',
  height: '100vh',
  backgroundColor: '#F2F2F2'
});

const Content = glamorous.section({
  position: 'relative',
  top: '50%',
  transform: 'translateY(-50%)',
});

const ContentWrapper = glamorous.div({
  float: 'right',
  maxWidth: 400
});

const MockupImg = glamorous.img({
  position: 'absolute',
  top: '50%',
  left: -500,
  transform: 'translate(20vw, -50%)',
  width: '70%'
});

const Title = glamorous.h1({
  marginTop: 0,
  marginBottom: 16,
  fontSize: 42
});

const Text = glamorous.p({
  marginBottom: 32,
  fontSize: 16
});

const Button = glamorous.a({
  padding: '6px 12px',
  backgroundColor: '#FFFFFF',
  textTransform: 'uppercase',
  fontWeight: 600,
  fontSize: 16,
  transition: 'all .2s ease-in-out',
  ':hover': {
    color: 'rgb(138, 104, 198)',
    textDecoration: 'none'
  }
});

const RegisterButton = glamorous(Button)({
  marginLeft: 12,
  color: '#FFFFFF',
  backgroundColor: '#F8812D',
  ':hover': {
    color: '#FFFFFF',
    backgroundColor: '#18A689'
  }
});

const StyledSection = glamorous.section({
  paddingTop: 48,
  paddingBottom: 48,
  backgroundColor: '#F2F2F2'
});

const Section = (props) => (
  <StyledSection {...props}>
    <div className="container">
      {props.children}
    </div>
  </StyledSection>
);

const CardGrid = glamorous.section({
  marginLeft: -24,
  marginRight: -24,
  display: 'flex'
});

const StyledCard = glamorous.article({
  float: 'left',
  marginTop: 24,
  marginBottom: 24,
  marginLeft: 24,
  marginRight: 24,
  textAlign: 'center',
  border: '1px solid #BDBDBD',
  borderRadius: 12,
  overflow: 'hidden',
  flex: 10
}, ({ big }) => {
  if (big) return [{
    marginTop: 0,
    marginBottom: 0,
    borderColor: 'rgb(138, 104, 198)',
    flex: 11
  }];
});

const CardTitle = glamorous.h2({
  margin: 0,
  paddingTop: 12,
  paddingBottom: 12,
  color: '#000000',
  backgroundColor: '#E0E0E0',
}, ({ big }) => {
  if (big) return [{
    color: '#FFFFFF',
    backgroundColor: 'rgb(138, 104, 198)'
  }]
});

const CardContent = glamorous.section({
  padding: 24,
  paddingBottom: 0
});

const CardList = glamorous.ul({
  margin: 0,
  padding: 0
});

const CardListItem = glamorous.li({
  paddingTop: 6,
  paddingBottom: 6,
  borderBottom: '2px solid #E0E0E0',
  ':first-child': {
    borderTop: '2px solid #E0E0E0'
  }
});

const CardSignup = glamorous.a({
  paddingTop: 24,
  paddingBottom: 24,
  color: 'rgb(138, 104, 198)',
  display: 'block',
  transition: 'all .2s ease-in-out',
  ':hover': {
    textDecoration: 'none',
    color: '#000000'
  }
}, ({ big }) => {
  if (big) return [{ paddingTop: 48, paddingBottom: 48 }];
});

const PriceCard = ({
  title,
  description,
  price,
  features,
  additionalFeatures,
  link,
  big
}) => (
  <StyledCard big={big}>
    <CardTitle big={big}>{title}</CardTitle>
    <CardContent>
      <p>{description}</p>
      <CardList>
        <CardListItem><strong>${price}</strong>/month</CardListItem>
        {features.map((feature, index) =>
          <CardListItem key={index}>{feature}</CardListItem>
        )}
        {additionalFeatures && additionalFeatures.map((feature, index) =>
          <CardListItem key={index}><strong>{feature}</strong></CardListItem>
        )}
      </CardList>
    </CardContent>
    <CardSignup big={big} href={link}>Signup</CardSignup>
  </StyledCard>
);

PriceCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
  additionalFeatures: PropTypes.arrayOf(PropTypes.string),
  link: PropTypes.string.isRequired,
  big: PropTypes.bool
};

const FeatureGrid = glamorous.section({
  display: 'flex',
  flexWrap: 'wrap'
});

const StyledFeature = glamorous.article({
  padding: 24,
  width: '50%',
  boxSizing: 'border-box'
});

const FeatureTitle = glamorous.h2({ fontWeight: '400', color: 'white' });

const Feature = ({ title, description }) => (
  <StyledFeature>
    <FeatureTitle>{title}</FeatureTitle>
    <p>{description}</p>
  </StyledFeature>
);

Feature.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

const Footer = glamorous.footer({
  paddingTop: 12,
  paddingBottom: 12,
  color: '#FFFFFF',
  backgroundColor: '#2F4050'
});

function setErrorMsg(error) {
  return {
    loginMessage: error
  }
}
