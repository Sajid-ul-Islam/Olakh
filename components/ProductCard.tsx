import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Pressable
      style={styles.card}
      onPress={() => router.push(`/product/${product.id}`)}
    >
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
        <Text style={styles.price}>₹{product.price.toLocaleString('en-IN')}</Text>
        <Pressable style={styles.wishlist} onPress={() => {}}>
          <Ionicons name="heart-outline" size={20} color="#C49A6C" />
        </Pressable>
      </View>
    </Pressable>
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
    width: '48%',
    marginBottom: 12,
  },
  image: { width: '100%', height: 190 },
  info: { padding: 12, position: 'relative' },
  name: { fontSize: 14, fontWeight: '600', color: '#1a1a1a', marginBottom: 4, textAlign: 'left' },
  price: { fontSize: 15, fontWeight: '700', color: '#1a1a1a' },
  wishlist: { position: 'absolute', top: 6, right: 6 },
});
