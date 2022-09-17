import React, { useState, useEffect, forwardRef } from "react";
import { View, TextInput, Text } from "react-native"

const Password = ({statusError}, ref) => {
    const [password, setPassword] = useState('')
    const [isCheckError, setIsCheckError] = useState(false)

    useEffect(() => {
        setIsCheckError(!!statusError)
    }, [statusError])

    return (
        <View>
            <Text>Password</Text>
            <TextInput 
                ref={ref} 
                value={password} 
                secureTextEntry="true" 
                onChange={(e) => {
                    setPassword(e.nativeEvent.text)
                    setIsCheckError(false)
                }}> 
            </TextInput>
            {
                isCheckError && (
                    <Text>{statusError} </Text>
                )
            }
        </View>
    )
}

export default forwardRef(Password)