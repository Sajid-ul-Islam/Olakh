import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  Alert,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useShop } from '../context/ShopContext';
import { shopifyImage } from '../services/images';
import { Image } from 'react-native';

const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI', icon: 'phone-portrait-outline' as const },
  { id: 'card', label: 'Card', icon: 'card-outline' as const },
  { id: 'cod', label: 'Cash on Delivery', icon: 'cash-outline' as const },
];

const FREE_SHIP_THRESHOLD = 999;
const SHIPPING_FEE = 99;

export default function CheckoutScreen() {
  const { cart, cartTotal, clearCart } = useShop();
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 768;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [payment, setPayment] = useState('upi');
  const [placing, setPlacing] = useState(false);

  const shipping = cartTotal >= FREE_SHIP_THRESHOLD || cartTotal === 0 ? 0 : SHIPPING_FEE;
  const total = cartTotal + shipping;

  const handlePlaceOrder = async () => {
    if (!name.trim() || !phone.trim() || !address.trim() || !city.trim() || !pincode.trim()) {
      Alert.alert('Missing details', 'Please fill in your name, phone, address, city and pincode.');
      return;
    }
    if (!/^\d{10}$/.test(phone.trim())) {
      Alert.alert('Invalid phone', 'Please enter a 10-digit phone number.');
      return;
    }
    if (!/^\d{6}$/.test(pincode.trim())) {
      Alert.alert('Invalid pincode', 'Please enter a 6-digit pincode.');
      return;
    }

    setPlacing(true);
    // Mock payment / order placement — swap for Razorpay/Shopify Storefront order API.
    await new Promise((res) => setTimeout(res, 900));
    clearCart();
    setPlacing(false);
    Alert.alert(
      'Order placed',
      `Thank you, ${name.trim()}! Your order of ₹${total.toLocaleString('en-IN')} is confirmed.`,
      [
        {
          text: 'Keep shopping',
          onPress: () => router.replace('/(tabs)'),
        },
      ],
    );
  };

  if (cart.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={[styles.header, { paddingHorizontal: isLargeScreen ? 24 : 16 }]}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color="#1a1a1a" />
          </Pressable>
          <Text style={styles.title}>Checkout</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.emptyWrap}>
          <Ionicons name="bag-outline" size={44} color="#ccc" />
          <Text style={styles.emptyTitle}>Nothing to check out</Text>
          <Text style={styles.emptySubtitle}>Your cart is empty.</Text>
          <Pressable style={styles.shopBtn} onPress={() => router.replace('/(tabs)')}>
            <Text style={styles.shopBtnText}>Browse Collection</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={[styles.header, { paddingHorizontal: isLargeScreen ? 24 : 16 }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#1a1a1a" />
        </Pressable>
        <Text style={styles.title}>Checkout</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Full name"
            placeholderTextColor="#bbb"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
          <TextInput
            style={styles.input}
            placeholder="Phone (10 digits)"
            placeholderTextColor="#bbb"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            maxLength={10}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Address, street, landmark"
            placeholderTextColor="#bbb"
            value={address}
            onChangeText={setAddress}
            multiline
          />
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.half]}
              placeholder="City"
              placeholderTextColor="#bbb"
              value={city}
              onChangeText={setCity}
              autoCapitalize="words"
            />
            <TextInput
              style={[styles.input, styles.half]}
              placeholder="Pincode"
              placeholderTextColor="#bbb"
              value={pincode}
              onChangeText={setPincode}
              keyboardType="number-pad"
              maxLength={6}
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.payRow}>
          {PAYMENT_METHODS.map((m) => {
            const active = payment === m.id;
            return (
              <Pressable
                key={m.id}
                style={[styles.payOption, active && styles.payOptionActive]}
                onPress={() => setPayment(m.id)}
              >
                <Ionicons name={m.icon} size={18} color={active ? '#fff' : '#1a1a1a'} />
                <Text style={[styles.payLabel, active && styles.payLabelActive]}>{m.label}</Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Order Summary</Text>
        <View style={styles.summaryCard}>
          {cart.map((item, idx) => (
            <View key={`${item.product.id}-${item.size ?? 'os'}`} style={[styles.summaryItem, idx > 0 && styles.summaryDivider]}>
              <Image
                source={{ uri: shopifyImage(item.product.image, { width: 160, height: 200, crop: true }) }}
                style={styles.summaryThumb}
              />
              <View style={styles.summaryInfo}>
                <Text style={styles.summaryName} numberOfLines={1}>{item.product.name}</Text>
                <Text style={styles.summaryMeta}>
                  Qty {item.quantity}{item.size ? ` · Size ${item.size}` : ''}
                </Text>
              </View>
              <Text style={styles.summaryPrice}>
                ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
              </Text>
            </View>
          ))}

          <View style={styles.totals}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal</Text>
              <Text style={styles.totalValue}>₹{cartTotal.toLocaleString('en-IN')}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Shipping</Text>
              <Text style={styles.totalValue}>
                {shipping === 0 ? 'Free' : `₹${shipping.toLocaleString('en-IN')}`}
              </Text>
            </View>
            <View style={[styles.totalRow, styles.grandRow]}>
              <Text style={styles.grandLabel}>Total</Text>
              <Text style={styles.grandValue}>₹{total.toLocaleString('en-IN')}</Text>
            </View>
          </View>
        </View>

        <Animated.View entering={FadeInDown.delay(200).duration(400)}>
          <Pressable
            style={[styles.placeBtn, placing && styles.placeBtnDisabled]}
            onPress={handlePlaceOrder}
            disabled={placing}
          >
            <Text style={styles.placeBtnText}>
              {placing ? 'Placing order…' : `Place Order · ₹${total.toLocaleString('en-IN')}`}
            </Text>
          </Pressable>
        </Animated.View>
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
  title: { fontWeight: '700', color: '#1a1a1a', letterSpacing: 0.3, fontSize: 22 },
  placeholder: { width: 32 },
  scroll: { paddingHorizontal: 16, paddingBottom: 40 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 18,
    marginBottom: 10,
  },
  form: { gap: 10 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  textArea: { minHeight: 76, textAlignVertical: 'top' },
  row: { flexDirection: 'row', gap: 10 },
  half: { flex: 1 },
  payRow: { flexDirection: 'row', gap: 8 },
  payOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 12,
    paddingVertical: 12,
  },
  payOptionActive: { backgroundColor: '#1a1a1a', borderColor: '#1a1a1a' },
  payLabel: { fontSize: 12, fontWeight: '600', color: '#1a1a1a' },
  payLabelActive: { color: '#fff' },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryItem: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8 },
  summaryDivider: { borderTopWidth: 1, borderTopColor: '#f5f5f5' },
  summaryThumb: { width: 40, height: 50, borderRadius: 8, backgroundColor: '#f0f0f0' },
  summaryInfo: { flex: 1 },
  summaryName: { fontSize: 13, fontWeight: '600', color: '#1a1a1a', marginBottom: 2 },
  summaryMeta: { fontSize: 12, color: '#999' },
  summaryPrice: { fontSize: 13, fontWeight: '700', color: '#1a1a1a' },
  totals: { marginTop: 10, borderTopWidth: 1, borderTopColor: '#f0f0f0', paddingTop: 10 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 3 },
  totalLabel: { fontSize: 13, color: '#666' },
  totalValue: { fontSize: 13, fontWeight: '600', color: '#1a1a1a' },
  grandRow: { marginTop: 6, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  grandLabel: { fontSize: 15, fontWeight: '700', color: '#1a1a1a' },
  grandValue: { fontSize: 15, fontWeight: '700', color: '#1a1a1a' },
  placeBtn: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  placeBtnDisabled: { opacity: 0.6 },
  placeBtnText: { color: '#fff', fontSize: 15, fontWeight: '700', letterSpacing: 0.3 },
  emptyWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: '#1a1a1a', marginTop: 12 },
  emptySubtitle: { fontSize: 13, color: '#666', marginTop: 4 },
  shopBtn: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 20,
  },
  shopBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});
