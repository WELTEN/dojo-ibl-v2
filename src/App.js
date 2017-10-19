import React, { Component } from 'react';

import Main from './components/layouts/Main';
import Login from './components/layouts/Login';
import LandingLex from './components/layouts/LandingLex';

import Projects from './components/views/Projects';
import Groups from './components/views/Groups';



import { firebaseAuth } from './fire.js'

import {
  BrowserRouter, Switch,
  Route, Redirect
} from 'react-router-dom'

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/' />}
    />
  )
}

class App extends Component {
  state = {
    authed: false,
    loading: true,
  }
  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        })
      } else {
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
  }
  componentWillUnmount () {
    this.removeListener()
  }
  render() {
    return this.state.loading === true ? <h1>Loading</h1> : (
      <BrowserRouter>
        <div>
          <Switch>
            <PublicRoute path='/home' component={LandingLex} />
            <PublicRoute path='/login' component={Login} />
              <Main>
                <Switch>
                  <PrivateRoute authed={this.state.authed} path="/projects" component={Projects}> </PrivateRoute>
                  <PrivateRoute authed={this.state.authed} path="/groups" component={Groups}> </PrivateRoute>
                </Switch>
              </Main>
            <Route render={() => <h3>No Match</h3>} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
