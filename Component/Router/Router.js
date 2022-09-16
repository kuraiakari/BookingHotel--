import React from "react"
import { View, Text } from "react-native"
import { NativeRouter, Routes, Route, Link } from "react-router-native"

import Home from '../Home/Home';
import Register from '../Register/Register'
const Router = () => {
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
    )
}
export default Router