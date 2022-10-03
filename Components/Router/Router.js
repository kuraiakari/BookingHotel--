import React from "react"
import { View, Text } from "react-native"
import { NativeRouter, Routes, Route, Link } from "react-router-native"

import { Start, Login, Register, ListHotel, Search } from "../Page"
const Router = () => {
    return (
        <NativeRouter>
        <Routes>
            <Route path='/' element={<Start />} />
            <Route path='/register' element={<Register/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/listhotel' element={<ListHotel/>} />
            <Route path='/search' element={<Search/>} />
        </Routes>
        </NativeRouter>
    )
}
export default Router