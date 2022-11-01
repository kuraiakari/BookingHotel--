import React, {useState} from 'react'
import { View, Text, TextInput } from 'react-native'
import { useSelector } from 'react-redux'

const ContacInfo = () => {
    const data = useSelector(state => state)
    const [nameUser, setNameUSer] = useState(data.nameUser)
    const [phone, setPhone] = useState(data.phone)
    return (
        <View>
            <TextInput value={nameUser} placeholder='Name' onChange={(e) => {setNameUSer(e.nativeEvent.text)}}/>
            <TextInput value={phone} placeholder='Phone' onChange={(e) => {setPhone(e.nativeEvent.text)}}/>
            <TextInput value={data.email}/>
        </View>
    )
}
export default ContacInfo