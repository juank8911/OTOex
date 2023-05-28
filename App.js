import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const cors = require('cors');
import LoginScreen from './screens/LoginScreen';
import PrincipalScreen from './screens/PrincipalScreen';

const Stack = createStackNavigator();


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Lógica para el inicio de sesión
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Lógica para el cierre de sesión
    setIsLoggedIn(false);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen name="Principal">
            {(props) => <PrincipalScreen {...props} handleLogout={handleLogout} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} handleLogin={handleLogin} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
