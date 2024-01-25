// App.js
import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Mystery from './Mystery';
import Commitment from '../Components/Commitment';
import NotificationComponent from '../Components/Notifications';
import ProfileComponent from '../Components/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, ActivityIndicator, BackHandler, ToastAndroid } from 'react-native';
import { Audio } from 'expo-av';

import Profile from '../assets/Resources/Images/profile.svg';
import ProfileFocused from '../assets/Resources/Images/profile-focused.svg';
import Notification from '../assets/Resources/Images/notification.svg';
import NotificationFocused from '../assets/Resources/Images/notification-focused.svg';
import Home from '../assets/Resources/Images/home.svg';
import HomeFocused from '../assets/Resources/Images/home-focued.svg';
import Game from '../assets/Resources/Images/game.svg';
import GameFocused from '../assets/Resources/Images/game-focused.svg';


const Tab = createBottomTabNavigator();

const MainScreen = () => {
  const { token, data } = useSelector((state) => state.auth);
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  console.log(data, 'data')


  useEffect(() => {
    // const checkToken = async () => {
    //   try {
    //     // Check if the token is stored in AsyncStorage
    //     setLoading(true)
    //     const token = await AsyncStorage.getItem('token');
    //     console.log('test2', token)
    //     dispatch(setToken(token));
    //     if (token !== null && token !== undefined) {
    //         dispatch(getAuthDetails(token, navigation, setLoading));
    //     } else {
    //         navigation.navigate("Home");
    //     }
    //   } catch (error) {
    //     console.error('Error checking token:', error);
    //   }
    // };


    const handleBackButton = () => {
      ToastAndroid.show('Please use internal app back button for in app navigation', ToastAndroid.SHORT);
      return true;
    }

    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    }
  }, []);

  useEffect(() => {
    const setProfileImg = async () => {
      console.log(`profile_${data._id}`)
      const img = await AsyncStorage.getItem(`profile_${data._id}`);
      console.log(img, 'img');
      setProfileImage(img);
    }

    setUser(data);
    setProfileImg();
    console.log(data)
  }, [data])

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(require('../assets/Resources/Sound/button.mp3'));
    await sound.playAsync();
  }


  return (
    <>
      {loading &&
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </SafeAreaView>}
      {!loading &&

        <Tab.Navigator
          screenOptions={{
            tabBarLabel:'',
          }}
        >
          <Tab.Screen
            name="home"
            children={() => {
              playSound();
              return <Mystery />
            }}
            options={{
              tabBarIcon: ({ focused }) => (
                focused ? <HomeFocused /> : <Home />
              ),
              tabBarStyle: {
                padding: 0,
                height: '9%'
              },
              headerShown: false
            }}
          />
          <Tab.Screen
            name="commitment"
            children={() => {
              playSound();
              return <Commitment />
            }}
            options={{
              tabBarIcon: ({ focused }) => (
                focused ? <GameFocused /> : <Game />
              ),
              unmountOnBlur: true,
              tabBarStyle: {
                padding: 0,
                height: '9%',
              },
              headerShown: false
            }}
          />

          <Tab.Screen
            name="notification"
            children={() => {
              playSound();
              return <NotificationComponent />
            }}
            options={{
              tabBarIcon: ({ focused }) => (
                focused ? <NotificationFocused /> : <Notification />
              ),
              unmountOnBlur: true,
              tabBarStyle: {
                padding: 0,
                height: '9%'
              },
              headerShown: false
            }}
          />
          <Tab.Screen
            name="profile"
            children={() => {
              playSound();
              return <ProfileComponent user={data.user} profileImage={profileImage} />;
            }}
            options={{
              tabBarIcon: ({ focused }) => (
                focused ? <ProfileFocused /> : <Profile />
              ),
              tabBarStyle: {
                height: '9%'
              },
              headerShown: false
            }}
          />
        </Tab.Navigator >}
    </>
  );
};

export default MainScreen;
