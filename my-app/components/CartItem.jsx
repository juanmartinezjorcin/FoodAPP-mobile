import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const CartItem = ({ item, onAdd, onRemove }) => {
  return (
    <View>
      <Text style={styles.title}>{item.title} {item.emoji}</Text>
      <Text>Cantidad: {item.quantity}</Text>
      <Text>Subtotal: ${(item.price * item.quantity).toFixed(2)}</Text>
      <View style={styles.buttons}>
        <Pressable onPress={onAdd} style={({ pressed }) => [
                    styles.button,
                    pressed && { backgroundColor: 'lightgreen', borderColor: '#666' }
                ]}>
          <Text>+</Text>
        </Pressable>
        <Pressable onPress={onRemove} style={({ pressed }) => [
                    styles.button,
                    pressed && { backgroundColor: 'red', borderColor: '#666' }
                ]}>
          <Text>-</Text>
        </Pressable>
      </View>
      <View style={{ height: 20 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: 'bold' },
  buttons: { flexDirection: 'row', marginTop: 10, gap: 10 },
  button: { backgroundColor: '#eee', padding: 10, borderRadius: 6 }
});

export default CartItem;
