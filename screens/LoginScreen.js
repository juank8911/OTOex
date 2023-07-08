import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeBaseProvider, Container, HStack, IconButton } from 'native-base';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import configs from '../configs';
import axios from 'axios';

const LoginScreen = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    console.log('login screen');
  }, []);

  const navigation = useNavigation();

  const handleLoginPress = async () => {
    try {
      const response = await axios.post(configs.url + '/auth', { userName, password });
  
      if (response.data.isLoggedIn) {
        console.log('response de login');
        console.log(response.data);
        const token = response.data.token;
        AsyncStorage.setItem('token', token);
        navigation.navigate('Principal');
      } else {
        console.log('Error de inicio de sesión');
      }
    } catch (error) {
      console.log('Error en el inicio de sesión:', error);
    }
  };

  const handleRegisterPress = () => {
    navigation.navigate('Register');
  };

  const handleFacebookLogin = () => {
    // Handle Facebook login logic here
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={userName}
        onChangeText={setUserName}
        underlineColorAndroid="black" // Agregamos underline a los inputs
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        underlineColorAndroid="black" // Agregamos underline a los inputs
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.btns]} onPress={handleLoginPress}>
          <Text style={styles.buttonText}>Inicio Sesion</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.btns]} onPress={handleRegisterPress}>
          <Text style={styles.buttonText}>Registro</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.socialButtonsContainer}>
        <IconButton
          icon={<MaterialIcons name="facebook" size={24} color="white" />}
          style={[styles.socialButton, styles.facebookButton]}
          onPress={handleFacebookLogin}
        />
        <IconButton
          icon={<AntDesign name="googleplus" size={24} color="black" />}
          style={[styles.socialButton, styles.googleButton]}
          onPress={handleGoogleLogin}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: 'skyblue',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
    marginVertical: 10, // Espacio vertical entre los botones Login y Register
  },
  button: {
    backgroundColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btns: {
    margin: 10,
    backgroundColor: '#1877F2',
  },
  facebookButton: {
    backgroundColor: '#1877F2',
  },
  googleButton: {
    backgroundColor: '#DB4437',
  },
});

export default LoginScreen;
