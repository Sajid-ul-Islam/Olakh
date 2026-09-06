import { View, Text, Image, StyleSheet, Pressable, ScrollView, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useShop } from '../../context/ShopContext';
import { shopifyImage } from '../../services/images';

const FREE_SHIP_THRESHOLD = 999;

export default function CartScreen() {
  const { cart, cartCount, cartTotal, setQuantity, removeFromCart, showToast } = useShop();
  const { width } = useWindowDimensions();
  const horizontalPadding = Math.max(16, Math.min(24, width * 0.05));
  const isLargeScreen = width > 768;

  const shipping = cartTotal >= FREE_SHIP_THRESHOLD ? 0 : 99;
  const total = cartTotal + shipping;

  if (cart.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={[styles.header, { paddingHorizontal: horizontalPadding }]}>
          <View style={styles.placeholder} />
          <Text style={[styles.title, { fontSize: isLargeScreen ? 24 : 22 }]}>Your Cart</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={[styles.emptySection, { paddingHorizontal: horizontalPadding }]}>
          <View style={styles.emptyImageWrapper}>
            <Image
              source={{ uri: shopifyImage('https://cdn.shopify.com/s/files/1/0963/2078/2629/files/02_ParnaBodysuit.jpg?v=1771698424', { width: 1000 }) }}
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

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={[styles.header, { paddingHorizontal: horizontalPadding }]}>
        <View style={styles.placeholder} />
        <Text style={[styles.title, { fontSize: isLargeScreen ? 24 : 22 }]}>
          Your Cart{cartCount > 0 ? ` (${cartCount})` : ''}
        </Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={{ paddingHorizontal: horizontalPadding }}>
          {cart.map((item, idx) => (
            <Animated.View
              key={`${item.product.id}-${item.size ?? 'os'}`}
              entering={FadeInDown.delay(idx * 60).duration(350)}
              style={styles.itemCard}
            >
              <Pressable onPress={() => router.push(`/product/${item.product.id}`)}>
                <Image
                  source={{ uri: shopifyImage(item.product.image, { width: 300, height: 380, crop: true }) }}
                  style={styles.itemImage}
                />
              </Pressable>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName} numberOfLines={1}>{item.product.name}</Text>
                {item.size && <Text style={styles.itemMeta}>Size {item.size}</Text>}
                <Text style={styles.itemPrice}>₹{item.product.price.toLocaleString('en-IN')}</Text>
                <View style={styles.qtyRow}>
                  <Pressable
                    style={styles.qtyBtn}
                    onPress={() => setQuantity(item.product.id, item.size, item.quantity - 1)}
                  >
                    <Ionicons name="remove" size={16} color="#1a1a1a" />
                  </Pressable>
                  <Text style={styles.qtyText}>{item.quantity}</Text>
                  <Pressable
                    style={styles.qtyBtn}
                    onPress={() => setQuantity(item.product.id, item.size, item.quantity + 1)}
                  >
                    <Ionicons name="add" size={16} color="#1a1a1a" />
                  </Pressable>
                  <Pressable
                    style={styles.removeBtn}
                    onPress={() => {
                      removeFromCart(item.product.id, item.size);
                      showToast('Removed from bag');
                    }}
                  >
                    <Ionicons name="trash-outline" size={16} color="#999" />
                  </Pressable>
                </View>
              </View>
              <Text style={styles.itemLineTotal}>
                ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
              </Text>
            </Animated.View>
          ))}

          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>₹{cartTotal.toLocaleString('en-IN')}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>
                {shipping === 0 ? 'Free' : `₹${shipping}`}
              </Text>
            </View>
            {shipping > 0 && (
              <Text style={styles.shipHint}>
                Add ₹{(FREE_SHIP_THRESHOLD - cartTotal).toLocaleString('en-IN')} more for free shipping
              </Text>
            )}
            <View style={[styles.summaryRow, styles.grandRow]}>
              <Text style={styles.grandLabel}>Total</Text>
              <Text style={styles.grandValue}>₹{total.toLocaleString('en-IN')}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingHorizontal: horizontalPadding }]}>
        <Pressable style={styles.checkoutBtn} onPress={() => router.push('/checkout')}>
          <Text style={styles.checkoutText}>Proceed to Checkout · ₹{total.toLocaleString('en-IN')}</Text>
        </Pressable>
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
  title: { fontWeight: '700', color: '#1a1a1a', letterSpacing: 0.3 },
  placeholder: { width: 36, height: 36 },
  scroll: { paddingBottom: 120 },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImage: { width: 76, height: 96, borderRadius: 10, backgroundColor: '#f0f0f0' },
  itemInfo: { flex: 1, paddingHorizontal: 12, justifyContent: 'center' },
  itemName: { fontSize: 14, fontWeight: '600', color: '#1a1a1a', marginBottom: 2 },
  itemMeta: { fontSize: 12, color: '#999', marginBottom: 2 },
  itemPrice: { fontSize: 13, color: '#666', marginBottom: 8 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  qtyBtn: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: { fontSize: 14, fontWeight: '700', color: '#1a1a1a', minWidth: 16, textAlign: 'center' },
  removeBtn: { marginLeft: 'auto', padding: 6 },
  itemLineTotal: { fontSize: 13, fontWeight: '700', color: '#1a1a1a', alignSelf: 'center' },
  summary: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 3 },
  summaryLabel: { fontSize: 13, color: '#666' },
  summaryValue: { fontSize: 13, fontWeight: '600', color: '#1a1a1a' },
  shipHint: { fontSize: 11, color: '#C49A6C', marginTop: 2 },
  grandRow: { marginTop: 6, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  grandLabel: { fontSize: 15, fontWeight: '700', color: '#1a1a1a' },
  grandValue: { fontSize: 15, fontWeight: '700', color: '#1a1a1a' },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingVertical: 12,
    backgroundColor: '#fafafa',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  checkoutBtn: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  checkoutText: { color: '#fff', fontWeight: '700', fontSize: 15, letterSpacing: 0.3 },
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
