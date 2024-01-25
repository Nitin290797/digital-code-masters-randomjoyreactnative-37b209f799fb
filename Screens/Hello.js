import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { categoryList, saveInterest, skipInterest } from "../action/interest";
import { useDispatch, useSelector } from "react-redux";
import { Button } from '../Components/Button';

const windowWidth = Dimensions.get('window').width;

const ClickableNonLinearItems = ({ navigation }) => {
  const [activeItems, setActiveItems] = useState([]);

  const dispatch = useDispatch();
  const { data } = useSelector(state => state.interest);
  const { data: authData, token } = useSelector(state => state.auth);
  console.log('insinde', data);
  console.log("authdata", authData);

  useEffect(() => {
    console.log('ab', token);
    dispatch(categoryList(token));
  }, []);


  const handlePress = (index) => {
    console.log(index);
    const updatedActiveItems = activeItems.includes(index)
      ? activeItems.filter((item) => item !== index)
      : [...activeItems, index];

    setActiveItems(updatedActiveItems);
  };

  const saveHandle = () => {
    console.log("activeItems",activeItems);
    if(activeItems == ""){
      alert('Please choose any value')
    }else{
      const payload = []
      activeItems.map(d => payload.push(data[d]._id))
      saveInterest(navigation, authData._id, payload, token);
    }
  }

  const skipHandle = () => {
    console.log(authData);
    navigation.navigate("Main")
    skipInterest(navigation, authData._id, token);
  }



  const renderRoundItem = (index, iconName, text) => {
    const isActive = activeItems.includes(index);

    return (
      <TouchableOpacity
        key={index}
        style={[styles.roundItem, { backgroundColor: isActive ? '#FCA356' : '#FBF9F7' }]}
        onPress={() => handlePress(index)}
      >
        <Ionicons name={iconName} size={24} color="#DEDEDE" />
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => { skipHandle() }}>
            <Ionicons name="arrow-undo-outline" size={40} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Pick Interest</Text>
        </View>
        <View style={styles.content}>
          {data.map((d, index) =>
            renderRoundItem(index, 'ios-checkmark-circle', d.category_title)
          )}
        </View>
        <View style={styles.footer}>
          <Button colorScheme={2} onPress={() => skipHandle()}>Skip</Button>
          <Button colorScheme={2} onPress={() => saveHandle()}>Save</Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    padding: 20
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 26,
    fontWeight: '400',
    marginLeft: 20,
    fontFamily: 'Recursive-Medium'
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  roundItem: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    marginTop: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
  },
  halfWidth: {
    width: windowWidth / 2 - 15, // Subtracting padding and margin
    marginLeft: 5,
  },
  buttons: {
    padding: 15,
    marginTop: 30,
    borderRadius: 30,
    backgroundColor: "pink"
  },
  Text: {
    fontSize: 20,
    fontFamily: 'Recursive-Medium',
    textAlign: "center"
  }
});

export default ClickableNonLinearItems;
