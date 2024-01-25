// NotificationListComponent.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from './Button';
import MysteryJoy from '../Screens/MysteryJoy';
import Statements from '../Screens/Statements';
import Puzzle from '../Screens/Puzzle';
import Key from '../assets/Resources/Images/key.svg'
import { getNotifications, getAssetWithId } from '../action/asset';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const NotificationListComponent = () => {
  const [step, setStep] = useState(0);
  const [counter, setCounter] = useState(5);
  const dispatch = useDispatch()
  const { notificationList, loading } = useSelector(state => state.asset)

  useEffect(() => {
    const netCall = async () => {
      const token = await AsyncStorage.getItem('token');
      dispatch(getNotifications(token));
    }

    netCall();

  }, []);

  useEffect(() => {
    if (step === 2) {
      const interval = setTimeout(() => {
        setStep(3);
      }, 5000);
    }
  }, [step])

  useEffect(() => {
    if (step === 2) {
      const interval = setInterval(() => {
        setCounter(counter - 1);
      }, 1000);
    }

  }, [counter, step]);

  const assetHandle = async (id) => {
    const token = await AsyncStorage.getItem('token');
    dispatch(getAssetWithId(token, id, setStep));
  }

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    const token = await AsyncStorage.getItem('token');
    dispatch(getNotifications(token)).then(() => setRefreshing(false));
  }, []);



  return (
    <SafeAreaView>
      {step === 0 && <View style={styles.container}>
        <Text style={styles.headerText}>Notifications</Text>
        {loading && <SafeAreaView style={{ height: hp('90%'), justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </SafeAreaView>}
        {!loading && notificationList.length === 0 && <Text style={[styles.text, { marginTop: 300 }]}>No notifications...</Text>}
        <ScrollView refreshControl={<RefreshControl onRefresh={onRefresh} />}>
          {!loading && notificationList.map((notification, index) => (
            <View
              key={index}
              style={styles.notification}
            >
              <Image style={{ width: 50, height: 50 }} source={require('../assets/Resources/Images/not.gif')} />
              <Text style={styles.notificationText}>{notification.text}</Text>
              <Button onPress={() => assetHandle(notification._id)} Styles={styles.Button} colorScheme={2}>View</Button>
            </View>
          ))}
        </ScrollView>
      </View>}
      {step === 1 && <MysteryJoy setState={setStep} />}
      {step === 2 && <Puzzle setState={setStep} />}
      {step === 3 && <Statements setState={setStep} />}
      {step === 4 && <View style={[styles.stepContainer]}>
        <Image source={require('../assets/Resources/Images/gift.png')} style={styles.image} />
        <Text style={styles.text}>A gift from a Friend</Text>
        <TouchableOpacity onPress={handleNextStep}>
          <Key />
        </TouchableOpacity>
      </View>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp('95%'),
    padding: 20,
    backgroundColor: '#FFF',
    paddingTop: 10
  },
  notification: {
    flexDirection: 'row',
    padding: 5,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#DEF6FB'
  },
  notificationText: {
    flex: 1,
    marginLeft: 10,
  },
  // buttonText: {
  //   color: 'blue',
  //   fontWeight: 'bold',
  // },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  // Button: {
  //   marginTop: 0
  // },
  stepContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff'
  },
  // input: {
  //   height: 80,
  //   width: 300,
  //   marginTop: 10,
  //   borderRadius: 4,
  //   borderColor: '#FFD7B5',
  //   borderStyle: 'solid',
  //   borderWidth: 2,
  //   padding: 20
  // },
  text: {
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Recursive-Bold',
    fontSize: 20,
    fontWeight: 600,
  },
  successTextContainer: {
    position: 'absolute',
    bottom: 100,
    left: 'auto',
    width: '98%',
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 10
  },
  successText: {
    fontFamily: 'Recursive-Bold',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  countContainer: {
    borderRadius: 50,
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: '#FFB372',
    backgroundColor: '#FF7F11',
    width: 30
  },
  count: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Recursive-Bold',
    fontSize: 18,
  }
});

export default NotificationListComponent;
