// UserCreationScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const UserCreationScreen = ({ onUserCreated, onCancel }) => {
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');

  const handleCreateUser = async () => {
    try {
      const response = await axios.post(
        'https://movie-api-9ds8.onrender.com/api/v1/user/signup',
        {
          name: newUserName,
          email: newUserEmail,
          password: newUserPassword,
          confirmPassword: newUserPassword, // adjust as needed
          userType: 'individual',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        // Clear the form fields
        setNewUserName('');
        setNewUserEmail('');
        setNewUserPassword('');

        // Notify the parent component that a new user is created
        onUserCreated();
      } else {
        console.log('User create successfully refresh page' );
        fetchUsers();
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={newUserName}
        onChangeText={(text) => setNewUserName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={newUserEmail}
        onChangeText={(text) => setNewUserEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={newUserPassword}
        onChangeText={(text) => setNewUserPassword(text)}
      />
      <View style={styles.buttonContainer}>
        <Button title="Create User" onPress={handleCreateUser} />
        <Button title="Cancel" onPress={onCancel} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default UserCreationScreen;
