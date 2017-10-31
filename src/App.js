import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#23C6C8',
    accent1Color: '#2F4050'
  }
});

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </MuiThemeProvider>
);

export default App;
