import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native';
import { NativeRouter, Routes, Route, Link } from "react-router-native"

import { validator } from '../../Validator';

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [isCheckEmail, setIsCheckEmail] = useState(false)
    const [password, setPassword] = useState('')
    const [isCheckPassword, setIsCheckPassword] = useState(false)
    const [inforUser, setInforUser] = useState('')
    const handleSubmit = () => {
        if (validator('email', email)) setIsCheckEmail(validator('email', email))
        else setIsCheckEmail(false)
        if (validator('password', password)) setIsCheckPassword(validator('password', password))
        else setIsCheckPassword(false)
        if (email && password && !validator('email', email) && !validator('password', password)) {
            setEmail('')
            setPassword('')
            setInforUser({email, password})
        }
    }
    useEffect(() => {
        if (inforUser) console.log(inforUser)
    }, [inforUser])
    return (
        <View>
            <Text>Sign in</Text>
            <Text>Welcome, Sign in to continue</Text>
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
            <Link to='/Home'><Text>Forget password</Text></Link>
            <Pressable style={styles.btn}
                
                onPress= {() => {
                handleSubmit()
            }}>
                <Text>Log in </Text>
            </Pressable>
            <Text>Don't have account?<Link to='/register'>
                <Text> Sign up</Text>
            </Link></Text>
        </View>
        
    )
}

export default LoginPage

const styles = StyleSheet.create({
    heading: {
        fontSize: 24
    },
    btn: {
        padding: 10
    }
});