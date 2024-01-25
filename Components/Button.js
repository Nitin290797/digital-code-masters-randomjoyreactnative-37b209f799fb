import { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, Image, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import { Audio } from "expo-av";
import { useSelector } from "react-redux";

export function Button({
  colorScheme,
  onPress,
  styles,
  isOutline = false,
  ...props
}) {
  const colorSchemes = [
    ["#16B8D9", "#9BEEFF", "#16b8d9"],
    ["#FF7F11", "#FFFAF5", "#FFFFFF"],
  ];
  const [sound, setSound] = useState();
  const { sound: playSound } = useSelector((state) => state.asset);
  const clickFunc = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/Resources/Sound/button.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    if (playSound) {
      await sound.playAsync();
    }

    onPress();
  };

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <TouchableOpacity
      style={[{ overflow: "hidden" }, styles]}
      onPress={clickFunc}
    >
      {!isOutline && (
        <LinearGradient
          colors={colorSchemes[colorScheme - 1]}
          style={Styles.Button}
          locations={[0.81, 0.97, 1]}
        >
          <View style={Styles.animation}>
            <Image source={require("../assets/Resources/Images/button.gif")} />
          </View>
          <Text style={Styles.Text}>{props.children}</Text>
        </LinearGradient>
      )}
      {isOutline && (
        <View
          style={[
            Styles.Button,
            { borderWidth: 1, borderStyle: "solid", borderColor: "#FF7F11" },
          ]}
        >
          <View style={Styles.animation}>
            <Image source={require("../assets/Resources/Images/button.gif")} />
          </View>
          <Text style={[Styles.Text, { color: "#FF7F11" }]}>
            {props.children}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
const Styles = StyleSheet.create({
  Button: {
    padding: 15,
    borderRadius: 30,
    marginVertical: 10,
  },
  Text: {
    fontSize: 20,
    fontFamily: "Recursive-Medium",
    textAlign: "center",
    color: "#FFF",
  },
  animation: {
    position: "absolute",
    left: 0,
    top: "50%",
    width: wp("100%"),
    height: hp("30%"),
  },
});
