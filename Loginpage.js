import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Loginpage = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFormSubmit = async () => {
    try {
      const response = await fetch("http://192.168.1.12:8907/api/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      if (response.ok) {
        // Name and email exist in the database
        navigation.navigate("Home", { name, email });
      } else {
        // Name and email do not exist in the database
        setErrorMessage("Name or email do not exist");
      }
    } catch (error) {
      console.error("Error checking database:", error);
    }
  };

  const handleSkipTest = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("./assets/background.jpg")}
        style={styles.backgroundImage}
      />

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require("./assets/logo.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={[styles.input, { width: "100%" }]}
            placeholder="Name"
            placeholderTextColor="white"
            value={name}
            onChangeText={(text) => setName(text)}
          />

          <TextInput
            style={[styles.input, { width: "100%" }]}
            placeholder="Email"
            placeholderTextColor="white"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          <TouchableOpacity
            style={[styles.loginButton, { width: "100%" }]}
            onPress={handleFormSubmit}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
  style={styles.createAccountButton}
  onPress={() => navigation.navigate("RegisterUser")}
>
  <Text style={styles.createAccountButtonText}>Create Account</Text>
</TouchableOpacity>


          {errorMessage ? (
            <Text style={styles.error}>{errorMessage}</Text>
          ) : null}
        </View>

        <TouchableOpacity style={styles.skipButton} onPress={handleSkipTest}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#003580",
    padding: 20,
    width: "100%",
  },
  logoContainer: {},
  logoImage: {
    width: 300,
    height: 300,
  },
  formContainer: {
    width: "100%",
  },
  input: {
    height: 40,
    borderColor: "#6a83a6",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    fontSize: 16,
    color: "white",
    backgroundColor: "#6a83a6",
  },
  loginButton: {
    backgroundColor: "#FFBF00",
    paddingVertical: 12,
    borderRadius: 20,
    marginBottom: 10,
  },
  loginButtonText: {
    color: "#5A5A5A",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  createAccountButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  error: {
    color: "red",
    marginTop: 10,
  },
  skipButton: {
    marginTop: 10,
    bottom: "90%",
    left: "45%",
  },
  skipButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Loginpage;
