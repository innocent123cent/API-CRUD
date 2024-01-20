// UserListScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Button } from 'react-native';
import UserEditScreen from './UserEditScreen';
import UserCreationScreen from './UserCreationScreen';
import { deleteUser } from './UserDeleteScreen';
import axios from 'axios';

const UserListScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUserCreationScreen, setShowUserCreationScreen] = useState(false);
  const [showUserEditScreen, setShowUserEditScreen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleDeleteUser = async (userId) => {
    try {
      // Call the delete function
      await deleteUser(userId);
      // After deletion, refresh the user list
      fetchUsers();
    } catch (error) {
      console.error('Error handling delete user:', error);
    }
  };

  const handleEditUser = (userId) => {
    // Show the user edit screen
    setSelectedUserId(userId);
    setShowUserEditScreen(true);
  };

  const handleUserEditCancel = () => {
    // Hide the user edit screen
    setShowUserEditScreen(false);
    // Reset the selected user ID
    setSelectedUserId(null);
  };

  const handleUserEdit = () => {
    // After user edit, refresh the user list
    fetchUsers();
    // Hide the user edit screen
    setShowUserEditScreen(false);
    // Reset the selected user ID
    setSelectedUserId(null);
  };

  const handleUserCreated = () => {
    // Refresh the user list after creating a new user
    fetchUsers();
    // Hide the user creation screen after successful creation
    setShowUserCreationScreen(false);
  };

  const toggleUserCreationScreen = () => {
    setShowUserCreationScreen(!showUserCreationScreen);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://movie-api-9ds8.onrender.com/api/v1/user/all', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200 && response.data && response.data.clients) {
        setUsers(response.data.clients.reverse());
        setError(null);
      } else {
        setError('Invalid API response');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>User List</Text>

      {/* Button to toggle user creation screen visibility */}
      <Button title={showUserCreationScreen ? 'Hide Form' : 'add User'} onPress={toggleUserCreationScreen} />

      {/* User creation screen */}
      {showUserCreationScreen && (
        <UserCreationScreen onUserCreated={handleUserCreated} onCancel={toggleUserCreationScreen} />
      )}

      {/* User edit screen */}
      {showUserEditScreen && (
        <UserEditScreen
          userId={selectedUserId}
          onUserEdit={handleUserEdit}
          onCancel={handleUserEditCancel}
        />
      )}

      {/* User list */}
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Text style={styles.userName}>{item.name}</Text>
            <Button title="Edit" onPress={() => handleEditUser(item._id)} />
            <Button color="red" title="Delete" onPress={() => handleDeleteUser(item._id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  userContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
  },
});

export default UserListScreen;
