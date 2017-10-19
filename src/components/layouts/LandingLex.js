import React, { Component } from 'react';

import { login, loginGoogle, resetPassword } from '../../helpers/auth'
import Aux from 'react-aux';
import glamorous from 'glamorous';
import mockup from './mockup.png';
import PropTypes from 'prop-types';

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
    color: '#1AB394',
    textDecoration: 'none'
  }
});

const RegisterButton = glamorous(Button)({
  marginLeft: 12,
  color: '#FFFFFF',
  backgroundColor: '#1AB394',
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
  border: '2px solid #BDBDBD',
  borderRadius: 12,
  overflow: 'hidden',
  flex: 10
}, ({ big }) => {
  if (big) return [{
    marginTop: 0,
    marginBottom: 0,
    borderColor: '#1AB394',
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
    backgroundColor: '#1AB394'
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
  color: '#1AB394',
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

const FeatureTitle = glamorous.h2({ color: '#1AB394' });

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

export default class LandingLex extends Component {
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
      <Aux>
        <Intro>
          <MockupImg src={mockup} alt="Mockup" />
          <Content className="container">
            <ContentWrapper>
              <Title>Welcome to Dojo-IBL</Title>
              <Text>Some text Some Text Some Text Some Text</Text>
              <div>
                <Button href="/login">Login</Button>
                <RegisterButton href="/register">Register</RegisterButton>
              </div>
            </ContentWrapper>
          </Content>
        </Intro>
        <Section>
          <Title>Pricing</Title>
          <Text>The prices</Text>
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
        <Section>
          <Title css={{ textAlign: 'center' }}>Features</Title>
          <Text css={{ textAlign: 'center' }}>
            The features
          </Text>
          <FeatureGrid>
            <Feature
              title="Feature#1"
              description="Lorem ipsum dolor sit amet, illum fastidii dissentias quo ne. Sea ne sint animal iisque, nam an soluta sensibus. Lorem ipsum dolor sit amet, illum fastidii dissentias quo ne. Sea ne sint animal iisque, nam an soluta sensibus. Lorem ipsum dolor sit amet, illum fastidii dissentias quo ne. Sea ne sint animal iisque, nam an soluta sensibus."
            />
            <Feature
              title="Feature#1"
              description="Lorem ipsum dolor sit amet, illum fastidii dissentias quo ne. Sea ne sint animal iisque, nam an soluta sensibus."
            />
            <Feature
              title="Feature#1"
              description="Lorem ipsum dolor sit amet, illum fastidii dissentias quo ne. Sea ne sint animal iisque, nam an soluta sensibus."
            />
            <Feature
              title="Feature#1"
              description="Lorem ipsum dolor sit amet, illum fastidii dissentias quo ne. Sea ne sint animal iisque, nam an soluta sensibus."
            />
          </FeatureGrid>
        </Section>
        <Footer>
          <div className="container">
            DojoIBL &copy; 2015-2017
          </div>
        </Footer>
      </Aux>
    );
  }
}
