import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  ScrollView,
} from "react-native";
import BodyText from "../components/BodyText";
import Card from "../components/Card";
import TitleText from "../components/TitleText";
import Colors from "../constants/color";
import MainButton from "../components/MainButton";

const GameOverScreen = (props) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Card style={styles.cardContainer}>
          <TitleText>Game Over!</TitleText>
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/success.png")}
              // source={{uri: "https://cdn.mos.cms.futurecdn.net/ntFmJUZ8tw3ULD3tkBaAtf.jpg",}} //img from network
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <View style={styles.textContainer}>
            <BodyText style={styles.text}>
              Your phone nedeed
              <Text style={styles.highlight}> {props.guessRounds}</Text> rounds
              to guess the number
              <Text style={styles.highlight}> {props.userNumber}</Text>.
            </BodyText>
          </View>
          <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  cardContainer: {
    width: Dimensions.get("window").width,
    maxWidth: "80%",
    alignItems: "center",
    marginVertical: Dimensions.get("window").width > 350 ? 30 : 5,
    padding: Dimensions.get("window").height > 600 ? 30 : 10,
  },

  imageContainer: {
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    borderRadius: (Dimensions.get("window").width * 0.7) / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "black",
    marginVertical: Dimensions.get("window").width > 350 ? 30 : 5,
    marginHorizontal: 5,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  highlight: {
    color: Colors.primary,
  },

  textContainer: {
    marginVertical: 10,
  },

  text: {
    textAlign: "center",
    fontSize: Dimensions.get("window").height > 600 ? 18 : 14,
  },
});

export default GameOverScreen;
