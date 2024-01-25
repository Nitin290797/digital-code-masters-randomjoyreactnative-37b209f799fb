import { View, StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";

export default ({}) => {
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      if (counter > 0) {
        setCounter(counter - 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [counter]);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        marginTop: 15,
      }}
    >
      <View style={styles.countContainer}>
        <Text style={styles.count}>{counter}</Text>
      </View>
      <Text
        style={{ fontFamily: "Recursive-Bold", fontSize: 16, marginLeft: 5 }}
      >
        Sec
      </Text>
    </View>
  );
};

const styles = new StyleSheet.create({
  countContainer: {
    borderRadius: 50,
    borderWidth: 3,
    borderStyle: "solid",
    borderColor: "#FFB372",
    backgroundColor: "#FF7F11",
    width: 30,
  },
  count: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "Recursive-Bold",
    fontSize: 18,
  },
});
