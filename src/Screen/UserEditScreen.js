// UserEditScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const UserEditScreen = ({ userId, onUserEdit, onCancel }) => {
  const [name, setNewUserName] = useState('');

  const BASE_URL = 'https://movie-api-9ds8.onrender.com/api/v1';

  const editUserName = async () => {
    try {
      const response = await axios.put(
        `${BASE_URL}/user/edit/${userId}`,  // Include the user ID in the URL
        {
          name,  // Include the updated information
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setNewUserName('');
        console.log('User name updated successfully');
        // Call the onUserEdit function to notify the parent component
        onUserEdit();
      } else {
        console.error('Invalid API response:', response);
      }
    } catch (error) {
      console.error('Error updating user name:', error);
    }
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setNewUserName(text)}
      />
      <View style={styles.buttonContainer}>
        <Button title="Update User" onPress={editUserName} />
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

export default UserEditScreen;
