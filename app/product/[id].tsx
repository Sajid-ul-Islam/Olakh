import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { products } from '../../services/products';

export default function ProductDetail({ route }: any) {
  const { id } = route.params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Product not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>₹{product.price.toLocaleString('en-IN')}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Pressable style={styles.addToCart}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 400 },
  details: { flex: 1, padding: 20, borderTopLeftRadius: 24, borderTopRightRadius: 24, marginTop: -24, backgroundColor: '#fff' },
  name: { fontSize: 24, fontWeight: '700', color: '#1a1a1a', marginBottom: 8 },
  price: { fontSize: 22, fontWeight: '700', color: '#1a1a1a', marginBottom: 16 },
  description: { fontSize: 15, color: '#666', lineHeight: 22, marginBottom: 24 },
  addToCart: {
    backgroundColor: '#1a1a1a', paddingVertical: 16, borderRadius: 14,
    alignItems: 'center',
  },
  addToCartText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
