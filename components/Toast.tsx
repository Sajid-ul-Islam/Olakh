import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useShop } from '../context/ShopContext';

export default function Toast() {
  const { toast } = useShop();
  const insets = useSafeAreaInsets();

  if (!toast) return null;

  return (
    <Animated.View
      entering={FadeInDown.duration(250)}
      exiting={FadeOutDown.duration(250)}
      pointerEvents="none"
      style={[styles.wrap, { top: 12 + insets.top }]}
    >
      <View style={styles.pill}>
        <Ionicons name="checkmark-circle" size={16} color="#C49A6C" />
        <Text style={styles.text}>{toast}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 100,
    elevation: 100,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  text: { color: '#fff', fontSize: 13, fontWeight: '600' },
});
