import React from "react";
import { Text, View } from "react-native"
import { Link } from "react-router-native";
const Navigation = () => {
    return (
        <View>
            <Link to='/search'>
                <Text>Search</Text>
            </Link>
            <Link to='/login'>
                <Text>Login</Text>
            </Link>
            <Link to='/register'>
                <Text>Register</Text>
            </Link>
        </View>
    )
}
export default Navigation