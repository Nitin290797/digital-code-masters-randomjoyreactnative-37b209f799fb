import { StyleSheet, View, Text } from "react-native";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setToken, getAuthDetails } from "../action/auth";


export function Splash({navigation}){

    const dispatch = useDispatch();

    useEffect(() => {
    //     const checkToken = async () => {
    //       try {
    //         // Check if the token is stored in AsyncStorage
    //         const token = await AsyncStorage.getItem('token');
    //         dispatch(setToken(token));
    //         if (token !== null && token !== undefined) {
    //             dispatch(getAuthDetails(token))
    //             navigation.navigate("Main")
    //         } else {
    //         }
    //     } catch (error) {
    //         console.error('Error checking token:', error);
    //     }
    // };
    setTimeout(() => {
        navigation.navigate("Home");
    }, 500);
        // checkToken();
      }, [dispatch, navigation]);

    

    
    return(
        
        <View style={Styles.Landing}>
            <Text>Splash</Text>
        </View>
    )
}

const Styles=StyleSheet.create({
    circle:{
        height:"30vh",
        width:"30vh",
        // borderRadius:200/2,
        backgroundColor:"#fff"
    },
    Landing:{
        backgroundColor:"#FF9031",
        flex:1,
        width:'100%',
    },
})