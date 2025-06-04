import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>FOOD APP</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFD700',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default Header;
