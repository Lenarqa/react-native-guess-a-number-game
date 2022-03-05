import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Header from "./components/Header";
import GameScreen from "./screens/GameScreen";
import StartGameScreen from "./screens/StartGameScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState();

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  }

  let content = <StartGameScreen startGame={startGameHandler}/>;

  if(userNumber) {
    content = <GameScreen userChoice={userNumber}/>
  }

  return (
    <View style={styles.container}>
      <Header title="Guess a number" />
      {content} 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
