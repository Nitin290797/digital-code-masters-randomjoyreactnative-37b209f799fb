import { StyleSheet, Text, View } from "react-native";
export function Hr(props){
    return(
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1, height: 1, backgroundColor: props.color ? props.color : '#1F2A37'}} />
            {props.children !== undefined && <>
                <View>
                    <Text style={Styles.Text}>{props.children}</Text>
                </View>
                <View style={{flex: 1, height: 1, backgroundColor: '#1F2A37'}} />
            </>}
        </View>
    )
}
const Styles=StyleSheet.create({
    Text:{
        textAlign: 'center',
        marginHorizontal:5,
        fontFamily:'Recursive-Medium',
        fontSize:12,
        color:'#1F2A37',
    }
})