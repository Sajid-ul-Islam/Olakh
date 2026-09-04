import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="auth/login" options={{ headerShown: false, presentation: 'modal' }} />
      <Stack.Screen name="auth/signup" options={{ headerShown: false, presentation: 'modal' }} />
      <Stack.Screen name="product/[id]" options={{ headerShown: true, title: 'Product' }} />
      <Stack.Screen name="wishlist" options={{ headerShown: true, title: 'Wishlist' }} />
      <Stack.Screen name="notifications" options={{ headerShown: true, title: 'Notifications' }} />
      <Stack.Screen name="checkout" options={{ headerShown: true, title: 'Checkout' }} />
    </Stack>
  );
}
