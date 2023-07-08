import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Card from "./Components/Card";
import { Ionicons } from "@expo/vector-icons";

const Regular = ({ formData }) => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fare, setFare] = useState(null); // Add fare state

  useEffect(() => {
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

  useEffect(() => {
    fetch("https://aimcabbooking.com/admin/fetch_data.php?table=cabinfo")
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    const pickupCity = formData.pickupLocation.split(",")[0].trim();
    const dropCity = formData.dropLocation.split(",")[0].trim();
    fetch(
      `https://aimcabbooking.com/admin/fetch_oneway_price.php?table=oneway_trip&source_city=${pickupCity}&destination_city=${dropCity}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Process the fetched data and set the fare state
        console.log(data);
        setFare(data);
      })
      .catch((error) => {
        console.error("Error fetching fare:", error);
      });
  }, []);

  let farePrice = null; // Declare a variable to store the fare price

  if (fare) {
    // Check if the fare state is available
    const fareObject = fare[0]; // Assuming the fare data is an array with a single object
    farePrice = fareObject.hatchback; // Store the fare price in the variable
  }

  const handleBooking = (item) => {
    // Handle booking logic here
    console.log("Booking button clicked");
    console.log("distance" + formData.distance);

    // Send the data to the Invoice component using navigation
    navigation.navigate("Invoice", {
      data: item,
      distance: formData.distance,
      fare: farePrice,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {data
          .filter((item) => item.model_type === "HATCHBACK")
          .map((item) => (
            <Card
            key={item.id}
                data={item}
                distance={formData.distance}
                time={formData.selectedTime}
                pickup={formData.pickupLocation}
                drop={formData.dropLocation}
                 date={formData.selectedDates}


                fare={farePrice}
            />
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Regular;
