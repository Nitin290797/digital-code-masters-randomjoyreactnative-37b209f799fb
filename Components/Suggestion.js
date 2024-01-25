import React from 'react'
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';


const data = [
    {
        tag: "Relationship",
        text: "want to I love you to my wife and kids "
    },
    {
        tag: "Finance",
        text: "Every day I should call my mom this week and talk to ger for 15mins at least month"
    },
    {
        tag: "Finance",
        text: "I want to save 10% of my earnings starting this month."
    }
]

const Suggestion = ({ setState }) => {
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <Pressable style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginHorizontal: 10, marginVertical: 20 }} onPress={() => setState(false)}>
                        <Ionicons name='arrow-back' size={30} />
                        <Text style={{ fontSize: 26, fontWeight: '400' }}>Suggestion</Text>
                    </Pressable>
                    {data.map((item) => (
                        <Pressable key={item.tag} style={{ padding: 25, backgroundColor: '#DEF6FB', justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                            <View style={{ position: 'absolute', top: 0, right: 0, backgroundColor: '#00D3FF', padding: 4, borderBottomLeftRadius: 5 }}>
                                <Text style={{ fontSize: 16 }}>{item.tag}</Text>
                            </View>
                            <Text style={{ fontSize: 16 }}>
                                {item.text}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Suggestion

const styles = StyleSheet.create({
    container: {
        height: hp('100%'),
        backgroundColor: '#FFF'
    }
})