import { View, Text, StyleSheet, Pressable, useWindowDimensions, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { AnimatedBrand, AnimatedTagline, AnimatedGoogleButton, AnimatedEmailButton, AnimatedBackButton } from '../../components/auth/AnimatedAuth';
import Animated, { FadeInDown, FadeInUp, FadeInLeft, ZoomIn } from 'react-native-reanimated';
import { useState } from 'react';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showManualLogin, setShowManualLogin] = useState(false);
  const { width } = useWindowDimensions();
  const horizontalPadding = Math.max(24, Math.min(36, width * 0.08));
  const isLargeScreen = width > 768;

  const handleGoogleLogin = () => {
    Alert.alert(
      'Google Sign In',
      'This is a demo app. Google sign-in would open the native picker.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Use demo',
          onPress: () => {
            setEmail('user@olakh.com');
            setPassword('olakh123');
            setShowManualLogin(true);
          },
        },
      ]
    );
  };

  const handleEmailLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing fields', 'Please enter your email and password.');
      return;
    }
    try {
      await signIn(email, password);
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Login failed', error.message || 'Please check your credentials.');
    }
  };

  if (!showManualLogin) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.content, { paddingHorizontal: horizontalPadding }]}>
          <AnimatedBrand text="Olakh" />
          <AnimatedTagline text="Sign in to your account" />

          <AnimatedGoogleButton onPress={handleGoogleLogin} />

          <Animated.Text
            entering={FadeInUp.delay(800).duration(500)}
            style={styles.emailLinkText}
          >
            or sign in with email
          </Animated.Text>

          <AnimatedBackButton onPress={() => router.back()} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.content, { paddingHorizontal: horizontalPadding }]}>
        <AnimatedBrand text="Olakh" />
        <AnimatedTagline text="Welcome back" />

        <Animated.View entering={FadeInDown.delay(400).duration(600)} style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <View style={styles.inputWrapper}>
              <Animated.Text entering={FadeInUp.delay(650).duration(400)} style={styles.inputIcon}>
                ✉
              </Animated.Text>
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
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputWrapper}>
              <Animated.Text entering={FadeInUp.delay(700).duration(400)} style={styles.inputIcon}>
                🔒
              </Animated.Text>
              <TextInput
                style={[styles.input, { fontSize: isLargeScreen ? 16 : 14 }]}
                placeholder="••••••••"
                placeholderTextColor="#bbb"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(700).duration(600)} style={styles.buttonWrapper}>
          <AnimatedEmailButton onPress={handleEmailLogin} />
        </Animated.View>

        <Animated.Text
          entering={FadeInUp.delay(900).duration(500)}
          style={styles.switchLink}
          onPress={() => router.push('/auth/signup')}
        >
          Don't have an account? Sign Up
        </Animated.Text>

        <Animated.Text
          entering={FadeInUp.delay(1000).duration(500)}
          style={styles.emailLinkText}
          onPress={() => setShowManualLogin(false)}
        >
          ← Back to Google login
        </Animated.Text>
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  inputIcon: { fontSize: 16 },
  input: { flex: 1, color: '#1a1a1a', fontWeight: '500' },
  emailLinkText: { color: '#999', fontSize: 14, textAlign: 'center', marginTop: 20 },
  switchLink: { color: '#C49A6C', fontSize: 14, fontWeight: '600', textAlign: 'center', marginBottom: 12 },
  buttonWrapper: { width: '100%', marginBottom: 16 },
});
