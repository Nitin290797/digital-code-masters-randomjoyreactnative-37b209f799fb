import React from 'react'
import { View, TextInput } from 'react-native'

const CustomInput = ({ value, placeholder, secureTextEntry, onChangeText, keyboardType, maxLength }) => {
    return (
        <View style={{ backgroundColor: 'white', width: '100%', borderColor: '#FFD7B5', borderWidth: 1, borderRadius: 4, padding: 10, marginVertical: 10 }}>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                maxLength={maxLength}
            />
        </View>
    )
}

export default CustomInput