import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.brand}>Olakh</Text>
        <Text style={styles.tagline}>Sign in to your account</Text>

        <Pressable style={styles.googleButton}>
          <Ionicons name="logo-google" size={20} color="#DB4437" />
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </Pressable>

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Continue with Email</Text>
        </Pressable>

        <Pressable onPress={() => router.back()}>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  brand: { fontSize: 36, fontWeight: '800', letterSpacing: 1, color: '#1a1a1a', marginBottom: 8 },
  tagline: { fontSize: 15, color: '#666', marginBottom: 40 },
  googleButton: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: '#fff', paddingHorizontal: 24, paddingVertical: 14,
    borderRadius: 14, width: '100%', justifyContent: 'center',
    borderWidth: 1, borderColor: '#eee', marginBottom: 16,
  },
  googleButtonText: { fontSize: 15, fontWeight: '600', color: '#1a1a1a' },
  button: { backgroundColor: '#1a1a1a', paddingHorizontal: 24, paddingVertical: 14, borderRadius: 14, width: '100%', alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  backText: { color: '#999', marginTop: 16, fontSize: 14 },
});
