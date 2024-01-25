// CommitmentFlow.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  ScrollView,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../Components/Button";
import { getCommitment } from "../action/commitment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { assignCommitment } from "../action/commitment";
import { homepageset } from "../action/commitment";
import Help from "../assets/Resources/Images/help.svg";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Hr } from "../Components/Hr";
import Back from "../assets/Resources/Images/back.svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PushNotification from 'react-native-push-notification';
import BackgroundTimer from 'react-native-background-timer';

// import CountDown from "react-native-countdown-component";
// import Countdown from "../Components/Countdown";

const CommitmentFlow = ({ setState, navigation }) => {
  const [step, setStep] = useState(0);

  const [commitment_text, commitment_text_value] = useState("");
  const [counter, setCounter] = useState(0);
  const [full, setFull] = useState(false);
  const dispatch = useDispatch();
  const { commitment } = useSelector((state) => state.commitment);
  const { token } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.asset);
  const [help, setHelp] = useState(false);
  const [title, setTitle] = useState("I believe in you, I know you will do it");


  const handleNextStep = () => {
    if (step === 2) {
      // Navigate to the home page after the final form is submitted
    } else {
      setStep(step + 1);
    }
  };
  const assignHandle = async (
    text,
    description,
    asset_displayed,
    is_custom
  ) => {
    if (is_custom) {
      if (text != title) {
        // Display an error message or handle the validation error as needed
        alert("Please enter a suggested commitment.");
        return; // Stop further execution if validation fails
      }
    }

    const body = {
      is_custom,
      text,
      discription: description,
      asset_for_displayed: data.asset_url ? data.asset_url : " ",
      asset_displayed: asset_displayed,
    };

    const token = await AsyncStorage.getItem("token");

    

    const targetTime = Date.now() + 24 * 60 * 60 * 1000;

    startCounter(targetTime);

    setStep(4);
    
    assignCommitment(token, body, setState);
  };

  const gethomescreen = async () => {

   
      homepageset(setState);
   
  };

  const startCounter = (targetTime) => {
    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const remainingTime = targetTime - currentTime;

      // If remaining time is positive, update the counter
      if (remainingTime > 0) {
        const hours = Math.floor(remainingTime / (60 * 60 * 1000));
        const minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
        const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);

        setCounter({ hours, minutes, seconds });
      } else {
        // If the remaining time is non-positive, clear the interval
        clearInterval(intervalId);
      }
    }, 1000);
  };





  const suggestCommitment = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      dispatch(getCommitment(token, setStep));
    } catch (error) {
      console.error("Error checking token:", error);
    }
  };
  const toggleBox = () => {
    LayoutAnimation.configureNext({
      duration: 500,
      create: { type: "linear" },
      update: { type: "easeInEaseOut" },
      delete: { type: "linear" },
    });
    setFull(!full);
  };
  const renderStepContent = (navigation) => {
    switch (step) {
      case 0:
        return (
          <>
            <SafeAreaView>
              <View
                style={{
                  height: hp("90%"),
                  width: wp("100%"),
                  alignItems: "center",
                }}
              >
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "space-between",
                      flex: 1,
                      display: "flex",
                    }}
                  >
                    <View>
                      <Text style={[styles.text, { marginVertical: "5%" }]}>
                        You've been assigned a commitment
                      </Text>
                      <Image
                        source={require("../assets/Resources/Images/believe.png")}
                        style={{
                          height: Dimensions.get("window").height * 0.5,
                          width: wp("92%"),
                          borderRadius: 12,
                        }}
                      />
                    </View>
                    <View
                      style={{
                        alignItems: "center",
                        marginTop: 50,
                      }}
                    >
                      <Text style={[styles.text, { fontSize: 20 }]}>
                        Write a commitment and follow it
                      </Text>
                      <Button colorScheme={2} onPress={suggestCommitment}>
                        Write it Now
                      </Button>
                    </View>
                  </View>
                </ScrollView>
              </View>
            </SafeAreaView>
            <Modal
              visible={help}
              animationType="slide"
              onRequestClose={() => setHelp(false)}
              transparent={true}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(0,0,0,0.5)",
                }}
              >
                <View style={styles.modal}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "#FFF",
                        fontSize: 20,
                        fontFamily: "Recursive-Bold",
                      }}
                    >
                      What is Commitment?
                    </Text>
                    <TouchableOpacity>
                      <MaterialCommunityIcons
                        name={"close"}
                        size={23}
                        color={"white"}
                        onPress={() => setHelp(false)}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{ marginBottom: 15 }}>
                    <Hr color="#FFF" />
                  </View>
                  <Text
                    style={{
                      flexWrap: "wrap",
                      color: "#FFF",
                      fontSize: 15,
                      fontFamily: "Recursive-Bold",
                    }}
                  >
                    Commitment refers to the state or quality of being
                    dedicated, loyal, or devoted to a cause, activity, goal, or
                    relationship. It involves a sense of responsibility and a
                    willingness to invest time, effort, and resources to fulfill
                    obligations or achieve desired outcomes.{" "}
                  </Text>
                  <View style={{ marginVertical: 30 }}>
                    <Hr color="#FFF" />
                  </View>
                </View>
              </View>
            </Modal>
          </>
        );
      case 1:
        return (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                display: "flex",
                flex: 1,
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  display: "flex",
                  paddingVertical: 10,
                  columnGap: 20,
                  borderBottomColor: "#00D3FF",
                }}
              >
                <TouchableOpacity
                  style={{ width: wp("10%") }}
                  onPress={() => setStep(0)}
                >
                  <Back />
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 600,
                  textAlign: "center",
                  marginBottom: 20,
                }}
              >
                Call your MOM 3 times a day
              </Text>
              <Image
                source={require("../assets/Resources/Images/mom.png")}
                style={{
                  width: wp("90%"),
                  height: Dimensions.get("window").height * 0.6,
                  borderRadius: 12,
                }}
              />
              <View style={styles.footer}>
                <Button styles={{}} colorScheme={1} onPress={handleNextStep}>
                  My Own
                </Button>
                <Button
                  styles={{}}
                  colorScheme={2}
                  onPress={() =>
                    assignHandle(
                      commitment[0]?.suggestion_text
                        ? commitment[0]?.suggestion_text
                        : "Help your mom",
                      "false",
                      "false",
                      false
                    )
                  }
                >
                  Ok I'm ready
                </Button>
              </View>
            </View>
          </ScrollView>
        );
      case 2:
        return (
          <ScrollView>
            <SafeAreaView
              style={{
                flex: 1,
                width: wp("100%"),
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <TouchableOpacity
                  style={{ zIndex: 100 }}
                  onPress={() => toggleBox()}
                >
                  <Image
                    source={require("../assets/Resources/Images/image108.png")}
                    style={{ borderRadius: 12 }}
                  />
                </TouchableOpacity>
                <Text style={[styles.text, { marginTop: 5 }]}>{title}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="write your commitment"
                  value={commitment_text}
                  onChangeText={(text) => commitment_text_value(text)}
                  multiline={true}
                  height={150}
                />
              </View>
              <View
                style={[styles.footer, { marginTop: 10, position: "relative" }]}
              >
                <Button
                  Styles={styles.Button}
                  colorScheme={2}
                  onPress={() =>
                    assignHandle(
                      commitment_text,
                      "this is custom commitment",
                      "false",
                      true
                    )
                  }
                >
                  Save
                </Button>
                <Button
                  Styles={styles.Button}
                  colorScheme={1}
                  onPress={() => setStep(3)}
                >
                  Suggestions
                </Button>
              </View>
            </SafeAreaView>
          </ScrollView>
        );
      case 3:
        return (
          <SafeAreaView>
            <View
              style={[
                styles.stepContainer,
                {
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  padding: 0,
                },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  position: "absolute",
                  top: -40,
                  left: 10,
                }}
              >
                <TouchableOpacity onPress={() => setStep(2)}>
                  <Back />
                </TouchableOpacity>
                <Text
                  style={[
                    styles.text,
                    { fontSize: 24, marginBottom: 15, padding: 10 },
                  ]}
                >
                  Suggestions
                </Text>
              </View>
              <View style={{ marginTop: 30, width: wp("100%") }}>
                {commitment.map(
                  (d, i) =>
                    i > 0 && (
                      <TouchableOpacity
                        style={styles.suggestionWrapper}
                        onPress={() => {
                          setTitle(d.suggestion_text);
                          setStep(2);
                        }}
                      >
                        <View
                          style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            backgroundColor: "#00D3FF",
                            borderBottomLeftRadius: 4,
                            padding: 8,
                          }}
                        ></View>
                        <Text
                          style={[
                            styles.text,
                            { fontSize: 15, textAlign: "left" },
                          ]}
                        >
                          {d.suggestion_text}
                        </Text>
                      </TouchableOpacity>
                    )
                )}
              </View>
            </View>
          </SafeAreaView>
        );
      case 4:
        return (
          <SafeAreaView>
            <View
              style={[
                styles.stepContainer,
                {
                  justifyContent: "flex-start",
                  alignItems: "center",
                  padding: 0,
                },
              ]}
            >
              <Image
                source={require("../assets/Resources/Images/image6756754108.png")}
                style={{
                  width: wp("90%"),
                  height: Dimensions.get("window").height * 0.5,
                  borderRadius: 12,
                }}
              />
              <Text
                style={[
                  {
                    fontSize: 24,
                    marginBottom: 0,
                    padding: 10,
                    textAlign: "center",
                    fontWeight: "bold",
                  },
                ]}
              >
                We're carefully tracking your results.
              </Text>
              <Text
                style={[
                  {
                    fontSize: 24,
                    color: "#ff0000",
                    borderBlockColor: "#ff0000",
                    marginBottom: 0,
                    padding: 10,
                    textAlign: "center",
                    fontWeight: "bold",
                  },
                ]}
              >{`${counter.hours}h ${counter.minutes}m ${counter.seconds}s`}</Text>
              <Button
                Styles={styles.Button}
                colorScheme={1}
                onPress={gethomescreen}
              >
                Continue
              </Button>
            </View>
          </SafeAreaView>
        );
      default:
        return null;
    }
  };
  return <View style={styles.container}>{renderStepContent()}</View>;
};
const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#FF7C2A",
    width: "90%",
    borderRadius: 8,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 30,
  },
  stepContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    // paddingTop: 30,
    flex: 1,
    flexGrow: 1,
  },
  image: {
    // marginBottom: 10,
    // width: wp('90%'),
    // height: hp('40%'),
    // borderRadius: 16
    // aspectRatio: 0.1, // Maintain aspect ratio (1:1 for square image)
  },
  text: {
    color: "#000",
    textAlign: "center",
    fontFamily: "Recursive-Bold",
    fontSize: 20,
    fontWeight: 600,
    flexWrap: "wrap",
  },
  categoryText: {
    color: "#000",
    textAlign: "center",
    fontFamily: "Recursive-Bold",
    fontSize: 10,
    fontWeight: 600,
  },
  input: {
    height: hp("8%"),
    width: wp("90%"),
    marginTop: 10,
    borderRadius: 8,
    borderColor: "#FFD7B5",
    borderStyle: "solid",
    borderWidth: 2,
    padding: 20,
    alignItems: "flex-start",
    fontFamily: "Recursive-Bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: wp("90%"),
    marginTop: 20,
  },
  Button: {
    marginTop: 0,
  },
  suggestionWrapper: {
    backgroundColor: "#DEF6FB",
    padding: 32,
    width: "100%",
    marginBottom: 10,
    position: "relative",
  },
  fullImage: {
    width: 400,
    height: 1000,
    position: "absolute",
    top: -200,
    left: -200,
    zIndex: 1,
  },
});
export default CommitmentFlow;
