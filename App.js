import React, { Component } from 'react';
import Home from './src/Home';
import CameraContainer from './src/CameraContainer';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const AppNavigator = createStackNavigator({
  Home: { screen: Home },
  Camera: { screen: CameraContainer }
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {

  render() {
    return (<AppContainer />);
  }
}
