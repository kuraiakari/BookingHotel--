import React from "react"
import { View, Text } from "react-native"
import { NativeRouter, Routes, Route, Link } from "react-router-native"

import Home from '../Page/Home/Home';
import Register from '../Page/Register/Register'
import Login from '../Page/Login/Login'
const Router = () => {
    return (
        <NativeRouter>
        <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/register" element={<Register/>} />
            <Route path='login' element={<Login/>} />
        </Routes>
        <View>
            <Link to='/'> 
                <Text>Home</Text>
            </Link>
            <Link to='/register'>
                <Text>Register</Text>
            </Link>
            <Link to='/login'>
                <Text>Login</Text>
            </Link>
        </View>
        </NativeRouter>
    )
}
export default Router