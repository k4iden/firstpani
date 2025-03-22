import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  useEffect(() => {
    const initializeUsers = async () => {
      try {
        const storedUsers = await AsyncStorage.getItem("users");
        const users = storedUsers ? JSON.parse(storedUsers) : [];
        const adminExists = users.findIndex((user) => user.username === "admin123");
        if (adminExists === -1) {
          users.push({ username: "admin123", password: "system123" });
        }
        else{
          users[adminExists] = { username: 'admin123', password: 'system123'}
        }
        await AsyncStorage.setItem("users", JSON.stringify(users));
      } catch (error) {
        alert('Something went wrong')
      }
    };

    initializeUsers();
  }, []);
    const handleLogin = async () => {
      const storedUsers = await AsyncStorage.getItem("users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      const user = users.find(
        (u) => u.username === username && u.password === password
      )
      if(user){
        await AsyncStorage.setItem("currentUser", JSON.stringify(user))
        alert('Login successful!')
        router.push('/Dashboard')
        setUsername('');
        setPassword('');
      }
      else if (!username || !password)
        alert('Please fill out the form first')
      else {
        alert('Invalid username or password')
        setUsername('')
        setPassword('')
      }
    }
    const toSignup = () => {
      router.push('/Signup')
    }
    const toForgot = () => {
      router.push('/Forgotpassword')
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Comfort App</Text>
      <Text style={styles.login}>Log in</Text>
      <TextInput style={styles.input} placeholder='Username' value={username} 
      onChangeText={setUsername} />
      <TextInput style={styles.password} placeholder='Password' secureTextEntry={true} 
      value={password} 
      onChangeText={setPassword} />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text></TouchableOpacity>
      <Text>Don't have an account?{''}
        <Text style={styles.signuplink} onPress={toSignup}>Sign up</Text>
      </Text>
      <TouchableOpacity onPress={toForgot}>
      <Text style={styles.forgotlink}>Forgot Password?</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 200,
  },
  login: {
    fontSize: 25,
    marginTop: 80,
    paddingBottom: 30,
    fontWeight: 'bold',
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
    width: 100,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    color: 'black',
    borderWidth: 2,
    borderColor: 'black',
    marginTop: 15,
    marginBottom: 20,
    justifyContent: 'center',  // Centers the content vertically
    alignItems: 'center',
  },
  buttonText:{
    fontSize: 16,
    fontWeight: 'bold',
  },
  signuplink:{
    fontSize: 16,
    textDecorationLine: 'underline',
    color: 'blue',
    fontWeight: 'bold',
  },
  forgotlink: {
    textDecorationLine: 'underline',
    marginTop: 10,
  }
});
