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
import EditProject from './pages/EditProject';
import Group from './pages/Group';
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
      <WithLogin>
        <WithAppBar title="DojoIBL">
          <Switch>
            <Route
              exact
              path="/"
              component={Home}
            />
            <Route
              exact
              path="/projects"
              component={Projects}
            />
            <Route
              exact
              path="/projects/add"
              component={AddProject}
            />
            <Route
              exact
              path="/projects/:projectKey/edit"
              component={EditProject}
            />
            <Route
              exact
              path="/groups/:groupKey"
              component={Group}
            />
            <Route component={NotFound} />
          </Switch>
        </WithAppBar>
      </WithLogin>
    </Router>
  </MuiThemeProvider>
);

export default App;
