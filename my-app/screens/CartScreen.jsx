import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import CartItem from '../components/CartItem';

const API_URL = "http://10.0.2.2:3001";// emulador

const CartScreen = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = () => {
        Promise.all([
            fetch(`${API_URL}/products`).then(res => res.json()),
            fetch(`${API_URL}/order`).then(res => res.json())
        ])
        .then(([products, orders]) => {
            const cart = orders.map(order => {
                // Busca el producto por productId (no por id de la orden)
                const product = products.find(p => Number(p.id) === Number(order.productId));
                return {
                    id: order.id, // id de la orden
                    productId: order.productId, // id del producto
                    title: product?.name || "Producto",
                    price: product?.price || 0,
                    emoji: product?.image || "",
                    quantity: order.quantity
                };
            });
            setCartItems(cart);
        })
        .catch(err => console.error(err));
    };

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

    const handleOrder = async () => {
        try {

            for (const item of cartItems) {

                const res = await fetch(`${API_URL}/products/${item.productId}`);
                const product = await res.json();

                await fetch(`${API_URL}/products/${item.productId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ stock: product.stock - item.quantity })
                });
            }

            for (const item of cartItems) {
                await fetch(`${API_URL}/order/${item.id}`, { method: 'DELETE' });
            }

            setCartItems([]);
            alert("¡Pedido realizado!");
            fetchCart();
        } catch (err) {
            alert("Error al procesar el pedido");
            console.error(err);
        }
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
                onPress={handleOrder}
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
    card: { flex: 0.9, margin: 10, padding: 16, borderWidth: 1, borderRadius: 10, borderColor: '#ccc', backgroundColor: 'lightgrey', borderColor: 'black', borderWidth: 1 },
    totalText: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 16 },
    button: {
        backgroundColor: 'grey', padding: 10, borderRadius: 15, marginTop: 20, alignItems: 'center', borderColor: 'black', borderWidth: 1, width: '40%', alignSelf: 'center',
        height: 80
    }
});

export default CartScreen;