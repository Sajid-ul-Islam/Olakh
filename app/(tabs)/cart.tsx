import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function CartScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Your cart is empty</Text>
        <Pressable style={styles.button} onPress={() => router.push('/(tabs)/shop')}>
          <Text style={styles.buttonText}>Continue Shopping</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  title: { fontSize: 24, fontWeight: '700', padding: 20, color: '#1a1a1a' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  emptyText: { fontSize: 16, color: '#666', marginBottom: 20 },
  button: {
    backgroundColor: '#1a1a1a', paddingHorizontal: 24, paddingVertical: 14, borderRadius: 12,
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 15 },
});
