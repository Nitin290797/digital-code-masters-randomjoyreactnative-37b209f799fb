import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

const GiftFromFriend = (props) => {
  const { handleNextStep } = props;
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container_stack}>
          <Image
            source={require("../assets/Resources/Images/gift.png")}
            style={{
              height: Dimensions.get("window").height / 1.7,
              width: widthPercentageToDP("90%"),
              borderRadius: 12,
            }}
          />
          <Text
            style={{
              textAlign: "center",
              marginVertical: 20,
              fontSize: 28,
              fontWeight: "600",
            }}
          >
            A gift from a friend
          </Text>

          <Pressable onPress={handleNextStep}>
            <Image source={require("../assets/Resources/Images/Key.png")} />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GiftFromFriend;

const styles = StyleSheet.create({
  container_stack: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    color: "#000",
    textAlign: "center",
    fontSize: 22,
    fontWeight: "600",

    marginTop: 10,
  },
});
