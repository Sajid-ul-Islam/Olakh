import { Product } from '../types';

// Real Olakh catalog, mirroring https://byolakh.com (Shopify).
// id/name/price/images are pulled live from the store's product JSON.
// Galleries lead with on-model photography; the garment-only studio shot closes each set.
export const products: Product[] = [
  {
    id: 'parna-balconette',
    name: 'Parna Balconette',
    price: 5799,
    image: 'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/01_ParnaBalconette.jpg',
    images: [
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/01_ParnaBalconette.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/02_ParnaBalconette.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/03_ParnaBalconette.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/04_ParnaBalconette.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/00_ParnaBalconette.jpg'
    ],
    description: 'A sculpted, non-padded balconette with a wide, square neckline and an adjustable fit — cut to sit low, lift beautifully and frame the neckline. Finished with Olakh’s signature craftsmanship.',
    category: 'bras',
  },
  {
    id: 'parna-bralette',
    name: 'Parna Bralette',
    price: 5599,
    image: 'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/01_ParnaBralette.jpg',
    images: [
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/01_ParnaBralette.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/02_ParnaBralette.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/03_ParnaBralette.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/04_ParnaBralette.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/00_ParnaBralette.jpg'
    ],
    description: 'A slip-on bralette with an adjustable back closure, designed to sit light and move with you. One size fits multiple bra sizes.',
    category: 'bras',
  },
  {
    id: 'parna-bodysuit',
    name: 'Parna Bodysuit',
    price: 7199,
    image: 'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/01_ParnaBodysuit.jpg',
    images: [
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/01_ParnaBodysuit.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/02_ParnaBodysuit.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/03_ParnaBodysuit.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/04_ParnaBodysuit.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/00_ParnaBodysuit.jpg'
    ],
    description: 'Weightless and silky, it settles exactly where it should. Custom embroidered lace over sheer and opaque panels — one size fits multiple bra sizes.',
    category: 'bodysuits',
  },
  {
    id: 'parna-cheeky',
    name: 'Parna Cheeky',
    price: 2099,
    image: 'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/01_ParnaCheeky.jpg',
    images: [
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/01_ParnaCheeky.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/02_ParnaCheeky.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/03_ParnaCheeky.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/04_ParnaCheeky.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/00_ParnaCheeky.jpg'
    ],
    description: 'A cheeky-cut brief in premium stretch fabrication, designed for a flattering silhouette and all-day comfort.',
    category: 'bottoms',
  },
  {
    id: 'parna-thong',
    name: 'Parna Thong',
    price: 1999,
    image: 'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/01_ParnaThong.jpg',
    images: [
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/01_ParnaThong.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/02_ParnaThong.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/03_ParnaThong.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/Olakh_261070.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/00_ParnaThong.jpg'
    ],
    description: 'Barely-there coverage with maximum comfort — a thong finished with Olakh’s signature handcrafted detailing.',
    category: 'bottoms',
  },
  {
    id: 'parna-corset',
    name: 'Parna Corset',
    price: 8899,
    image: 'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/01_ParnaCorset.jpg',
    images: [
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/01_ParnaCorset.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/02_ParnaCorset.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/03_ParnaCorset.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/04_ParnaCorset.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/00_ParnaCorset.jpg'
    ],
    description: 'An overbust corset that sculpts the waist with structured boning and premium fabrication — the centrepiece of the collection.',
    category: 'corsets',
  },
  {
    id: 'parna-demi',
    name: 'Parna Demi',
    price: 5799,
    image: 'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/01_ParnaDemi.jpg',
    images: [
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/01_ParnaDemi.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/02_ParnaDemi.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/03_ParnaDemi.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/04_ParnaDemi.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/00_ParnaDemi.jpg'
    ],
    description: 'A soft demi silhouette with delicate lift — unlined, weightless and finished by hand. One size fits multiple bra sizes.',
    category: 'bras',
  },
  {
    id: 'saaya-balconette',
    name: 'Saaya Balconette',
    price: 5799,
    image: 'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/01_SaayaBalconette.jpg',
    images: [
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/01_SaayaBalconette.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/02_SaayaBalconette.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/03_SaayaBalconette.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/04_SaayaBalconette.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/00_SaayaBalconette.jpg'
    ],
    description: 'A sculpted, non-padded balconette with a wide, square neckline and an adjustable fit — cut to sit low, lift beautifully and frame the neckline. Finished with Olakh’s signature craftsmanship.',
    category: 'bras',
  },
  {
    id: 'saaya-bralette',
    name: 'Saaya Bralette',
    price: 5599,
    image: 'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/01_SaayaBralette.jpg',
    images: [
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/01_SaayaBralette.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/02_SaayaBralette.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/03_SaayaBralette.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/00_SaayaBralette.jpg'
    ],
    description: 'A slip-on bralette with an adjustable back closure, designed to sit light and move with you. One size fits multiple bra sizes.',
    category: 'bras',
  },
  {
    id: 'saaya-bodysuit',
    name: 'Saaya Bodysuit',
    price: 7199,
    image: 'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/01_SaayaBodysuit.jpg',
    images: [
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/01_SaayaBodysuit.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/02_SaayaBodysuit.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/03_SaayaBodysuit.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/04_SaayaBodysuit.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/00_SaayaBodysuit.jpg'
    ],
    description: 'Weightless and silky, it settles exactly where it should. Custom embroidered lace over sheer and opaque panels — one size fits multiple bra sizes.',
    category: 'bodysuits',
  },
  {
    id: 'saaya-cheeky',
    name: 'Saaya Cheeky',
    price: 2099,
    image: 'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/01_SaayaCheeky.jpg',
    images: [
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/01_SaayaCheeky.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/02_SaayaCheeky.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/03_SaayaCheeky.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/04_SaayaCheeky.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/00_SaayaCheeky.jpg'
    ],
    description: 'A cheeky-cut brief in premium stretch fabrication, designed for a flattering silhouette and all-day comfort.',
    category: 'bottoms',
  },
  {
    id: 'syahi-balconette',
    name: 'Syahi Balconette',
    price: 6099,
    image: 'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/01_SyahiBalconette.jpg',
    images: [
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/01_SyahiBalconette.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/02_SyahiBalconette.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/03_SyahiBalconette.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/04_SyahiBalconette.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/00_SyahiBalconette.jpg'
    ],
    description: 'A sculpted, non-padded balconette with a wide, square neckline and an adjustable fit — cut to sit low, lift beautifully and frame the neckline. Finished with Olakh’s signature craftsmanship.',
    category: 'bras',
  },
  {
    id: 'syahi-bralette',
    name: 'Syahi Bralette',
    price: 5899,
    image: 'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/01_SyahiBralette.jpg',
    images: [
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/01_SyahiBralette.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/02_SyahiBralette.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/03_SyahiBralette.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/04_SyahiBralette.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/00_SyahiBralette.jpg'
    ],
    description: 'A slip-on bralette with an adjustable back closure, designed to sit light and move with you. One size fits multiple bra sizes.',
    category: 'bras',
  },
  {
    id: 'syahi-bodysuit',
    name: 'Syahi Bodysuit',
    price: 7599,
    image: 'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/01_SyahiBodysuit.jpg',
    images: [
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/01_SyahiBodysuit.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/02_SyahiBodysuit.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/03_SyahiBodysuit.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/04_SyahiBodysuit.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/00_SyahiBodysuit.jpg'
    ],
    description: 'Weightless and silky, it settles exactly where it should. Custom embroidered lace over sheer and opaque panels — one size fits multiple bra sizes.',
    category: 'bodysuits',
  },
  {
    id: 'syahi-cheeky',
    name: 'Syahi Cheeky',
    price: 2199,
    image: 'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/01_SyahiCheeky.jpg',
    images: [
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/01_SyahiCheeky.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/02_SyahiCheeky.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/03_SyahiCheeky.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/00_SyahiCheeky.jpg'
    ],
    description: 'A cheeky-cut brief in premium stretch fabrication, designed for a flattering silhouette and all-day comfort.',
    category: 'bottoms',
  },
  {
    id: 'syahi-corset',
    name: 'Syahi Corset',
    price: 9399,
    image: 'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/01_SyahiCorset.jpg',
    images: [
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/01_SyahiCorset.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/02_SyahiCorset.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/03_SyahiCorset.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/04_SyahiCorset.jpg',
      'https://cdn.shopify.com/s/files/1/0963/2078/2629/files/00_SyahiCorset.jpg'
    ],
    description: 'An overbust corset that sculpts the waist with structured boning and premium fabrication — the centrepiece of the collection.',
    category: 'corsets',
  },
];
