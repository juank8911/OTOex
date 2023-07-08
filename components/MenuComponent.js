import React, { useState } from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import {
  Box,
  Text,
  VStack,
  Pressable,
  HStack,
  Icon,
  Divider,
  Center,
  Avatar,
  Image,
} from 'native-base';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const MenuComponent = ({ navigation, handleLogout, usuario }) => {
  const defaultAvatar = require('../assets/user.png');
  const avatarSource = usuario?.avatar ? { uri: usuario.avatar } : defaultAvatar;
  const correo = usuario?.correo;
  const [isAvatarExpanded, setIsAvatarExpanded] = useState(false);

  const handleExpandAvatar = () => {
    setIsAvatarExpanded(!isAvatarExpanded);
  };

  return (
    <DrawerContentScrollView>
      <Box px={4} py={5}>
        <Center>
          <Box
            bg="blue.500"
            p={2}
            borderRadius="full"
            marginBottom={1}
          >
            <Pressable onPress={handleExpandAvatar}>
              <Avatar
                source={avatarSource}
                size={isAvatarExpanded ? "2xl" : "xl"}
              />
            </Pressable>
          </Box>
        </Center>
        <VStack space={4} alignItems="flex-start">
          <Text fontSize="lg" fontWeight="bold" textAlign="center">
            {usuario?.nombre}
          </Text>
          <Text fontSize="sm" color="black" textAlign="center">
            {correo}
          </Text>
          <Divider my={2} />
          <Pressable
            onPress={() => {
              navigation.closeDrawer();
              navigation.navigate('Principal');
            }}
          >
            <HStack space={2} alignItems="center">
              <Icon
                as={MaterialIcons}
                name="home"
                size={6}
                color="gray.600"
              />
              <Text fontSize="lg" fontWeight="bold">
                Inicio
              </Text>
            </HStack>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.closeDrawer();
              navigation.navigate('Favorites');
            }}
          >
            <HStack space={2} alignItems="center">
              <Icon
                as={MaterialIcons}
                name="favorite"
                size={6}
                color="gray.600"
              />
              <Text fontSize="lg" fontWeight="bold">
                Favoritos
              </Text>
            </HStack>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.closeDrawer();
              navigation.navigate('Archive');
            }}
          >
            <HStack space={2} alignItems="center">
              <Icon
                as={MaterialCommunityIcons}
                name="archive"
                size={6}
                color="gray.600"
              />
              <Text fontSize="lg" fontWeight="bold">
                Archivo
              </Text>
            </HStack>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.closeDrawer();
              navigation.navigate('Trash');
            }}
          >
            <HStack space={2} alignItems="center">
              <Icon
                as={MaterialIcons}
                name="delete"
                size={6}
                color="gray.600"
              />
              <Text fontSize="lg" fontWeight="bold">
                Papelera
              </Text>
            </HStack>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.closeDrawer();
              navigation.navigate('Spam');
            }}
          >
            <HStack space={2} alignItems="center">
              <Icon
                as={MaterialCommunityIcons}
                name="alert-octagon"
                size={6}
                color="gray.600"
              />
              <Text fontSize="lg" fontWeight="bold">
                Spam
              </Text>
            </HStack>
          </Pressable>
        </VStack>
      </Box>
      <Divider />
      <Box px={4} py={4}>
        <Pressable onPress={() => handleLogout(navigation)}>
          <HStack space={2} alignItems="center">
            <Icon
              as={MaterialIcons}
              name="logout"
              size={6}
              color="gray.600"
            />
            <Text fontSize="lg" fontWeight="bold">
              Cerrar sesión
            </Text>
          </HStack>
        </Pressable>
      </Box>
    </DrawerContentScrollView>
  );
};

export default MenuComponent;
