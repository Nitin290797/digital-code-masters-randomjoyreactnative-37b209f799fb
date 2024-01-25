import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Button } from "../Components/Button";
import MysteryJoy from "./MysteryJoy";
import Statements from "./Statements";
import Puzzle from "./Puzzle";
import { getRandomAsset } from "../action/asset";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

import Key from "../assets/Resources/Images/key.svg";
import Type from "../assets/Resources/Images/type.svg";
import MJ from "../assets/Resources/Images/mj.svg";
import State from "../assets/Resources/Images/state.svg";
import Commit from "../assets/Resources/Images/commit.svg";
import Puzz from "../assets/Resources/Images/puzzle.svg";
import GiftFromFriend from "../Components/GiftFromFriend";
import Menu from "../Components/Menu";

export default function ({ navigation }) {
  const [state, setState] = useState(0);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.asset);
  const [help, setHelp] = useState(false);
  const [type, setType] = useState(5);

  const getAsset = async () => {
    const token = await AsyncStorage.getItem("token");
    dispatch(getRandomAsset(token, setState, type));
  };

  const getAssetWithType = async (t) => {
    const token = await AsyncStorage.getItem("token");
    dispatch(getRandomAsset(token, setState, t));
  };

  const handleNextStep = () => {
    switch (data.openedWith) {
      case 0:
        setState(2);
        break;
      case 1:
        setState(1);
        break;
      case 2:
        setState(3);
        break;
    }
  };

  if (state === 1) {
    return <MysteryJoy setState={setState} />;
  } else if (state === 2) {
    return <Puzzle setState={setState} />;
  } else if (state === 3) {
    return <Statements setState={setState} />;
  } else if (state === 4) {
    return <GiftFromFriend handleNextStep={handleNextStep} />;
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginVertical: 10 }}>
            <Image
              source={require("../assets/Resources/Images/start.png")}
              style={{
                height: Dimensions.get("window").height / 1.6,
                width: wp("90%"),
                borderRadius: 12,
              }}
            />
            <Text style={styles.text}>
              Begin your fun journey with a random surprise
            </Text>
          </View>
          <View style={{ marginTop: '20%', alignItems: 'center', alignContent:'center', justifyContent:'center' }}>
            <Menu navigation={navigation} />
            <View style={{margin:10}}>
              <Button onPress={() => getAsset()} colorScheme={2}>
                Start Here
              </Button>
            </View>
          </View>

          <Modal
            visible={help}
            animationType="none"
            onRequestClose={() => setHelp(false)}
            transparent={true}
          >
            <TouchableOpacity
              onPress={() => setHelp(false)}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0,0,0,0.7)",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setHelp(false);
                  getAssetWithType(1);
                }}
                style={{
                  borderRadius: 50,
                  height: 70,
                  width: 70,
                  backgroundColor: "#FF7F11",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  left: "30%",
                  top: "66%",
                }}
              >
                <State />
                <Text style={{ color: "white", fontSize: 10 }}>Commit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setHelp(false);
                  getAssetWithType(0);
                }}
                style={{
                  borderRadius: 50,
                  height: 70,
                  width: 70,
                  backgroundColor: "#FF7F11",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  left: "55%",
                  top: "66%",
                }}
              >
                <Puzz />
                <Text style={{ color: "white", fontSize: 10 }}>Puzzle</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setHelp(false);
                  getAssetWithType(2);
                }}
                style={{
                  borderRadius: 50,
                  height: 70,
                  width: 70,
                  backgroundColor: "#FF7F11",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  left: "18%",
                  top: "75.5%",
                }}
              >
                <Commit />
                <Text style={{ color: "white", fontSize: 10 }}>Statement</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setHelp(false)}
                style={{ position: "absolute", left: "43%", top: "76.5%" }}
              >
                <Type />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setHelp(false);
                  getAssetWithType(4);
                }}
                style={{
                  borderRadius: 50,
                  height: 70,
                  width: 70,
                  backgroundColor: "#FF7F11",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  left: "65%",
                  top: "75.5%",
                }}
              >
                <MJ />
                <Text style={{ color: "white", fontSize: 10 }}>
                  Mystery Joy
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </Modal>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    height: hp("91%"),
  },
  container_stack: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    height: hp("91%"),
  },
  text: {
    color: "#000",
    textAlign: "center",
    fontSize: 22,
    fontWeight: "600",
    width: wp("90%"),
    marginTop: 10,
  },
});
