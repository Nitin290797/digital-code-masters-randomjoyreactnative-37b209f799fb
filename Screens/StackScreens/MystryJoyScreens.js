import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const MystryJoyScreens = ({ navigation }) => {
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                        <Image source={require("../../assets/Resources/Images/gift.png")} style={{ height: hp('70%'), width: wp('90%'), borderRadius: 12 }} />
                        <Text style={{ textAlign: 'center', marginVertical: 20, fontSize: 28, fontWeight: '600' }}>A gift from a friend</Text>
                    </View>
                    <Pressable onPress={() => navigation.navigate('Commitment1')} style={{}}>
                        <Image source={require("../../assets/Resources/Images/Key.png")} />
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default MystryJoyScreens

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: hp('90%'),
    }
})