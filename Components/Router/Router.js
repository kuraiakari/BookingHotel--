import React from "react";
import { View, Text } from "react-native";
import { NativeRouter, Routes, Route, Link } from "react-router-native";

import {
  Start,
  Login,
  Register,
  ListHotel,
  Search,
  PersonalDetails,
  EditProfile,
  ChangePassword,
} from "../Page";

const Router = () => {
  return (
    <NativeRouter>
      <Routes>
        <Route exact path="/" element={<Start />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/listhotel" element={<ListHotel />} />
        <Route path="/search" element={<Search />} />
        <Route exact path="/person" element={<PersonalDetails />} />
        <Route path="/person/editprofile" element={<EditProfile />} />
        <Route path="/person/changepassword" element={<ChangePassword />} />
      </Routes>
    </NativeRouter>
  );
};
export default Router;
