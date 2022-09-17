import React, { useState, forwardRef, useEffect} from 'react';
import { View, Text, TextInput } from 'react-native';

const Email = ({statusError}, ref) => {
    const [email, setEmail] = useState('')
    const [isCheckError, setIsCheckError] = useState(false)
    useEffect(() => {
        setIsCheckError(!!statusError)
    }, [statusError])
    return (
        <View>
            <Text>Email</Text>
            <TextInput 
                ref={ref} 
                value={email} 
                onChange={(e) => {
                    setEmail(e.nativeEvent.text)
                    setIsCheckError(false)
                }} >      
            </TextInput>
            {
                isCheckError && (
                    <Text>{statusError} </Text>
                )
            }
        </View>
    )
}
export default forwardRef(Email)