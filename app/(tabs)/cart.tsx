import { View, Text, Image, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CartScreen() {
  const { width } = useWindowDimensions();
  const horizontalPadding = Math.max(16, Math.min(24, width * 0.05));
  const isLargeScreen = width > 768;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={[styles.header, { paddingHorizontal: horizontalPadding }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#1a1a1a" />
        </Pressable>
        <Text style={[styles.title, { fontSize: isLargeScreen ? 24 : 22 }]}>Your Cart</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={[styles.emptySection, { paddingHorizontal: horizontalPadding }]}>
        <View style={styles.emptyImageWrapper}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=1000&fit=crop' }}
            style={styles.emptyImage}
          />
          <View style={styles.emptyImageOverlay} />
          <View style={styles.emptyImageInner}>
            <View style={styles.emptyIconRow}>
              <Ionicons name="cart-outline" size={isLargeScreen ? 42 : 36} color="#fff" />
            </View>
          </View>
        </View>

        <View style={styles.emptyContent}>
          <Text style={[styles.emptyTitle, { fontSize: isLargeScreen ? 24 : 20 }]}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>
            Discover pieces crafted for comfort, confidence, and everyday beauty.
          </Text>
          <Pressable
            style={[styles.shopBtn, { paddingHorizontal: isLargeScreen ? 40 : 32 }]}
            onPress={() => router.push('/(tabs)/shop')}
          >
            <Text style={styles.shopBtnText}>Browse Collection</Text>
          </Pressable>
          <View style={styles.benefitsRow}>
            <View style={styles.benefit}>
              <Ionicons name="car-outline" size={16} color="#2ecc71" />
              <Text style={styles.benefitText}>Free shipping ₹999+</Text>
            </View>
            <View style={styles.benefit}>
              <Ionicons name="arrow-up" size={16} color="#2ecc71" />
              <Text style={styles.benefitText}>Easy returns</Text>
            </View>
            <View style={styles.benefit}>
              <Ionicons name="shield-checkmark" size={16} color="#2ecc71" />
              <Text style={styles.benefitText}>Secure checkout</Text>
            </View>
          </View>
        </View>
      </View>
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
  placeholder: { width: 36, height: 36, backgroundColor: '#f0f0f0', borderRadius: 18 },
  emptySection: { flex: 1, paddingBottom: 32 },
  emptyImageWrapper: {
    width: '100%',
    height: 240,
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
    backgroundColor: 'rgba(0,0,0,0.3)',
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 24,
  },
  emptyContent: { marginBottom: 20 },
  emptyTitle: { fontWeight: '700', color: '#1a1a1a', marginBottom: 8, textAlign: 'center', letterSpacing: -0.2 },
  emptySubtitle: { fontSize: 13, color: '#666', lineHeight: 20, marginBottom: 20, textAlign: 'center' },
  shopBtn: {
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
  shopBtnText: { color: '#fff', fontWeight: '700', fontSize: 14, letterSpacing: 0.3 },
  benefitsRow: { flexDirection: 'row', justifyContent: 'center', gap: 32 },
  benefit: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  benefitText: { fontSize: 12, color: '#666', fontWeight: '500' },
});
