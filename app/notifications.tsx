import { View, Text, StyleSheet, Pressable, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function NotificationsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#1a1a1a" />
        </Pressable>
        <Text style={styles.title}>Notifications</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Notification Preferences</Text>
            <Ionicons name="chevron-forward" size={18} color="#ccc" />
          </View>
          <View style={styles.optionsList}>
            <View style={styles.optionRow}>
              <View style={styles.optionIcon}>
                <Ionicons name="car-outline" size={18} color="#C49A6C" />
              </View>
              <View style={styles.optionText}>
                <Text style={styles.optionTitle}>Order Updates</Text>
                <Text style={styles.optionSubtitle}>Shipping, delivery, and returns</Text>
              </View>
              <View style={styles.toggle}>
                <View style={styles.toggleTrack} />
                <View style={[styles.toggleThumb, { backgroundColor: '#1a1a1a' }]} />
              </View>
            </View>

            <View style={styles.optionRow}>
              <View style={styles.optionIcon}>
                <Ionicons name="leaf" size={18} color="#C49A6C" />
              </View>
              <View style={styles.optionText}>
                <Text style={styles.optionTitle}>New Arrivals</Text>
                <Text style={styles.optionSubtitle}>Fresh pieces from the collection</Text>
              </View>
              <View style={styles.toggle}>
                <View style={styles.toggleTrack} />
                <View style={[styles.toggleThumb, { backgroundColor: '#1a1a1a' }]} />
              </View>
            </View>

            <View style={styles.optionRow}>
              <View style={styles.optionIcon}>
                <Ionicons name="rose" size={18} color="#C49A6C" />
              </View>
              <View style={styles.optionText}>
                <Text style={styles.optionTitle}>Exclusive Offers</Text>
                <Text style={styles.optionSubtitle}>Promotions, discounts & surprises</Text>
              </View>
              <View style={styles.toggle}>
                <View style={styles.toggleTrack} />
                <View style={[styles.toggleThumb, { backgroundColor: '#1a1a1a' }]} />
              </View>
            </View>

            <View style={styles.optionRow}>
              <View style={styles.optionIcon}>
                <Ionicons name="star" size={18} color="#C49A6C" />
              </View>
              <View style={styles.optionText}>
                <Text style={styles.optionTitle}>Loyalty Program</Text>
                <Text style={styles.optionSubtitle}>Rewards, points, and perks</Text>
              </View>
              <View style={styles.toggle}>
                <View style={styles.toggleTrack} />
                <View style={styles.toggleThumbDisabled} />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Channels</Text>
            <Ionicons name="chevron-forward" size={18} color="#ccc" />
          </View>
          <View style={styles.optionsList}>
            <View style={styles.optionRow}>
              <View style={styles.optionIcon}>
                <Ionicons name="mail-open" size={18} color="#C49A6C" />
              </View>
              <View style={styles.optionText}>
                <Text style={styles.optionTitle}>Email</Text>
                <Text style={styles.optionSubtitle}>newsletter@olakh.com</Text>
              </View>
              <View style={[styles.toggle, styles.toggleDisabled]}>
                <View style={[styles.toggleTrack, { backgroundColor: '#ddd' }]} />
                <View style={[styles.toggleThumb, { backgroundColor: '#bbb' }]} />
              </View>
            </View>

            <View style={styles.optionRow}>
              <View style={styles.optionIcon}>
                <Ionicons name="notifications-outline" size={18} color="#C49A6C" />
              </View>
              <View style={styles.optionText}>
                <Text style={styles.optionTitle}>Push Notifications</Text>
                <Text style={styles.optionSubtitle}>On your device</Text>
              </View>
              <View style={[styles.toggle, styles.toggleOn]}>
                <View style={[styles.toggleTrack, { backgroundColor: '#2ecc71' }]} />
                <View style={[styles.toggleThumb, { backgroundColor: '#fff' }]} />
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
  section: { marginTop: 16 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: { fontSize: 12, fontWeight: '700', color: '#999', textTransform: 'uppercase', letterSpacing: 0.5 },
  optionsList: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  optionIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(196,154,108,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optionText: { flex: 1 },
  optionTitle: { fontSize: 14, fontWeight: '600', color: '#1a1a1a', marginBottom: 2 },
  optionSubtitle: { fontSize: 12, color: '#999' },
  toggle: { width: 40, height: 24, borderRadius: 12, padding: 2, justifyContent: 'center', alignItems: 'center' },
  toggleTrack: { width: '100%', height: '100%', borderRadius: 10, backgroundColor: '#ddd' },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#1a1a1a',
    position: 'absolute',
    right: 2,
  },
  toggleThumbDisabled: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#bbb',
    position: 'absolute',
    right: 2,
  },
  toggleDisabled: { opacity: 0.5 },
  toggleOn: { paddingLeft: 2, paddingRight: 0 },
});
