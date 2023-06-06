import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeBaseProvider, Container } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import configs from '../configs';
import axios from 'axios';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginPress = async () => {
    try {

        const response = await fetch(configs.url+'/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, password })
      });

      if (response) {
        const data = await response.json();
        const token = data.token;
        await AsyncStorage.setItem('token', token);
        navigation.navigate('Principal');
      } else {
        console.log('Error de inicio de sesión');
      }
    } catch (error) {
      // console.log(error);
      console.log({ error: error});
      throw error
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
