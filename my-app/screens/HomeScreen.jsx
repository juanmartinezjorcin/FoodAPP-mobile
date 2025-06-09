import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';

// ¡No debés renderizar ProductDetailScreen directamente dentro del FlatList!
import { useNavigation } from '@react-navigation/native';
import ProductCard from '../comp/ProductCard';

const URL = "http://10.0.2.2:3001";

const HomeScreen = () => {
  const navigation = useNavigation(); // <- obtener navegación
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]); // [{productId, quantity}]
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch(`${URL}/products`)
      .then(res => res.json())
      .then(data => {
        const mapped = data.map(p => ({
          id: Number(p.id),
          title: p.name,
          price: p.price,
          emoji: p.image,
          stock: p.stock,
          description: p.description,
        }));
        setProducts(mapped);
      })
      .catch(err => console.error(err));
  }, []);

  const handleAdd = (product) => {
    setTotal(t => t + product.price);
    setCart(prev => {
      const found = prev.find(item => item.productId === product.id);
      if (found) {
        return prev.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { productId: product.id, quantity: 1 }];
    });
  };

  const handleRemove = (product) => {
    setTotal(t => Math.max(0, t - product.price));
    setCart(prev =>
      prev
        .map(item =>
          item.productId === product.id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  // Envía las órdenes al backend en el formato del JSON
  const sendOrder = async () => {
    try {
      // Borra las órdenes anteriores (opcional, según tu lógica)
      const res = await fetch(`${URL}/order`);
      const oldOrders = await res.json();
      for (const order of oldOrders) {
        await fetch(`${URL}/order/${order.id}`, { method: 'DELETE' });
      }
      // Crea nuevas órdenes
      for (const item of cart) {
        await fetch(`${URL}/order`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item),
        });
      }
      alert('Órdenes enviadas correctamente');
    } catch (err) {
      alert('Error al enviar la orden');
      console.error(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <View style={styles.menuIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>FOOD APP</Text>
        <View style={styles.navButtons}>
  <TouchableOpacity
    style={styles.navButton}
    onPress={() => navigation.navigate('ProductDetailScreen')}
  >
    <Text style={styles.navButtonText}>Ir a Detalles</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.navButton}
    onPress={() => navigation.navigate('CartScreen')}
  >
    <Text style={styles.navButtonText}>Ir al Carrito</Text>
  </TouchableOpacity>
</View>

      </View>

      {/* Productos */}
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
<<<<<<< HEAD
          <ProductCard
            product={item}
            onAdd={() => handleAdd(item)}
            onRemove={() => handleRemove(item)}
          />
=======
          <View style={styles.productItem}>
            <Text style={{ fontSize: 32 }}>{item.emoji}</Text>
            <Text>{item.title}</Text>
            <Text>${item.price.toFixed(2)}</Text>
            <View style={{ flexDirection: 'row', marginTop: 4 }}>
              <TouchableOpacity onPress={() => handleAdd(item.price)} style={styles.actionButton}>
                <Text style={styles.actionButtonText}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleRemove(item.price)} style={styles.actionButton}>
                <Text style={styles.actionButtonText}>-</Text>
              </TouchableOpacity>
            </View>
          </View>
>>>>>>> b3b2c0a5d0124784c20d996b74884d0b200adc72
        )}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
        <Pressable
          style={styles.cartButton}
          onPress={sendOrder}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>🛒</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  menuButton: {
    width: 30,
    height: 30,
    backgroundColor: '#ccc',
    marginRight: 12,
    borderRadius: 4,
  },
  menuIcon: {
    flex: 1,
    backgroundColor: '#000',
    opacity: 0.2,
    borderRadius: 2,
  },
  title: { fontSize: 22, fontWeight: 'bold' },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginVertical: 10,
  },
  navButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  navButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  grid: {
    paddingHorizontal: 8,
    paddingBottom: 80,
    alignItems: 'center',
  },
<<<<<<< HEAD
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
    marginRight: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 999,
    marginBottom: 10,
  },
  cartButton: {
    marginLeft: 16,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
=======
  productItem: {
    margin: 8,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    alignItems: 'center',
    width: 140,
  },
  actionButton: {
    marginHorizontal: 6,
    paddingHorizontal: 8,
    backgroundColor: '#ccc',
    borderRadius: 6,
  },
  actionButtonText: {
    fontSize: 18,
  },
  totalContainer: {
  position: 'fixed',
  bottom: 5,
  marginLeft: 16,
  marginRight: 16,
  paddingVertical: 12,
  paddingHorizontal: 24,
  borderRadius: 12,
  backgroundColor: '#fff',
  borderWidth: 1,
  borderColor: '#ccc',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 4,
  zIndex: 999,
>>>>>>> b3b2c0a5d0124784c20d996b74884d0b200adc72
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
