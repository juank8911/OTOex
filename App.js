import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import { createStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import configs from './configs';

import InicioScreen from './screens/InicioScreen';
import LoginScreen from './screens/LoginScreen';
import PrincipalScreen from './screens/PrincipalScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const navigationRef = useRef();
  console.log('Token de inicio de sesión:');

  // const handleLogin = async (token) => {
  //   try {
  //     console.log('Token de inicio de sesión:', token);
  //     await AsyncStorage.setItem('token', token);
  //     navigationRef.current.navigate('Principal');
  //   } catch (error) {
  //     console.error('Error al guardar el token:', error);
  //   }
  // };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigationRef.current.navigate('Inicio');
    } catch (error) {
      console.error('Error al borrar el token:', error);
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem('token');
      console.log(token);

      if (token) {
        await delay(3000);
        try {

          const response = 
          await fetch(configs.url + '/auth', {
            method: 'GET',
            headers: {
              // 'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }).then(response=>{response.json()
          console.log(response)})
          .catch(error=>{console.log(error)});
          
          // console.log('respuesta ----------------');
          
          //     response = response.json();
          //     console.log(response);
          if (response.data.isLoggedIn) {
            navigationRef.current.navigate('Principal');
          } else {
            navigationRef.current.navigate('Login');
          }
        } catch (error) {
          console.log('Error al verificar el login:', error);
          navigationRef.current.navigate('Login');
        }
      } else {
        navigationRef.current.navigate('Login');
      }
    };

    checkLogin();
  }, []);

  const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  return (
    <NativeBaseProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen name="Inicio" component={InicioScreen} />
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props}  />}
          </Stack.Screen>
          <Stack.Screen name="Principal">
            {(props) => <PrincipalScreen {...props} handleLogout={handleLogout} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
