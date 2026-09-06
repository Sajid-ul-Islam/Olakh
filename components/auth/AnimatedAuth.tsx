import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  BounceIn,
  FadeInUp,
  FadeInDown,
  SlideInUp,
  SlideInDown,
  FlipInYLeft,
} from 'react-native-reanimated';

export function AnimatedBrand({ text = 'Olakh' }) {
  return (
    <Animated.Text
      entering={BounceIn.delay(300).duration(800)}
      style={styles.brand}
    >
      {text}
    </Animated.Text>
  );
}

export function AnimatedTagline({ text = 'Sign in to your account' }) {
  return (
    <Animated.Text
      entering={FadeInUp.delay(500).duration(600)}
      style={styles.tagline}
    >
      {text}
    </Animated.Text>
  );
}

export function AnimatedGoogleButton({ onPress }: { onPress?: () => void }) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.96, { duration: 100 });
    opacity.value = withTiming(0.85, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15 });
    opacity.value = withTiming(1, { duration: 200 });
    if (onPress) onPress();
  };

  return (
    <Animated.View entering={FadeInDown.delay(700).duration(600)} style={animatedStyle}>
      <Pressable
        style={styles.googleButton}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.Text entering={SlideInUp.delay(900).duration(500)} style={styles.googleIcon}>
          G
        </Animated.Text>
        <Animated.Text entering={SlideInUp.delay(950).duration(500)} style={styles.googleButtonText}>
          Continue with Google
        </Animated.Text>
      </Pressable>
    </Animated.View>
  );
}

export function AnimatedEmailButton({ onPress }: { onPress?: () => void }) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.96, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15 });
    if (onPress) onPress();
  };

  return (
    <Animated.View entering={FadeInDown.delay(800).duration(600)} style={animatedStyle}>
      <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <Animated.View
          entering={FlipInYLeft.delay(850).duration(700)}
          style={[styles.button, styles.emailButton]}
        >
          <Animated.Text style={styles.buttonText}>Continue with Email</Animated.Text>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}

export function AnimatedBackButton({ onPress }: { onPress?: () => void }) {
  return (
    <Animated.View entering={FadeInUp.delay(1000).duration(500)}>
      <Pressable onPress={onPress}>
        <Animated.Text style={styles.backText}>Back</Animated.Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  brand: {
    fontSize: 34,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 15,
    color: '#666',
    marginBottom: 40,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    width: '100%',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  googleIcon: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4285F4',
  },
  googleButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  button: {
    paddingVertical: 14,
    borderRadius: 14,
    width: '100%',
    alignItems: 'center',
  },
  emailButton: {
    backgroundColor: '#1a1a1a',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  backText: {
    color: '#999',
    marginTop: 16,
    fontSize: 14,
  },
});
