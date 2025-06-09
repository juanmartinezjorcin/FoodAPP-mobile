import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

// ¡No debés renderizar ProductDetailScreen directamente dentro del FlatList!
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation(); // <- obtener navegación
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const customData = [
      { id: 1, title: "Pancho", price: 0.5, emoji: "🌭" },
      { id: 2, title: "Hamburguesa", price: 0.4, emoji: "🍔" },
      { id: 3, title: "Papas", price: 0.8, emoji: "🍟" },
      { id: 4, title: "Pollo", price: 1.5, emoji: "🍗" }
    ];
    setProducts(customData);
  }, []);

  const handleAdd = (price) => setTotal(t => t + price);
  const handleRemove = (price) => setTotal(t => Math.max(0, t - price));

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <View style={styles.menuIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>FOOD APP</Text>
      </View>

      {/* Botones de navegación */}
      <View style={styles.navButtons}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('ProductDetailScreen')}
        >
          <Text style={styles.navButtonText}>Ir a Detalle</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('CartScreen')}
        >
          <Text style={styles.navButtonText}>Ir al Carrito</Text>
        </TouchableOpacity>
      </View>

      {/* Productos */}
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
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
        )}
      />

      {/* Total */}
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
    position: 'absolute', // <- mejor que "fixed"
    bottom: 10,
    left: 16,
    right: 16,
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
