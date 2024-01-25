import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Pressable,
  Modal,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { GlobalStyles } from "./GlobalStyle";
import { login } from "../action/auth";
import { Button } from "./Button";
import { Formik } from "formik";
import Password from "./Password";
import { useState } from "react";
// import sendgrid from "@sendgrid/mail";

export function Login({ navigation, setLoginOpen, setSignonOpen }) {
  const [isSelected, setSelection] = useState(false);
  const [openResetPasswordForm, setOpenResetPasswordForm] = useState(false);
  const [email, setEmail] = useState("");

  const toggleCheckBox = () => {
    setSelection(!isSelected);
  };
  const dispatch = useDispatch();
  const { data, error } = useSelector((state) => state.auth);

  const validate = (values) => {
    const errors = {};

    if (!values.Email) {
      errors.Email = "Plese enter your EmailID";
    }

    if (!values.Password) {
      errors.Password = "Plese enter your password";
    }
    return errors;
  };

  // sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

  const handleResetPassword = async (email) => {
    //
  };

  function RenderResetPasswordForm({ onSubmit }) {
    return (
      <Modal
        visible={openResetPasswordForm}
        animationType="slide"
        transparent={true}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.52)",
          }}
        >
          <View
            style={{
              backgroundColor: "#FFF8F1",
              padding: 15,
              width: wp("100%"),
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              position: "absolute",
              bottom: 0,
            }}
          >
            <View style={{ flexDirection: "row-reverse" }}>
              <MaterialCommunityIcons
                name={"close"}
                size={30}
                color={"black"}
                onPress={() => setOpenResetPasswordForm(false)}
              />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
              >
                <Formik
                  initialValues={{ email }}
                  validate={validate}
                  onSubmit={(values, actions) => {
                    onSubmit(values.email);
                    setOpenResetPasswordForm(false);
                    actions.resetForm();
                  }}
                >
                  {(props) => (
                    <View>
                      <TextInput
                        placeholder="Enter your email address"
                        placeholderTextColor="#6B7280"
                        style={GlobalStyles.inputField}
                        onChangeText={props.handleChange("email")}
                        value={props.values.email}
                      />
                      {props.touched.email && props.errors.email ? (
                        <Text style={{ color: "red" }}>
                          {props.errors.email}
                        </Text>
                      ) : null}
                      <Button colorScheme={1} onPress={props.handleSubmit}>
                        <Text>Send Reset Link</Text>
                      </Button>
                    </View>
                  )}
                </Formik>
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <View
      style={{
        backgroundColor: "#FFF8F1",
        padding: 15,
        width: wp("100%"),
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        position: "absolute",
        bottom: 0,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={{ marginHorizontal: 10, gap: 15, }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text
                style={{
                  color: "#1F2A37",
                  fontSize: 24,
                  fontWeight: 700,
                  marginTop: 10,
                }}
              >
                Good to have you back !
              </Text>
              <TouchableOpacity style={Styles.close} onPress={() => setLoginOpen(false)}>
              <MaterialCommunityIcons
                name={"close"}
                size={30}
                color={"black"}
                onPress={() => setLoginOpen(false)}
              />
              </TouchableOpacity>
            </View>
            <Formik
              initialValues={{ Email: "", Password: "" }}
              validate={validate}
              onSubmit={(values, actions) => {
                const response = {
                  email: values.Email,
                  password: values.Password,
                };
                dispatch(login(navigation, response, setLoginOpen));
                actions.resetForm();
              }}
            >
              {(props) => (
                <View style={Styles.Form}>
                  <TextInput
                    placeholder="Enter User Name or Email"
                    placeholderTextColor="#6B7280"
                    style={GlobalStyles.inputField}
                    onChangeText={props.handleChange("Email")}
                    value={props.values.Email}
                  />
                  {props.touched.Email && props.errors.Email ? (
                    <Text style={{ color: "red" }}>{props.errors.Email}</Text>
                  ) : null}
                  <Password
                    onChangeText={props.handleChange("Password")}
                    value={props.values.Password}
                    placeholder="Enter Password"
                  />
                  {props.touched.Password && props.errors.Password ? (
                    <Text style={{ color: "red" }}>
                      {props.errors.Password}
                    </Text>
                  ) : null}
                  <View style={Styles.moreOptions}>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <MaterialCommunityIcons
                        name={
                          !isSelected
                            ? "checkbox-blank-outline"
                            : "checkbox-marked"
                        }
                        onPress={toggleCheckBox}
                        size={20}
                        color={!isSelected ? "black" : "green"}
                      />
                      <Text
                        style={{
                          paddingLeft: 5,
                          fontFamily: "Recursive-Medium",
                          color: "#1F2A37",
                          fontSize: 15,
                        }}
                      >
                        Remember Me
                      </Text>
                    </View>
                    <Pressable
                      onPress={() => {
                        setOpenResetPasswordForm(true);
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Recursive-Medium",
                          color: "#FBBC04",
                          fontSize: 14,
                        }}
                      >
                        Forgot Password?
                      </Text>
                    </Pressable>
                  </View>
                  <Button onPress={props.handleSubmit} colorScheme={1}>
                    <Text>Continue Fun</Text>
                  </Button>
                </View>
              )}
            </Formik>
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
                gap: 5,
              }}
            >
              <Text style={{ color: "#000", fontSize: 16, fontWeight: 700 }}>
                Already have a account ?
              </Text>
              <Text
                onPress={() => {
                  setSignonOpen(true);
                  setLoginOpen(false);
                }}
                style={{ color: "#FBBC04", fontSize: 16, fontWeight: 700 }}
              >
                Sign up
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      {openResetPasswordForm && (
        <RenderResetPasswordForm onSubmit={handleResetPassword} />
      )}
    </View>
  );
}
const Styles = StyleSheet.create({
  container: {
    width: wp("100%"),
    padding: 15,
    backgroundColor: "#FFF8F1",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    position: "absolute",
    bottom: 0,
  },
  Heading: {
    color: "#1F2A37",
    fontFamily: "Recursive-Medium",
    fontSize: 25,
    fontStyle: "normal",
    lineHeight: 35,
  },
  Form: {
    width: "100%",
    marginVertical: 15,
  },
  moreOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    marginVertical: 10,
  },
  icons: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  close: {
    marginTop:10
  },
});
