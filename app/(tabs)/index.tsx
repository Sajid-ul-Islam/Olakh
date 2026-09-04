import { View, Text, ScrollView, Image, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { products } from '../../services/products';

const categories = [
  { id: 'bras', name: 'Bras', image: 'https://byolakh.com/cdn/shop/files/01.jpg?v=1771694387' },
  { id: 'bodysuits', name: 'Bodysuits', image: 'https://byolakh.com/cdn/shop/files/03.jpg?v=1771694387' },
  { id: 'bottoms', name: 'Bottoms', image: 'https://byolakh.com/cdn/shop/files/05.jpg?v=1772187444' },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.brand}>Olakh</Text>
          <View style={styles.headerIcons}>
            <Pressable onPress={() => router.push('/cart')}>
              <Ionicons name="cart" size={24} color="#1a1a1a" />
            </Pressable>
          </View>
        </View>

        <Text style={styles.tagline}>Intimate wear, redefined.</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
          {categories.map((cat) => (
            <Pressable key={cat.id} style={styles.categoryCard}>
              <Image source={{ uri: cat.image }} style={styles.categoryImage} />
              <Text style={styles.categoryName}>{cat.name}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>New Arrivals</Text>
        <View style={styles.productGrid}>
          {products.slice(0, 4).map((product) => (
            <Pressable
              key={product.id}
              style={styles.productCard}
              onPress={() => router.push(`/product/${product.id}`)}
            >
              <Image source={{ uri: product.image }} style={styles.productImage} />
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>₹{product.price.toLocaleString('en-IN')}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 16,
  },
  brand: { fontSize: 28, fontWeight: '800', letterSpacing: 1, color: '#1a1a1a' },
  headerIcons: { flexDirection: 'row', gap: 16 },
  tagline: {
    fontSize: 14, color: '#666', paddingHorizontal: 20, marginBottom: 20, fontStyle: 'italic',
  },
  categories: { paddingHorizontal: 20, marginBottom: 24 },
  categoryCard: { marginRight: 16, alignItems: 'center' },
  categoryImage: { width: 100, height: 120, borderRadius: 12, marginBottom: 8 },
  categoryName: { fontSize: 13, fontWeight: '600', color: '#1a1a1a' },
  sectionTitle: {
    fontSize: 20, fontWeight: '700', paddingHorizontal: 20, marginBottom: 16, color: '#1a1a1a',
  },
  productGrid: {
    flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12, gap: 12, paddingBottom: 24,
  },
  productCard: {
    width: '47%', backgroundColor: '#fff', borderRadius: 16, padding: 12, marginBottom: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06,
    shadowRadius: 8, elevation: 2,
  },
  productImage: { width: '100%', height: 180, borderRadius: 12, marginBottom: 12 },
  productName: { fontSize: 14, fontWeight: '600', color: '#1a1a1a', marginBottom: 4 },
  productPrice: { fontSize: 15, fontWeight: '700', color: '#1a1a1a' },
});
