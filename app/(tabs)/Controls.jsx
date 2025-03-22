import { StyleSheet, Text, View, Switch, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from "react";
import { IconSymbol } from '@/components/ui/IconSymbol';
import AsyncStorage from "@react-native-async-storage/async-storage";
// import Voice from "@react-native-community/voice";
import Voice from '@react-native-voice/voice';
import { Audio } from "expo-av";

export default function Controls() {
  const [fan, setFan] = useState(false);
  const [speakers, setSpeakers] = useState(false);
  const [lightBulb, setLightBulb] = useState(false);
  const [heater, setHeater] = useState(false);                                      
  const [startTimes, setStartTimes] = useState({});
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");

  useEffect(() => {
    const deviceStates = async () => {
      try{
        const storeDevices = await AsyncStorage.getItem('deviceState')
        const storedTimes = await AsyncStorage.getItem("deviceStartTimes")
        if (storeDevices) {
          const storageDevices = JSON.parse(storeDevices)
          setFan(storageDevices.fan)
          setSpeakers(storageDevices.speakers)
          setLightBulb(storageDevices.lightBulb)
          setHeater(storageDevices.heater)
        }
        if (storedTimes) {
          setStartTimes(JSON.parse(storedTimes))
        }
      }
      catch (error) {
        alert('Error device states')
      }
    }
    deviceStates()
  }, [])

  const saveDeviceStates = async (newStates) => {
    await AsyncStorage.setItem("deviceState", JSON.stringify(newStates));
  }
  const saveStartTime = async (device, isOn) => {
    let updatedTimes = { ...startTimes };

    if (isOn) {
      updatedTimes[device] = new Date().getTime(); // Store timestamp when turned ON
    } else {
      if (startTimes[device]) {
        const elapsedTime = new Date().getTime() - startTimes[device];
        saveHistory(device, elapsedTime);
      }
      delete updatedTimes[device]; // Remove timestamp when turned OFF
    }

    setStartTimes(updatedTimes);
    await AsyncStorage.setItem("deviceStartTimes", JSON.stringify(updatedTimes));
  };
  const saveHistory = async (device, duration) => {
    if (duration > 0) {
      const formattedTime = formatTime(duration);
      const storedHistory = await AsyncStorage.getItem("deviceHistory");
      let updatedHistory = storedHistory ? JSON.parse(storedHistory) : { fan: [], speakers: [], lightBulb: [], heater: [] };

      updatedHistory[device] = [...updatedHistory[device], formattedTime];
      await AsyncStorage.setItem("deviceHistory", JSON.stringify(updatedHistory));
    }
  };

  const formatTime = (milliseconds) => {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    seconds %= 60;
    minutes %= 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };
  useEffect(() => {
    const onSpeechResults = (event) => {
      if (event.value && event.value.length > 0) {
        setRecognizedText(event.value[0]);
        handleVoiceCommand(event.value[0]);
      }
    };
  
    const onSpeechError = (error) => {
      console.error("Speech recognition error:", error);
    };
  
    // Add event listeners
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    return () => {
    // Cleanup
    Voice.destroy().then(Voice.removeAllListeners);
  }; 
  }, []);    

  const requestMicrophonePermission = async () => {
    const { status } = await Audio.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Microphone permission is required to use voice commands.");
      return false;
    }
    return true;
  };  

  const startListening = async () => {
    const hasPermission = await requestMicrophonePermission();
    if (!hasPermission) return;
  
    try {
      setIsListening(true);
      await Voice.start("en-US");
    } catch (error) {
      console.error("Error starting voice recognition:", error);
    }
  };  

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (error) {
      console.error("Error stopping voice recognition:", error);
    }
  };

  const handleVoiceCommand = (command) => {
    console.log("Recognized command:", command);
    // Implement command logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Controls</Text>
      <View style={styles.underline}></View>
      <View style={styles.deviceContainer}>
      <IconSymbol name="fan" size={100} color={fan ? "green" : "gray"} />
      <Text style={styles.deviceName}>Fan</Text>
      <Switch
          value={fan}
          onValueChange={(value) => {
            setFan(value);
            saveDeviceStates({ fan: value, speakers, lightBulb, heater })
            saveStartTime("fan", value)
          }}
          trackColor={{ false: "red", true: "green" }}></Switch>
        <Text style={fan ? styles.onText : styles.offText}>{fan ? "ON" : "OFF"}</Text>
      </View>
      <View style={styles.deviceContainer}>
      <IconSymbol name="speakers" size={100} color={speakers ? "green" : "gray"} />
      <Text style={styles.deviceName}>Speaker</Text>
      <Switch
          value={speakers}
          onValueChange={(value) => {
            setSpeakers(value);
            saveDeviceStates({ fan, speakers: value, lightBulb, heater })
            saveStartTime("speakers", value)
          }}
          trackColor={{ false: "red", true: "green" }}></Switch>
        <Text style={speakers ? styles.onText : styles.offText}>{speakers ? "ON" : "OFF"}</Text>
      </View>
      <View style={styles.deviceContainer}>
      <IconSymbol name="lightBulb" size={100} color={lightBulb ? "green" : "gray"} />
      <Text style={styles.deviceName}>Light Bulb</Text>
      <Switch
          value={lightBulb}
          onValueChange={(value) => {
            setLightBulb(value);
            saveDeviceStates({ fan, speakers, lightBulb: value, heater });
            saveStartTime("lightBulb", value)
          }}
          trackColor={{ false: "red", true: "green" }}></Switch>
        <Text style={lightBulb ? styles.onText : styles.offText}>{lightBulb ? "ON" : "OFF"}</Text>
      </View>
      <View style={styles.deviceContainer}>
      <IconSymbol name="heater" size={100} color={heater ? "green" : "gray"} />
      <Text style={styles.deviceName}>Heater</Text>
      <Switch
          value={heater}
          onValueChange={(value) => {
            setHeater(value);
            saveDeviceStates({ fan, speakers, lightBulb, heater: value });
            saveStartTime("heater", value)
          }}
          trackColor={{ false: "red", true: "green" }}></Switch>
        <Text style={heater ? styles.onText : styles.offText}>{heater ? "ON" : "OFF"}</Text>
      </View>
      <TouchableOpacity
        style={styles.micButton}
        onPress={isListening ? stopListening : startListening}>
        <IconSymbol name="mic" size={50} color={isListening ? "green" : "gray"} /><Text>microphone</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    fontFamily: 'sans-serif',
  },
  title: {
    alignSelf: 'center',
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 60,
  },
  underline: {
    width: "100%", // Adjust width as needed
    height: 1, // Adjust thickness as needed
    marginTop: 10, // Spacing between title and underline
    backgroundColor: 'grey',
  },
  deviceContainer: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginVertical: 20,
    marginHorizontal: 30
  },
  deviceName: { 
    fontSize: 18, 
    marginLeft: 3, 
    flex: 1 
  },
  onText: { 
    color: "green", 
    fontWeight: "bold", 
    marginLeft: 10 
  },
  offText: { 
    color: "red", 
    fontWeight: "bold", 
    marginLeft: 3 
  },
  micButton: {
    marginTop: 10,
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
})
