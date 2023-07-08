import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PrincipalScreen = ({ loggedIn }) => {
  const navigation = useNavigation();

  useEffect(() => {
    console.log('principal screen');
    if (!loggedIn) {
      navigation.navigate('Login');
    }
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.navigate('Login');
    } catch (error) {
      console.log('Error al cerrar sesión:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Principal Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PrincipalScreen;
