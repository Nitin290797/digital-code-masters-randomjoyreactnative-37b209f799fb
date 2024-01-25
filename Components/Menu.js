import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ActionButton from 'react-native-circular-action-menu';
import Type from '../assets/Resources/Images/type.svg';
import MJ from "../assets/Resources/Images/mj.svg";
import State from "../assets/Resources/Images/state.svg";
import Commit from "../assets/Resources/Images/commit.svg";
import Puzz from "../assets/Resources/Images/puzzle.svg";
import GiftFromFriend from "../Components/GiftFromFriend";

const Menu = ({navigation}) => {
    return (
        <View style={{flex:1, justifyContent:'center',}}>
            <View style={{flex:1,}}></View>
            <View style={{ flex: 1, backgroundColor: '#f3f3f3', position:'absolute', alignSelf:'center' }}>
                {/*Rest of App come ABOVE the action button component!*/}
                <ActionButton btnOutRange="#FF7F11" buttonColor="#FF7F11">
                    <ActionButton.Item buttonColor='#FF7F11' title="Statement" onPress={() => console.log("notes tapped!")}>
                        <View style={{alignItems:'center'}}>
                        <State/>
                        <Text style={{fontSize:10, fontWeight:'500', fontFamily: 'Recursive-Medium', color:'#fff'}}>Statement</Text>
                        </View>
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#FF7F11' title="Commit" onPress={() => { }}>
                        <View style={{alignItems:'center'}}>
                        <Commit />
                        <Text style={{fontSize:10, fontWeight:'500', fontFamily: 'Recursive-Medium', color:'#fff'}}>Commit</Text>
                        </View>
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#FF7F11' title="Puzzle" onPress={() => { }}>
                        <View style={{alignItems:'center'}}>
                        <Puzz />
                        <Text style={{fontSize:10, fontWeight:'500', fontFamily: 'Recursive-Medium', color:'#fff'}}>Puzzle</Text>
                        </View>
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#FF7F11' title="Mj" onPress={() => { }}>
                        <View style={{alignItems:'center'}}>
                        <MJ />
                        <Text style={{fontSize:10, fontWeight:'500', fontFamily: 'Recursive-Medium', color:'#fff'}}>MJ</Text>
                        </View>
                    </ActionButton.Item>
                </ActionButton>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
    },
    mainactionbutton:{
        padding:20,
        height:70,
        width:70
    }
  });

export default Menu