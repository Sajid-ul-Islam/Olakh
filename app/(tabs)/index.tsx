import { View, Text, Image, StyleSheet, Pressable, ScrollView, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { products } from '../../services/products';
import ProductCard from '../../components/ProductCard';
import Animated, { FadeInDown, FadeInUp, FadeInLeft, ZoomIn } from 'react-native-reanimated';

const categories = [
  { id: 'bras', name: 'Bras', image: 'https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7e8?w=400&h=500&fit=crop' },
  { id: 'bodysuits', name: 'Bodysuits', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085aae?w=400&h=500&fit=crop' },
  { id: 'bottoms', name: 'Bottoms', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop' },
  { id: 'loungewear', name: 'Loungewear', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop' },
  { id: 'sleepwear', name: 'Sleepwear', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=500&fit=crop' },
];

const heroImages = [
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1000&fit=crop',
];

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const horizontalPadding = Math.max(16, Math.min(24, width * 0.05));
  const heroHeight = Math.min(400, Math.max(300, width * 0.55));
  const categoryCardSize = Math.min(100, Math.max(76, width * 0.18));
  const productCardWidth = (width - horizontalPadding * 2 - 12) / 2;
  const isLargeScreen = width > 768;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Top bar */}
      <Animated.View entering={FadeInDown.delay(100).duration(500)} style={[styles.topBar, { paddingHorizontal: horizontalPadding }]}>
        <Pressable onPress={() => router.push('/(tabs)/account')} style={styles.brandBtn}>
          <Text style={[styles.brand, { fontSize: isLargeScreen ? 32 : 28 }]}>Olakh</Text>
        </Pressable>
        <View style={styles.iconRow}>
          <Pressable onPress={() => router.push('/wishlist')} style={styles.iconBtn}>
            <Ionicons name="heart-outline" size={22} color="#C49A6C" />
          </Pressable>
          <Pressable onPress={() => router.push('/notifications')} style={styles.iconBtn}>
            <Ionicons name="notifications-outline" size={22} color="#C49A6C" />
          </Pressable>
        </View>
      </Animated.View>

      {/* Hero */}
      <Animated.View entering={FadeInDown.delay(200).duration(600)} style={[styles.hero, { height: heroHeight, marginHorizontal: horizontalPadding }]}>
        <Pressable onPress={() => router.push('/(tabs)/shop')}>
          <Image
            source={{ uri: heroImages[0] }}
            style={[styles.heroImage, { height: heroHeight }]}
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.0)']}
            style={styles.heroGradient}
            start={{ x: 0.5, y: 1 }}
            end={{ x: 0.5, y: 0 }}
          />
          <View style={[styles.heroContent, { left: horizontalPadding, right: horizontalPadding }]}>
            <Animated.View entering={ZoomIn.delay(400).duration(500)} style={styles.heroBadge}>
              <Ionicons name="sparkles" size={12} color="#fff" />
              <Text style={styles.heroBadgeText}>New Season</Text>
            </Animated.View>
            <Animated.Text entering={FadeInUp.delay(450).duration(500)} style={[styles.heroTitle, { fontSize: isLargeScreen ? 36 : 30 }]}>
              The Parna Collection
            </Animated.Text>
            <Animated.Text entering={FadeInUp.delay(500).duration(500)} style={styles.heroSubtitle}>
              Elegance meets everyday comfort
            </Animated.Text>
            <Animated.View entering={FadeInUp.delay(550).duration(500)} style={styles.heroCta}>
              <Text style={styles.heroCtaText}>Shop Now</Text>
            </Animated.View>
          </View>
        </Pressable>
      </Animated.View>

      {/* Categories */}
      <Animated.Text entering={FadeInLeft.delay(600).duration(500)} style={[styles.sectionTitle, { paddingHorizontal: horizontalPadding }]}>
        Shop by category
      </Animated.Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.categoryScroll, { paddingHorizontal: horizontalPadding }]}
      >
        {categories.map((cat, index) => (
          <Animated.View
            key={cat.id}
            entering={FadeInUp.delay(650 + index * 100).duration(500)}
            style={styles.categoryCard}
          >
            <Pressable
              onPress={() => router.push({ pathname: '/(tabs)/shop', params: { category: cat.id } })}
              style={[styles.categoryInner, { width: categoryCardSize }]}
            >
              <Image source={{ uri: cat.image }} style={[styles.categoryImage, { width: categoryCardSize, height: categoryCardSize * 1.2 }]} />
              <Text style={[styles.categoryName, { width: categoryCardSize, fontSize: isLargeScreen ? 15 : 13 }]} numberOfLines={1}>
                {cat.name}
              </Text>
            </Pressable>
          </Animated.View>
        ))}
      </ScrollView>

      {/* Products */}
      <Animated.Text entering={FadeInLeft.delay(1000).duration(500)} style={[styles.sectionTitle, { paddingHorizontal: horizontalPadding }]}>
        New Arrivals
      </Animated.Text>
      <View style={[styles.productGrid, { paddingHorizontal: horizontalPadding, gap: 12 }]}>
        {products.slice(0, 4).map((product, index) => (
          <ProductCard key={product.id} product={product} cardWidth={productCardWidth} />
        ))}
      </View>

      {/* Brand story */}
      <Animated.View entering={FadeInDown.delay(1200).duration(600)} style={[styles.brandStory, { marginHorizontal: horizontalPadding }]}>
        <Text style={styles.brandStoryTitle}>Crafted for Confidence</Text>
        <Text style={styles.brandStoryText}>
          Olakh celebrates the modern woman with intimate wear that blends premium fabrics,
          thoughtful design, and everyday comfort.
        </Text>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 18,
    paddingBottom: 12,
  },
  brandBtn: { padding: 0 },
  brand: { fontWeight: '800', letterSpacing: 1, color: '#1a1a1a' },
  iconRow: { flexDirection: 'row', gap: 14 },
  iconBtn: { padding: 4 },
  hero: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
  },
  heroImage: { width: '100%', height: '100%' },
  heroGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  heroContent: {
    position: 'absolute',
    bottom: 20,
    justifyContent: 'flex-end',
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 10,
    width: 95,
    justifyContent: 'center',
  },
  heroBadgeText: { fontSize: 10, fontWeight: '600', color: '#fff', letterSpacing: 0.5 },
  heroTitle: { fontWeight: '800', color: '#fff', marginBottom: 6, letterSpacing: 0.3, textShadowColor: 'rgba(0,0,0,0.3)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 },
  heroSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.85)', marginBottom: 16, letterSpacing: -0.2 },
  heroCta: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    paddingHorizontal: 22,
    paddingVertical: 13,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  heroCtaText: { color: '#1a1a1a', fontWeight: '700', fontSize: 14, letterSpacing: 0.3 },
  sectionTitle: { fontSize: 20, fontWeight: '700', marginBottom: 14, color: '#1a1a1a', letterSpacing: 0.2 },
  categoryScroll: { marginBottom: 24 },
  categoryCard: { marginRight: 16, alignItems: 'center' },
  categoryInner: { alignItems: 'center' },
  categoryImage: { borderRadius: 10, backgroundColor: '#f0f0f0', marginBottom: 6 },
  categoryName: { fontWeight: '600', color: '#1a1a1a', textAlign: 'center' },
  productGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingBottom: 24 },
  brandStory: { padding: 20, backgroundColor: '#fff', borderRadius: 16, marginBottom: 24 },
  brandStoryTitle: { fontSize: 17, fontWeight: '700', color: '#1a1a1a', marginBottom: 8 },
  brandStoryText: { fontSize: 13, color: '#666', lineHeight: 20 },
});
