import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, } from 'react-native';
import CartItem from '../components/CartItem';

const CartScreen = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const data = [
            { id: 1, title: "Pancho", price: 0.5, emoji: "🌭", quantity: 1 },
            { id: 2, title: "Hamburguesa", price: 0.4, emoji: "🍔", quantity: 2 },
            { id: 3, title: "Papas", price: 0.8, emoji: "🍟", quantity: 1 },
            { id: 4, title: "Pollo", price: 1.5, emoji: "🍗", quantity: 1 }
        ];
        setCartItems(data);

        // 📝 Cuando se use el JSON con ngrok, reemplazar por esto:
        /*
        fetch("http://<tu-url-ngrok>.ngrok.io/data.json")
          .then(res => res.json())
          .then(data => setCartItems(data))
          .catch(err => console.error(err));
        */
    }, []);

    const increaseQuantity = (id) => {
        setCartItems(items =>
            items.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQuantity = (id) => {
        setCartItems(items =>
            items.map(item =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 } : item
            )
        );
    };

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 40, marginBottom: 10 }}>
                <Pressable
                    style={({ pressed }) => [
                        { marginRight: 10 }
                    ]}
                    onPress={() => alert("Volver")}
                >
                    <Text style={{ fontSize: 50 }}>{'←'}</Text>
                </Pressable>
                <Text style={[styles.totalText, { flex: 0.8 }]}>SU PEDIDO</Text>
            </View>
            <View style={styles.card}>
                <FlatList
                    data={cartItems}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <CartItem
                            item={item}
                            onAdd={() => increaseQuantity(item.id)}
                            onRemove={() => decreaseQuantity(item.id)}
                        />
                    )}
                />
                <Text style={styles.totalText}>TOTAL: ${total.toFixed(2)}</Text>
            </View>
            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    pressed && { backgroundColor: 'green', borderColor: '#666' }
                ]}
                onPress={() => alert("Pedido realizado")}
            >
                <Text style={[
                    styles.totalText,
                    { color: 'white' }
                ]}>
                    PEDIR
                </Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff', },
    card: { flex: 0.9, margin: 10, padding: 16, borderWidth: 1, borderRadius: 10, borderColor: '#ccc', backgroundColor: 'lightgrey'},
    totalText: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 16 },
    button: {
        backgroundColor: 'grey', padding: 10, borderRadius: 15, marginTop: 20, alignItems: 'center', borderColor: 'black', borderWidth: 1, width: '40%', alignSelf: 'center',
        height: 80
    }
});

export default CartScreen;
