import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function RadioButton({ data, onSelect }) {
  const [userOption, setUserOption] = useState(null);
  const selectHandler = (value) => {
    onSelect(value);
    setUserOption(value);
  };
  return (
    <View style={styles.wrapperSex}>
      {data.map((item, index) => {
        return (
          <Pressable key={index} onPress={() => selectHandler(item.value)} style={styles.wrapperItemSex}>
            <View style={[styles.box, item.value === userOption ? styles.selected : styles.unselected]}></View>
            <Text style={styles.option}> {item.value}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
      width: 20,
      height: 20,
      borderRadius: '50%',
      borderWidth: 1
  },
  selected: {
      backgroundColor: '#000000',
  },
  unselected: {
      backgroundColor: '#fff',
  },
  // wrapperSex: {
  //   flexDirection: ',
  // },
  wrapperItemSex: {
    flexDirection: 'row',
  },
  
})