import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Payment = () => {
  const navigation = useNavigation();
  const [paymentMode, setPaymentMode] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'AimCabBooking',
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'Helvetica Neue',
      },
      headerStyle: {
        backgroundColor: '#003580',
        height: 110,
        borderBottomColor: 'transparent',
        shadowColor: 'transparent',
      },
      headerRight: () => (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity>
            <Ionicons
              name="notifications-outline"
              size={24}
              color="white"
              style={{ marginRight: 12 }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign name="user" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    if (showConfirmation) {
      const confirmationTimer = setTimeout(() => {
        setShowConfirmation(false);
        navigation.navigate('Home');
      }, 4000);

      return () => clearTimeout(confirmationTimer);
    }
  }, [showConfirmation]);

  const handlePaymentMode = (mode) => {
    if (mode === 'Cash') {
      Alert.alert(
        'Confirm Payment',
        'Are you sure you want to proceed with Cash payment?',
        [
          { text: 'No', style: 'cancel' },
          {
            text: 'Yes',
            onPress: () => {
              setPaymentMode(mode);
              setShowConfirmation(true);
            },
          },
        ]
      );
    } else {
      setPaymentMode(mode);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Payment Mode</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={paymentMode === 'Online' ? styles.activeButton : styles.inactiveButton}
          onPress={() => handlePaymentMode('Online')}>
          <MaterialCommunityIcons name="credit-card-outline" size={60} color="white" />
          <Text style={styles.buttonText}>Online</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={paymentMode === 'Cash' ? styles.activeButton : styles.inactiveButton}
          onPress={() => handlePaymentMode('Cash')}>
          <MaterialCommunityIcons name="cash-multiple" size={60} color="white" />
          <Text style={styles.buttonText}>Cash</Text>
        </TouchableOpacity>
      </View>
      {showConfirmation && (
        <Text style={styles.confirmationMessage}>
        Congratulation your Booking has been successful. 
          Our team will reach out to confirm your booking shortly.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Helvetica Neue',
  },
  buttonContainer: {
flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    width: '100%',
  },
  activeButton: {
    backgroundColor: '#003580',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactiveButton: {
    backgroundColor: '#ccc',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
    fontFamily: 'Helvetica Neue',
  },
  confirmationMessage: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    fontFamily: 'Helvetica Neue',
  },
});

export default Payment;