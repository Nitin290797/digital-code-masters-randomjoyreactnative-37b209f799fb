import { Button } from "./Button";
import { View, StyleSheet, Image, TouchableOpacity, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const CommitmentComplete = ({ setStep }) => {
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: 'center' }}>
          <Image source={require('../assets/Resources/Images/complete.png')} style={{ height: hp('55%'), width: wp('90%') }} />
          <Text style={{ marginVertical: 10, textAlign: 'center', fontSize: 16, fontWeight: 500 }}>Have you completed the{"\n"}commitment?</Text>
          <Button colorScheme={2} styles={{ marginTop: 10, width: 150 }} onPress={() => setStep(2)}>Yes</Button>
          <Button isOutline={true} colorScheme={2} onPress={() => setStep(4)} styles={{ marginTop: 10, width: 150 }} >No</Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
});

export default CommitmentComplete;
