import React, { useEffect, useRef } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider, Box, Text, VStack, Pressable } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import PrincipalScreen from './screens/PrincipalScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DrawerContentScrollView>
      <VStack space={4} alignItems="flex-start" p={4}>
        <Pressable onPress={() => navigation.navigate('Principal')}>
          <Text fontSize="xl" fontWeight="bold">
            Principal
          </Text>
        </Pressable>
        <Pressable onPress={handleLogout}>
          <Text fontSize="xl" fontWeight="bold">
            Cerrar sesión
          </Text>
        </Pressable>
      </VStack>
    </DrawerContentScrollView>
  );
};

const App = () => {
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => (isMountedRef.current = false);
  }, []);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          isMountedRef.current && navigateToPrincipal();
        } else {
          isMountedRef.current && navigateToLogin();
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkToken();
  }, []);

  const navigateToPrincipal = () => {
    const navigation = isMountedRef.current ? navigationRef.current : null;
    navigation && navigation.navigate('Principal');
  };

  const navigateToLogin = () => {
    const navigation = isMountedRef.current ? navigationRef.current : null;
    navigation && navigation.navigate('Login');
  };

  const navigationRef = useRef();

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => (isMountedRef.current = true)}
      onStateChange={() => {}}
    >
      <NativeBaseProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ title: 'Registro' }}
          />
          <Stack.Screen
            name="Principal"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Principal"
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Principal"
        component={PrincipalScreen}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialIcons name="home" size={24} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default App;
