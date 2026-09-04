import { View, Text, StyleSheet, Pressable, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function WishlistScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#1a1a1a" />
        </Pressable>
        <Text style={styles.title}>Wishlist</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.emptySection}>
          <View style={styles.emptyImageWrapper}>
            <Image
              source={{ uri: 'https://byolakh.com/cdn/shop/files/03.jpg?v=1771694387' }}
              style={styles.emptyImage}
            />
            <View style={styles.emptyImageOverlay} />
            <View style={styles.emptyImageInner}>
              <View style={styles.emptyIconRow}>
                <Ionicons name="heart-outline" size={32} color="#fff" />
                <Text style={styles.emptyIconText}>Save your favorites</Text>
              </View>
            </View>
          </View>

          <View style={styles.emptyContent}>
            <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
            <Text style={styles.emptySubtitle}>
              Save pieces you love and we'll remind you when they're back in stock.
            </Text>
            <Pressable style={styles.browseBtn} onPress={() => router.push('/(tabs)/shop')}>
              <Text style={styles.browseBtnText}>Browse Collection</Text>
            </Pressable>
            <View style={styles.featuresRow}>
              <View style={styles.feature}>
                <View style={styles.featureIcon}>
                  <Ionicons name="heart" size={14} color="#C49A6C" />
                </View>
                <Text style={styles.featureText}>Save for later</Text>
              </View>
              <View style={styles.feature}>
                <View style={styles.featureIcon}>
                  <Ionicons name="notifications-outline" size={14} color="#C49A6C" />
                </View>
                <Text style={styles.featureText}>Back in stock alerts</Text>
              </View>
              <View style={styles.feature}>
                <View style={styles.featureIcon}>
                  <Ionicons name="chatbubble-ellipses" size={14} color="#C49A6C" />
                </View>
                <Text style={styles.featureText}>Quick reordering</Text>
              </View>
            </View>
          </View>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fafafa',
  },
  backBtn: { padding: 4 },
  title: { fontSize: 22, fontWeight: '700', color: '#1a1a1a', letterSpacing: 0.3 },
  placeholder: { width: 32 },
  emptySection: { flex: 1, paddingHorizontal: 20, paddingBottom: 32 },
  emptyImageWrapper: {
    width: '100%',
    height: 220,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 28,
  },
  emptyImage: { width: '100%', height: '100%' },
  emptyImageOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  emptyImageInner: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
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
  emptyTitle: { fontSize: 20, fontWeight: '700', color: '#1a1a1a', marginBottom: 8, textAlign: 'center', letterSpacing: -0.2 },
  emptySubtitle: { fontSize: 13, color: '#666', lineHeight: 20, marginBottom: 20, textAlign: 'center' },
  browseBtn: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 32,
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
  featuresRow: { flexDirection: 'row', justifyContent: 'center', gap: 24 },
  feature: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  featureIcon: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: 'rgba(196,154,108,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: { fontSize: 12, color: '#666', fontWeight: '500' },
});
