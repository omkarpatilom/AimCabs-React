import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './Splash';
import Homepage from './homepage';
import Home from './home';
import BookPage from './BookPage';
import AppNavigator from './AppNavigator';
import Cabs from './Cabs';
import CabSelect from './Select-cab';
import invoice from './invoice'
import Payment from './Payment'


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Homepage" component={Homepage} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="BookPage" component={BookPage} />
        <Stack.Screen name="Cabs" component={Cabs} />
        <Stack.Screen name="SelectCab" component={CabSelect} />
        <Stack.Screen name="invoice" component={invoice} />
        <Stack.Screen name="Payment" component={Payment} />



      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
