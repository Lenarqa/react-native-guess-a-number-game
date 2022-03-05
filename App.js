import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Header from "./components/Header";
import GameScreen from "./screens/GameScreen";
import StartGameScreen from "./screens/StartGameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRound, setGuessRounds] = useState(0);

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  const configuredNewGame = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  const gameOverHandler = (numOfRounds) => {
    setGuessRounds(numOfRounds);
  };

  let content = <StartGameScreen startGame={startGameHandler} />;

  if (userNumber && guessRound <= 0) {
    content = <GameScreen userChoice={userNumber} gameOver={gameOverHandler} />;
  }

  if (guessRound > 0) {
    content = (
      <GameOverScreen
        userNumber={userNumber}
        guessRounds={guessRound}
        onRestart={configuredNewGame}
      />
    );
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
