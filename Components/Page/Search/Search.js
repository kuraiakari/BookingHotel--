import React, { useState } from "react";
import { View, TextInput, Pressable, Text, Button } from 'react-native'
import { useDispatch } from "react-redux";
import { Link } from "react-router-native";
import DateTimePickerModal from "react-native-modal-datetime-picker"
import Icon from 'react-native-vector-icons/FontAwesome';

import { validator } from "../../Validator";

// Đã có validator thời gian checkin checkout


const Search = () => {
    const [city, setCiTy] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [hideCheckIn, setHideCheckIn] = useState(false)
    const [checkOut, setCheckOut] = useState('')
    const [hideCheckOut, setHideCheckOut] = useState(false)
    const dispatch = useDispatch() 

    const handleSearching = () =>{
        dispatch({ type: 'SERACH_NAME_CITY', payload: city.trim()})
    }

    const showDatePickerCheckIn = () => {
        setHideCheckIn(true);
    };
    const hideDatePickerCheckIn = () => {
        setHideCheckIn(false);
    };
    const handleConfirmCheckIn = (date) => {
        const errorMessage = validator('checkIn', date)
        console.log(errorMessage)
        if (!errorMessage) setCheckIn(date)
        hideDatePickerCheckIn();
    };
    
    
    const showDatePickerCheckOut = () => {
        setHideCheckOut(true);
    };  
    const hideDatePickerCheckOut = () => {
        setHideCheckOut(false);
    };
    const handleConfirmCheckOut = (date) => {
        const errorMessage = validator('checkOut', date, checkIn)
        console.log(errorMessage)
        if (!errorMessage) setCheckOut(date)
        hideDatePickerCheckOut();
    };
    
    return (
        <View style={{margin: 50}}>
            <TextInput
                value={city}
                placeholder='Nhap ten thanh pho ban muon tim'
                onChange={(e) => setCiTy(e.nativeEvent.text)}
            >
            </TextInput>
            <Text>Check In</Text>
            <View>
                <Pressable onPress={showDatePickerCheckIn}>
                    <TextInput
                        editable={false}
                        placeholder="nhap ngay thang"
                        value={checkIn ? `${checkIn.getUTCFullYear()}/${checkIn.getUTCMonth() + 1}/${checkIn.getUTCDate()}` : ''}
                    />
                    <Icon name='calendar' color='gray' size={20}/>
                </Pressable>
            </View>
            <DateTimePickerModal
                isVisible={hideCheckIn}
                mode="date"
                onConfirm={handleConfirmCheckIn}
                onCancel={hideDatePickerCheckIn}
            />
            <Text>Check Out</Text>
            <View>
                <Pressable onPress={showDatePickerCheckOut}>
                    <TextInput
                        editable={false}
                        placeholder="nhap ngay thang"
                        value={checkOut ? `${checkOut.getUTCFullYear()}/${checkOut.getUTCMonth() + 1}/${checkOut.getUTCDate()}` : ''}
                    />
                    <Icon name='calendar' color='gray' size={20}/>
                </Pressable>
            </View>
            <DateTimePickerModal
                isVisible={hideCheckOut}
                mode="date"
                onConfirm={handleConfirmCheckOut}
                onCancel={hideDatePickerCheckOut}
            />
            <Pressable>
                 <Link to='/listhotel' onPress= {() => {handleSearching()}}><Text>Search</Text></Link> 
            </Pressable>
            {/* Có bug input bị trống */}
        </View>
    )
}

export default Search;