import { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ScrollView, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { products } from '../../services/products';
import { shopifyImage } from '../../services/images';
import ProductCard from '../../components/ProductCard';
import Animated, { FadeInDown, FadeInUp, FadeInLeft, ZoomIn, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const HERO_SLIDE_MS = 5000;
const HERO_FADE_MS = 900;

const categories = [
  { id: 'bras' as const, name: 'Bras', image: 'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/00_ParnaBalconette.jpg?v=1771694387' },
  { id: 'bodysuits' as const, name: 'Bodysuits', image: 'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/00_ParnaBodysuit.jpg?v=1771698424' },
  { id: 'bottoms' as const, name: 'Bottoms', image: 'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/00_ParnaCheeky.jpg?v=1771697765' },
  { id: 'corsets' as const, name: 'Corsets', image: 'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/00_ParnaCorset.jpg?v=1771694989' },
];

const heroImages = [
  // On-model editorial shots from the store's Shopify CDN
  'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/01_ParnaBodysuit.jpg?v=1771698424',
  'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/02_ParnaBalconette.jpg?v=1771694386',
  'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/03_ParnaCorset.jpg?v=1771694989',
];

/** One stacked hero photo that crossfades in/out as `active` flips. */
function HeroSlide({ uri, active, height }: { uri: string; active: boolean; height: number }) {
  const opacity = useSharedValue(active ? 1 : 0);

  useEffect(() => {
    opacity.value = withTiming(active ? 1 : 0, { duration: HERO_FADE_MS });
  }, [active, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.Image
      source={{ uri: shopifyImage(uri, { width: 1200 }) }}
      style={[styles.heroSlide, { height }, animatedStyle]}
    />
  );
}

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const horizontalPadding = Math.max(16, Math.min(24, width * 0.05));
  const heroHeight = Math.min(400, Math.max(300, width * 0.55));
  const categoryCardSize = Math.min(100, Math.max(76, width * 0.18));
  const productCardWidth = (width - horizontalPadding * 2 - 12) / 2;
  const isLargeScreen = width > 768;
  const [heroIndex, setHeroIndex] = useState(0);
  const fullHeroHeight = heroHeight + insets.top;

  // Auto-advance the hero; each render of HeroSlide covers its own crossfade.
  useEffect(() => {
    const t = setInterval(() => {
      setHeroIndex((i) => (i + 1) % heroImages.length);
    }, HERO_SLIDE_MS);
    return () => clearInterval(t);
  }, []);

  // Warm the CDN cache for every hero shot at display size so fades never pop in blank.
  useEffect(() => {
    heroImages.forEach((u) => Image.prefetch(shopifyImage(u, { width: 1200 })));
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
      {/* Full-bleed hero reaching the very top of the screen */}
      <Animated.View entering={FadeInDown.delay(200).duration(600)} style={[styles.hero, { height: fullHeroHeight }]}>
        <Pressable onPress={() => router.push('/(tabs)/shop')}>
          {/* stacked on-model shots, crossfading */}
          {heroImages.map((uri, i) => (
            <HeroSlide key={uri} uri={uri} active={i === heroIndex} height={fullHeroHeight} />
          ))}
          {/* soft white veil under the status bar so its icons stay legible */}
          <LinearGradient
            colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.35)', 'rgba(255,255,255,0)']}
            style={styles.heroTopScrim}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          />
          {/* darkening at the bottom for the headline */}
          <LinearGradient
            colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.0)']}
            style={styles.heroGradient}
            start={{ x: 0.5, y: 1 }}
            end={{ x: 0.5, y: 0 }}
          />
          {/* top bar overlaid on the photo, below the status bar */}
          <Animated.View
            entering={FadeInDown.delay(100).duration(500)}
            style={[styles.topBar, { top: insets.top, paddingHorizontal: horizontalPadding }]}
          >
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
          {/* hero progress dots */}
          <View style={styles.heroDots} pointerEvents="none">
            {heroImages.map((uri, i) => (
              <View key={uri} style={[styles.heroDot, i === heroIndex && styles.heroDotActive]} />
            ))}
          </View>
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
              <Image
                source={{ uri: shopifyImage(cat.image, { width: 360, height: 430, crop: true }) }}
                style={[styles.categoryImage, { width: categoryCardSize, height: categoryCardSize * 1.2 }]}
              />
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  scrollContent: { paddingBottom: 24 },
  topBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 6,
    paddingBottom: 6,
  },
  brandBtn: { padding: 0 },
  brand: { fontWeight: '800', letterSpacing: 1, color: '#1a1a1a' },
  iconRow: { flexDirection: 'row', gap: 14 },
  iconBtn: { padding: 4 },
  hero: {
    overflow: 'hidden',
    marginBottom: 24,
  },
  heroSlide: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
  },
  heroDots: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 96,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  heroDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  heroDotActive: { backgroundColor: '#fff', width: 18 },
  heroTopScrim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 110,
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
