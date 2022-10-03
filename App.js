import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Routes, Route, Link } from 'react-router-native'
import { Provider } from 'react-redux';

import store from './Store/configureStore';
import Router from './Components/Router/Router';


export default function App() {
  return (
    <Provider store={ store} >
      <Router />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
