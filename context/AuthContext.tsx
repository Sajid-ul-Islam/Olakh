import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import {
  useSharedValue,
  withTiming,
  withSpring,
  type SharedValue,
} from 'react-native-reanimated';

export type Session = {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
  token: string;
  createdAt: string;
  expiresAt: string;
};

type AuthContextType = {
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  fadeAnim: SharedValue<number>;
  scaleAnim: SharedValue<number>;
  slideAnim: SharedValue<number>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'olakh_session_token';

// Demo credentials for the session app
const DEMO_EMAIL = 'user@olakh.com';
const DEMO_PASSWORD = 'olakh123';

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Animation shared values
  const fadeAnim = useSharedValue(0);
  const scaleAnim = useSharedValue(0.9);
  const slideAnim = useSharedValue(100);

  // Create a mock session
  const createSession = (email: string): Session => ({
    id: `session_${Date.now()}`,
    user: {
      id: `user_${email.split('@')[0]}`,
      name: 'User',
      email,
      avatar: 'https://images.unsplash.com/photo-1534524136320-5b4e6b3e9b3a?w=200&h=200&fit=crop',
    },
    token: `token_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  });

  // Load session from SecureStore on mount
  useEffect(() => {
    const loadSession = async () => {
      try {
        setIsLoading(true);
        const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);

        if (storedToken) {
          try {
            const parsed = JSON.parse(storedToken);
            const expiresAt = new Date(parsed.expiresAt);
            if (expiresAt > new Date()) {
              setSession(parsed);
            } else {
              // Session expired
              await SecureStore.deleteItemAsync(TOKEN_KEY);
              setSession(null);
            }
          } catch {
            await SecureStore.deleteItemAsync(TOKEN_KEY);
            setSession(null);
          }
        } else {
          setSession(null);
        }
      } catch (error) {
        console.warn('Failed to load session:', error);
        setSession(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadSession();

    // Handle app state changes for session expiry checks
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        // Check session expiry
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => subscription.remove();
  }, []);

  const signIn = async (email: string, password: string) => {
    // Demo authentication logic
    const isDemo =
      (email === DEMO_EMAIL && password === DEMO_PASSWORD) ||
      (email.includes('olakh') && password === DEMO_PASSWORD);

    if (!isDemo) {
      throw new Error('Invalid credentials. Use demo: user@olakh.com / olakh123');
    }

    const newSession = createSession(email);
    setSession(newSession);
    await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(newSession));
  };

  const signUp = async (name: string, email: string, password: string) => {
    if (!email || !password || !name) {
      throw new Error('All fields are required');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    const newSession = createSession(email);
    newSession.user.name = name;
    setSession(newSession);
    await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(newSession));
  };

  const signOut = async () => {
    setSession(null);
    await SecureStore.deleteItemAsync(TOKEN_KEY);

    // Reset animation values
    fadeAnim.value = withTiming(0, { duration: 300 });
    scaleAnim.value = withSpring(0.9, { damping: 15 });
    slideAnim.value = withTiming(100, { duration: 300 });
  };

  // Animate on session change
  useEffect(() => {
    if (session) {
      fadeAnim.value = withTiming(1, { duration: 500 });
      scaleAnim.value = withSpring(1, { damping: 20 });
      slideAnim.value = withTiming(0, { duration: 500 });
    } else {
      fadeAnim.value = withTiming(0, { duration: 300 });
      scaleAnim.value = withSpring(0.9, { damping: 20 });
      slideAnim.value = withTiming(100, { duration: 300 });
    }
  }, [session]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AuthContext.Provider
      value={{
        session,
        isLoading,
        signIn,
        signUp,
        signOut,
        fadeAnim,
        scaleAnim,
        slideAnim,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
