import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useState } from "react";
import { Button } from "./Button";
import { GlobalStyles } from "./GlobalStyle";
import Password from "./Password";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { register } from "../action/auth";
import RNPickerSelect from "react-native-picker-select";
import { TouchableOpacity } from "react-native-gesture-handler";

export function SignIn({ navigation, setSignonOpen, setLoginOpen }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [zip_code, setZipcode] = useState("");

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setGender("");
    setZipcode("");
  };

  const submitHandle = () => {
    const response = {
      username: name,
      email: email,
      password: password,
      gender: gender,
      zip_code: zip_code,
      role: 2,
    };
    dispatch(register(response, setSignonOpen, navigation, resetForm));
  };

  return (
    <View style={{flex:1}}>
      <View style={{flex:1}}></View>
    <View
      style={{
        backgroundColor: "#FFF8F1",
        padding: 5,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        // position: "absolute",
        bottom: 0,
        paddingBottom: 15,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <Text
            style={{
              color: "#1F2A37",
              fontSize: 20,
              fontWeight: 700,
              marginLeft: 10,
              marginTop: 10,
            }}
          >
            Create your Account !
          </Text>
            <TouchableOpacity style={Styles.close} onPress={() => setSignonOpen(false)}>
            <MaterialCommunityIcons
              name={"close"}
              size={30}
              color={"black"}
              onPress={() => setSignonOpen(false)}
            />
            </TouchableOpacity>
          </View>

          <View style={{ marginHorizontal: 10, gap: 15, marginTop: 0 }}>
            <View style={Styles.Form}>
              <TextInput
                placeholder="Username"
                placeholderTextColor="#6B7280"
                style={GlobalStyles.inputField}
                onChangeText={(e) => setName(e)}
                value={name}
              />
              <TextInput
                placeholder="Enter your Email Address"
                placeholderTextColor="#6B7280"
                style={GlobalStyles.inputField}
                onChangeText={(e) => setEmail(e)}
                value={email}
              />
              <View style={[GlobalStyles.inputField, { padding: 0, gap: 0 }]}>
                <RNPickerSelect
                  onValueChange={(e) => setGender(e)}
                  placeholder={{ label: "Gender", color: "#6B7280", value: "" }}
                  items={[
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                    { label: "Othres", value: "others" },
                  ]}
                  style={pickerSelectStyles}
                />
              </View>
              <TextInput
                placeholder="Zip/Area code"
                placeholderTextColor="#6B7280"
                style={GlobalStyles.inputField}
                onChangeText={(e) => setZipcode(e)}
                value={zip_code}
                keyboardType="numeric"
              />
              <Password
                onChangeText={(e) => setPassword(e)}
                value={password}
                placeholder="Password"
              />
              <Button onPress={() => submitHandle()} colorScheme={1}>
                <Text>Let me have fun</Text>
              </Button>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 5,
                marginVertical: 15,
              }}
            >
              <View
                style={{
                  width: wp("30%"),
                  height: hp("0.2%"),
                  backgroundColor: "gray",
                }}
              />
              <Text>or continue with</Text>
              <View
                style={{
                  width: wp("30%"),
                  height: hp("0.2%"),
                  backgroundColor: "gray",
                }}
              />
            </View>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                gap: 1,
              }}
            >
              <Text style={{ color: "#000", fontSize: 16, fontWeight: 700 }}>
                Already have a account?
              </Text>
              <Text
                onPress={() => {
                  setLoginOpen(true);
                  setSignonOpen(false);
                }}
                style={{
                  color: "#FBBC04",
                  fontSize: 16,
                  fontWeight: 700,
                  marginLeft: 10,
                }}
              >
                Login
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
    </View>
  );
}
const Styles = StyleSheet.create({
  close: {
    alignSelf:'flex-end',
    marginRight:10,
    marginTop:10
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    display: "flex",
    gap: 10,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "stretch",
    fontFamily: "Recursive-Medium",
  },
  inputAndroid: {
    display: "flex",
    alignItems: "center",
    gap: 0,
    alignSelf: "stretch",
    borderRadius: 8,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#C7CB0E",
    backgroundColor: "#F9FAFB",
    marginVertical: 0,
    padding: 0,
    fontFamily: "Recursive-Medium",
  },
});
