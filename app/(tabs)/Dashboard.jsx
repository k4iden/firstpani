import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { IconSymbol } from "@/components/ui/IconSymbol";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Dashboard() {
  const [fanTime, setFanTime] = useState(0);
  const [speakersTime, setSpeakersTime] = useState(0);
  const [lightBulbTime, setLightBulbTime] = useState(0);
  const [heaterTime, setHeaterTime] = useState(0);
  const [history, setHistory] = useState({ fan: [], speakers: [], lightBulb: [], heater: [] })
  const [deviceStatus, setDeviceStatus] = useState({ fan: false, speakers: false, lightBulb: false, heater: false })

  useEffect(() => {
    const loadStartTimes = async () => {
      const storedTimes = await AsyncStorage.getItem("deviceStartTimes");
      const storedHistory = await AsyncStorage.getItem("deviceHistory")
      if (storedTimes) {
        const times = JSON.parse(storedTimes);
        updateElapsedTime(times);
      }
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    };
    
    loadStartTimes();
    const interval = setInterval(() => loadStartTimes(), 1000);
    return () => clearInterval(interval);
  }, []);

  const updateElapsedTime = (times) => {
    const now = new Date().getTime();
    setFanTime(times.fan ? now - times.fan : 0);
    setSpeakersTime(times.speakers ? now - times.speakers : 0);
    setLightBulbTime(times.lightBulb ? now - times.lightBulb : 0);
    setHeaterTime(times.heater ? now - times.heater : 0);
    setDeviceStatus({
      fan: !!times.fan,
      speakers: !!times.speakers,
      lightBulb: !!times.lightBulb,
      heater: !!times.heater,
    });
  };
  const formatTime = (milliseconds) => {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    seconds %= 60;
    minutes %= 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Devices</Text>
      <View style={styles.underline} />
      <View style={styles.deviceContainer}>
        <IconSymbol name="fan" size={100} color={deviceStatus.fan ? "green" : "gray"} />
        <Text style={styles.deviceName}>Fan</Text>
        <View style={styles.texter}>
        <Text style={styles.timerText}>{formatTime(fanTime)}</Text>
        <Text style={styles.historyText}> {history.fan.length > 
        0 ? history.fan[history.fan.length - 1] : ""}</Text>
        </View>
      </View>
      
      <View style={styles.deviceContainer}>
        <IconSymbol name="speakers" size={100} color={deviceStatus.speakers ? "green" : "gray"} />
        <Text style={styles.deviceName}>Speaker</Text>
        <View style={styles.texter}>
        <Text style={styles.timerText}>{formatTime(speakersTime)}</Text>
        <Text style={styles.historyText}> {history.speakers.length > 
        0 ? history.speakers[history.speakers.length - 1] : ""}</Text>
        </View>
      </View>

      <View style={styles.deviceContainer}>
        <IconSymbol name="lightBulb" size={100} color={deviceStatus.lightBulb ? "green" : "gray"} />
        <Text style={styles.deviceName}>Light Bulb</Text>
        <View style={styles.texter}>
        <Text style={styles.timerText}>{formatTime(lightBulbTime)}</Text>
        <Text style={styles.historyText}> {history.fan.length > 
        0 ? history.lightBulb[history.lightBulb.length - 1] : ""}</Text>
        </View>
      </View>

      <View style={styles.deviceContainer}>
        <IconSymbol name="heater" size={100} color={deviceStatus.heater ? "green" : "gray"} />
        <Text style={styles.deviceName}>Heater</Text>
        <View style={styles.texter}>
        <Text style={styles.timerText}>{formatTime(heaterTime)}</Text>
        <Text style={styles.historyText}> {history.fan.length > 
        0 ? history.heater[history.heater.length - 1] : ""}</Text>
        </View>
      </View>
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
    width: "100%",
    height: 1, 
    marginTop: 10, 
    backgroundColor: 'grey',
  },
  deviceContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  deviceName: { fontSize: 18, flex: 1, fontWeight: "bold" },
  timerText: { fontSize: 16, fontWeight: "bold", color: "#333" },
  historyText: { 
    fontSize: 14, 
    fontWeight: "bold", 
    marginTop: 10
  },
  texter: {
    flexDirection: 'column',
    alignItems: "center",
    marginHorizontal: 30,
  }
});
