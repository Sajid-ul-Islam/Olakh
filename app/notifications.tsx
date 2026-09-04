import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { router } from 'expo-router';

export default function NotificationsScreen() {
  const [enabled, setEnabled] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Notifications</Text>

      {!enabled ? (
        <View style={styles.onboarding}>
          <Text style={styles.onboardingTitle}>Stay in the loop</Text>
          <Text style={styles.onboardingText}>
            Get updates on orders, new arrivals, and exclusive offers.
          </Text>
          <Pressable style={styles.button} onPress={() => setEnabled(true)}>
            <Text style={styles.buttonText}>Enable Notifications</Text>
          </Pressable>
          <Pressable style={styles.skip} onPress={() => router.back()}>
            <Text style={styles.skipText}>Maybe later</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.enabled}>
          <Text style={styles.enabledText}>Notifications enabled</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  title: { fontSize: 24, fontWeight: '700', padding: 20, color: '#1a1a1a' },
  onboarding: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  onboardingTitle: { fontSize: 22, fontWeight: '700', color: '#1a1a1a', marginBottom: 12 },
  onboardingText: { fontSize: 15, color: '#666', textAlign: 'center', marginBottom: 32, lineHeight: 22 },
  button: { backgroundColor: '#1a1a1a', paddingHorizontal: 32, paddingVertical: 16, borderRadius: 14, marginBottom: 16 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  skip: { paddingVertical: 12 },
  skipText: { color: '#999', fontSize: 15 },
  enabled: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  enabledText: { fontSize: 16, color: '#2ecc71', fontWeight: '600' },
});
