import React, { useState, useEffect } from "react";
import { View, Text } from "react-native"

import { Email } from "../../InformationUser";

const Home = () => {
    const [data, setData] = useState([]);

const getMovies = async () => {
    try {
     const response = await fetch('http://localhost:3000/v1/customer/');
     const json = await response.json();
     setData(json);
   } catch (error) {
     
   }
 }

 useEffect(() => {
   getMovies();
 }, []);
    return (
        <View> 
            <Text> Home </Text>
            <Text> {data} </Text> 
        </View>
    )
}

export default Home