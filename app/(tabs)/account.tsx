import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AccountScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>O</Text>
        </View>
        <Text style={styles.profileName}>Guest</Text>
        <Pressable style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Sign In</Text>
        </Pressable>
      </View>

      <View style={styles.menu}>
        {['Orders', 'Wishlist', 'Addresses', 'Settings', 'Help'].map((item) => (
          <Pressable key={item} style={styles.menuItem}>
            <Text style={styles.menuItemText}>{item}</Text>
            <Text style={styles.menuArrow}>›</Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  profileHeader: { alignItems: 'center', paddingVertical: 32 },
  avatar: {
    width: 80, height: 80, borderRadius: 40, backgroundColor: '#1a1a1a',
    alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  avatarText: { color: '#fff', fontSize: 32, fontWeight: '700' },
  profileName: { fontSize: 18, fontWeight: '600', color: '#1a1a1a', marginBottom: 12 },
  loginButton: {
    backgroundColor: '#1a1a1a', paddingHorizontal: 32, paddingVertical: 12, borderRadius: 12,
  },
  loginButtonText: { color: '#fff', fontWeight: '600' },
  menu: { backgroundColor: '#fff', marginHorizontal: 20, borderRadius: 16, paddingVertical: 8 },
  menuItem: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 16, borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
  },
  menuItemText: { fontSize: 15, color: '#1a1a1a' },
  menuArrow: { fontSize: 20, color: '#ccc' },
});
