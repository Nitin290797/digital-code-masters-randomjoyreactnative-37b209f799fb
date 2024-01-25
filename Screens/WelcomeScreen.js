import { StyleSheet, View, Text, Modal } from "react-native";
import { Login } from "../Components/Login";
import { SignIn } from "../Components/SignIn";
import { Button } from "../Components/Button";
import { useState } from "react";
import LoginAnimImage from "../Components/LoginAnimImage";

export function WelcomeScreen({ navigation }) {
  const [LoginOpen, setLoginOpen] = useState(false);
  const [SignonOpen, setSignonOpen] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: "#FF8013" }}>
      <View style={styles.container}>
        <View style={{ paddingHorizontal: 10 }}>
          <LoginAnimImage />
        </View>
        <View
          style={{
            marginHorizontal: 20,
            marginVertical: 20,
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 36, fontWeight: 700, color: "#000" }}>
            Welcome to full Exhilaration space
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              color: "#0A132B",
              paddingTop: 10,
            }}
          >
            Lorem ipsum dolor sit amet consectetur. Nibh cursus eros rutrum
            malesuada metus. Pellentesque et metus in ullamcorper mi.
          </Text>
        </View>
        <View>
          <Button
            colorScheme={1}
            onPress={() => {
              setLoginOpen(true);
            }}
          >
            Let me have fun
          </Button>
          <Button
            colorScheme={2}
            onPress={() => {
              setSignonOpen(true);
            }}
          >
            Join the fun
          </Button>
        </View>
      </View>

      <Modal
        onRequestClose={() => {
          setLoginOpen(false);
        }}
        visible={LoginOpen}
        animationType="slide"
        transparent={true}
      >
        <Login
          navigation={navigation}
          setLoginOpen={setLoginOpen}
          setSignonOpen={setSignonOpen}
        />
      </Modal>
      <Modal
        onRequestClose={() => {
          setSignonOpen(false);
        }}
        visible={SignonOpen}
        animationType="slide"
        transparent={true}
      >
        <SignIn
          navigation={navigation}
          setSignonOpen={setSignonOpen}
          setLoginOpen={setLoginOpen}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  dropdown: {
    height: 50,
    borderColor: "#FFD7B5",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginVertical: 10,
  },
  placeholderStyle: {
    color: "#A2A2A2",
  },
});
