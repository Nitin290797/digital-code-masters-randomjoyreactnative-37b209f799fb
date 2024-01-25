import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Animated,
  Dimensions,
  ScrollView,
  TextInput,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { getPuzzle } from "../action/puzzle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "../Components/Button";
import { shareAsset } from "../action/asset";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Hr } from "../Components/Hr";
import Help from "../assets/Resources/Images/help.svg";
import { Ionicons } from "@expo/vector-icons";
import Countdown from "../Components/Countdown";
import { SafeAreaView } from "react-native-safe-area-context";
import { debounce } from "lodash";

const PuzzleFlow = ({ setState }) => {
  const [step, setStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.puzzle);
  const [full, setFull] = useState(false);
  const { data: assetData } = useSelector((state) => state.asset);
  const [help, setHelp] = useState(false);
  const [enteredAnswer, setEnteredAnswer] = useState("");
  const [answerValidation, setAnswerValidation] = useState(null);

  console.log("puzzle", data);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        dispatch(getPuzzle(token));
      } catch (error) {
        console.error("Error checking token:", error);
      }
    };

    checkToken();
  }, [dispatch]);

  useEffect(() => {
    if (step === 2) {
      const interval = setTimeout(() => {
        setStep(3);
      }, 5000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [step]);

  const handleNextStep = () => {
    if (step === 1) {
      const isAnswerCorrect =
        data.questionType !== 2 &&
        selectedOption &&
        (data.questionType === 2
          ? enteredAnswer.toLowerCase() === data.answer.toLowerCase()
          : selectedOption.toLowerCase() === data.answer.toLowerCase());
      // Update the step based on the correctness of the answer
      setStep(isAnswerCorrect ? 2 : 4);
    } else {
      setStep(step + 1);
    }
  };

  const validateAnswer = debounce((text) => {
    const isAnswerCorrect = text.toLowerCase() === data.answer.toLowerCase();
    setAnswerValidation(isAnswerCorrect);
  }, 500);

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <>
            <ScrollView>
              <TouchableOpacity
                style={{
                  alignItems: "flex-end",
                  width: wp("95%"),
                  marginTop: 10,
                }}
                onPress={() => setHelp(true)}
              >
                <Help />
              </TouchableOpacity>
              <View style={{ justifyContent: "space-between" }}>
                <View style={{ alignItems: "center", width: wp("100%") }}>
                  <Text style={[styles.text, { marginBottom: "4%" }]}>
                    been assigned a puzzle
                  </Text>
                  <Image
                    source={require("../assets/Resources/Images/believe.png")}
                    style={{
                      width: wp("90%"),
                      marginBottom: 10,
                      height: Dimensions.get("window").height / 2,
                      borderRadius: 12,
                    }}
                  />
                  <Text style={[styles.text, { marginTop: "0%" }]}>
                    Solve a puzzle to win...!
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    width: wp("100%"),
                    marginTop: 30,
                  }}
                >
                  <Button colorScheme={2} onPress={handleNextStep}>
                    Solve it
                  </Button>
                </View>
              </View>
            </ScrollView>

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
                      What is Puzzle?
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
                </View>
              </View>
            </Modal>
          </>
        );
      case 1:
        return (
          <View
            style={{
              height: hp("90%"),
              width: wp("100%"),
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity style={{ zIndex: 100 }}>
                  <Image
                    source={require("../assets/Resources/Images/fly.png")}
                    style={{ borderRadius: 12, marginTop: 15 }}
                  />
                </TouchableOpacity>
                <Text style={[styles.text, { margin: 20 }]}>
                  {data.question}
                </Text>
                {data.questionType === 1 && (
                  <>
                    <TouchableOpacity
                      style={
                        selectedOption === "true"
                          ? styles.selectedOption
                          : styles.option
                      }
                      onPress={() => setSelectedOption("true")}
                    >
                      <Text
                        style={[
                          styles.text,
                          { fontSize: 18, fontWeight: "normal" },
                        ]}
                      >
                        True
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={
                        selectedOption === "false"
                          ? styles.selectedOption
                          : styles.option
                      }
                      onPress={() => setSelectedOption("false")}
                    >
                      <Text
                        style={[
                          styles.text,
                          { fontSize: 18, fontWeight: "normal" },
                        ]}
                      >
                        False
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
                {data.questionType === 2 && (
                  <View
                    style={{
                      borderColor: "#F29222",
                      borderWidth: 1,
                      borderRadius: 10,
                      paddingHorizontal: 50,
                      paddingVertical: 10,
                    }}
                  >
                    <TextInput
                      placeholder="Write Here your answer"
                      value={enteredAnswer}
                      onChangeText={(text) => setEnteredAnswer(text)}
                    />
                  </View>
                )}

                {data.questionType === 0 && (
                  <>
                    <TouchableOpacity
                      style={
                        selectedOption === data.optionA
                          ? styles.selectedOption
                          : styles.option
                      }
                      onPress={() => setSelectedOption(data.optionA)}
                    >
                      <Text
                        style={[
                          styles.text,
                          { fontSize: 18, fontWeight: "normal" },
                        ]}
                      >
                        {data.optionA}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={
                        selectedOption === data.optionB
                          ? styles.selectedOption
                          : styles.option
                      }
                      onPress={() => setSelectedOption(data.optionB)}
                    >
                      <Text
                        style={[
                          styles.text,
                          { fontSize: 18, fontWeight: "normal" },
                        ]}
                      >
                        {data.optionB}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={
                        selectedOption === data.optionC
                          ? styles.selectedOption
                          : styles.option
                      }
                      onPress={() => setSelectedOption(data.optionC)}
                    >
                      <Text
                        style={[
                          styles.text,
                          { fontSize: 18, fontWeight: "normal" },
                        ]}
                      >
                        {data.optionC}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={
                        selectedOption === data.optionD
                          ? styles.selectedOption
                          : styles.option
                      }
                      onPress={() => setSelectedOption(data.optionD)}
                    >
                      <Text
                        style={[
                          styles.text,
                          { fontSize: 18, fontWeight: "normal" },
                        ]}
                      >
                        {data.optionD}
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
              <View style={{ alignItems: "center", width: wp("100%") }}>
                <Button
                  styles={{ marginVertical: 20 }}
                  colorScheme={2}
                  onPress={handleNextStep}
                >
                  Save
                </Button>
              </View>
            </ScrollView>
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContainer}>
            <Image
              source={require("../assets/Resources/Images/happy.png")}
              style={{ height: hp("100%"), width: wp("100%") }}
            />
            <View style={styles.successTextContainer}>
              <Text style={styles.successText}>
                Wohooo!!! I'm ecstatic about your task success.{" "}
              </Text>
              <Countdown />
            </View>
          </View>
        );
      case 3:
        return (
          <View style={styles.stepContainer}>
            <Image
              source={
                assetData.url
                  ? { uri: assetData.url }
                  : require("../assets/Resources/Images/temp.png")
              }
              style={{ height: hp("100%"), width: wp("100%") }}
            />
            <View style={styles.successTextContainer}>
              <Text style={[styles.successText, { textAlign: "center" }]}>
                Joy for you!!
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-evenly",
                }}
              >
                <Button colorScheme={2} onPress={() => setState(0)}>
                  Next Joy
                </Button>
                <Button
                  colorScheme={1}
                  onPress={() => {
                    setState(0);
                    shareAsset(
                      token,
                      assetData.url ? assetData._id : "41224d776a326fb40f000001"
                    );
                  }}
                >
                  Share <Ionicons name="share-social" size={17} color="#FFF" />
                </Button>
              </View>
            </View>
          </View>
        );
      case 4:
        return (
          <View style={styles.stepContainer}>
            <Image
              source={require("../assets/Resources/Images/wack.jpg")}
              style={{ height: hp("100%"), width: wp("100%") }}
            />
            <View style={styles.successTextContainer}>
              <Text
                style={[styles.text, { fontSize: 18, fontWeight: "normal" }]}
              >
                Oopps! You failed to commit what your wrote
              </Text>
              <Button colorScheme={2} onPress={() => setState(0)}>
                Next Joy
              </Button>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return <View style={styles.container}>{renderStepContent()}</View>;
};

const styles = StyleSheet.create({
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
    paddingTop: 30,
    flex: 1,
    flexGrow: 1,
  },
  fullImage: {
    width: 350,
    height: 1000,
    position: "absolute",
    top: -400,
    left: -170,
    zIndex: 1,
  },
  // option: {
  //   padding: 10,
  //   marginVertical: 5,
  //   borderColor: 'black',
  //   borderWidth: 1,
  // },
  // selectedOption: {
  //   padding: 10,
  //   marginVertical: 5,
  //   backgroundColor: 'lightblue',
  //   borderColor: 'blue',
  //   borderWidth: 1,
  // },
  text: {
    color: "#000",
    textAlign: "center",
    fontFamily: "Recursive-Bold",
    fontSize: 20,
    fontWeight: 600,
    zIndex: 0,
  },
  option: {
    width: 300,
    marginTop: 10,
    borderRadius: 4,
    borderColor: "#FFD7B5",
    borderStyle: "solid",
    borderWidth: 2,
    padding: 20,
  },
  selectedOption: {
    width: 300,
    marginTop: 10,
    borderRadius: 4,
    borderColor: "#FFD7B5",
    borderStyle: "solid",
    borderWidth: 2,
    backgroundColor: "#FFD7B5",
    padding: 20,
  },
  successTextContainer: {
    position: "absolute",
    bottom: 100,
    left: "auto",
    width: "98%",
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 20,
  },
  successText: {
    fontFamily: "Recursive-Bold",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  countContainer: {
    borderRadius: 50,
    borderWidth: 3,
    borderStyle: "solid",
    borderColor: "#FFB372",
    backgroundColor: "#FF7F11",
    width: 30,
  },
  count: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "Recursive-Bold",
    fontSize: 18,
  },
});

export default PuzzleFlow;
