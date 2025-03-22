import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function Terms () {

    return(
        <View style={styles.header}>
            <Text style={styles.title}>Terms & Conditions</Text>
            <View style={styles.underline}></View>
            <View style={styles.box}>
                <Text style={styles.regularText}>
                By using the Home Comfort App, you agree to comply with these Terms & Conditions.
                </Text>
                <Text style={styles.regularText}>
                This legal agreement outlines the rules and guidelines for app usage, including restrictions on prohibited activities,
                intellectual property rights, and limitations of liability.
                </Text>
                <Text style={styles.regularText}>
                We reserve the right to terminate access for violations. This agreement is subject to applicable laws and may be updated periodically.
                </Text>
                <Text style={styles.regularText}>
                Please review regularly for changes.
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