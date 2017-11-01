import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Home from './pages/Home';
import Projects from './pages/Projects';
import NotFound from './pages/NotFound';
import WithLogin from './components/WithLogin';
import WithAppBar from './components/WithAppBar/index';
import { primaryColor, accentColor } from './styles';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: primaryColor,
    accent1Color: accentColor
  }
});

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Router>
      <Switch>
        <Route path="/" render={({ location }) => (
          <WithLogin>
            <WithAppBar title="Home">
              <Switch>
                <Route
                  location={location}
                  key={location.key}
                  exact
                  path="/"
                  component={Home}
                />
                <Route
                  location={location}
                  key={location.key}
                  exact
                  path="/projects"
                  component={Projects}
                />
              </Switch>
            </WithAppBar>
          </WithLogin>
        )} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </MuiThemeProvider>
);

export default App;
