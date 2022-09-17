import React, { useRef, useState } from 'react';
import { View, Text, Pressable } from 'react-native';

import { Email, Password, validator } from '../../InformationUser';

const LoginPage = () => {
    const emailSelector = useRef()
    const passwordSelector = useRef()

    const [errorEmail, setErrorEmail] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)

    const handleSubmit = (emailSelector, passwordSelector) => {
        const datas = {
            email: emailSelector,
            password: passwordSelector
        }
        let firstError = false
        for ( const data in datas) {
            const errorMessenger = validator(data, datas[data].current.value)
            switch (data){
                case 'email':
                    if (errorMessenger) {
                        if (!firstError) {
                            firstError = true
                            datas[data].current.focus()
                        }
                        setErrorEmail(errorMessenger)
                    }
                    else setErrorEmail(false)
                    break
                case 'password':
                    if (errorMessenger) {
                        if (!firstError) {
                            firstError = true
                            datas[data].current.focus()
                        }
                        setErrorPassword(errorMessenger)
                    }
                    else setErrorPassword(false)
                    break
                default:
                    break
            }
        }
        if (!firstError){
            const output = {
                email: datas['email'].current.value,
                password: datas['password'].current.value,
            }
            console.log(output);
        }
    }
    return (
        <View>
            <Email ref={emailSelector} statusError={errorEmail}/>
            <Password ref={passwordSelector} statusError={errorPassword}/>
            <Pressable onPress= {() => {
                handleSubmit(emailSelector, passwordSelector)
            }}>
                <Text>Log in </Text>
            </Pressable>
        </View>
    )
}

export default LoginPage