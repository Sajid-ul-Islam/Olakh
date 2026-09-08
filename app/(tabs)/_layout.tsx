import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AuthGate from '../../components/AuthGate';

/**
 * Jakob's Law Implementation:
 * - Home tab on far left (most familiar placement)
 * - Account/Profile on far right (standard pattern)
 * - Maximum 5 tabs (cognitive load limit)
 * - Core actions only in bottom nav (Settings moved to Account screen)
 * - Standard navigation patterns matching Instagram/TikTok/YouTube
 */
export default function TabLayout() {
  return (
    <AuthGate>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: '#1a1a1a',
          tabBarInactiveTintColor: '#999',
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopColor: '#eee',
            paddingTop: 8,
            height: 88,
            paddingBottom: 8,
          },
          headerStyle: {
            backgroundColor: '#fff',
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTitleStyle: {
            fontWeight: '700' as const,
            letterSpacing: 0.5,
          },
          tabBarIcon: ({ color, size }) => {
            const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
              index: 'home',       // Home: familiar house icon
              shop: 'bag',         // Shop: shopping bag (e-commerce standard)
              cart: 'cart',        // Cart: universal shopping cart
              chat: 'chatbubbles', // Support: accessible but not core
              account: 'person',   // Profile: standard person icon
            };
            const iconName = icons[route.name] || 'alert';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          animation: 'fade',
          tabBarShowLabel: false,
          // Enable standard gestures per Jakob's Law
          gestureEnabled: true,
        })}
      >
        {/* LEFTMOST: Home - Most important, matches all major apps */}
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
          }}
        />
        {/* Secondary: Shop - Browse products */}
        <Tabs.Screen
          name="shop"
          options={{
            title: 'Shop',
          }}
        />
        {/* Tertiary: Cart - Transaction action */}
        <Tabs.Screen
          name="cart"
          options={{
            title: 'Cart',
          }}
        />
        {/* Support: Chat - Accessible but not core flow */}
        <Tabs.Screen
          name="chat"
          options={{
            title: 'Chat',
          }}
        />
        {/* RIGHTMOST: Account - Profile/settings, matches Instagram/TikTok */}
        <Tabs.Screen
          name="account"
          options={{
            title: 'Account',
          }}
        />
      </Tabs>
    </AuthGate>
  );
}
