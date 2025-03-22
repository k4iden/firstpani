import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [step, setStep] = useState(1);
  const [newPassword, setNewPassword] = useState('');
  const router = useRouter();

  const handleForgotPassword = async () => {
    try {
      const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
      const user = users.find((u) => u.email === email);

      if (user) {
        const code = Math.floor(100000 + Math.random() * 900); // 6-digit code
        setGeneratedCode(code.toString()); 
        alert(`Your reset code is: ${code}`);
        setStep(2);
      } else {
        alert('Email not found.');
      }
    } catch (error) {
      alert('An error occurred while trying to reset your password.')
    }
  };
  const verifyCode = () => {
    if (resetCode === generatedCode) {
        alert('Verified code!')
        setResetCode('')
        setStep(3)
    }
    else {
        alert('Invalid reset code')
    }
  }
  const resetPassword = async () => {
    if (!newPassword) {
        alert('Please enter a new password')
        return
    }
    try {
        const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
        const updatedUsers = users.map((user) =>
        user.email === email ? { ...user, password: newPassword } : user)
    await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
    alert('Password reset successfully!');
    setNewPassword('')
  } 
  catch (error) {
    alert('An error occurred while resetting the password.');
    }
  }

  return (
    <View style={styles.container}>
      {step === 1 && (
        <>
        <Text style={styles.title}>Forgot Password</Text>
      <TextInput style={styles.input} placeholder="Enter your email"
        value={email} onChangeText={setEmail}/>
      <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
        </>
      )}
      {step === 2 && (
        <>
        <Text style={styles.title}>Reset Code</Text>
        <TextInput style={styles.input} placeholder='Enter the reset code' 
        value={resetCode} onChangeText={setResetCode}></TextInput>
        <TouchableOpacity style={styles.button} onPress={verifyCode}>
        <Text style={styles.buttonText}>Verify Code</Text></TouchableOpacity>
        </>
      )}
      {step === 3 && (
        <>
        <Text style={styles.title}>Reset Password</Text>
        <TextInput style={styles.input} placeholder='Enter new password' 
        secureTextEntry={true} value={newPassword} onChangeText={setNewPassword}></TextInput>
        <TouchableOpacity style={styles.reset} onPress={resetPassword}>
        <Text style={styles.buttonText}>Confirm Password</Text></TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    width: 100,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reset: {
    width: 150,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
