import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function WishlistScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Wishlist</Text>
      <ScrollView contentContainerStyle={styles.empty}>
        <Ionicons name="heart-outline" size={64} color="#ddd" />
        <Text style={styles.emptyText}>No saved items yet</Text>
        <Pressable style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Browse Collection</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  title: { fontSize: 24, fontWeight: '700', padding: 20, color: '#1a1a1a' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  emptyText: { fontSize: 16, color: '#666', marginVertical: 16 },
  button: { backgroundColor: '#1a1a1a', paddingHorizontal: 24, paddingVertical: 14, borderRadius: 12 },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 15 },
});
