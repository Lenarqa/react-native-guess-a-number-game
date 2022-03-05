import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Colors from "../constants/color";

const NumberContainer = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.primary,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    color: Colors.eccent,
    fontSize: 22,
  },
});

export default NumberContainer;
