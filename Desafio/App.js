/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';
import Login from './src/screens/Login';
import Secured from './src/screens/Secured';

export default class App extends Component<Props> {
  state = {
    isLoggedIn: false
  };

  render() {
      if(this.state.isLoggedIn)
          return <Secured
              onLogoutPress={() => this.setState({ isLoggedIn: false })}
          />;
      else
          return <Login
              onLoginPress={() => this.setState({ isLoggedIn: true })}
          />;
  }
}

AppRegistry.registerComponent(App, ()=> App);
