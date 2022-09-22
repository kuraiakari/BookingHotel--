import React, { useState } from 'react';
import { Link } from 'react-router-native';
import { Image, Text, StyleSheet, View } from 'react-native';
const Start = () => {
    const [loading, setLoading] = useState(false)
    setTimeout(() => {
        setLoading(true)
    }, 5000)
    return (
        <View style={styles.container}>
            {
                (!loading) && <View style={styles.logo}>
                    <Image source={require('./logo.png')} />
                    <Text style={styles.textLogo}>Dream</Text>
                </View>
            }
            {
                (loading) && <View>
                    <Link to='/login'><Text>Get started</Text></Link>
                </View>
            }
        </View>
    )
}
export default Start
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        flexDirection: 'row',
    },
    imageLogo: {
        width: 32,
        height: 32,
        background: 'url(/images/logo.png)',
    },
    textLogo: {
        marginLeft: 8,
        fontFamily: 'Poppins',
        fontSize: 24,
        fontWeight: '800',
    }
})