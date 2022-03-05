import React, { useState, useRef } from "react";
import { View, StyleSheet, Text, Button, Alert } from "react-native";
import Card from "../components/Card";
import NumberContainer from "../components/NumberContainer";

const generateRandomBeetwin = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  const rndNum = Math.floor(Math.random() * (max - min) + min);

  if (rndNum === exclude) {
    return generateRandomBeetwin(min, max, exclude);
  } else {
    return rndNum;
  }
};

const GameScreen = (props) => {
  const [curGuess, setCurGuess] = useState(
    generateRandomBeetwin(1, 100, props.userChoice)
  );

  const curLow = useRef(1);
  const curHight = useRef(100);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && curGuess < props.userChoice) ||
      (direction === "greater" && curGuess > props.userChoice)
    ) {
      Alert.alert("Don`t lie!", "You know that this is wrong...", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      curHight.current = curGuess;
    } else {
      curLow.current = curGuess;
    }

    const nextNum = generateRandomBeetwin(
      curLow.current,
      curHight.current,
      curGuess
    );
    setCurGuess(nextNum);
  };

  return (
    <View style={styles.container}>
      <Text>Opponent`s, Guess</Text>
      <NumberContainer>{curGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="LOWER" onPress={nextGuessHandler.bind(this, "lower")} />
        <Button
          title="GREATER"
          onPress={nextGuessHandler.bind(this, "greater")}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
});

export default GameScreen;
