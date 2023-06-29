import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Stack } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import configs from '../configs';

const RegisterScreen = () => {
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [userName, setUserName] = useState('');
  const [tel, setTel] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
  const [genero, setGenero] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleRegisterPress = async () => {
    try {
      const newUser = {
        nombres,
        apellidos,
        userName,
        tel,
        fechaNacimiento,
        genero,
        correo,
        password
      };

      const response = await axios.post(`${configs.url}/register`, newUser);

      console.log('Registro exitoso:', response.data);
    } catch (error) {
      console.log('Error en el registro:', error);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || fechaNacimiento;
    setShowDatePicker(false);
    setFechaNacimiento(currentDate);
  };

  return (
    <View style={styles.container}>
      <Stack space={4} w="75%" maxW="300px" mx="auto">
        <Input
          variant="underlined"
          placeholder="Nombres"
          borderColor={"black"}
          placeholderTextColor="black"
          value={nombres}
          onChangeText={setNombres}
          style={styles.input}
          _focus={{ borderColor: 'black' }}
          _hover={{ borderColor: 'black' }}
          color="black"
        />
        <Input
          variant="underlined"
          placeholder="Apellidos"
          borderColor={"black"}
          placeholderTextColor="black"
          value={apellidos}
          onChangeText={setApellidos}
          style={styles.input}
          _focus={{ borderColor: 'black' }}
          _hover={{ borderColor: 'black' }}
          color="black"
        />
        <Input
          variant="underlined"
          placeholder="Nombre de usuario"
          borderColor={"black"}
          placeholderTextColor="black"
          value={userName}
          onChangeText={setUserName}
          style={styles.input}
          _focus={{ borderColor: 'black' }}
          _hover={{ borderColor: 'black' }}
          color="black"
        />
        <Input
          variant="underlined"
          placeholder="Teléfono"
          borderColor={"black"}
          placeholderTextColor="black"
          value={tel}
          onChangeText={setTel}
          style={styles.input}
          _focus={{ borderColor: 'black' }}
          _hover={{ borderColor: 'black' }}
          color="black"
        />
        <View style={styles.dateContainer}>
          <Input
            variant="underlined"
            borderColor={"black"}
            placeholder="Fecha de Nacimiento"
            placeholderTextColor="black"
            value={fechaNacimiento.toLocaleDateString()}
            onFocus={() => setShowDatePicker(true)}
            style={styles.input}
            _focus={{ borderColor: 'black' }}
            _hover={{ borderColor: 'black' }}
            color="black"
            readOnly
          />
          {showDatePicker && (
            <DateTimePicker
              value={fechaNacimiento}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>
        <Input
          variant="underlined"
          placeholder="Género"
          borderColor={"black"}
          placeholderTextColor="black"
          value={genero}
          onChangeText={setGenero}
          style={styles.input}
          _focus={{ borderColor: 'black' }}
          _hover={{ borderColor: 'black' }}
          color="black"
        />
        <Input
          variant="underlined"
          borderColor={"black"}
          placeholder="Correo electrónico"
          placeholderTextColor="black"
          value={correo}
          onChangeText={setCorreo}
          style={styles.input}
          _focus={{ borderColor: 'black' }}
          _hover={{ borderColor: 'black' }}
          color="black"
        />
        <Input
          variant="underlined"
          borderColor={"black"}
          placeholder="Contraseña"
          placeholderTextColor="black"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          _focus={{ borderColor: 'black' }}
          _hover={{ borderColor: 'black' }}
          color="black"
        />
        <Button
          variant="solid"
          onPress={handleRegisterPress}
          style={styles.button}
        >
          Registrarse
        </Button>
      </Stack>
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
    borderColor:"black"
     
    
  },
  dateContainer: {
    marginBottom: 10,
  },
  button: {
    width: '80%',
    marginTop: 10,
    backgroundColor: '#1877F2',
  },
});

export default RegisterScreen;