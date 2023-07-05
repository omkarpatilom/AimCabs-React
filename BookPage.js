import React, { useState } from "react";

import Constants from "expo-constants";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import DatePicker from "react-native-date-ranges";
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Button,
  Text,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { TextInput } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";


const GOOGLE_PLACES_API_KEY = ""; // Your Google Places API key
const BACKEND_API_URL = "http://192.168.1.12:8907/api/TripInfo"; // Replace this with your backend API URL

const App = () => {
  const navigation = useNavigation();

  const [pickupLocation, setPickupLocation] = React.useState("");
  const [dropLocation, setDropLocation] = React.useState("");
  const [distance, setDistance] = React.useState(null);

  const [selectedDates, setSelectedDates] = useState();
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleTimeChange = (time) => {
  setSelectedTime(time);
  setShowTimePicker(false);
};

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
        )}&destinations=${encodeURIComponent(
          dropLocation
        )}&key=${"AIzaSyCelDo4I5cPQ72TfCTQW-arhPZ7ALNcp8w"}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch distance data");
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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!apiResponse.ok) {
        throw new Error("Form submission failed");
      }

      console.log("Form submitted successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const customButton = (onConfirm) => {
    return (
      <Button
        onPress={onConfirm}
        style={{
          container: { width: "80%", marginHorizontal: "3%" },
          text: { fontSize: 20 },
        }}
        primary
        title="Submit"
      />
    );
  };

  {showTimePicker && (
  <DateTimePickerModal
    mode="time"
    isVisible={showTimePicker}
    onConfirm={handleTimeChange}
    onCancel={() => setShowTimePicker(false)}
  />
)}

  return (
    <View>
      <ScrollView>
        <View
          style={{
            margin: 20,
            borderColor: "#FFC72C",
            borderWidth: 3,
            borderRadius: 6,
          }}
        >
          {/* pick up */}
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              paddingHorizontal: 10,
              borderColor: "#FFC72C",
              borderWidth: 2,
              paddingVertical: 15,
            }}
          >
            <Feather name="search" size={24} color="black" />
            <TextInput placeholder="Enter your pickup point" />
          </Pressable>

          {/* Drop Point */}
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              paddingHorizontal: 10,
              borderColor: "#FFC72C",
              borderWidth: 2,
              paddingVertical: 15,
            }}
          >
            <Feather name="search" size={24} color="black" />
            <TextInput placeholder="Enter your drop point" />
          </Pressable>
          {/* Selected Dates */}
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              paddingHorizontal: 10,
              borderColor: "#FFC72C",
              borderWidth: 2,
              paddingVertical: 15,
            }}
          >
            <Feather name="calendar" size={24} color="black" />
            <DatePicker
              style={{
                width: 350,
                height: 30,
                borderRadius: 0,
                borderWidth: 0,
                borderColor: "transparent",
              }}
              customStyles={{
                placeholderText: {
                  fontSize: 15,
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: "auto",
                },
                headerStyle: {
                  backgroundColor: "#003580",
                },
                contentText: {
                  fontSize: 15,
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: "auto",
                },
              }}
              selectedBgColor="#0047AB"
              customButton={(onConfirm) => customButton(onConfirm)}
              onConfirm={(startDate, endDate) =>
                setSelectedDates(startDate, endDate)
              }
              allowFontScaling={false}
              placeholder={"Select Your Dates"}
              mode={"single"}
            />
          </Pressable>

          {/* Time */}
          <Pressable
            onPress={() => setShowTimePicker(true)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              paddingHorizontal: 10,
              borderColor: "#FFC72C",
              borderWidth: 2,
              paddingVertical: 15,
            }}
          >
            <Feather name="clock" size={24} color="black" />
            <TextInput
              placeholder="Select Time"
              value={selectedTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              editable={false}
            />
          </Pressable>

          {/* Time Picker Modal */}
          {showTimePicker && (
            <DateTimePickerModal
              mode="time"
              value={selectedTime}
              isVisible={showTimePicker} // Ensure the picker is visible based on showTimePicker state

              onConfirm={handleTimeChange}
               onCancel={() => setShowTimePicker(false)}
            />
          )}

          {/* Search Button */}
          <Pressable
            onPress={() => searchPlaces(route?.params.input)}
            style={{
              paddingHorizontal: 10,
              borderColor: "#FFC72C",
              borderWidth: 2,
              paddingVertical: 15,
              backgroundColor: "#2a52be",
              marginTop: 10, // Add margin to create vertical space
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                fontWeight: "500",
                color: "white",
              }}
            >
              Search
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    margin: 20,
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: "#ecf0f1",
  },
  distanceText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default App;