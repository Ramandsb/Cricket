import React, {Component} from 'react';
import {Text} from 'react-native';
import { COLOR, ThemeContext, getTheme } from 'react-native-material-ui';
import Routes from './config/routes';

const uiTheme = {
  palette: {
    primaryColor: COLOR.green500,
  },
  toolbar: {
    container: {
      height: 50,
    },
  },
};

class App extends Component {
  render() {
    return (
      <ThemeContext.Provider value={getTheme(uiTheme)}>
        <Routes />
      </ThemeContext.Provider>
    );
  }
}
export default App;
