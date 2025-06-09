import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './ProductCardStyle';

const ProductCard = ({ product, onAdd, onRemove }) => {
  const [quantity, setQuantity] = useState(0);

  const addOne = () => {
    setQuantity(q => q + 1);
    onAdd(product.price);
  };

  const removeOne = () => {
    if (quantity > 0) {
      setQuantity(q => q - 1);
      onRemove(product.price);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.emoji}>{product.emoji}</Text>
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>

      <View style={styles.controls}>
        <TouchableOpacity onPress={removeOne} style={styles.btn}>
          <Text style={styles.btnText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity onPress={addOne} style={styles.btn}>
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductCard;
