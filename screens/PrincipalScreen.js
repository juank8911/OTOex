import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PrincipalScreen = ({ handleLogout }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/user.png')} style={styles.avatar} />
        <Text style={styles.username}>Nombre de usuario</Text>
      </View>
       <View style={styles.menu}>
         <Text style={styles.option}>1 - Mascotas</Text>
        <Text style={styles.option}>2 - Alertas</Text>
        <Text style={styles.option}>3 - Promociones</Text>
        <Text style={styles.option}>4 - Servicios</Text>
        <Text style={styles.option}>5 - Por definir</Text>
      </View>
      <Button title="Cerrar sesión" onPress={handleLogout} /> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Cambiar a blanco
  },
  header: {
    backgroundColor: 'skyblue', // Cambiar a azul cielo
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16, // Agregar un espacio interno al header
  },
  avatar: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  username: {
    fontWeight: 'bold',
  },
  menu: {
    padding: 16, // Agregar un espacio interno al menú
  },
  option: {
    marginBottom: 8,
  },
});

export default PrincipalScreen;
