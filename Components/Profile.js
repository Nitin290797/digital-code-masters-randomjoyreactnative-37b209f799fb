// ProfileComponent.js
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Switch,
  Share,
  SafeAreaView,
  ActivityIndicator,
  Modal,
  TextInput,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "./GlobalStyle";
import { logout } from "../action/auth";
import { Hr } from "./Hr";
import { useNavigation } from "@react-navigation/native";
import Arrow from "../assets/Resources/Images/arrow-right.svg";
import * as ImagePicker from "expo-image-picker";
import { setSound } from "../action/asset";
import { ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setToken, getAuthDetails, update } from "../action/auth";
import RNPickerSelect from "react-native-picker-select";
import { useFocusEffect } from "@react-navigation/native";
import { Button } from "../Components/Button";
import { Linking } from "react-native";
import { AntDesign } from '@expo/vector-icons';

const ProfileComponent = ({ profileImage }) => {
  const { data: user } = useSelector((state) => state.auth);
  console.log("user", user);
  const navigation = useNavigation();
  const [image, setImage] = useState(
    profileImage ? profileImage : "https://via.placeholder.com/150"
  );
  const dispatch = useDispatch();
  const { sound } = useSelector((state) => state.asset);
  const [loading, setLoading] = useState(false);
  const [help, setHelp] = useState(false);
  const [name, setName] = useState(user.username ? user.username : "");
  const [email, setEmail] = useState(user.email ? user.email : "");
  const [status, setStatus] = useState(user.preferences ? user.preferences : 0);
  const [helpPopUp, setHelpPopUp] = useState(false);

  console.log(sound);

  useFocusEffect(
    useCallback(() => {
      // Do your work
      const checkToken = async () => {
        try {
          // Check if the token is stored in AsyncStorage
          setLoading(true);
          const token = await AsyncStorage.getItem("token");
          console.log("test2", token);
          dispatch(setToken(token));
          if (token !== null && token !== undefined) {
            dispatch(getAuthDetails(token, navigation, setLoading));
          } else {
            navigation.navigate("Home");
          }
        } catch (error) {
          console.error("Error checking token:", error);
        }
      };

      checkToken();
    }, [])
  );

  const updateProfile = async () => {
    const payload = {
      username: name,
      email,
      preferences: status,
      password: user.password,
      zip_code: user.zip_code,
      gender: user.gender,
    };
    const token = await AsyncStorage.getItem("token");
    console.log("test2", token);
    dispatch(setToken(token));
    dispatch(update(payload, user._id, token, setHelp, setLoading, navigation));
  };

  // useEffect(() => {
  //   const checkToken = async () => {
  //     try {
  //       // Check if the token is stored in AsyncStorage
  //       setLoading(true)
  //       const token = await AsyncStorage.getItem('token');
  //       console.log('test2', token)
  //       dispatch(setToken(token));
  //       if (token !== null && token !== undefined) {
  //           dispatch(getAuthDetails(token, navigation, setLoading));
  //       } else {
  //           navigation.navigate("Home");
  //       }
  //     } catch (error) {
  //       console.error('Error checking token:', error);
  //     }
  //   };

  //   checkToken();
  // }, []);

  const toggleSwitch = () => {
    dispatch(setSound(!sound));
  };

  const shareApp = async () => {
    const result = await Share.share({
      title: "App link",
      message: "randomjoy://",
    });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      await AsyncStorage.setItem(`profile_${user._id}`, result.assets[0].uri);
      setImage(result.assets[0].uri);
    }
  };

  const MenuItem = ({ icon, label, onClick }) => {
    return (
      <TouchableOpacity onPress={onClick} style={styles.menuItem}>
        <View style={styles.settingsContainer}>
          <Ionicons name={icon} size={24} color="black" />
          <Text style={styles.menuItemLabel}>{label}</Text>
        </View>
        <Arrow />
      </TouchableOpacity>
    );
  };

  if (loading || !user.username) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  function rendorModalHelPopUp() {
    return (
      <Modal
        visible={helpPopUp}
        animationType="none"
        onRequestClose={() => setHelp(false)}
        transparent={true}
      >
        <TouchableOpacity
          onPress={() => setHelpPopUp(false)}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View style={styles.modal}>
            <Text
              style={{
                fontFamily: "Recursive-Bold",
                fontSize: 20,
                fontWeight: "700",
                marginBottom: 15,
                textAlign: "center",
              }}
            >
              Help Center
            </Text>
            <Hr />
            <View style={{ alignItems: "center", marginVertical: 20 }}>
              <Text
                style={{ fontSize: 20, textAlign: "center", fontWeight: 600 }}
              >
                Contact for this mail Click to mail
              </Text>
              <TouchableHighlight
                style={{ marginVertical: 20, alignItems: "center" }}
                onPress={() =>
                  Linking.openURL(
                    "mailto:info@randomjoy.com?subject=ErrorLog&body=Your app was error"
                  )
                }
              >
                <Text
                  style={{ fontSize: 18, fontWeight: 600, color: "#F29222" }}
                >
                  info@randomjoy.com
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => setHelp(true)}
        style={{
          borderWidth: 2,
          borderStyle: "solid",
          borderColor: "#000",
          padding: 8,
          borderRadius: 12,
          width: 100,
          position: "absolute",
          zIndex: 100,
          top: 35,
          right: 10,
        }}
      >
        <Text
          style={{
            fontFamily: "Recursive-Bold",
            fontSize: 14,
            fontWeight: "700",
          }}
        >
          Edit Profile
        </Text>
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: "#FA821E",
          padding: 20,
          top:20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.name}>{user?.username}</Text>

        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: image }} // Replace with your image source
            style={styles.profileImage}
          />
          <TouchableOpacity onPress={() => pickImage()} style={styles.editIcon}>
            <Ionicons name="md-create" size={15} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.statusIndicator}>
          <Text style={{ fontFamily: "Recursive-Bold" }}>
            {user?.preferences === 0 ? <View style={{backgroundColor:'#2DD65D', height:15, width:15, borderRadius:15/2}}></View> : <View style={{backgroundColor:'red',height:15, width:15, borderRadius:15/2}}></View>}
          </Text>
          <Text style={{ fontFamily: "Recursive-Bold", marginLeft: 6 }}>
            {user?.preferences === 0 ? "Active" : "Mute"}
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <StatCircle label="Completed Tasks" value={user?.completed_task} />
          <StatCircle
            label="Uncompleted Tasks"
            value={user?.uncompleted_task}
          />
          <StatCircle
            label="Total Tasks"
            value={user?.completed_task + user?.uncompleted_task}
          />
        </View>
      </View>
      <ScrollView style={styles.menu}>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            padding: 5,
          }}
        >
          <View style={{flexDirection:'row'}}>
          <AntDesign name="setting" size={24} color="black" />
          <Text style={styles.menuItemLabel}>Sound </Text>
          </View>
          <Switch
            trackColor={{ false: "#5F4A38", true: "#FB953E" }}
            ios_backgroundColor="#5F4A38"
            onValueChange={toggleSwitch}
            value={sound}
          />
        </View>
        <Hr />
        <MenuItem
          icon="md-help-circle"
          label="Help"
          onClick={() => setHelpPopUp(true)}
        />
        <Hr />
        <MenuItem
          icon="arrow-redo-outline"
          label="Share App"
          onClick={() => shareApp()}
        />
        <Hr />
        <MenuItem
          icon="md-share"
          label="Logout"
          onClick={() => logout(navigation)}
        />
      </ScrollView>
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
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View style={styles.modal}>
            <Text
              style={{
                fontFamily: "Recursive-Bold",
                fontSize: 20,
                fontWeight: "700",
                marginBottom: 15,
                textAlign: "center",
              }}
            >
              Edit your profile!!
            </Text>
            <TextInput
              placeholder="Enter Name"
              placeholderTextColor="#6B7280"
              style={GlobalStyles.inputField}
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <TextInput
              placeholder="Enter Email"
              placeholderTextColor="#6B7280"
              style={GlobalStyles.inputField}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />

            <Button
              styles={{ marginTop: 15 }}
              onPress={() => updateProfile()}
              colorScheme={2}
            >
              Update
            </Button>
          </View>
        </TouchableOpacity>
      </Modal>
      {rendorModalHelPopUp()}
    </SafeAreaView>
  );
};

const StatCircle = ({ label, value }) => (
  <View
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "33%",
      paddingVertical: 10,
    }}
  >
    <View
      style={[
        styles.statCircle,
        {
          backgroundColor: label.includes("Completed")
            ? "#44355B"
            : label.includes("Total")
            ? "#FF7F11"
            : "#58E4ED",
        },
      ]}
    >
      <Text style={styles.statValue}>{value}</Text>
    </View>
    <View style={{ flexDirection: "row" }}>
      <Text
        style={{
          flex: 1,
          flexWrap: "wrap",
          fontFamily: "Recursive-Bold",
          marginTop: 10,
          textAlign: "center",
        }}
      >
        {label}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFF",
    marginTop:20
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Recursive-Bold",
  },
  profileImageContainer: {
    marginTop: 20,
    alignItems: "center",
    position: "relative",
    flexDirection:'row', 
    alignItems:'center'
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 150/2,
  },
  editIcon: {
    backgroundColor: "white",
    padding: 5,
    borderRadius: 20,
    marginLeft:'-7%',
    marginTop:'-25%'
  },
  statusIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  statsContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    borderRadius: 20,
    borderWidth: 6,
    borderColor: "#FFB677",
    backgroundColor: "#F1B480",
    marginBottom:10
  },
  settingsContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  statCircle: {
    alignItems: "center",
    height: 92,
    width: 92,
    borderRadius: 92/2,
    backgroundColor: "red",
    display: "flex",
    justifyContent: "center",
    shadowColor: "rgba(255, 255, 255, 0.10)",
    shadowOffset: "0px 4px 4px 0px",
    shadowOpacity: 1,
  },
  statValue: {
    fontWeight: '800',
    fontSize: 30,
    padding: "30px",
    color: "#FFF",
  },
  menu: {
    alignSelf: "stretch",
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    padding: 8,
  },
  menuItemLabel: {
    marginLeft: 10,
    fontFamily: "Recursive-Bold",
  },
  modal: {
    backgroundColor: "#FFF8F1",
    borderRadius: 12,
    padding: 12,
    width: "70%",
  },
});

export default ProfileComponent;
