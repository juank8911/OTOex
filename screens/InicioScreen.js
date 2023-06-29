import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeBaseProvider, Container } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import configs from '../configs';

const InicioScreen = () => {
  const navigation = useNavigation();
  console.log('inicio screen');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log(token);

        if (token) {
          await delay(4000);
          try {
            const response = await axios.get(configs.url + '/auth', {
              headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
              }
            });
            console.log('response de inicio:', response);
            if (response.data) {
              setLoading(false);
              navigation.navigate('Principal');
            } else {
              setLoading(false);
              navigation.navigate('Login');
            }
          } catch (error) {
            console.log('Error al verificar el login inicio:', error);
            setLoading(false);
            navigation.navigate('Login');
          }
        } else {
          setLoading(false);
          navigation.navigate('Login');
        }
      } catch (err) {
        console.log('check login: ' + err);
        navigation.navigate('Login');
      }
    };

    checkLogin();
  }, []);

  const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Container>
          <Image source={require('../assets/oto-1.png')} style={styles.logo} />
          <ActivityIndicator size="large" color="red" animating={loading} />
        </Container>
      </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 300
  },
});

export default InicioScreen;
