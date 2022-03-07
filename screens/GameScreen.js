import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ScreenOrientation from 'expo-screen-orientation';

import Card from "../components/Card";
import MainButton from "../components/MainButton";
import NumberContainer from "../components/NumberContainer";
import defaultStyles from "../constants/default-styles";
import BodyText from "../components/BodyText";


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

const renderListItems = (guess, numOfRounds) => (
  <View key={guess} style={styles.guessItem}>
    <BodyText>#{numOfRounds}</BodyText>
    <BodyText>{guess}</BodyText>
  </View>
);

const GameScreen = (props) => {
  // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  const initGuess = generateRandomBeetwin(1, 100, props.userChoice);

  const [curGuess, setCurGuess] = useState(initGuess);
  const [pastGuesses, setPastGuesses] = useState([initGuess]);
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get("window").width);
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get("window").height);

  const curLow = useRef(1);
  const curHight = useRef(100);

  const { gameOver, userChoice } = props;

  useEffect(()=>{
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get('window').width);
      setAvailableDeviceHeight(Dimensions.get('window').height);
    }
    const  subscription = Dimensions.addEventListener('change', updateLayout);

    return () => {
      subscription?.remove();
    }
  },)

  useEffect(() => {
    if (curGuess === userChoice) {
      gameOver(pastGuesses.length);
    }
  }, [curGuess, gameOver, userChoice]);

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
      curLow.current = curGuess + 1;
    }

    const nextNum = generateRandomBeetwin(
      curLow.current,
      curHight.current,
      curGuess
    );
    setPastGuesses((prev) => [nextNum, ...prev]);
    setCurGuess(nextNum);
  };

  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.container}>
        <Text style={defaultStyles.title}>Opponent`s, Guess</Text>
        <View style={styles.controls}>
          <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
            <Ionicons name="md-remove" size={24} />
          </MainButton>
          <NumberContainer>{curGuess}</NumberContainer>
          <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
            <Ionicons name="md-add" size={24} />
          </MainButton>
        </View>
        <View style={styles.list}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            {pastGuesses.map((guess, index) =>
              renderListItems(guess, pastGuesses.length - index)
            )}
          </ScrollView>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={defaultStyles.title}>Opponent`s, Guess</Text>
      <NumberContainer>{curGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
          <Ionicons name="md-remove" size={24} />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
          <Ionicons name="md-add" size={24} />
        </MainButton>
      </Card>
      <View style={styles.list}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {pastGuesses.map((guess, index) =>
            renderListItems(guess, pastGuesses.length - index)
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },

  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%',
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Dimensions.get("window").height > 600 ? 20 : 10,
    width: 250,
    maxWidth: "80%",
  },

  list: {
    width: Dimensions.get("window").width > 350 ? "60%" : "100%",
    flex: 1,
  },

  guessItem: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "black",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    justifyContent: "space-around",
    width: "60%",
  },

  scrollView: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

export default GameScreen;
