import React, { useState } from "react";
import { View, TextInput, Pressable, Text } from 'react-native'
import { useDispatch } from "react-redux";
import { Link } from "react-router-native";

import { validator } from "../../Validator";

const Search = () => {
    const [city, setCiTy] = useState('')
    const dispatch = useDispatch() 

    const handleSearching = () =>{
        dispatch({ type: 'SERACH_NAME_CITY', payload: city.trim()})
    }
    return (
        <View style={{margin: 50}}>
            <TextInput
                value={city}
                placeholder='Nhap ten thanh pho ban muon tim'
                onChange={(e) => setCiTy(e.nativeEvent.text)}
            >
            </TextInput>
            <Pressable>
                 <Link to='/listhotel' onPress= {() => {handleSearching()}}><Text>Search</Text></Link> 
            </Pressable>
            {/* Có bug input bị trống */}
        </View>
    )
}

export default Search;