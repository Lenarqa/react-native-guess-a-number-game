import { View, Text, StyleSheet, Platform } from "react-native";
import Colors from "../constants/color";
import TitleText from "./TitleText";

const Header = (props) => {
  return (
    <View
      style={{
        ...styles.header,
        ...Platform.select({
          ios: styles.headerAndroid,
          android: styles.headerIOS,
        }),
      }}
    >
      <TitleText style={styles.headerTitle}>{props.title}</TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    alignItems: "center",
    justifyContent: "center",
  },

  headerAndroid: {
    backgroundColor: "white",
  },

  headerIOS: {
    backgroundColor: Colors.primary,
  },

  headerTitle: {
    color: Platform.OS === "ios" ? "black" : "white",
    fontSize: 19,
    fontFamily: "open-sans-bold",
  },
});

export default Header;
