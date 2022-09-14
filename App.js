import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Routes, Route, Link } from 'react-router-native'

import Home from './Component/Home/Home';
import Register from './Component/Register/Register'
export default function App() {
  return (
    <NativeRouter>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
      <View>
        <Link to='/'> 
          <Text>Home</Text>
        </Link>
        <Link to='/register'>
          <Text>Register</Text>
        </Link>
      </View>
    </NativeRouter>
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
