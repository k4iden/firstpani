import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Signup() {
    const router = useRouter();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const handleRegister = async () => {
        if (!username || !password || !email) {
            alert('Please fill out the form first');
            return;
          }
          try{
            const storedUsers = await AsyncStorage.getItem("users");
            const users = storedUsers ? JSON.parse(storedUsers) : [];
            const userExist = users.find((user) => user.username === username)
            if (userExist) {
                alert('User already exists')
                setUsername('');
                setPassword('');
                setEmail('')
                return;
            }
                const newUser = { username, password, email };
                users.push(newUser);
                await AsyncStorage.setItem("users", JSON.stringify(users));
                await AsyncStorage.setItem('currentUser', JSON.stringify(newUser))
                alert('Account created successfully')
                setUsername('');
                setPassword('');
                setEmail('')
          }
        catch(error) {
            alert('Something went wrong')
        }
    }
    return (
        <View style={styles.container}>
        <Text style={styles.signup}>Sign Up</Text>
        <TextInput style={styles.input} placeholder='Username' value={username} 
            onChangeText={setUsername} />
        <TextInput style={styles.password} placeholder='Password' secureTextEntry={true} 
            value={password} onChangeText={setPassword} />
        <TextInput style={styles.password} placeholder='Enter your email' 
        value={email} onChangeText={setEmail}></TextInput>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Create Account</Text></TouchableOpacity>
        </View>
      );
}
const styles = StyleSheet.create({
    container: { 
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        fontFamily: 'sans-serif',
    },
    signup: {
        fontSize: 25,
        marginTop: 250,
        paddingBottom: 30,
        fontWeight: 'bold'
    },
    input: {
        width: 300,
        height: 40,
        borderRadius: 10,
        marginBottom: 15,
        borderWidth: 2,
        borderColor: 'black',
    },
    password:{
        width: 300,
        height: 40,
        borderRadius: 10,
        marginBottom: 15,
        borderWidth: 2,
        borderColor: 'black',
      },
    button:{
        width: 150,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        color: 'black',
        borderWidth: 2,
        borderColor: 'black',
        marginTop: 15,
        marginBottom: 10,
        justifyContent: 'center',  // Centers the content vertically
        alignItems: 'center',
      },
    buttonText:{
        fontSize: 16,
        fontWeight: 'bold',
      },
  });