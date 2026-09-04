import { View, Text, Image, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const menuItems = [
  { id: 'orders', label: 'Orders', icon: 'receipt-outline' as const, color: '#1a1a1a' },
  { id: 'wishlist', label: 'Wishlist', icon: 'heart-outline' as const, color: '#C49A6C' },
  { id: 'addresses', label: 'Saved Addresses', icon: 'location-outline' as const, color: '#1a1a1a' },
  { id: 'settings', label: 'Settings', icon: 'settings-outline' as const, color: '#1a1a1a' },
  { id: 'help', label: 'Help & Support', icon: 'help-outline' as const, color: '#1a1a1a' },
];

export default function AccountScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: 'https://byolakh.com/cdn/shop/files/08.jpg?v=1772198388' }}
              style={styles.avatarImage}
            />
            <View style={styles.avatarOverlay}>
              <View style={styles.avatarIconInner}>
                <Ionicons name="woman" size={40} color="#fff" />
              </View>
            </View>
          </View>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.name}>Guest</Text>
          <Pressable style={styles.signInBtn} onPress={() => router.push('/auth/login')}>
            <Text style={styles.signInBtnText}>Sign In</Text>
          </Pressable>
        </View>

        <View style={styles.menu}>
          {menuItems.map((item) => (
            <Pressable key={item.id} style={styles.menuItem}>
              <View style={styles.menuIconWrapper}>
                <Ionicons name={item.icon} size={22} color={item.color} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={18} color="#ccc" />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  profileSection: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 20 },
  avatarWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarImage: { width: '100%', height: '100%' },
  avatarOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarIconInner: { width: 100, height: 100 },
  greeting: { fontSize: 13, color: '#666', marginBottom: 4, fontWeight: '500' },
  name: { fontSize: 22, fontWeight: '700', color: '#1a1a1a', marginBottom: 16 },
  signInBtn: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  signInBtnText: { color: '#fff', fontWeight: '600', fontSize: 14, letterSpacing: 0.3 },
  menu: { backgroundColor: '#fff', marginHorizontal: 20, borderRadius: 20, marginBottom: 24, overflow: 'hidden' },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  menuIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  menuLabel: { flex: 1, fontSize: 15, fontWeight: '500', color: '#1a1a1a' },
});
