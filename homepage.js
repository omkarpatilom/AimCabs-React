

import React, { useState } from 'react';
import { View, Image, StyleSheet, TextInput, Button, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Homepage = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = async () => {
    try {
      const response = await fetch('http://192.168.1.12:8907/api/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      if (response.ok) {
        // Name and email exist in the database
        navigation.navigate('Home', { name, email });
      } else {
        // Name and email do not exist in the database
        setErrorMessage('Name or email do not exist');
      }
    } catch (error) {
      console.error('Error checking database:', error);
    }
  };

  const handleSkipTest = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/background.jpg')}
        style={styles.backgroundImage}
      />

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require('./assets/aim.jpg')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={text => setName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
          />

          <Button title="Login" onPress={handleFormSubmit} />
          <Button title="Create Account" onPress={() => {}} />

          {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        </View>
      </View>

      <Button title="Skip" onPress={handleSkipTest} style={styles.skipButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 300, 0.9)',
    padding: 20,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoImage: {
    width: 200,
    height: 50,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  skipButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default Homepage;
