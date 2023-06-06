import React, {useEffect} from 'react';
// import { Menu, HamburgerIcon, Box, Pressable, HStack, IconButton, Icon, Text, NativeBaseProvider,View,Container, Center, StatusBar } from "native-base";
import { Menu, HamburgerIcon, Box, Pressable, Center, NativeBaseProvider } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import axios from 'axios';
import { Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const PrincipalScreen = () => {
  console.log('cargando vista princial')
  const navigation = useNavigation();

  // useEffect()(() => {
    console.log('use effect')
  const checkLogin = () => {
    var token = AsyncStorage.getItem('token');
    if (!token) { 
      navigation.navigate('Login');
   }
}
// });

  // checkLogin()

  console.log('PrincipalScreen 1');
  console.log('PrincipalScreen 2');
  const handleLogout = async () => {
  //   console.log('PrincipalScreen 3');
    try {
      console.log(AsyncStorage.getItem('token'))
  //     // Eliminar el token de AsyncStorage
  // const token =  await AsyncStorage.removeItem('token');
  //     // Navegar a la pantalla de inicio
  //     navigation.navigate('Login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  function Example() {
    return <Box w="90%" alignItems="center">
        <Menu w="190" trigger={triggerProps => {
        return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                <HamburgerIcon />
              </Pressable>;
      }}>
          <Menu.Item>Arial</Menu.Item>
          <Menu.Item>Nunito Sans</Menu.Item>
          <Menu.Item>Roboto</Menu.Item>
          <Menu.Item>Poppins</Menu.Item>
          <Menu.Item>SF Pro</Menu.Item>
          <Menu.Item>Helvetica</Menu.Item>
          <Menu.Item isDisabled>Sofia</Menu.Item>
          <Menu.Item>Cookie</Menu.Item>
        </Menu>
      </Box>;
  }
  
  // handleLogout();
  return (
    // <NativeBaseProvider>
    // <View style={styles.container}>
    //  <Container style={styles.container}>
    //  <StatusBar bg="#3700B3" barStyle="light-content" />
    //   <Box safeAreaTop bg="skyblue" />
    //   <HStack bg="skyblue" px="1" py="3" justifyContent="space-between" alignItems="center" w="100%" maxW="350">
    //     <HStack alignItems="center">
    //       <Menu></Menu>
    //       <IconButton icon={<Icon size="sm" as={MaterialIcons} name="menu" color="white" />} />
    //       <Text color="white" fontSize="20" fontWeight="bold">
    //         Home
    //       </Text>
    //     </HStack>
    //     <HStack>
    //       <IconButton icon={<Icon as={MaterialIcons} name="favorite" size="sm" color="white" />} />
    //       <IconButton icon={<Icon as={MaterialIcons} name="search" size="sm" color="white" />} />
    //       <IconButton icon={<Icon as={MaterialIcons} name="more-vert" size="sm" color="white" />} />
    //     </HStack>
    //   </HStack>
    //  </Container>
    // </View>
    // </NativeBaseProvider>

      <NativeBaseProvider>
        <Center flex={1} px="3">
            <Example />
        </Center>
      </NativeBaseProvider>
  );
}; 
    // <Container>
    //   <Header>
    //     <Left>
    //       <Image source={require('../assets/user.png')} style={styles.avatar} />
    //     </Left>
    //     <Body>
    //       <Text style={styles.username}>Nombre de usuario</Text>
    //     </Body>
    //     <Right>
    //       <Button transparent>
    //         <Icon name='menu' />
    //       </Button>
    //     </Right>
    //   </Header>
    //   <Content>
    //     <Text style={styles.option}>
    //       <Icon name='paw' style={styles.icon} /> 1 - Mascotas
    //     </Text>
    //     <Text style={styles.option}>
    //       <Icon name='bell' style={styles.icon} /> 2 - Alertas
    //     </Text>
    //     <Text style={styles.option}>
    //       <Icon name='megaphone' style={styles.icon} /> 3 - Promociones
    //     </Text>
    //     <Text style={styles.option}>
    //       <Icon name='cog' style={styles.icon} /> 4 - Servicios
    //     </Text>
    //     <Text style={styles.option}>
    //       <Icon name='ellipsis-h' style={styles.icon} /> 5 - Por definir
    //     </Text>
    //   </Content>
    //   <Button block onPress={handleLogout}>
    //     <Text>Cerrar sesión</Text>
    //   </Button>
    // </Container>
  // );
// };

// const styles = StyleSheet.create({
//   avatar: {
//     width: 24,
//     height: 24,
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',},

//   username: {
//     fontWeight: 'bold',
//   },
//   option: {
//     marginBottom: 8,
//   },
//   icon: {
//     marginRight: 8,
//   },
// });
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: 'lightgray',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  avatar: {
        width: 24,
        height: 24,
      },
});


export default PrincipalScreen;
