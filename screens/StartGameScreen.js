import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import Card from "../components/Card";
import Colors from "../constants/color";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import BodyText from "../components/BodyText";
import MainButton from "../components/MainButton";

const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(Dimensions.get("window").width / 4);

  useEffect(()=>{
    const updateLayot = () => {
      setButtonWidth(Dimensions.get('window').width / 4);
    }
  
    const subscription = Dimensions.addEventListener('change', updateLayot);
    
    return()=>{
      subscription?.remove();
    }
  })

  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid number",
        "Number has to be a number between 1 and 99.",
        [{ text: "Okey", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }

    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue("");
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summeryContainer}>
        <BodyText>Selected number</BodyText>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={props.startGame.bind(this, selectedNumber)}>
          START GAME
        </MainButton>
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" >
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.screen}>
            <Text style={styles.title}>Start a new Game</Text>
            <Card style={styles.inputContainer}>
              <BodyText>Select a number</BodyText>
              <Input
                style={styles.input}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={numberInputHandler}
                value={enteredValue}
                disableFullscreenUI={true} 
              />
              <View style={styles.buttonContainer}>
                <View style={{width: buttonWidth}}>
                  <Button
                    color={Colors.eccent}
                    title="Reset"
                    onPress={resetInputHandler}
                  />
                </View>
                <View style={{width: buttonWidth}}>
                  <Button
                    color={Colors.primary}
                    title="Confirm"
                    onPress={confirmInputHandler}
                  />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "open-sans-bold",
  },

  inputContainer: {
    width: "80%",
    maxWidth: "95%",
    minWidth: 300,
    alignItems: "center",
  },

  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },

  // button: {
  //   width: buttonWidth  ,
  // },

  input: {
    width: 50,
    textAlign: "center",
  },

  summeryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default StartGameScreen;
