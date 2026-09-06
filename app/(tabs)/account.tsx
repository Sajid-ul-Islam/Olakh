import { View, Text, Image, StyleSheet, Pressable, ScrollView, useWindowDimensions, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';

const menuItems = [
  { id: 'orders', label: 'My Orders', icon: 'receipt-outline' as const, color: '#1a1a1a' },
  { id: 'wishlist', label: 'Wishlist', icon: 'heart-outline' as const, color: '#C49A6C' },
  { id: 'addresses', label: 'Saved Addresses', icon: 'location-outline' as const, color: '#1a1a1a' },
  { id: 'settings', label: 'Settings', icon: 'settings-outline' as const, color: '#1a1a1a' },
  { id: 'help', label: 'Help & Support', icon: 'help-outline' as const, color: '#1a1a1a' },
];

export default function AccountScreen() {
  const { session, signOut } = useAuth();
  const { width } = useWindowDimensions();
  const horizontalPadding = Math.max(16, Math.min(24, width * 0.05));
  const avatarSize = Math.min(120, Math.max(90, width * 0.24));
  const isLargeScreen = width > 768;

  const handleMenu = (id: string) => {
    if (id === 'wishlist') {
      router.push('/wishlist');
      return;
    }
    Alert.alert('Coming soon', 'This section is on the roadmap.');
  };

  const handleSignOut = async () => {
    await signOut();
    router.replace('/auth/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.profileSection, { paddingHorizontal: horizontalPadding }]}>
          <Animated.View
            entering={FadeInDown.delay(200).duration(600)}
            style={[styles.avatarWrapper, { width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2 }]}
          >
            {session?.user?.avatar ? (
              <Image source={{ uri: session.user.avatar }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarInitials}>
                <Text style={[styles.avatarInitialsText, { fontSize: avatarSize * 0.34 }]}>
                  {(session?.user?.name || 'G').charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
          </Animated.View>

          <Animated.Text entering={FadeInDown.delay(400).duration(500)} style={[styles.greeting, { fontSize: isLargeScreen ? 16 : 13 }]}>
            Hello,
          </Animated.Text>
          <Animated.Text entering={FadeInDown.delay(500).duration(500)} style={[styles.name, { fontSize: isLargeScreen ? 28 : 22 }]}>
            {session?.user?.name || 'Guest'}
          </Animated.Text>

          {session ? (
            <Animated.View entering={FadeInDown.delay(600).duration(500)}>
              <Pressable style={[styles.signInBtn, styles.signOutBtn]} onPress={handleSignOut}>
                <Ionicons name="log-out-outline" size={20} color="#C49A6C" style={{ marginRight: 6 }} />
                <Text style={styles.signOutText}>Sign Out</Text>
              </Pressable>
            </Animated.View>
          ) : (
            <Animated.View entering={FadeInDown.delay(600).duration(500)}>
              <Pressable style={styles.signInBtn} onPress={() => router.push('/auth/login')}>
                <Text style={styles.signInBtnText}>Sign In</Text>
              </Pressable>
            </Animated.View>
          )}
        </View>

        <Animated.View entering={FadeInRight.delay(700).duration(600)} style={[styles.menu, { marginHorizontal: horizontalPadding }]}>
          {menuItems.map((item, index) => (
            <Animated.View
              key={item.id}
              entering={FadeInRight.delay(750 + index * 100).duration(500)}
            >
              <Pressable style={styles.menuItem} onPress={() => handleMenu(item.id)}>
                <View style={styles.menuIconWrapper}>
                  <Ionicons name={item.icon} size={isLargeScreen ? 26 : 22} color={item.color} />
                </View>
                <Text style={[styles.menuLabel, { fontSize: isLargeScreen ? 18 : 15 }]}>{item.label}</Text>
                <Ionicons name="chevron-forward" size={isLargeScreen ? 22 : 18} color="#ccc" />
              </Pressable>
            </Animated.View>
          ))}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  profileSection: { alignItems: 'center', paddingVertical: 32 },
  avatarWrapper: {
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
  avatarInitials: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a1a',
  },
  avatarInitialsText: { color: '#fff', fontWeight: '700' },
  greeting: { color: '#666', marginBottom: 4, fontWeight: '500' },
  name: { fontWeight: '700', color: '#1a1a1a', marginBottom: 16 },
  signInBtn: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  signInBtnText: { color: '#fff', fontWeight: '600', fontSize: 14, letterSpacing: 0.3 },
  signOutBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  signOutText: { color: '#C49A6C', fontWeight: '600', fontSize: 14, letterSpacing: 0.3 },
  menu: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
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
  menuLabel: { flex: 1, fontWeight: '500', color: '#1a1a1a' },
});
