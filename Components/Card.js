import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Import FontAwesome icons

const Card = ({ data, distance, fare }) => {
  const handleBooking = () => {
    // Handle booking logic here
    console.log("Booking button clicked");
    console.log("distance" + distance);
  };

  const imageUrl =
    "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_537/v1568134115/assets/6d/354919-18b0-45d0-a151-501ab4c4b114/original/XL.png"; // Replace with your image URL

  // dataService.js

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.textContainer}>
          <Text style={styles.place}>{data.model_name}</Text>
          <Text style={styles.shortDescription}>
            Model:
            <Text style={styles.value}> {data.model_type}</Text>
          </Text>
          <Text style={styles.shortDescription}>
            Seats:
            <Text style={styles.value}> {data.seats}</Text>
          </Text>
          <Text style={styles.shortDescription}>
            Fuel:
            <Text style={styles.value}> {data.fuel_type}</Text>
          </Text>

          {/* <Text style={styles.shortDescription}>
            distance:                                             //Distance 
            <Text style={styles.value}> {distance}</Text>
          </Text> */}
          <Text style={styles.shortDescription}>
            price:
            {/* <Text style={styles.value}>{fare * parseInt(distance)}</Text> */}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleBooking}>
              <Text style={styles.buttonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Image source={{ uri: imageUrl }} style={styles.cardImage} />
      </View>
    </View>
  );
};

const styles = {
  card: {
    backgroundColor: "#fff",
    borderRadius: 25,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 8,
  },
  cardContent: {
    flexDirection: "row",
    padding: 15,
  },
  cardImage: {
    width: 140,
    height: 70,
    borderTopRightRadius: 25,
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
    top: 40,
    right: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  place: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  shortDescription: {
    fontSize: 16,
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#555",
    top: 40,
    right: 140,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: "center",
    left: 180,
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
};

export default Card;
