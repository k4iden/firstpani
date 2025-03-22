import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function Privacy () {

    return(
        <View style={styles.header}>
            <Text style={styles.title}>Privacy Policy</Text>
            <View style={styles.underline}></View>
            <View style={styles.box}>
                <Text style={styles.regularText}>
                Your privacy is important to us. The Home Comfort App, developed in Cebu City, 
                collects data such as usage patterns and device information to enhance your experience. 
                </Text>
                <Text style={styles.regularText}>
                We may share data with trusted partners for service improvement. Security measures 
                are in place to protect your information. You have the right to access and manage your data. 
                </Text>
                <Text style={styles.regularText}>
                For privacy concerns, please contact us at shinrai@gmail.com. 
                This policy may be updated periodically.
                </Text>
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
})