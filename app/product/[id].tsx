import { View, Text, StyleSheet, Pressable, Image, ScrollView, FlatList, useWindowDimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { products } from '../../services/products';
import { shopifyImage } from '../../services/images';
import ProductCard from '../../components/ProductCard';
import { useShop } from '../../context/ShopContext';
import Animated, {
  FadeInDown,
  FadeInUp,
  SlideInRight,
  SlideInLeft,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export default function ProductDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const horizontalPadding = Math.max(16, Math.min(24, width * 0.05));
  const imageSectionHeight = Math.min(420, Math.max(340, width * 0.6)) + insets.top;
  const isLargeScreen = width > 768;

  const product = products.find((p) => p.id === id);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const relatedCardWidth = Math.min(170, Math.max(140, width * 0.36));
  const relatedProducts = product
    ? products.filter((p) => p.category === product.category && p.id !== product.id)
    : [];
  const { addToCart, toggleWishlist, isWishlisted, showToast } = useShop();
  const wishlisted = product ? isWishlisted(product.id) : false;
  const pagerRef = useRef<FlatList<string>>(null);

  // Reset per-product UI state when navigating to another product from the related rail.
  useEffect(() => {
    setActiveImage(0);
    setSelectedSize(null);
    pagerRef.current?.scrollToOffset({ offset: 0, animated: false });
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    if (!selectedSize) {
      showToast('Please select a size');
      return;
    }
    addToCart(product, selectedSize);
    showToast('Added to bag');
  };

  // Animation for the "Add to Cart" button
  const cartScale = useSharedValue(1);
  const cartAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cartScale.value }],
  }));

  const handleCartPressIn = () => {
    cartScale.value = withSpring(0.95, { damping: 15 });
  };

  const handleCartPressOut = () => {
    cartScale.value = withSpring(1, { damping: 15 });
  };

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Product not found</Text>
          <Pressable style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backText}>Go back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Image section: swipeable gallery of every product shot */}
      <View style={[styles.imageSection, { height: imageSectionHeight }]}>
        <FlatList
          ref={pagerRef}
          data={product.images}
          keyExtractor={(uri, i) => `${uri}-${i}`}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          getItemLayout={(_, index) => ({ length: width, offset: width * index, index })}
          onMomentumScrollEnd={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
            const idx = Math.round(e.nativeEvent.contentOffset.x / width);
            if (idx !== activeImage && idx >= 0 && idx < product.images.length) {
              setActiveImage(idx);
            }
          }}
          renderItem={({ item }) => (
            <Image
              source={{ uri: shopifyImage(item, { width: 1200 }) }}
              style={[styles.image, { width }]}
            />
          )}
        />
        {product.images.length > 1 && (
          <>
            {/* position dots */}
            <View style={styles.dotsRow} pointerEvents="none">
              {product.images.map((uri, index) => (
                <View
                  key={`${uri}-${index}`}
                  style={[styles.dot, index === activeImage && styles.dotActive]}
                />
              ))}
            </View>
            {/* tap-to-jump thumbnails */}
            <View style={[styles.thumbRow, { paddingHorizontal: horizontalPadding }]}>
              {product.images.map((uri, index) => (
                <Pressable
                  key={`${uri}-${index}`}
                  onPress={() => pagerRef.current?.scrollToIndex({ index, animated: true })}
                >
                  <Image
                    source={{ uri: shopifyImage(uri, { width: 160, height: 200, crop: true }) }}
                    style={[styles.thumb, index === activeImage && styles.thumbActive]}
                  />
                </Pressable>
              ))}
            </View>
          </>
        )}
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.02)']}
          style={styles.imageFade}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
        <Animated.View
          entering={FadeInUp.delay(300).duration(500)}
          style={[styles.topBar, { paddingHorizontal: horizontalPadding, top: insets.top + 8 }]}
        >
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color="#1a1a1a" />
          </Pressable>
          <Animated.View entering={SlideInRight.delay(400).duration(500)}>
            <Pressable
              style={styles.wishlistBtn}
              onPress={() => {
                if (!product) return;
                toggleWishlist(product);
                showToast(wishlisted ? 'Removed from wishlist' : 'Saved to wishlist');
              }}
            >
              <Ionicons
                name={wishlisted ? 'heart' : 'heart-outline'}
                size={22}
                color="#C49A6C"
              />
            </Pressable>
          </Animated.View>
        </Animated.View>
      </View>

      {/* Details section */}
      <ScrollView
        style={[styles.details, { paddingHorizontal: horizontalPadding }]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.detailsContent}
      >
        <Animated.Text
          sharedTransitionTag={`product-name-${product.id}`}
          entering={FadeInDown.delay(200).duration(600)}
          style={[styles.name, { fontSize: isLargeScreen ? 26 : 22 }]}
        >
          {product.name}
        </Animated.Text>

        <Animated.View entering={FadeInDown.delay(300).duration(600)} style={styles.priceRow}>
          <Animated.Text
            sharedTransitionTag={`product-price-${product.id}`}
            style={[styles.price, { fontSize: isLargeScreen ? 28 : 24 }]}
          >
            ₹{product.price.toLocaleString('en-IN')}
          </Animated.Text>
          <View style={styles.stockBadge}>
            <Ionicons name="checkmark-circle" size={14} color="#2ecc71" />
            <Text style={styles.stockText}>In Stock</Text>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400).duration(600)} style={styles.divider} />

        <Animated.Text entering={FadeInDown.delay(500).duration(600)} style={styles.description}>
          {product.description}
        </Animated.Text>

        <Animated.View entering={FadeInDown.delay(600).duration(600)} style={styles.sizeSection}>
          <Text style={styles.sizeLabel}>Size</Text>
          <View style={styles.sizeOptions}>
            {['S', 'M', 'L'].map((size, index) => {
              const active = selectedSize === size;
              return (
                <Animated.View
                  key={size}
                  entering={SlideInLeft.delay(650 + index * 100).duration(500)}
                >
                  <Pressable
                    style={[styles.sizeBtn, active && styles.sizeBtnActive]}
                    onPress={() => setSelectedSize(size)}
                  >
                    <Text
                      style={[
                        styles.sizeText,
                        { fontSize: isLargeScreen ? 16 : 14 },
                        active && styles.sizeTextActive,
                      ]}
                    >
                      {size}
                    </Text>
                  </Pressable>
                </Animated.View>
              );
            })}
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(900).duration(600)} style={cartAnimatedStyle}>
          <Pressable
            style={styles.addToCart}
            onPress={handleAddToCart}
            onPressIn={handleCartPressIn}
            onPressOut={handleCartPressOut}
          >
            <Ionicons name="cart" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </Pressable>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(1000).duration(600)} style={styles.footer}>
          <Ionicons name="shield-checkmark" size={14} color="#2ecc71" />
          <Text style={styles.footerText}>Free shipping on orders above ₹999</Text>
        </Animated.View>

        {relatedProducts.length > 0 && (
          <View style={styles.relatedSection}>
            <Text style={styles.relatedTitle}>You may also like</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.relatedScroll}
            >
              {relatedProducts.map((rp, index) => (
                <View key={rp.id} style={[styles.relatedCard, { width: relatedCardWidth }]}>
                  <ProductCard product={rp} cardWidth={relatedCardWidth} />
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  notFoundText: { fontSize: 16, color: '#666', marginBottom: 16, textAlign: 'center' },
  backBtn: { padding: 8 },
  backText: { color: '#1a1a1a', fontSize: 14, fontWeight: '600' },
  imageSection: { overflow: 'hidden' },
  image: { width: '100%', height: '100%' },
  thumbRow: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: 8,
  },
  dotsRow: {
    position: 'absolute',
    top: 12,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.55)',
  },
  dotActive: { backgroundColor: '#1a1a1a', width: 16 },
  thumb: {
    width: 44,
    height: 56,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.55)',
    backgroundColor: '#fff',
  },
  thumbActive: { borderColor: '#1a1a1a' },
  imageFade: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  topBar: {
    position: 'absolute',
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  },
  wishlistBtn: {
    padding: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -12,
  },
  detailsContent: { paddingTop: 20, paddingBottom: 24 },
  name: { fontWeight: '700', color: '#1a1a1a', marginBottom: 10, letterSpacing: -0.2 },
  priceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  price: { fontWeight: '700', color: '#1a1a1a' },
  stockBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(46,204,113,0.1)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  stockText: { fontSize: 12, fontWeight: '600', color: '#2ecc71' },
  divider: { height: 1, backgroundColor: '#f0f0f0', marginVertical: 16 },
  description: { fontSize: 14, color: '#666', lineHeight: 22, marginBottom: 20 },
  sizeSection: { marginBottom: 20 },
  sizeLabel: { fontSize: 12, fontWeight: '600', color: '#999', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
  sizeOptions: { flexDirection: 'row', gap: 8 },
  sizeBtn: { backgroundColor: '#f5f5f5', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 8 },
  sizeBtnActive: { backgroundColor: '#1a1a1a' },
  sizeText: { fontWeight: '600', color: '#1a1a1a' },
  sizeTextActive: { color: '#fff' },
  addToCart: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 16,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  relatedSection: { marginTop: 28 },
  relatedTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  relatedScroll: { gap: 12, paddingBottom: 4 },
  relatedCard: { flexShrink: 0 },
  addToCartText: { color: '#fff', fontSize: 15, fontWeight: '700', letterSpacing: 0.3 },
  footer: { flexDirection: 'row', alignItems: 'center', gap: 6, justifyContent: 'center' },
  footerText: { fontSize: 12, color: '#999' },
});
