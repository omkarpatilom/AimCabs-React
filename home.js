import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Picker } from '@react-native-picker/picker';

// Import other components/screens if needed
import BookPage from './BookPage';
import Trip from './Trip';

const HomePage = ({ navigation }) => {
  const handleTaxiPress = () => {
    navigation.navigate('BookPage');
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        {/* Your search bar component goes here */}
      </View>
      <View style={styles.iconContainer}>
        <View style={styles.iconWrapper}>
          <View style={styles.icon}>
            <Icon name="taxi" size={60} color="black" onPress={handleTaxiPress} />
          </View>
          <Text style={styles.iconText}>Cab</Text>
        </View>
        <View style={styles.iconWrapper}>
          <View style={styles.icon}>
            <Icon name="plane" size={60} color="black" />
          </View>
          <Text style={styles.iconText}>Flights</Text>
        </View>
        <View style={styles.iconWrapper}>
          <View style={styles.icon}>
            <Icon name="hotel" size={60} color="black" />
          </View>
          <Text style={styles.iconText}>Hotel</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text>Welcome to the Home Page!</Text>
      </View>
    </View>
  );
};

// Create the bottom tab navigator
const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomePage} // Renamed from HomeScreen to HomePage
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Trips"
        component={Trip}
        options={{
          tabBarLabel: 'Trips',
          tabBarIcon: ({ color, size }) => (
            <Icon name="suitcase" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 50,
  },
  searchBar: {
    height: 50,
    backgroundColor: 'lightgray',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: 'grey',
  },
  iconWrapper: {
    alignItems: 'center',
  },
  icon: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10,
  },
  iconText: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
