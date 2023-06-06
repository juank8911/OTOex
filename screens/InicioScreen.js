import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InicioScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      // Obtener el token de las cookies
      const token = await AsyncStorage.getItem('token');

      if (token) {
        try {
          // Realizar la solicitud a http://localhost:3000/auth/islogin
          const response = await axios.get('http://localhost:3000/auth/islogin', {
            headers: {
              Authorization: `Bearer ${token}` // Enviar el token en el encabezado de autorización
            }
          });

          // Procesar la respuesta y navegar a la siguiente vista según la respuesta
          if (response.data.isLoggedIn) {
            // El usuario está logueado, realizar la navegación a la siguiente vista
            setLoading(false);
            navigation.navigate('Principal');
          } else {
            // El usuario no está logueado, realizar la navegación a la vista de inicio de sesión
            setLoading(false);
            navigation.navigate('Login');
          }
        } catch (error) {
          // Ocurrió un error al realizar la solicitud
          console.error('Error al verificar el login:', error);
          // Realizar la navegación al manejar el error
        }
      } else {
        setLoading(false);
        navigation.navigate('Login', { handleLogout });
      }
    };

    const delay = async (ms) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };

  return (
    <View style={styles.container}>
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size="large" color="red" />
      </View>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/oto-1.png')} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 300,
  },
});

export default InicioScreen;
