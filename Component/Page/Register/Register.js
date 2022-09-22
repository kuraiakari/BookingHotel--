'use strict';

import { useEffect, useRef, useState} from "react"
import { View, Text, TextInput, StyleSheet, Pressable} from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "react-router-native";

import { validator } from '../../Validator';

const Register  = () => {
    const [email, setEmail] = useState('')
    const [isCheckEmail, setIsCheckEmail] = useState(false)
    const [password, setPassword] = useState('')
    const [isCheckPassword, setIsCheckPassword] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isCheckConfirmPassword, setIsCheckConfirmPassword] = useState(false)
    const [isCheckedBox, setIsCheckedBox] = useState(false)
    const iconName = isCheckedBox ? "checkbox-marked" : "checkbox-blank-outline";
    const [inforUser, setInforUser] = useState('')
    const handleSubmit = () => {
        if (validator('email', email)) setIsCheckEmail(validator('email', email))
        else setIsCheckEmail(false)
        if (validator('password', password)) setIsCheckPassword(validator('password', password))
        else setIsCheckPassword(false)
        if (validator('confirmpassword', confirmPassword, password)) setIsCheckConfirmPassword(validator('confirmpassword', confirmPassword, password))
        else setIsCheckConfirmPassword(false)
        if (email && password && !validator('email', email) && !validator('password', password) && !validator('confirmpassword', confirmPassword, password) && isCheckedBox) {
            setEmail('')
            setPassword('')
            setConfirmPassword('')
            setInforUser({email, password})
        }
    }
    useEffect(() => {
        if (inforUser) console.log(inforUser)

    }, [inforUser])
    return (
        <View>
            <Text>Sign up</Text>
            <Text>You can using the application after sign up.</Text>
            <TextInput placeholder="Type your email" value={email} onChange={(e)=> setEmail(e.nativeEvent.text)}/>
            {
                isCheckEmail && <View>
                    <Text>{isCheckEmail}</Text>
                </View>
            }
            <TextInput keyboardType='default' secureTextEntry= { true } placeholder="Type your password" value={password} onChange={(e)=> setPassword(e.nativeEvent.text)}/>
            {
                isCheckPassword && <View>
                    <Text>{isCheckPassword}</Text>
                </View>
            }
            <TextInput keyboardType='default' secureTextEntry= { true } placeholder="Type your confirm password" value={confirmPassword} onChange={(e)=> setConfirmPassword(e.nativeEvent.text)}/>
            {
                isCheckConfirmPassword && <View>
                    <Text>{isCheckConfirmPassword}</Text>
                </View>
            }
            <View>
                <Pressable onPress={() => setIsCheckedBox(!isCheckedBox)}>
                    <MaterialCommunityIcons 
                        name={iconName}/>
                </Pressable>
                <Text>{'I read and agree to Terms & Conditions'}</Text>
            </View>
            <Pressable     
                onPress= {() => {
                handleSubmit()
            }}>
                <Text>Log up </Text>
            </Pressable>
            {
                inforUser && <View>
                    <Text>Bạn đã đăng kí thành công</Text>
                    <Link to='/login'>
                        <Text> Quay trở lại</Text>
                    </Link>
                </View>
            }
            <Text>Already have an account?<Link to='/login'>
                <Text> Sign In</Text>
            </Link></Text>
        </View>
    )
}

export default Register