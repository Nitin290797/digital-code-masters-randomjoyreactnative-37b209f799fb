import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Modal,
  Animated,
  Share,
  Dimensions,
  ScrollView,
  Platform,
  Pressable,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../Components/Button";
import { getSuggestion } from "../action/commitment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { assignStatement } from "../action/commitment";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Hr } from "../Components/Hr";
import { shareAsset } from "../action/asset";
import Help from "../assets/Resources/Images/help.svg";
import { Ionicons } from "@expo/vector-icons";
import Back from "../assets/Resources/Images/back.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { Notifications } from "expo";
import { Permissions } from "expo-permissions";
import Countdown from "../Components/Countdown";

const StatementFlow = ({ setState, navigation }) => {
  const [step, setStep] = useState(0);
  const [counter, setCounter] = useState(5);
  const [statements, setStatements] = useState(["", "", ""]);
  const [full, setFull] = useState(false);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.asset);
  const { token } = useSelector((state) => state.auth);
  const { statement } = useSelector((state) => state.commitment);
  const { data: assetData } = useSelector((state) => state.asset);
  const [help, setHelp] = useState(false);
  const [title, setTitle] = useState(
    "Every day I should call my mom this week and talk to ger for 15mins at least."
  );
  const [countdown, setCountdown] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );

    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

      if (status !== "granted") {
        console.log("Permission to receive push notifications denied.");
        return;
      }
    }
  };

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const suggestStatment = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      dispatch(getSuggestion(token, setStep, setTitle));
    } catch (error) {
      console.error("Error checking token:", error);
    }
  };

  const handleNextStep = () => {
    if (statements[0].trim() === "") {
      // Display an error message or handle the validation error as needed
      alert("Please enter a statement.");
      return; // Stop further execution if validation fails
    }

    if (step === 2) {
      console.log("Statements:", statements);
      setState(0);
      setStep(0);
    } else {
      setStep(step + 1);
    }
  };

  // useEffect(() => {
  //   if (step === 2) {
  //     const interval = setInterval(() => {
  //       setCounter((prevCounter) => prevCounter - 1);
  //       if (counter === 0) {
  //         setCounter(5);
  //         setStep(3);
  //       }
  //     }, 50000);
  //     return () => {
  //       clearInterval(interval);
  //     };
  //   }
  // }, [step, counter]);

  useEffect(() => {
    setEndTime(new Date(startTime.getTime() + 24 * 60 * 60 * 1000));
  }, [startTime]);

  useEffect(() => {
    const currentTime = new Date();
    const endTime = new Date(currentTime.getTime() + 24 * 60 * 60 * 1000);

    const interval = setInterval(() => {
      const currentTime = new Date();
      const remainingTime = endTime - currentTime;
      if (remainingTime <= 0) {
        clearInterval(interval);
        setCountdown("00:00:00");
        // If countdown reaches zero, set step to 0
        setStep(0);
      } else {
        const hours = Math.floor(remainingTime / (1000 * 60 * 60));
        const minutes = Math.floor(
          (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
        setCountdown(
          `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
      }
    }, 1000);

    // Schedule the first push notification after 24 hours
    const notificationInterval = setTimeout(() => {
      Notifications.scheduleNotificationAsync({
        content: {
          title: "Your Notification Title",
          body: "Your Notification Message",
        },
        trigger: {
          seconds: 6 * 60 * 60, // Schedule the notification every 6 hours
        },
      });
      // Set up the repeating notification every 6 hours
      const repeatingInterval = setInterval(() => {
        Notifications.scheduleNotificationAsync({
          content: {
            title: "Your Notification Title",
            body: "Your Notification Message",
          },
          trigger: {
            seconds: 6 * 60 * 60, // Schedule the notification every 6 hours
          },
        });
      }, 6 * 60 * 60 * 1000);

      return () => {
        clearInterval(interval);
        clearInterval(repeatingInterval);
      };
    }, 24 * 60 * 60 * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(notificationInterval);
    };
  }, []);

  useEffect(() => {
    if (step === 2) {
      const interval = setTimeout(() => {
        setStep(3);
      }, 5000);

      return () => {
        clearTimeout(interval);
      };
    }
  }, [step]);

  const assignHandle = async (is_custom, text) => {
    const token = await AsyncStorage.getItem("token");
    if (is_custom) {
      if (
        statements[0] === statements[1] &&
        statements[0] === statements[2] &&
        statements[1] === statements[2]
      ) {
        const body = {
          is_custom,
          text: statements[0],
          discription: " ",
          asset_for_displayed: data.asset_url ? data.asset_url : " ",
          asset_displayed: " ",
        };
        console.log(body);
        assignStatement(token, body);
        setStep(4);
      } else {
        Toast.show({
          type: "error",
          text1: "Statements are not same",
        });
      }
    } else {
      const body = {
        is_custom,
        text,
        description: "",
        asset_for_displayed: data.asset_url,
        asset_displayed: "",
      };
      dispatch(assignStatement(token, body));
      setStep(2);
    }
  };

  const ShareApp = async () => {
    try {
      const result = await Share.share({
        title: "App link",
        message: "randomjoy://",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <>
            <SafeAreaView>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: hp("90%"),
                }}
              >
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingVertical: 20,
                    }}
                  >
                    <TouchableOpacity
                    onPress={() => navigation.navigate("mystery")}
                    >
                      <Back />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setHelp(true)}>
                      <Help />
                    </TouchableOpacity>
                  </View>
                  <Text style={[styles.text]}>
                    You've been assigned a statement
                  </Text>
                  <View
                    style={{
                      justifyContent: "space-evenly",
                      height: hp("80%"),
                    }}
                  >
                    <Image
                      source={require("../assets/Resources/Images/imageHandCommitnow.png")}
                      style={{
                        width: wp("92%"),
                        height: Dimensions.get("window").height / 2.1,
                        borderRadius: 12,
                      }}
                    />
                    <Text style={[styles.text, { marginTop: "4%" }]}>
                      Write a statement of commitment{"\n"}and follow it!
                    </Text>
                    <View style={{ alignItems: "center" }}>
                      <Button
                        colorScheme={2}
                        styles={{ width: wp("50%") }}
                        onPress={suggestStatment}
                      >
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
                      marginVertical: 20,
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
          <SafeAreaView>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  height: hp("90%"),
                  width: wp("90%"),
                  marginVertical: 10,
                }}
              >
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={{ flex: 1 }}>
                    <TouchableOpacity style={{ zIndex: 100 }}>
                      <Image
                        source={require("../assets/Resources/Images/HandShake.png")}
                        style={{ width: wp("90%"), height: hp("30%") }}
                      />
                    </TouchableOpacity>
                    <Text
                      style={[styles.text, { marginBottom: 10, marginTop: 20 }]}
                    >
                      {title}
                    </Text>

                    {statements.map((item, index) => {
                      return (
                        <TextInput
                          style={styles.input}
                          placeholder="Write your commitment here"
                          value={statements[index]}
                          onChangeText={(text) => {
                            const newStatements = [...statements];
                            newStatements[index] = text;
                            setStatements(newStatements);
                          }}
                        />
                      );
                    })}
                  </View>
                  <View style={styles.footer}>
                    <Button
                      Styles={styles.Button}
                      colorScheme={2}
                      onPress={() => handleNextStep(true, statements[0])}
                    >
                      Save
                    </Button>
                    <Button
                      Styles={styles.Button}
                      colorScheme={1}
                      onPress={() => assignHandle(true, statements[0])}
                    >
                      Suggestions
                    </Button>
                  </View>
                </ScrollView>
              </View>
            </KeyboardAvoidingView>
          </SafeAreaView>
        );
      case 2:
        return (
          <View style={styles.stepContainer}>
            <Image
              source={require("../assets/Resources/Images/happy.png")}
              style={{ width: wp("100%"), height: hp("100%") }}
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
          <View style={{}}>
            <Image
              source={
                assetData.url
                  ? { uri: assetData.url }
                  : require("../assets/Resources/Images/temp.png")
              }
              style={{ height: hp("100%"), width: wp("100%") }}
            />
            <View style={styles.successTextContainer}>
              <Text
                style={[
                  styles.successText,
                  { textAlign: "center", textTransform: "uppercase" },
                ]}
              >
                🎉🎉Joy for you!!🎉🎉
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
                    ShareApp();
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
          <SafeAreaView>
            <View
              style={[
                styles.stepContainer,
                { justifyContent: "flex-start", alignItems: "flex-start" },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  position: "absolute",
                  top: 0,
                  left: 10,
                }}
              >
                <TouchableOpacity onPress={() => setStep(1)}>
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
                {statement.map(
                  (item, index) =>
                    index > 0 && (
                      <TouchableOpacity
                        style={styles.suggestionWrapper}
                        onPress={() => {
                          setTitle(item.suggestion_text);
                          setStatements([
                            item.suggestion_text,
                            item.suggestion_text,
                            item.suggestion_text,
                          ]);
                          setStep(1);
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
                        >
                          <Text>{item.category_text}</Text>
                        </View>
                        <Text
                          style={[
                            styles.text,
                            { fontSize: 15, textAlign: "left" },
                          ]}
                        >
                          {item.suggestion_text}
                        </Text>
                      </TouchableOpacity>
                    )
                )}
              </View>
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  stepContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 30,
    flex: 1,
    flexGrow: 1,
  },
  modal: {
    backgroundColor: "#FF7C2A",
    width: "90%",
    borderRadius: 8,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  categoryText: {
    color: "#000",
    textAlign: "center",
    fontFamily: "Recursive-Bold",
    fontSize: 10,
    fontWeight: 600,
  },
  input: {
    height: hp("10%"),
    width: wp("90%"),
    marginTop: 40,
    borderRadius: 4,
    borderColor: "#FFD7B5",
    borderStyle: "solid",
    borderWidth: 2,
    padding: 20,
  },
  text: {
    color: "#000",
    textAlign: "center",
    fontFamily: "Recursive-Bold",
    fontSize: 20,
    fontWeight: 600,
  },
  successTextContainer: {
    position: "absolute",
    alignSelf: "center",
    bottom: 100,
    left: "auto",
    width: "95%",
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 20,
  },
  successText: {
    fontFamily: "Recursive-Bold",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 20,
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
  footer: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-evenly",
    // marginTop: 'auto',
    // display: 'flex',
    // width: 350,
    // marginTop: 20
  },
  suggestionWrapper: {
    backgroundColor: "#DEF6FB",
    padding: 32,
    width: "100%",
    marginBottom: 10,
    position: "relative",
  },
  fullImage: {
    width: 350,
    height: 1000,
    position: "absolute",
    top: -400,
    left: -170,
    zIndex: 1,
  },
});

export default StatementFlow;
