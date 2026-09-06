import { useCallback } from 'react';
import { usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

// Screens whose top is a full-bleed photo: status-bar icons render white over the imagery.
const PHOTO_SCREENS = ['/', '/product/[id]'];

/**
 * Renders a single expo-status-bar whose style flips per route:
 * - light icons (white) on photo-led screens (Home hero, product gallery)
 * - dark icons on every light-background screen
 * usePathname re-renders this component on every navigation, so the style
 * always matches whatever screen is frontmost.
 */
export default function AdaptiveStatusBar() {
  const pathname = usePathname();

  const isPhotoScreen = useCallback(
    (path: string) =>
      PHOTO_SCREENS.some((p) => path === p || path.startsWith(p + '/')),
    [],
  );

  return <StatusBar style={pathname && isPhotoScreen(pathname) ? 'light' : 'dark'} />;
}
