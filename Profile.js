import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


  // Example of retrieving user data from AsyncStorage
  const MyComponent = () => {
    const [userData, setUserData] = useState(null);
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData !== null) {
          // User data found, parse and set it
          const user = JSON.parse(userData);
          console.log(userData);
          setUserData(user);
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };
  
    return (
      <View style={styles.container}>
        {userData ? (
          <View>
             <Text>username: {userData.username}</Text>
            <Text>Name: {userData.name}</Text>
            <Text>Email: {userData.email}</Text>
            <Text>Age: {userData.age}</Text>
            <Text>Phone: {userData.phone}</Text>
            <Text>Gender: {userData.gender}</Text>
            {/* Render other user data */}
          </View>
        ) : (
          <Text>No user data found</Text>
        )}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  
  export default MyComponent;