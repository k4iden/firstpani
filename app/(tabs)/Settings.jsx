import { IconSymbol } from '@/components/ui/IconSymbol';
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from 'expo-router';

export default function Settings () {
    const router = useRouter();
  
    const toProfile = () => {
      router.push('/Profile')
    }
    const toReset = () => {
      router.push('/Forgotpassword')
    }
    const toLogout = () => {
      router.replace("/"); // Redirect to the home page
    };    
    const toTerms = () => {
      router.push('/Terms')
    }
    const toPrivacy = () => {
      router.push('/Privacy')
    }
    const toAbout = () => {
      router.push('/About')
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <View style={styles.underline}></View>
        <TouchableOpacity style={styles.profile} onPress={toProfile}><IconSymbol name='user' 
        size={26} color='black'></IconSymbol><Text style={styles.profileText}>Profile</Text></TouchableOpacity>
        <Text style={styles.general}>General Settings</Text>
        <TouchableOpacity style={styles.profile} onPress={toAbout}><IconSymbol name='questioncircleo' 
        size={26} color='black'></IconSymbol><Text style={styles.profileText}>About</Text></TouchableOpacity>
        <TouchableOpacity style={styles.profile} onPress={toTerms}><IconSymbol name='warning' 
        size={26} color='black'></IconSymbol><Text style={styles.profileText}>Terms & Conditions</Text></TouchableOpacity>
        <TouchableOpacity style={styles.profile} onPress={toPrivacy}><IconSymbol name='lock' 
        size={26} color='black'></IconSymbol><Text style={styles.profileText}>Privacy Policy</Text></TouchableOpacity>
        <TouchableOpacity style={styles.profile} onPress={toReset}><IconSymbol name='reset-password' 
        size={26} color='black'></IconSymbol><Text style={styles.profileText}>Reset Password</Text></TouchableOpacity>
        <TouchableOpacity style={styles.profile} onPress={toLogout}><IconSymbol name='logout' 
        size={26} color='black'></IconSymbol><Text style={styles.profileText}>Logout</Text></TouchableOpacity>
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
      profile: {
        flexDirection: "row",
        alignItems: 'center',
        paddingHorizontal: 50,
        paddingVertical: 30,
      },
      profileText: {
        marginLeft: 10, // 🔹 Adds spacing between icon & text
        fontSize: 20,
      },
      general: {
        fontSize: 21,
        fontWeight: 'bold',
        marginLeft: 20
      }
})