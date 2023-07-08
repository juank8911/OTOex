import React, { useEffect, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import {
  NativeBaseProvider,
  Box,
  Text,
  IconButton,
  VStack,
  Pressable,
  HStack,
  Icon,
  Divider,
  Center,
  Avatar,
} from 'native-base';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState } from 'react-native';
import InicioScreen from './screens/InicioScreen';
import LoginScreen from './screens/LoginScreen';
import PrincipalScreen from './screens/PrincipalScreen';
import RegisterScreen from './screens/RegisterScreen';

import configs from './configs';
import MenuComponent from './components/MenuComponent';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  const navigationRef = useRef();
  const [loggedIn, setLoggedIn] = useState(false);
  const [usuario, setUsuario] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const appStateSubscription = useRef();

  const handleLogout = async (navigation) => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        try {
          const response = await fetch(configs.url + '/auth', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          const responseData = await response.json();

          if (responseData.isloggedIn) {
            const tk = token;

            await fetch(`http://192.168.20.3:3000/usuario/tok/${tk}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            })
              .then((response) => response.json())
              .then((data) => {
                console.log('RESPONSE');
                console.log(data);
                console.log('-----------------');
                const usuario = data;
                setUsuario(usuario);
              })
              .catch((err) => {
                console.log('error en checking usuario');
                console.log(err);
              });
            setLoggedIn(true);
          } else {
            navigationRef.current?.navigate('Login');
          }
        } catch (error) {
          console.log('Error al verificar el login:', error);
          navigationRef.current?.navigate('Login');
        }
      } else {
        navigationRef.current?.navigate('Login');
      }

      setIsLoading(false);
    };

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const loadApp = async () => {
      await delay(3000);
      checkLogin();
    };

    loadApp();

    appStateSubscription.current = AppState.addEventListener('change', checkLogin);

    return () => {
      appStateSubscription.current && appStateSubscription.current.remove();
    };
  }, []);

  return (
    <NativeBaseProvider>
      <NavigationContainer ref={navigationRef}>
        {isLoading ? (
          <InicioScreen />
        ) : (
          <Stack.Navigator>
            <Stack.Screen name="Drawer" options={{ headerShown: false }}>
              {(props) => (
                <DrawerNavigatorContainer
                  {...props}
                  loggedIn={loggedIn}
                  handleLogout={handleLogout}
                  usuario={usuario}
                />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

const DrawerNavigatorContainer = ({ loggedIn, handleLogout, usuario }) => {
  return (
    <Drawer.Navigator
      initialRouteName={loggedIn ? 'Principal' : 'Login'}
      drawerContent={(props) => (
        <MenuComponent {...props} handleLogout={handleLogout} usuario={usuario} />
      )}
    >
      <Drawer.Screen name="Principal">
        {(props) => <PrincipalScreen {...props} loggedIn={loggedIn} />}
      </Drawer.Screen>
      <Drawer.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Registro" component={RegisterScreen} options={{ headerShown: true }} />
      <Drawer.Screen name="Favorites" component={RegisterScreen} options={{ headerShown: true }} />
      <Drawer.Screen name="Archive" component={RegisterScreen} options={{ headerShown: true }} />
      <Drawer.Screen name="Trash" component={RegisterScreen} options={{ headerShown: true }} />
      <Drawer.Screen name="Spam" component={PrincipalScreen} options={{ headerShown: true }} />
    </Drawer.Navigator>
  );
};

export default App;
