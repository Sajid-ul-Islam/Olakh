import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AuthGate from '../../components/AuthGate';

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
              index: 'home',
              shop: 'bag',
              cart: 'cart',
              chat: 'chatbubbles',
              account: 'person',
            };
            const iconName = icons[route.name] || 'alert';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          animation: 'fade',
          tabBarShowLabel: false,
        })}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
          }}
        />
        <Tabs.Screen
          name="shop"
          options={{
            title: 'Shop',
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: 'Cart',
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            title: 'Chat',
          }}
        />
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
