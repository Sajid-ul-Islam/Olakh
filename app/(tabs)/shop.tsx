import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, useWindowDimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { products } from '../../services/products';
import { shopifyImage } from '../../services/images';
import ProductCard from '../../components/ProductCard';
import { useShop } from '../../context/ShopContext';

const FILTERS = [
  { id: 'all' as const, label: 'All' },
  { id: 'bras' as const, label: 'Bras' },
  { id: 'bodysuits' as const, label: 'Bodysuits' },
  { id: 'bottoms' as const, label: 'Bottoms' },
  { id: 'corsets' as const, label: 'Corsets' },
];

export default function ShopScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ category?: string }>();
  const { width } = useWindowDimensions();
  const { cartCount } = useShop();
  const horizontalPadding = Math.max(16, Math.min(24, width * 0.05));
  const isLargeScreen = width > 768;

  const requested =
    params.category && FILTERS.some((f) => f.id === params.category)
      ? params.category
      : 'all';

  // Sync with category param when Home pushes a category while this tab is already mounted.
  const [filter, setFilter] = useState<string>(requested);
  useEffect(() => {
    setFilter(requested);
  }, [requested]);

  const visibleProducts =
    filter === 'all' ? products : products.filter((p) => p.category === filter);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={[styles.topBar, { paddingHorizontal: horizontalPadding }]}>
        <View style={styles.titleWrap}>
          <Text style={[styles.title, { fontSize: isLargeScreen ? 24 : 22 }]}>Shop</Text>
        </View>
        <Pressable onPress={() => router.push('/cart')} style={styles.cartIndicator}>
          <Ionicons name="cart" size={20} color="#1a1a1a" />
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </Pressable>
      </View>

      <Text style={[styles.subtitle, { marginHorizontal: horizontalPadding }]}>
        Handcrafted in small batches
      </Text>

      <View
        style={[styles.filterRow, { paddingHorizontal: horizontalPadding }]}
      >
        {FILTERS.map((f) => {
          const active = filter === f.id;
          return (
            <Pressable
              key={f.id}
              onPress={() => setFilter(f.id)}
              style={[styles.categoryChip, active && { backgroundColor: '#1a1a1a' }]}
            >
              <Text style={[styles.categoryChipLabel, active && { color: '#fff' }]}>
                {f.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <ProductCardGrid products={visibleProducts} />
    </SafeAreaView>
  );
}

function ProductCardGrid({ products: items }: { products: typeof products }) {
  const { width } = useWindowDimensions();
  const horizontalPadding = Math.max(16, Math.min(24, width * 0.05));
  const cardWidth = (width - horizontalPadding * 2 - 12) / 2;

  return (
    <ProductGrid items={items} cardWidth={cardWidth} horizontalPadding={horizontalPadding} />
  );
}

function ProductGrid({
  items,
  cardWidth,
  horizontalPadding,
}: {
  items: typeof products;
  cardWidth: number;
  horizontalPadding: number;
}) {
  return (
    <ScrollView
      style={styles.productList}
      contentContainerStyle={[styles.productGrid, { paddingHorizontal: horizontalPadding }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.grid}>
        {items.map((p) => (
          <ProductCard key={p.id} product={p} cardWidth={cardWidth} />
        ))}
      </View>
    </ScrollView>
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
  titleWrap: { flex: 1 },
  title: { fontWeight: '700', color: '#1a1a1a', letterSpacing: 0.5 },
  cartIndicator: { flexDirection: 'row', alignItems: 'center', padding: 4 },
  cartBadge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
    paddingHorizontal: 4,
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  subtitle: { fontSize: 13, color: '#666', marginBottom: 14, fontStyle: 'italic' },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 14 },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  categoryChipLabel: { fontSize: 13, fontWeight: '500', color: '#1a1a1a' },
  productList: { flex: 1 },
  productGrid: { paddingVertical: 4, paddingBottom: 24 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
