import React from "react"
import { View, Text } from "react-native"
import { NativeRouter, Routes, Route, Link } from "react-router-native"

import { Start, Login, Register } from "../Page"
const Router = () => {
    return (
        <NativeRouter>
        <Routes>
            <Route path='/' element={<Start />} />
            <Route path='/register' element={<Register/>} />
            <Route path='/login' element={<Login/>} />
        </Routes>
        </NativeRouter>
    )
}
export default Router