import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Dimensions
} from "react-native";
import { useNavigate } from "react-router-native";
import { useSwipe } from "../../../Hooks/useSwipe/useSwipe";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

let deviceWidth = Dimensions.get("window").width;

const Support = () => {
    const navigate = useNavigate();

  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 2);
  function onSwipeLeft() {}
  function onSwipeRight() {
    navigate(-1);
  }

  return (
    <SafeAreaView 
    onTouchStart={onTouchStart}
    onTouchEnd={onTouchEnd}
    style={styles.container}
    >
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate(-1)}>
          <Ionicons name="md-chevron-back" size={20} color="#7369FF" />
        </TouchableOpacity>
        <Text style={styles.textHeader}>Support</Text>
        <View style={{ width: 60 }}></View>
      </View>

      <Text style={styles.mainText}>Our Customer Support is available 24/7</Text>

      <View style={styles.containerButtonSupport}>
        <View style={styles.buttonSupport}>
            <Ionicons 
            name="chatbox-ellipses-outline" 
            size={30} 
            color="#4E5673" 
            style={{marginRight: 15}}
            />
            <View>
                <Text style={styles.largeText}>Customer Support chat</Text>
                <Text style={styles.smallText}>We usually reply within 1 minute.</Text>
            </View>
        </View>

        <View style={styles.buttonSupport}>
            <AntDesign 
            name="phone" 
            size={30} 
            color="#4E5673"
            style={{marginRight: 15}}
            />
            <View>
                <Text style={styles.largeText}>Customer Support chat</Text>
                <Text style={styles.smallText}>We usually reply within 1 minute.</Text>
            </View>
        </View>

        <View style={styles.buttonSupport}>
            <AntDesign 
            name="mail" 
            size={30} 
            color="#4E5673" 
            style={{marginRight: 15}}
            />
            <View>
                <Text style={styles.largeText}>Customer Support chat</Text>
                <Text style={styles.smallText}>We usually reply within 1 minute.</Text>
            </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Support;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 10,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: deviceWidth,
        marginBottom: 30,
      },
    textHeader: {
    color: "#7369FF",
    fontSize: 24,
    fontWeight: "600",
    },
    mainText: {
        color: "#4E5673",
        fontSize: 20,
        fontWeight: "500",
        marginBottom: 30,
    },
    buttonSupport: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#E3E2EE',
        marginBottom: 30,
        paddingVertical: 10,
    },
    largeText: {
        color: "#524E83",
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 3,
    },
    smallText: {
        color: "#777E90",
        fontSize: 14,
        fontWeight: "400",
        marginBottom: 3,
    }
});