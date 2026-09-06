import { View, Text, ScrollView, Image, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
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
  const { width } = useWindowDimensions();
  const cardWidth = (width - 40 - 16) / 2;
  const imageHeight = Math.min(140, Math.max(110, cardWidth * 1.2));

  return (
    <Pressable style={[styles.card, { width: cardWidth }]} onPress={onTap}>
      <Image source={{ uri: product.image }} style={[styles.image, { height: imageHeight }]} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.price}>৳{product.price.toLocaleString('en-IN')}</Text>
        <Pressable style={styles.favBtn}>
          <Ionicons name="heart-outline" size={18} color="#C49A6C" />
        </Pressable>
      </View>
    </Pressable>
  );
}

const products = [
  { id: '1', name: 'Parna Balconette', price: 5799, image: 'https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7e8?w=500&h=600&fit=crop' },
  { id: '2', name: 'Parna Bralette', price: 5599, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085aae?w=500&h=600&fit=crop' },
  { id: '3', name: 'Parna Bodysuit', price: 7199, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=600&fit=crop' },
  { id: '4', name: 'Parna Cheeky', price: 2099, image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop' },
  { id: '5', name: 'Parna Balconette - Blush', price: 5799, image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&h=600&fit=crop' },
  { id: '6', name: 'Parna Bralette - Ivory', price: 5599, image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&h=600&fit=crop' },
  { id: '7', name: 'Parna Lounge Set', price: 8499, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=600&fit=crop' },
  { id: '8', name: 'Parna Sleep Set', price: 4999, image: 'https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7e8?w=500&h=600&fit=crop' },
];

export default function ShopScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const horizontalPadding = Math.max(16, Math.min(24, width * 0.05));
  const isLargeScreen = width > 768;

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={[styles.topBar, { paddingHorizontal: horizontalPadding }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-down" size={24} color="#1a1a1a" />
        </Pressable>
        <Text style={[styles.title, { fontSize: isLargeScreen ? 24 : 22 }]}>Shop</Text>
        <View style={styles.cartIndicator}>
          <Ionicons name="bag" size={20} color="#1a1a1a" />
          <View style={styles.cartBadge}>
            <Text style={styles.badgeText}>0</Text>
          </View>
        </View>
      </View>

      <Text style={[styles.subtitle, { marginHorizontal: horizontalPadding }]}>The Parna Collection</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.categoryScroll, { paddingHorizontal: horizontalPadding }]}
      >
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
          <Pressable style={styles.categoryChip}>
            <Text style={styles.categoryChipLabel}>Loungewear</Text>
          </Pressable>
          <Pressable style={styles.categoryChip}>
            <Text style={styles.categoryChipLabel}>Sleepwear</Text>
          </Pressable>
        </View>
      </ScrollView>

      <Text style={[styles.sectionTitle, { marginHorizontal: horizontalPadding }]}>Featured</Text>

      <ScrollView
        style={[styles.productList, { marginHorizontal: horizontalPadding }]}
        contentContainerStyle={styles.productGrid}
      >
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
    paddingTop: 24,
    paddingBottom: 12,
    backgroundColor: '#fafafa',
  },
  backBtn: { padding: 4 },
  title: { fontWeight: '700', color: '#1a1a1a', letterSpacing: 0.5 },
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
  subtitle: { fontSize: 13, color: '#666', marginBottom: 16, fontStyle: 'italic' },
  categoryScroll: { marginBottom: 16 },
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
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1a1a1a', marginBottom: 14 },
  productList: { borderRadius: 20, backgroundColor: '#fff', overflow: 'hidden' },
  productGrid: { paddingVertical: 16 },
  card: {
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginBottom: 12,
  },
  image: { width: '100%' },
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
