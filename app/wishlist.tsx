import { View, Text, StyleSheet, Pressable, ScrollView, Image, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useShop } from '../context/ShopContext';
import { shopifyImage } from '../services/images';
import { Product } from '../types';

export default function WishlistScreen() {
  const { wishlist, toggleWishlist, addToCart, showToast } = useShop();
  const { width } = useWindowDimensions();
  const horizontalPadding = Math.max(16, Math.min(24, width * 0.05));
  const isLargeScreen = width > 768;
  const cardWidth = (width - horizontalPadding * 2 - 12) / 2;
  const imageHeight = Math.min(190, Math.max(140, cardWidth * 1.6));

  const moveToBag = (product: Product) => {
    addToCart(product);
    toggleWishlist(product);
    showToast('Moved to bag');
  };

  if (wishlist.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={[styles.header, { paddingHorizontal: horizontalPadding }]}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color="#1a1a1a" />
          </Pressable>
          <Text style={[styles.title, { fontSize: isLargeScreen ? 24 : 22 }]}>Wishlist</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.emptySection, { paddingHorizontal: horizontalPadding }]}>
            <View style={[styles.emptyImageWrapper, { height: Math.min(240, Math.max(200, width * 0.35)) }]}>
              <Image
                source={{ uri: shopifyImage('https://cdn.shopify.com/s/files/1/0963/2078/2629/files/02_ParnaBalconette.jpg?v=1771694386', { width: 1000 }) }}
                style={styles.emptyImage}
              />
              <View style={styles.emptyImageOverlay} />
              <View style={styles.emptyImageInner}>
                <View style={styles.emptyIconRow}>
                  <Ionicons name="heart-outline" size={isLargeScreen ? 38 : 32} color="#fff" />
                  <Text style={styles.emptyIconText}>Save your favorites</Text>
                </View>
              </View>
            </View>

            <View style={styles.emptyContent}>
              <Text style={[styles.emptyTitle, { fontSize: isLargeScreen ? 24 : 20 }]}>Your wishlist is empty</Text>
              <Text style={styles.emptySubtitle}>
                Tap the heart on any piece to save it here.
              </Text>
              <Pressable
                style={[styles.browseBtn, { paddingHorizontal: isLargeScreen ? 40 : 32 }]}
                onPress={() => router.push('/(tabs)/shop')}
              >
                <Text style={styles.browseBtnText}>Browse Collection</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={[styles.header, { paddingHorizontal: horizontalPadding }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#1a1a1a" />
        </Pressable>
        <Text style={[styles.title, { fontSize: isLargeScreen ? 24 : 22 }]}>
          Wishlist ({wishlist.length})
        </Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: horizontalPadding, paddingBottom: 32 }}
      >
        <View style={styles.grid}>
          {wishlist.map((item, idx) => (
            <Animated.View
              key={item.product.id}
              entering={FadeInDown.delay(idx * 60).duration(350)}
              style={[styles.card, { width: cardWidth }]}
            >
              <Pressable onPress={() => router.push(`/product/${item.product.id}`)}>
                <Image
                  source={{ uri: shopifyImage(item.product.image, { width: 700 }) }}
                  style={[styles.cardImage, { height: imageHeight }]}
                />
              </Pressable>
              <View style={styles.cardInfo}>
                <Text style={styles.cardName} numberOfLines={1}>{item.product.name}</Text>
                <Text style={styles.cardPrice}>₹{item.product.price.toLocaleString('en-IN')}</Text>
                <View style={styles.cardActions}>
                  <Pressable style={styles.bagBtn} onPress={() => moveToBag(item.product)}>
                    <Text style={styles.bagBtnText}>Move to Bag</Text>
                  </Pressable>
                  <Pressable
                    style={styles.heartBtn}
                    onPress={() => {
                      toggleWishlist(item.product);
                      showToast('Removed from wishlist');
                    }}
                  >
                    <Ionicons name="heart" size={18} color="#C49A6C" />
                  </Pressable>
                </View>
              </View>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#fafafa',
  },
  backBtn: { padding: 4 },
  title: { fontWeight: '700', color: '#1a1a1a', letterSpacing: 0.3 },
  placeholder: { width: 32 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  cardImage: { width: '100%', backgroundColor: '#f0f0f0' },
  cardInfo: { padding: 12 },
  cardName: { fontSize: 14, fontWeight: '600', color: '#1a1a1a', marginBottom: 2 },
  cardPrice: { fontSize: 14, fontWeight: '700', color: '#1a1a1a', marginBottom: 10 },
  cardActions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  bagBtn: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingVertical: 9,
    borderRadius: 10,
    alignItems: 'center',
  },
  bagBtnText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  heartBtn: { padding: 6 },
  emptySection: { flex: 1, paddingBottom: 32 },
  emptyImageWrapper: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 28,
  },
  emptyImage: { width: '100%', height: '100%' },
  emptyImageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  emptyImageInner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIconRow: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  emptyIconText: { color: '#fff', fontSize: 12, fontWeight: '600', textAlign: 'center' },
  emptyContent: { marginBottom: 20 },
  emptyTitle: { fontWeight: '700', color: '#1a1a1a', marginBottom: 8, textAlign: 'center', letterSpacing: -0.2 },
  emptySubtitle: { fontSize: 13, color: '#666', lineHeight: 20, marginBottom: 20, textAlign: 'center' },
  browseBtn: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  browseBtnText: { color: '#fff', fontWeight: '700', fontSize: 14, letterSpacing: 0.3 },
});
