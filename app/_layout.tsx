import { Stack } from 'expo-router';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { ShopProvider } from '../context/ShopContext';
import Toast from '../components/Toast';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

function RootLayoutContent() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        style={styles.loadingContainer}
      >
        <View style={styles.loadingContent}>
          <ActivityIndicator size="large" color="#C49A6C" />
        </View>
      </Animated.View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: 'fade' }} />
      <Stack.Screen name="auth/login" options={{ headerShown: false, presentation: 'modal', animation: 'slide_from_right' }} />
      <Stack.Screen name="auth/signup" options={{ headerShown: false, presentation: 'modal', animation: 'slide_from_right' }} />
      <Stack.Screen name="product/[id]" options={{ headerShown: false, animation: 'fade_from_bottom' }} />
      <Stack.Screen name="wishlist" options={{ headerShown: false, animation: 'slide_from_right' }} />
      <Stack.Screen name="notifications" options={{ headerShown: false, animation: 'slide_from_right' }} />
      <Stack.Screen name="checkout" options={{ headerShown: false, animation: 'slide_from_right' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <ShopProvider>
        <RootLayoutContent />
        <Toast />
      </ShopProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  loadingContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
