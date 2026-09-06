import { View, Text, StyleSheet, Pressable, useWindowDimensions, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { AnimatedBrand, AnimatedTagline } from '../../components/auth/AnimatedAuth';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useState } from 'react';

export default function SignupScreen() {
  const { signUp } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { width } = useWindowDimensions();
  const horizontalPadding = Math.max(24, Math.min(36, width * 0.08));
  const isLargeScreen = width > 768;

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert('Missing fields', 'Please fill in all fields.');
      return;
    }
    try {
      await signUp(name, email, password);
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Sign up failed', error.message || 'Something went wrong.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.content, { paddingHorizontal: horizontalPadding }]}>
        <AnimatedBrand text="Olakh" />
        <AnimatedTagline text="Create your account" />

        <Animated.View entering={FadeInDown.delay(400).duration(600)} style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={[styles.input, { fontSize: isLargeScreen ? 16 : 14 }]}
              placeholder="Jane Doe"
              placeholderTextColor="#bbb"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={[styles.input, { fontSize: isLargeScreen ? 16 : 14 }]}
              placeholder="you@olakh.com"
              placeholderTextColor="#bbb"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={[styles.input, { fontSize: isLargeScreen ? 16 : 14 }]}
              placeholder="Min 6 characters"
              placeholderTextColor="#bbb"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(700).duration(600)} style={styles.buttonWrapper}>
          <Pressable onPress={handleSignUp} style={[styles.button, { paddingHorizontal: isLargeScreen ? 28 : 24 }]}>
            <Text style={[styles.buttonText, { fontSize: isLargeScreen ? 18 : 15 }]}>Sign Up</Text>
          </Pressable>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(800).duration(500)}>
          <Pressable onPress={() => router.push('/auth/login')}>
            <Text style={styles.switchLink}>Already have an account? Sign In</Text>
          </Pressable>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(900).duration(500)}>
          <Pressable onPress={() => router.back()}>
            <Text style={styles.backLink}>← Back</Text>
          </Pressable>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  form: { width: '100%', marginBottom: 20 },
  inputGroup: { marginBottom: 16 },
  inputLabel: { fontSize: 12, fontWeight: '600', color: '#999', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#1a1a1a',
    fontWeight: '500',
    borderWidth: 1,
    borderColor: '#eee',
  },
  buttonWrapper: { width: '100%', marginBottom: 16 },
  button: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 14,
    borderRadius: 14,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '600' },
  switchLink: { color: '#C49A6C', fontSize: 14, fontWeight: '600', textAlign: 'center', marginBottom: 12 },
  backLink: { color: '#999', fontSize: 14, textAlign: 'center' },
});
