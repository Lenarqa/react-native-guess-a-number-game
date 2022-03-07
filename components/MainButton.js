import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, TouchableNativeFeedback, Platform } from "react-native";
import Colors from "../constants/color";

const MainButton = (props) => {
  let ButtonComponent = TouchableOpacity;

  if(Platform.OS === 'android' && Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.btnWrapper}>
      <ButtonComponent onPress={props.onPress}>
        <View style={{...props.style, ...styles.button}}>
          <Text style={styles.buttonText}>{props.children}</Text>
        </View>
      </ButtonComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },

  buttonText: {
    color: 'white',
    fontFamily: 'open-sans',
    fontSize: 19,
  },

  btnWrapper: {
    overflow: 'hidden',
    borderRadius: 25,
  }
});

export default MainButton;
