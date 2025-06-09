// AppNavigator.jsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/HomeScreen';
import ProductCardDetail from '../../screens/ProductCardDetail';
import Cart from '../../screens/Cart';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ProductCardDetail" component={ProductCardDetail} />
      <Stack.Screen name="Cart" component={Cart} />
    </Stack.Navigator>
  );
}
