import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Modal, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Payment = () => {
  const navigation = useNavigation();
  const [paymentMode, setPaymentMode] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'AimCabBooking',
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
      },
      headerStyle: {
        backgroundColor: '#003580',
        height: 110,
        borderBottomColor: 'transparent',
        shadowColor: 'transparent',
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

  const handlePaymentMode = (mode) => {
    setPaymentMode(mode);
    if (mode === 'Cash') {
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Payment Mode</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Online"
          onPress={() => handlePaymentMode('Online')}
          color={paymentMode === 'Online' ? '#003580' : '#ccc'}
        />
        <Button
          title="Cash"
          onPress={() => handlePaymentMode('Cash')}
          color={paymentMode === 'Cash' ? '#003580' : '#ccc'}
        />
      </View>
      {paymentMode && (
        <Text style={styles.selectedMode}>
          Selected Payment Mode: {paymentMode}
        </Text>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showPopup}
        onRequestClose={closePopup}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Our team will reach out to confrom your booking</Text>
            <Pressable style={styles.modalButton} onPress={closePopup}>
              <Text style={styles.modalButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  selectedMode: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,
    width: '80%',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#003580',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Payment;
