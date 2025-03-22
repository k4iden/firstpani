import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function About () {

    return(
        <View style={styles.header}>
            <Text style={styles.title}>About</Text>
            <View style={styles.underline}></View>
            <View style={styles.box}>
                <Text style={styles.regularText}>
                Home Comfort App, version 1.2, provides voice-controlled management of your home's 
                comfort devices. This app allows remote control of lights, speaker, heather, and fans. 
                </Text>
                <Text style={styles.regularText}>
                Developed by: 
                </Text>
            <View style={styles.names}>
                <Text>Godinez, Mary Grace</Text><Text>Muñoz, Johnwin</Text></View>
            <View style={styles.names}>
                <Text>Pepino, Cybille Jean M.</Text><Text>Sasan, Cyrel Joy S.</Text></View>
                <Text style={styles.regularText}>For support, contact shinrai@gmail.com 
                        Copyright © 2025 Shinrai Corp. 
                        Developed in Cebu City, Philippines</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        backgroundColor: '#fff',
        fontFamily: 'sans-serif',
        alignItems: 'center',
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
        marginBottom: 50,
      },
      box: {
        maxWidth: '80%',
        maxHeight: '80%',
      },
      regularText: {
        marginBottom: 30,
        textAlign: "center",
        fontSize: 19,
      },
      names: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '70',
        fontSize: 19,
      }
})