import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import ProductCard from '../comp/ProductCard';

const API_URL = "http://10.0.2.2:3001";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch(`${API_URL}/products`)
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

  const handleAdd = (price) => setTotal(t => t + price);
  const handleRemove = (price) => setTotal(t => Math.max(0, t - price));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <View style={styles.menuIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>FOOD APP</Text>
      </View>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <ProductCard product={item} onAdd={handleAdd} onRemove={handleRemove} />
        )}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
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
  grid: {
    paddingHorizontal: 8,
    paddingBottom: 80,
    alignItems: 'center',
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
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;