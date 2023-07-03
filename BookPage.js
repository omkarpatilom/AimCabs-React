import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, Button } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native';

const Form = () => {
  const navigation = useNavigation();

  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = () => {
    // Check if all fields are entered
    if (
      pickupLocation.trim() === '' ||
      dropLocation.trim() === '' ||
      name.trim() === '' ||
      email.trim() === '' ||
      phoneNumber.trim() === '' ||
      date.trim() === '' ||
      time.trim() === ''
    ) {
      console.log('Please fill in all fields');
      return;
    }

    // Prepare the data object with form information
    const data = {
      pickupLocation,
      dropLocation,
      name,
      email,
      phoneNumber,
      date,
      time,
    };

    // Send the data to the Spring Boot backend using a fetch request
    fetch('http://192.168.1.12:8907/api/getuserinfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (response.ok) {
          console.log('Form submitted successfully');
          // Navigate to the "Cabs" page
          navigation.navigate('Cabs');
        } else {
          console.log('Form submission failed');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <View style={styles.container}>
     <View style={styles.inputContainer}>
        <TextInput
        style={styles.textInput}
          placeholder="Pickup Location"
          value={pickupLocation}
          onChangeText={text => setPickupLocation(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
        style={styles.textInput}
          placeholder="Drop Location"
          value={dropLocation}
          onChangeText={text => setDropLocation(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Name"
          value={name}
          onChangeText={text => setName(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Date"
          value={date}
          onChangeText={text => setDate(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Time"
          value={time}
          onChangeText={text => setTime(text)}
        />
      </View>
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  autocompleteContainer: {
    marginBottom: 40,
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
  },
  textInput: {
    height: 40,
  },
});

export default Form;
