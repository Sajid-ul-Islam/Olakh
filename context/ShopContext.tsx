import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Product, CartItem } from '../types';

export type WishlistItem = { product: Product; addedAt: string };

type ShopContextType = {
  cart: CartItem[];
  wishlist: WishlistItem[];
  addToCart: (product: Product, size?: string) => void;
  removeFromCart: (productId: string, size?: string) => void;
  setQuantity: (productId: string, size: string | undefined, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
  cartCount: number;
  cartTotal: number;
  toast: string | null;
  showToast: (msg: string) => void;
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const CART_KEY = 'olakh_cart';
const WISHLIST_KEY = 'olakh_wishlist';

function useNativeStore() {
  // SecureStore has a 2KB value cap on web; storage backend stays native on mobile.
  if (Platform.OS === 'web') {
    return {
      get: async (key: string) => globalThis.localStorage?.getItem(key) ?? null,
      set: async (key: string, value: string) => {
        globalThis.localStorage?.setItem(key, value);
      },
      del: async (key: string) => {
        globalThis.localStorage?.removeItem(key);
      },
    };
  }
  return {
    get: (key: string) => SecureStore.getItemAsync(key),
    set: (key: string, value: string) => SecureStore.setItemAsync(key, value),
    del: (key: string) => SecureStore.deleteItemAsync(key),
  };
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const store = useNativeStore();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const [cartRaw, wishRaw] = await Promise.all([
          store.get(CART_KEY),
          store.get(WISHLIST_KEY),
        ]);
        if (!alive) return;
        if (cartRaw) {
          const parsed = JSON.parse(cartRaw);
          if (Array.isArray(parsed)) setCart(parsed);
        }
        if (wishRaw) {
          const parsed = JSON.parse(wishRaw);
          if (Array.isArray(parsed)) setWishlist(parsed);
        }
      } catch (error) {
        console.warn('Failed to load cart/wishlist:', error);
      } finally {
        if (alive) setHydrated(true);
      }
    };
    load();
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    store.set(CART_KEY, JSON.stringify(cart)).catch((error) =>
      console.warn('Failed to save cart:', error),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    store.set(WISHLIST_KEY, JSON.stringify(wishlist)).catch((error) =>
      console.warn('Failed to save wishlist:', error),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wishlist, hydrated]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast((current) => (current === msg ? null : current));
    }, 2200);
  };

  const addToCart = (product: Product, size?: string) => {
    setCart((prev) => {
      const idx = prev.findIndex(
        (i) => i.product.id === product.id && i.size === size,
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
        return next;
      }
      return [...prev, { product, quantity: 1, size }];
    });
  };

  const removeFromCart = (productId: string, size?: string) => {
    setCart((prev) =>
      prev.filter((i) => !(i.product.id === productId && i.size === size)),
    );
  };

  const setQuantity = (productId: string, size: string | undefined, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCart((prev) =>
      prev.map((i) =>
        i.product.id === productId && i.size === size ? { ...i, quantity: qty } : i,
      ),
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((i) => i.product.id === product.id);
      return exists
        ? prev.filter((i) => i.product.id !== product.id)
        : [...prev, { product, addedAt: new Date().toISOString() }];
    });
  };

  const isWishlisted = (productId: string) =>
    wishlist.some((i) => i.product.id === productId);

  const cartCount = useMemo(
    () => cart.reduce((sum, i) => sum + i.quantity, 0),
    [cart],
  );
  const cartTotal = useMemo(
    () => cart.reduce((sum, i) => sum + i.quantity * i.product.price, 0),
    [cart],
  );

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        setQuantity,
        clearCart,
        toggleWishlist,
        isWishlisted,
        cartCount,
        cartTotal,
        toast,
        showToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) {
    throw new Error('useShop must be used within ShopProvider');
  }
  return ctx;
}
