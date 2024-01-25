import { useState } from "react";
import { View,TextInput,StyleSheet } from "react-native";
import { GlobalStyles } from "./GlobalStyle";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Password({onChangeText,value,placeholder}){
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    return(
        <View style={{...GlobalStyles.inputField,...Styles.password}}>
            <TextInput placeholder={placeholder} 
                            placeholderTextColor='#6B7280' 
                            secureTextEntry={!showPassword}
                            onChangeText={onChangeText} 
                            value={value}
                            style={{...Styles.input}}
                            />
                        <MaterialCommunityIcons
                            name={showPassword ? 'eye-off' : 'eye'}
                            size={24}
                            color="#aaa"
                            styles={Styles.icons}
                            onPress={toggleShowPassword}
                        />
        </View>
    )
}
const Styles=StyleSheet.create({
    input:{
        width:'80%',
        fontFamily:'Recursive-Medium'
    },
    password:{
        display:'flex',
        flexDirection:'row',
        justifyContent:"space-between"
    }
})