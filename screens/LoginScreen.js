import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ handleLogin }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginPress = async () => {
    try {
      const response = await fetch('http://192.168.20.9:3000/auth/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, password }),
      });
      console.log(response.ok+"");
      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        // Almacenar el token en las cookies
        // ...
         await AsyncStorage.setItem('token',token);
        // Ejecutar la función handleLogin con el token como argumento
        handleLogin(token);
        
      } else {
        // Manejar el caso en que la solicitud no sea exitosa
        console.log('Error de inicio de sesión');
      }
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={userName}
        onChangeText={setUserName}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Iniciar sesión" onPress={handleLoginPress} />
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
    backgroundColor: 'lightgray',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default LoginScreen;
