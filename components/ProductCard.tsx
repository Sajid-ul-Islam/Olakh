import { View, Text, Image, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { shopifyImage } from '../services/images';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';

type ProductCardProps = {
  product: Product;
  cardWidth?: number;
};

export default function ProductCard({ product, cardWidth }: ProductCardProps) {
  const { width } = useWindowDimensions();
  const { toggleWishlist, isWishlisted, showToast } = useShop();
  const imageHeight = Math.min(190, Math.max(140, (cardWidth || (width - 32) / 2) * 1.6));
  const wishlisted = isWishlisted(product.id);

  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.96, { damping: 15 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15 });
  };

  return (
    <Animated.View
      entering={FadeInUp.duration(600)}
      style={[animatedStyle, { width: cardWidth || '48%' }]}
    >
      <Pressable
        style={styles.card}
        onPress={() => router.push(`/product/${product.id}`)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.Image
          sharedTransitionTag={`product-image-${product.id}`}
          source={{ uri: shopifyImage(product.image, { width: 700 }) }}
          style={[styles.image, { height: imageHeight }]}
        />
        <View style={styles.info}>
          <Animated.Text
            sharedTransitionTag={`product-name-${product.id}`}
            style={styles.name}
            numberOfLines={1}
          >
            {product.name}
          </Animated.Text>
          <Animated.Text
            sharedTransitionTag={`product-price-${product.id}`}
            style={styles.price}
          >
            ₹{product.price.toLocaleString('en-IN')}
          </Animated.Text>
          <Pressable
            style={styles.wishlist}
            onPress={() => {
              toggleWishlist(product);
              showToast(wishlisted ? 'Removed from wishlist' : 'Saved to wishlist');
            }}
          >
            <Ionicons
              name={wishlisted ? 'heart' : 'heart-outline'}
              size={20}
              color={wishlisted ? '#C49A6C' : '#C49A6C'}
            />
          </Pressable>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 12,
  },
  image: { width: '100%' },
  info: { padding: 12, position: 'relative' },
  name: { fontSize: 14, fontWeight: '600', color: '#1a1a1a', marginBottom: 4, textAlign: 'left' },
  price: { fontSize: 15, fontWeight: '700', color: '#1a1a1a' },
  wishlist: { position: 'absolute', top: 6, right: 6 },
});
