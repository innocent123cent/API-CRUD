
import axios from 'axios';

const BASE_URL = 'https://movie-api-9ds8.onrender.com/api/v1';

export const deleteUser = async (userId) => {
    console.log('Delete user function called with userId:', userId);
  try {
    const response = await axios.delete(`${BASE_URL}/user/delete/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      console.log('User deleted successfully');
    } else {
      console.error('Invalid API response:', response);
    }
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};
