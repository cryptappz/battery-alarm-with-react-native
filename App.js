import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Battery from "expo-battery";
import { Audio } from "expo-av";

const App = () => {
  const [level, setLevel] = useState(0);

  const getLevel = async () => {
    console.log("A: " + (await Battery.getBatteryLevelAsync()));
    let batteryLevel = Math.round((await Battery.getBatteryLevelAsync()) * 100);
    setLevel(batteryLevel);
    Battery.addBatteryLevelListener(({ batteryLevel }) => {
      batteryLevel = Math.round(batteryLevel * 100);
      setLevel(batteryLevel);
      if (batteryLevel == 22) {
        playAlert();
      }
      console.log("B: " + batteryLevel);
    });
  };

  const playAlert = async () => {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(require("./assets/alert.mp3"));
      await soundObject.playAsync();
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    // Anything in here is fired on component mount.
    // componentDidMount
    getLevel();
    return () => {
      // Anything in here is fired on component unmount.
      // componentWillUnmount
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{level}%</Text>
      <Text style={{ color: "#adb5bd", position: "absolute", bottom: 50 }}>
        v1.0.0
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#21252a",
  },
  text: {
    color: "#adb5bd",
    fontSize: 50,
    fontWeight: "bold",
  },
});

export default App;
