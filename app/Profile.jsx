import React, { useCallback, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function Profile () {

    const [user, setUser] = useState({ username: '', email: ''})

    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("currentUser");
        setUser(storedUser ? JSON.parse(storedUser) : { username: "", email: "" });
      } catch (error) {
        alert("Error loading user data");
      }
    };
    useEffect(() => {
      loadUser();
    }, []);
    useFocusEffect(
      useCallback(() => {
        loadUser();
      }, [])
    );

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <View style={styles.underline}></View>
            <IconSymbol name='user-circle' size={130} color='black' style={styles.usericon}></IconSymbol>
            <Text style={styles.name}>{user.username}</Text>
            <Text style={styles.email}>{user.email}</Text>
        </View>
    )
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
      name: {
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: 'center',
      },
       email: {
        fontSize: 16,
        color: "gray",
        marginBottom: 20,
        alignSelf: 'center',
      },
      usericon: {
        alignSelf: 'center',
        marginTop: '40'
      }
})