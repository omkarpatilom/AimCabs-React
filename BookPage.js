import * as React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import Constants from 'expo-constants';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import geolib from 'geolib';
import Header from './Components/Header';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";



const GOOGLE_PLACES_API_KEY = ''; // Your Google Places API key
const BACKEND_API_URL = 'http://192.168.1.12:8907/api/TripInfo'; // Replace this with your backend API URL




  

const App = () => {

    const navigation = useNavigation();

  const [pickupLocation, setPickupLocation] = React.useState('');
  const [dropLocation, setDropLocation] = React.useState('');
  const [distance, setDistance] = React.useState(null);
   React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "AimCabBooking",
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
      },
      headerStyle: {
        backgroundColor: "#003580",
        height: 110,
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
      headerRight: () => (
        <Ionicons
          name="notifications-outline"
          size={24}
          color="white"
          style={{ marginRight: 12 }}
        />
      ),
    });
  }, []);

  const handleSubmit = async () => {
    try {
      // Fetch distance between pickup and drop locations using Google Maps Distance Matrix API
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
          pickupLocation
        )}&destinations=${encodeURIComponent(dropLocation)}&key=${'AIzaSyCelDo4I5cPQ72TfCTQW-arhPZ7ALNcp8w'}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch distance data');
      }

      const data = await response.json();

      // Extract distance value (in meters) from the API response
      const distanceInMeters = data?.rows[0]?.elements[0]?.distance?.value;

      // Convert distance from meters to kilometers
      const distanceInKilometers = distanceInMeters / 1000;

      // Set the distance in the state
      setDistance(distanceInKilometers);

      // Prepare the data object with form information and distance
      const formData = {
        pickupLocation,
        dropLocation,
        distance: distanceInKilometers,
      };

      // Send the data to the backend API using a POST request
      const apiResponse = await fetch(BACKEND_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!apiResponse.ok) {
        throw new Error('Form submission failed');
      }

      console.log('Form submitted successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
     <View>
      
    <View style={styles.container}>
      
      <GooglePlacesAutocomplete
        placeholder="Pickup Location"
        query={{
          key: 'AIzaSyCelDo4I5cPQ72TfCTQW-arhPZ7ALNcp8w',
          language: 'en',
        }}
        onPress={(data, details = null) => setPickupLocation(data.description)}
        onFail={(error) => console.error(error)}
      />
      <GooglePlacesAutocomplete
        placeholder="Drop Location"
        query={{
          key: 'AIzaSyCelDo4I5cPQ72TfCTQW-arhPZ7ALNcp8w',
          language: 'en',
        }}
        onPress={(data, details = null) => setDropLocation(data.description)}
        onFail={(error) => console.error(error)}
      />
      <Button title="Submit" onPress={handleSubmit} />
      {distance && (
        <Text style={styles.distanceText}>Distance: {distance} km</Text>
      )}
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    margin: 20,
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: '#ecf0f1',
  },
  distanceText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
