import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeBaseProvider, Container } from 'native-base';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import configs from '../configs';




// const InicioScreen = () => {
//   const navigationRef = useRef();
//   const navigation = useNavigation();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     try{
//     const checkLogin = async () => {
//       const token = await AsyncStorage.getItem('token');
//       console.log(token);

//       if (token) {
//         await delay(3000);
//         try {

//            await axios.get(configs.url+'/auth/', {
//             method: 'GET',
//             headers: {
//               'content-type': 'application/json',
//               authorization: `Bearer ${token}`
//             }
//           })
//           .then(response=>{
            
//             console.log('respuesta -----4-----------');
//             console.log(response.data);
//           if (response.data.isLoggedIn) {            
//             setLoading(false);
//             console.log('en el if de login')
//             // navigation.navigate('Principal');
//             navigationRef.current.navigate('Principal');
//           } else {
//             console.log('en el else de login')
//             setLoading(false);
//             // navigation.navigate('Login');
//             navigationRef.current.navigate('Login');
//           }
//           }).catch(err =>{
//             throw err;
//           })
//           console.log('respuesta -----5-----------');

//         } catch (error) {
//           console.log('Error al verificar el login inicio:', error);
//           setLoading(false);
//           navigation.navigate('Login');
//         }
//       } else {
//         setLoading(false);
//         navigation.navigate('Login');
//       }
//     };
//     checkLogin();
//   }
//   catch(err){
//     console.log(err);
//   }
//   });

//   const delay = (ms) => {
//     return new Promise((resolve) => setTimeout(resolve, ms));
//   };

//   return (
//     <NativeBaseProvider>
//       <Container style={styles.container}>
//         <Image source={require('../assets/oto-1.png')} style={styles.logo} />
//         <ActivityIndicator size="large" color="red" animating={loading} />
//       </Container>
//     </NativeBaseProvider>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   logo: {
//     width: 300,
//     height: 300
//   },
// });

// export default InicioScreen;


const InicioScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log(token);

        if (token) {
          await delay(4000);
          try {
           var response =  await axios.get(configs.url + '/auth', {
              method: 'GET',
              headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
              }
            });
              //  console.log('inicio Screen');
              //  console.log(response.data.isloggedIn);
              //  console.log(response.data.pruabe);
              //  console.log(response.data.usue);
                   if (response.data.isloggedIn) {
                    // console.log('el usuario si existe')
                  setLoading(false);
                  // console.log('redireccionando a la vista principal')
                  navigation.navigate('Principal');
                } else {
                  setLoading(false);
                  navigation.navigate('Login');
                }
           
            
            // .then(response => {
            //     console.log('------------------------------');
            // console.log(response.data);
            //     if (response.data.isLoggedIn) {
            //       setLoading(false);
              
            //       navigation.navigate('Principal');
            //     } else {
            //       setLoading(false);
            //       navigation.navigate('Login');
            //     }
            //   }).catch(err => {
            //     throw err;
            //   });
            
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
        console.log(err);
        navigation.navigate('Login');
      }
    };
    checkLogin();
  }, []);

  const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  return (
    <View style={styles.container}>
      <Container style={styles.container}>
        <Image source={require('../assets/oto-1.png')} style={styles.logo} />
        <ActivityIndicator size="large" color="red" animating={loading} />
      </Container>
      </View>
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
