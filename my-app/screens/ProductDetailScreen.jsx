import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import ProductInfo from '../components/ProductInfo';
import Button from '../components/Button';
import { CartContext } from '../context/CartContext';
import { useNavigation, useRoute } from '@react-navigation/native';

const ProductDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { product } = route.params;
  const { addToCart } = useContext(CartContext);

  const handleOrder = () => {
    addToCart(product);
    navigation.navigate('Cart'); // Navega al carrito
  };

  return (
    <View style={styles.container}>
      <ProductInfo product={product} />
      <Button title="Pedir" onPress={handleOrder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});

export default ProductDetailScreen;
