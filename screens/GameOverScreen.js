import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";

const GameOverScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>Game Over!</Text>
      <Text>Number of rounds: {props.guessRounds}</Text>
      <Text>Number was: {props.userNumber}</Text>
      <Button title="NEW GAME" onPress={props.onRestart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GameOverScreen;
