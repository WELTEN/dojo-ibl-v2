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
import AddProject from './pages/AddProject';
import NotFound from './pages/NotFound';
import WithLogin from './components/WithLogin';
import WithAppBar from './components/WithAppBar';
import { primaryColor, accentColor } from './styles';
import { white, black } from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: primaryColor,
    accent1Color: accentColor
  },
  appBar: {
    color: white,
    textColor: black
  }
});

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Router>
      <Switch>
        <Route render={({ location }) => (
          <WithLogin>
            <WithAppBar title="DojoIBL">
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
                <Route
                  location={location}
                  key={location.key}
                  exact
                  path="/projects/add"
                  component={AddProject}
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
