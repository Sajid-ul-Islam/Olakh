import { View, Text, Image, StyleSheet, Pressable, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { products } from '../../services/products';
import ProductCard from '../../components/ProductCard';

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
          <Pressable onPress={() => router.push('/(tabs)/account')}>
            <Text style={styles.brand}>Olakh</Text>
          </Pressable>
          <View style={styles.headerIcons}>
            <Pressable onPress={() => router.push('/wishlist')} style={styles.iconBtn}>
              <Ionicons name="heart-outline" size={22} color="#C49A6C" />
            </Pressable>
            <Pressable onPress={() => router.push('/notifications')} style={styles.iconBtn}>
              <Ionicons name="notifications-outline" size={22} color="#C49A6C" />
            </Pressable>
          </View>
        </View>

        <Pressable style={styles.hero} onPress={() => router.push('/(tabs)/shop')}>
          <Image
            source={{ uri: 'https://byolakh.com/cdn/shop/files/08.jpg?v=1772198388' }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay}>
            <View style={styles.heroBadge}>
              <Ionicons name="sparkles" size={12} color="#fff" />
              <Text style={styles.heroBadgeText}>New Season</Text>
            </View>
            <Text style={styles.heroTitle}>The Parna Collection</Text>
            <Text style={styles.heroSubtitle}>Elegance meets everyday comfort</Text>
            <Pressable style={styles.heroCta}>
              <Text style={styles.heroCtaText}>Shop Now</Text>
            </Pressable>
          </View>
        </Pressable>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
          {categories.map((cat) => (
            <Pressable
              key={cat.id}
              style={styles.categoryCard}
              onPress={() => router.push({ pathname: '/(tabs)/shop', params: { category: cat.id } })}
            >
              <Image source={{ uri: cat.image }} style={styles.categoryImage} />
              <Text style={styles.categoryName} numberOfLines={1}>{cat.name}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>New Arrivals</Text>
        <View style={styles.productGrid}>
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </View>

        <View style={styles.brandStory}>
          <Text style={styles.brandStoryTitle}>Crafted for Confidence</Text>
          <Text style={styles.brandStoryText}>
            Olakh celebrates the modern woman with intimate wear that blends premium fabrics,
            thoughtful design, and everyday comfort.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 16,
  },
  brand: { fontSize: 28, fontWeight: '800', letterSpacing: 1, color: '#1a1a1a' },
  headerIcons: { flexDirection: 'row', gap: 16 },
  iconBtn: { padding: 4 },
  hero: { marginHorizontal: 20, height: 380, borderRadius: 20, overflow: 'hidden', marginBottom: 24 },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: {
    position: 'absolute', inset: 0,
    justifyContent: 'flex-end', padding: 24,
    backgroundColor: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)',
  },
  heroBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 20, marginBottom: 10,
    width: 95,
    justifyContent: 'center',
  },
  heroBadgeText: { fontSize: 10, fontWeight: '600', color: '#fff', letterSpacing: 0.5 },
  heroTitle: { fontSize: 30, fontWeight: '800', color: '#fff', marginBottom: 6, letterSpacing: 0.3 },
  heroSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.85)', marginBottom: 16, letterSpacing: -0.2 },
  heroCta: {
    alignSelf: 'flex-start', backgroundColor: '#fff', paddingHorizontal: 22, paddingVertical: 13,
    borderRadius: 14,
  },
  heroCtaText: { color: '#1a1a1a', fontWeight: '700', fontSize: 14, letterSpacing: 0.3 },
  categories: { paddingHorizontal: 20, marginBottom: 24 },
  categoryCard: { marginRight: 16, alignItems: 'center', flexDirection: 'row' },
  categoryImage: { width: 80, height: 100, borderRadius: 10, marginRight: 8, backgroundColor: '#f0f0f0' },
  categoryName: { fontSize: 13, fontWeight: '600', color: '#1a1a1a', flex: 1 },
  sectionTitle: {
    fontSize: 20, fontWeight: '700', paddingHorizontal: 20, marginBottom: 14, color: '#1a1a1a',
  },
  productGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12, gap: 12, paddingBottom: 24 },
  brandStory: { marginHorizontal: 20, padding: 20, backgroundColor: '#fff', borderRadius: 16, marginBottom: 24 },
  brandStoryTitle: { fontSize: 17, fontWeight: '700', color: '#1a1a1a', marginBottom: 8 },
  brandStoryText: { fontSize: 13, color: '#666', lineHeight: 20 },
});
