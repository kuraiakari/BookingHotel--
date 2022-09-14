'use strict';

import { useRef, useState} from "react"
import { View, Text, TextInput, StyleSheet, Alert, Button, Pressable} from "react-native"


import RadioButton from "../RatioBox/RatioBox";
import {  rulesObligatory, rulesEmail, rulesMin, rulesConfirmPassword } from "../Rules/Rules"


// Còn trường Sex chưa xử lí focus khi submit bị thiếu .mong muốn toạn 1 id nếu thị thiếu sẽ scroll lên đoạn của trường sex

const Register  = () => {
    const selectorFirstName = useRef()
    const selectorLastName = useRef()
    const selectorPhone = useRef()
    const selectorEmail = useRef()
    const selectorNationality = useRef()
    const selectorPassword = useRef()
    const selectorConfirmPassword = useRef()
    const [firstName, setFirstName] = useState('')
    const [isCheckFirstName, setIsCheckFirstName] = useState(true) 
    const [lastName, setLastName] = useState('')
    const [isCheckLastName, setIsCheckLastName] = useState(true)
    const [sex, setSex] = useState(null)
    const [isCheckSex, setIsCheckSex] = useState(true)
    const [phone, setPhone] = useState('')
    const [isCheckPhone, setIsCheckPhone] = useState(true)
    const [email, setEmail] = useState('')
    const [isCheckEmail, setIsCheckEmail] = useState(true)
    const [isCheckNotEmail, setIsCheckNotEmail] = useState(true)
    const [nationality, setNationality] = useState('')
    const [isCheckNationality, setIsCheckNationality] = useState(true)
    const [password, setPassword] = useState('')
    const [isCheckPassword, setIsCheckPassword] = useState(true)
    const [isCheckNotPassword, setIsCheckNotPassword] = useState(true)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isCheckConfirmPassword, setIsCheckConfirmPassword] = useState(true)
    const [isCheckNotConfirmPassword, setIsCheckNotConfirmPassword] = useState(true)
    const [infoUser, setInfoUser] = useState('')   // Xử lí để check, sau hoàn thiện sẽ xóa đi. Nếu không sẽ lưu lại thông tin người dùng nhập
    const sexs = [
        { value: 'male' },
        { value: 'female' },
        { value: 'other' },
    ]  
    const handleSubmit = () => {
        if (firstName && lastName && email && password && isCheckNotEmail && isCheckNotPassword && isCheckNotConfirmPassword){
            const data = {
                fullName: `${firstName}` + ` ${lastName}`,
                sex,
                phone,
                email,
                nationality,
                password,
            }
            setInfoUser(data)
        }
        if (!confirmPassword) {
            selectorConfirmPassword.current.focus()
            setIsCheckConfirmPassword(false)
        }
        if (confirmPassword && !isCheckNotConfirmPassword) {
            selectorConfirmPassword.current.focus()
            setIsCheckNotConfirmPassword(false)
        }
        if (!password) {
            selectorPassword.current.focus()
            setIsCheckPassword(false)
        }
        if (password && !isCheckNotPassword) {
            selectorPassword.current.focus()
            setIsCheckNotPassword(false)
        }
        // if (!nationality) {
        //     selectorNationality.current.focus()
        //     setIsCheckNationality(false)
        // }
        if (!email) {
            selectorEmail.current.focus()
            setIsCheckEmail(false)
        }
        if (email && !isCheckNotEmail) {
            selectorEmail.current.focus()
            setIsCheckNotEmail(false)
        }
        // if (!phone) {
        //     selectorPhone.current.focus()
        //     setIsCheckPhone(false)
        // }
        // if (!sex) setIsCheckSex(false)
        if (!lastName) {
            selectorLastName.current.focus()
            setIsCheckLastName(false)
        }
        if (!firstName) {
            selectorFirstName.current.focus()
            setIsCheckFirstName(false)
        }
    }
    function handleMessengerSuccess() {
        return (
            <View style= { styles.modalLayout }>
                <View style= { styles.modal} >
                    <Text style= { styles.messenger} > 
                        Đã đăng kí thành công 
                    </Text>
                </View>
            </View>
        )
    }
    return (
        <View>
            <View style={styles.itemRegister} >
                <Text>First Name</Text>
                <TextInput
                    ref={selectorFirstName}
                    style={styles.textInputType} 
                    onChange={(e) => {
                        setFirstName(e.nativeEvent.text)
                        setIsCheckFirstName(true)
                    }}
                    onFocus={() => {
                        setIsCheckFirstName(true)
                    }}
                    // onBlur={(e) => {
                    //     const ischeck = rulesObligatory(e.nativeEvent.text)
                    //     !ischeck ? setIsCheckFirstName(false) : setIsCheckFirstName(true)
                    // }} 
                    value={firstName} />
                <Text style= { isCheckFirstName ? styles.noHaveError : styles.haveError }> Bắt buộc phải nhập </Text>
            </View>
            <View style={styles.itemRegister}>
                <Text>Last Name</Text>
                <TextInput
                    ref={selectorLastName}
                    style={styles.textInputType} 
                    onChange={(e) => {
                        setLastName(e.nativeEvent.text)
                        setIsCheckLastName(true)
                    }}
                    onFocus={() => {
                        setIsCheckLastName(true)
                    }}
                    // onBlur={(e) => {
                    //     const ischeck = rulesObligatory(e.nativeEvent.text)
                    //     !ischeck ? setIsCheckLastName(false) : setIsCheckLastName(true)
                    // }} 
                    value={lastName} />
                <Text style= { isCheckLastName ? styles.noHaveError : styles.haveError }> Bắt buộc phải nhập </Text>
            </View>
            {/* <View style={styles.itemRegister}>
                <Text>Sex</Text>
                <RadioButton 
                    data={sexs} 
                    onSelect={(value) => {
                        setIsCheckSex(true)
                        setSex(value)
                    }} />
                <Text style= { isCheckSex ? styles.noHaveError : styles.haveError }> Bắt buộc phải nhập </Text>
            </View> */}
            {/* <View style={styles.itemRegister}>
                <Text>Phone</Text>
                <TextInput
                    ref={selectorPhone}
                    style={styles.textInputType} 
                    onChange={(e) => {
                        setPhone(e.nativeEvent.text)
                        setIsCheckPhone(true)
                    }}
                    onFocus={() => {
                        setIsCheckPhone(true)
                    }}
                    // onBlur={(e) => {
                    //     const ischeck = rulesObligatory(e.nativeEvent.text)
                    //     !ischeck ? setIsCheckPhone(false) : setIsCheckPhone(true)
                    // }} 
                    value={phone} />
                <Text style= { isCheckPhone ? styles.noHaveError : styles.haveError }> Bắt buộc phải nhập </Text>
            </View> */}
            <View style={styles.itemRegister}>
                <Text>Email</Text>
                <TextInput
                    ref={selectorEmail}
                    style={styles.textInputType} 
                    onChange={(e) => {
                        setEmail(e.nativeEvent.text)
                        setIsCheckEmail(true)
                        setIsCheckNotEmail(true)
                    }}
                    onFocus={() => {
                        setIsCheckEmail(true)
                        setIsCheckNotEmail(true)
                    }}
                    onBlur={(e) => {
                        const ischeckObligatory = rulesObligatory(e.nativeEvent.text)
                        if (!ischeckObligatory) console.log(1)//setIsCheckEmail(false)
                        else {
                            setIsCheckEmail(true)
                            const isCheckEmail = rulesEmail(e.nativeEvent.text)
                            !isCheckEmail ? setIsCheckNotEmail(false) : setIsCheckNotEmail(true)
                        }
                    }} 
                    value={email} />
                <Text style= { isCheckEmail ? styles.noHaveError : styles.haveError }> Bắt buộc phải nhập </Text>
                <Text style= { isCheckNotEmail ? styles.noHaveError : styles.haveError }> Đây không phải là Email </Text>
            </View>
            {/* <View style={styles.itemRegister}>
                <Text>Nationality</Text>
                <TextInput
                    ref={selectorNationality}
                    style={styles.textInputType} 
                    onChange={(e) => {
                        setNationality(e.nativeEvent.text)
                        setIsCheckNationality(true)
                    }}
                    onFocus={() => {
                        setIsCheckNationality(true)
                    }}
                    // onBlur={(e) => {
                    //     const ischeck = rulesObligatory(e.nativeEvent.text)
                    //     !ischeck ? setIsCheckNationality(false) : setIsCheckNationality(true)
                    // }} 
                    value={nationality} />
                <Text style= { isCheckNationality ? styles.noHaveError : styles.haveError }> Bắt buộc phải nhập </Text>
            </View> */}
            <View style={styles.itemRegister}>
                <Text>Password</Text>
                <TextInput
                    secureTextEntry={true}
                    ref={selectorPassword}
                    style={styles.textInputType} 
                    onChange={(e) => {
                        setPassword(e.nativeEvent.text)
                        setIsCheckPassword(true)
                        setIsCheckNotPassword(true)
                    }}
                    onFocus={() => {
                        setIsCheckPassword(true)
                        setIsCheckNotPassword(true)
                    }}
                    onBlur={(e) => {
                        const ischeckObligatory = rulesObligatory(e.nativeEvent.text)
                        if (!ischeckObligatory) setIsCheckPassword(false)
                        else { 
                            setIsCheckPassword(true)
                            const isCheckPassword = rulesMin(e.nativeEvent.text)
                            !isCheckPassword ? setIsCheckNotPassword(false) : setIsCheckNotPassword(true)
                        }
                    }} 
                    value={password} />
                <Text style= { isCheckPassword ? styles.noHaveError : styles.haveError }> Bắt buộc phải nhập </Text>
                <Text style= { isCheckNotPassword ? styles.noHaveError : styles.haveError }> Mật khẩu phải ít nhất 6 kí tự </Text>
            </View>
            <View style={styles.itemRegister}>
                <Text>Confirm Password</Text>
                <TextInput
                    secureTextEntry={true}
                    ref={selectorConfirmPassword}
                    style={styles.textInputType} 
                    onChange={(e) => {
                        setConfirmPassword(e.nativeEvent.text)
                        setIsCheckConfirmPassword(true)
                        setIsCheckNotConfirmPassword(true)
                    }}
                    onFocus={() => {
                        setIsCheckConfirmPassword(true)
                        setIsCheckNotConfirmPassword(true)
                    }}
                    onBlur={(e) => {
                        const ischeckObligatory = rulesObligatory(e.nativeEvent.text)
                        if (!ischeckObligatory) setIsCheckConfirmPassword(false)
                        else { 
                            setIsCheckConfirmPassword(true)
                            const isCheckConfirmPassword = rulesConfirmPassword(e.nativeEvent.text, password)
                            !isCheckConfirmPassword ? setIsCheckNotConfirmPassword(false) : setIsCheckNotConfirmPassword(true)
                        }
                    }} 
                    value={confirmPassword} />
                <Text style= { isCheckConfirmPassword ? styles.noHaveError : styles.haveError }> Bắt buộc phải nhập </Text>
                <Text style= { isCheckNotConfirmPassword ? styles.noHaveError : styles.haveError }> Không giống mật khẩu </Text>
            </View>
            <Pressable style = {styles.buttonType} onPress= {handleSubmit}>
                <Text> Create account </Text>
            </Pressable>
            {
                infoUser ? handleMessengerSuccess() : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    itemRegister: {
        padding: 20,
        position: 'relative',
    },
    textInputType: {
        borderWidth: 1
    },
    haveError: {
        display: 'flex',
        color: 'red',
        position: "absolute",
        bottom: 0,
        left: 20,
    },
    noHaveError: {
        display: 'none',
    },
    buttonType: {
        marginTop: 20,
        backgroundColor: "#fff",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalLayout: {
        backgroundColor: "rgba(51, 51, 51, 0.6)",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    modal: {
        position: "absolute",
        top : "50%",
        left : "50%",
        width: 200,
        height: 200,
        backgroundColor: "#fff",
        transform: "translate(-50%, -50%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }

})

export default Register