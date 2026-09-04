import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { products } from '../../services/products';

export default function ProductDetail({ route }: any) {
  const { id } = route.params;
  const product = products.find((p) => p.id === id);

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
      {/* Image section */}
      <View style={styles.imageSection}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.02)']}
          style={styles.imageFade}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
        <View style={styles.topBar}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color="#1a1a1a" />
          </Pressable>
          <Pressable style={styles.wishlistBtn}>
            <Ionicons name="heart-outline" size={22} color="#C49A6C" />
          </Pressable>
        </View>
      </View>

      {/* Details section */}
      <View style={styles.details}>
        <Text style={styles.name}>{product.name}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{product.price.toLocaleString('en-IN')}</Text>
          <View style={styles.stockBadge}>
            <Ionicons name="checkbox" size={14} color="#2ecc71" />
            <Text style={styles.stockText}>In Stock</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <Text style={styles.description}>{product.description}</Text>
        <View style={styles.sizeSection}>
          <Text style={styles.sizeLabel}>Size</Text>
          <View style={styles.sizeOptions}>
            {['S', 'M', 'L'].map((size) => (
              <Pressable key={size} style={styles.sizeBtn}>
                <Text style={styles.sizeText}>{size}</Text>
              </Pressable>
            ))}
          </View>
        </View>
        <Pressable style={styles.addToCart} onPress={() => router.push('/cart')}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </Pressable>
        <View style={styles.footer}>
          <Ionicons name="shield-checkmark" size={14} color="#2ecc71" />
          <Text style={styles.footerText}>Free shipping on orders above ₹999</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  notFoundText: { fontSize: 16, color: '#666', marginBottom: 16, textAlign: 'center' },
  backBtn: { padding: 8 },
  backText: { color: '#1a1a1a', fontSize: 14, fontWeight: '600' },
  imageSection: { height: 420, overflow: 'hidden' },
  image: { width: '100%', height: '100%' },
  imageFade: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  topBar: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  },
  wishlistBtn: { padding: 6, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 20, width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  details: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -12,
  },
  name: { fontSize: 22, fontWeight: '700', color: '#1a1a1a', marginBottom: 10, letterSpacing: -0.2 },
  priceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  price: { fontSize: 24, fontWeight: '700', color: '#1a1a1a' },
  stockBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(46,204,113,0.1)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  stockText: { fontSize: 12, fontWeight: '600', color: '#2ecc71' },
  divider: { height: 1, backgroundColor: '#f0f0f0', marginVertical: 16 },
  description: { fontSize: 14, color: '#666', lineHeight: 22, marginBottom: 20 },
  sizeSection: { marginBottom: 20 },
  sizeLabel: { fontSize: 12, fontWeight: '600', color: '#999', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
  sizeOptions: { flexDirection: 'row', gap: 8 },
  sizeBtn: { backgroundColor: '#f5f5f5', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 8 },
  sizeText: { fontSize: 14, fontWeight: '600', color: '#1a1a1a' },
  addToCart: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  addToCartText: { color: '#fff', fontSize: 15, fontWeight: '700', letterSpacing: 0.3 },
  footer: { flexDirection: 'row', alignItems: 'center', gap: 6, justifyContent: 'center' },
  footerText: { fontSize: 12, color: '#999' },
});
