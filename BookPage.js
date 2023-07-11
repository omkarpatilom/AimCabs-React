import React, { useState,useRef  } from "react";
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
  Text,
  TextInput,
  Animated, Easing
} from "react-native";
import { Feather } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const GOOGLE_PLACES_API_KEY = "AIzaSyCelDo4I5cPQ72TfCTQW-arhPZ7ALNcp8w";
const BACKEND_API_URL = "YOUR_BACKEND_API_URL";

const App = () => {
  const navigation = useNavigation();

  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [distance, setDistance] = useState(null);

  const [selectedDates, setSelectedDates] = useState();
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [tripType, setTripType] = useState("one way"); // State to track the selected trip type

  const [showRentalField, setShowRentalField] = useState(false); // New state variable

  const rentalFieldHeight = useRef(new Animated.Value(0)).current; // Animation property


  

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    setShowTimePicker(false);
  };

  const handleTripTypePress = (event) => {
    const type = event; // or event.target.value, depending on the event object structure
    setTripType(type);
    setSelectedDates(null);
  
    // Toggle the rental field visibility
    if (type === "rental") {
      setShowRentalField(true);
      Animated.timing(rentalFieldHeight, {
        toValue: 200, // Adjust the height as needed
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    } else {
      setShowRentalField(false);
      Animated.timing(rentalFieldHeight, {
        toValue: 0,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    }
  };
  
  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "",
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
        )}&key=${GOOGLE_PLACES_API_KEY}`
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
        tripType,
        selectedDates,
        selectedTime,
      };

      // Send the data to the SelectCabPage component using navigation
      navigation.navigate("SelectCab", { formData: formData });

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
      <Pressable onPress={onConfirm} style={styles.customButton}>
        <Text style={styles.customButtonText}>Submit</Text>
      </Pressable>
    );
  };

  return (
    <View>
      <View>
        <View
          style={{
            margin: 20,
            borderColor: "#FFC72C",
            borderWidth: 3,
            borderRadius: 6,
          }}
        >
          {/* Button container */}
          <View style={styles.checkboxContainer}>
            {/* Single Trip button */}
            <Pressable
              style={[
                styles.checkbox,
                tripType === "one way" && { backgroundColor: "#FFC72C" },
              ]}
              onPress={() => handleTripTypePress("one way")}
            >
              <Text>One Way</Text>
            </Pressable>

            {/* Round Trip button */}
            <Pressable
              style={[
                styles.checkbox,
                tripType === "round" && { backgroundColor: "#FFC72C" },
              ]}
              onPress={() => handleTripTypePress("round")}
            >
              <Text>Round Trip</Text>
            </Pressable>

            {/* Rental button */}
            <Pressable
              style={[
                styles.checkbox,
                tripType === "rental" && { backgroundColor: "#FFC72C" },
              ]}
              onPress={() => handleTripTypePress("rental")}
            >
              <Text>Rental</Text>
            </Pressable>
          </View>

          {/* Pick up */}
          <Pressable
            style={[styles.inputContainer, styles.button]}
          >
            <GooglePlacesAutocomplete
              placeholder="Pickup Point"
              query={{
                key: GOOGLE_PLACES_API_KEY,
                language: "en",
              }}
              onPress={(data, details = null) => {
                setPickupLocation(data.description);
              }}
              onFail={(error) => console.error(error)}
            />
          </Pressable>

          {/* Drop Point */}
          <Pressable
            style={[styles.inputContainer, styles.button]}
          >
            <GooglePlacesAutocomplete
              placeholder="Drop Point"
              query={{
                key: GOOGLE_PLACES_API_KEY,
                language: "en",
              }}
              onPress={(data, details = null) => {
                setDropLocation(data.description);
              }}
              onFail={(error) => console.error(error)}
            />
          </Pressable>

          {/* Selected Dates */}
          <Pressable
            style={[styles.inputContainer, styles.button]}
          >
            <Feather name="calendar" size={24} color="black" />
            <DatePicker
              style={styles.datePicker}
              customStyles={{
                placeholderText: styles.datePickerPlaceholder,
                headerstyle: styles.datePickerHeader,
                contentText: styles.datePickerContent,
              }}
              selectedBgColor="#0047AB"
              customButton={(onConfirm) => customButton(onConfirm)}
              onConfirm={(startDate, endDate) =>
                setSelectedDates(startDate, endDate)
              }
              allowFontScaling={false}
              placeholder={"Select Your Dates"}
              mode={tripType === "round" ? "range" : "single"} // Update the mode based on tripType state
            />
          </Pressable>

          {/* Time */}
          <Pressable
            onPress={() => setShowTimePicker(true)}
            style={[styles.inputContainer, styles.button]}
          >
            <Feather name="clock" size={24} color="black" />
            <TextInput
              placeholder="Select Time"
              value={selectedTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              editable={false}
              style={styles.timeInput}
            />
          </Pressable>

          {/* Time Picker Modal */}
          {showTimePicker && (
            <DateTimePickerModal
              mode="time"
              value={selectedTime}
              isVisible={showTimePicker}
              onConfirm={handleTimeChange}
              onCancel={() => setShowTimePicker(false)}
            />
          )}

           {/* Rental field */}
           {showRentalField && (
            <Animated.View style={{ height: rentalFieldHeight }}>
              <TextInput
                placeholder="Enter hours"
                style={[styles.inputContainer, styles.button]}
              />
            </Animated.View>
          )}


          
        </View>
        {/* Search Button */}
        <Pressable
            onPress={handleSubmit}
            style={[styles.button, styles.searchButton]}
          >
            <Text style={styles.searchButtonText}>Search</Text>
          </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 14,
    marginTop: 20,
    marginBottom: 10,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderColor: "#FFC72C",
    borderWidth: 2,
    paddingVertical: 15,
    marginBottom: 2,
  },
  datePicker: {
    width: 350,
    height: 30,
    borderRadius: 0,
    borderWidth: 0,
    borderColor: "transparent",
    flex: 1,
  },
  datePickerPlaceholder: {
    fontSize: 15,
    marginRight: "auto",
  },
  datePickerHeader: {
    backgroundColor: "#003580",
  },
  datePickerContent: {
    fontSize: 15,
    marginRight: "auto",
  },
  timeInput: {
    flex: 1,
  },
  searchButton: {
    paddingHorizontal: 10,
    borderColor: "#FFC72C",
    borderWidth: 2,
    paddingVertical: 15,
    backgroundColor: "#2a52be",
    marginTop: 10,
  },
  searchButtonText: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "500",
    color: "white",
  },
  customButton: {
    width: "80%",
    marginHorizontal: "3%",
    backgroundColor: "#2a52be",
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  customButtonText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
    color: "white",
  },
});

export default App;
