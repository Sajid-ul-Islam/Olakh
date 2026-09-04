import { View, Text, ScrollView, Image, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  image: string;
};

function ProductCard({ product, onTap }: { product: ProductCardProps; onTap: () => void }) {
  return (
    <Pressable style={styles.card} onPress={onTap}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
        <Text style={styles.price}>₹{product.price.toLocaleString('en-IN')}</Text>
        <Pressable style={styles.favBtn}>
          <Ionicons name="heart-outline" size={18} color="#C49A6C" />
        </Pressable>
      </View>
    </Pressable>
  );
}

const products = [
  { id: '1', name: 'Parna Balconette', price: 5799, image: 'https://byolakh.com/cdn/shop/files/00_ParnaBalconette.jpg?v=1771694387&width=500' },
  { id: '2', name: 'Parna Bralette', price: 5599, image: 'https://byolakh.com/cdn/shop/files/00_ParnaBralette.jpg?v=1771695794&width=500' },
  { id: '3', name: 'Parna Bodysuit', price: 7199, image: 'https://byolakh.com/cdn/shop/files/00_ParnaBodysuit.jpg?v=1771698424&width=500' },
  { id: '4', name: 'Parna Cheeky', price: 2099, image: 'https://byolakh.com/cdn/shop/files/00_ParnaCheeky.jpg?v=1771697765&width=500' },
  { id: '5', name: 'Parna Balconette - Blush', price: 5799, image: 'https://byolakh.com/cdn/shop/files/01_ParnaBalconette.jpg?v=1771694386&width=500' },
  { id: '6', name: 'Parna Bralette - Ivory', price: 5599, image: 'https://byolakh.com/cdn/shop/files/01_ParnaBralette.jpg?v=1771695794&width=500' },
];

export default function ShopScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-down" size={24} color="#1a1a1a" />
        </Pressable>
        <Text style={styles.title}>Shop</Text>
        <View style={styles.cartIndicator}>
          <Ionicons name="bag" size={20} color="#1a1a1a" />
          <View style={styles.cartBadge}>
            <Text style={styles.badgeText}>0</Text>
          </View>
        </View>
      </View>

      <Text style={styles.subtitle}>The Parna Collection</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
        <View style={styles.categoryContainer}>
          <Pressable style={[styles.categoryChip, { backgroundColor: '#1a1a1a' }]}>
            <Text style={[styles.categoryChipLabel, { color: '#fff' }]}>All</Text>
          </Pressable>
          <Pressable style={styles.categoryChip}>
            <Text style={styles.categoryChipLabel}>Bras</Text>
          </Pressable>
          <Pressable style={styles.categoryChip}>
            <Text style={styles.categoryChipLabel}>Bodysuits</Text>
          </Pressable>
          <Pressable style={styles.categoryChip}>
            <Text style={styles.categoryChipLabel}>Bottoms</Text>
          </Pressable>
        </View>
      </ScrollView>

      <Text style={styles.sectionTitle}>Featured</Text>

      <ScrollView style={styles.productList} contentContainerStyle={styles.productGrid}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onTap={() => router.push(`/product/${p.id}`)} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fafafa' },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 12,
    backgroundColor: '#fafafa',
  },
  backBtn: { padding: 4 },
  title: { fontSize: 22, fontWeight: '700', color: '#1a1a1a', letterSpacing: 0.5 },
  cartIndicator: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  cartBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 2,
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  subtitle: { fontSize: 13, color: '#666', marginHorizontal: 20, marginBottom: 16, fontStyle: 'italic' },
  categoryScroll: { paddingHorizontal: 20, marginBottom: 16 },
  categoryContainer: { gap: 8, flexDirection: 'row', flexWrap: 'wrap' },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    marginRight: 8,
    marginBottom: 8,
  },
  categoryChipLabel: { fontSize: 13, fontWeight: '500', color: '#1a1a1a' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1a1a1a', marginHorizontal: 20, marginBottom: 14 },
  productList: { marginHorizontal: 20, borderRadius: 20, backgroundColor: '#fff', overflow: 'hidden' },
  productGrid: { paddingVertical: 16, gap: 0 },
  card: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  image: { width: 110, height: 120, backgroundColor: '#f5f5f5' },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
    backgroundColor: '#fafafa',
  },
  name: { fontSize: 13, fontWeight: '600', color: '#1a1a1a', marginBottom: 4, textAlign: 'left' },
  price: { fontSize: 15, fontWeight: '700', color: '#1a1a1a', marginBottom: 6 },
  favBtn: { alignSelf: 'flex-start' },
});
