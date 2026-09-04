# Olakh — Goal & Implementation Spec

**Brand:** Olakh (https://byolakh.com)  
**Platform:** React Native + Expo Android  
**Type:** Shopify-based lingerie brand mobile app  
**Goal:** Polished, premium, brand-specific shopping app

---

## 1. Brand Overview

**Olakh** is a modern lingerie brand selling:
- Parna Balconette — ₹5,799
- Parna Bodysuit — ₹7,199
- Parna Bralette — ₹5,599
- Parna Cheeky — ₹2,099

**Brand Identity:**
- Name: Olakh
- Vibe: Premium, modern, elegant, feminine
- Price point: Mid-to-premium (₹2,099–₹7,199)
- Platform: Shopify (https://byolakh.com)
- Focus: Lingerie & intimate wear

---

## 2. Core Principles

1. **Premium-first** — App must communicate luxury, elegance, and confidence
2. **Privacy-respectful** — Lingerie shoppers value discretion; no aggressive tracking
3. **Mobile-first** — Native Android feel, not a Shopify wrapper
4. **Brand-first** — Feminine, modern, sophisticated aesthetic
5. **Production mindset** — Prototype should be commercially viable from day one
6. **Backend-agnostic** — Shopify now, but architecture must allow future backend flexibility

---

## 3. Technical Architecture

### 3.1 Stack
- React Native + Expo
- TypeScript
- Expo Router for navigation
- Modern React patterns

### 3.2 Folder Structure
```
src/
├── app/               # Expo Router screens
├── components/        # Reusable UI components
├── features/          # Feature modules
├── screens/           # Standalone screens
├── navigation/        # Navigation config
├── services/          # API/service layer
│   ├── api/
│   ├── auth/
│   ├── products/
│   ├── cart/
│   ├── checkout/
│   └── users/
├── hooks/             # Custom hooks
├── store/             # State management
├── types/             # TypeScript types
├── utils/             # Helpers
├── constants/         # Design tokens
├── config/            # Environment config
└── assets/            # Images, fonts, icons
```

### 3.3 Shopify Integration
- Use Shopify Storefront API for product data
- Abstract Shopify calls behind service layer
- Mock data with realistic Olakh products
- Document API requirements for live integration

### 3.4 Environment
- Use Expo config for environment variables
- Never commit secrets
- Separate mock/production configs

---

## 4. Authentication

- **Email/Password** — sign-up, login, forgot password, session
- **Google Sign-In** — sign-in, account creation, logout
- **Phone OTP** — optional for quick checkout

Requirements:
- Secure token storage
- Loading, error, empty states
- Logout flow
- Guest checkout supported (no forced login)

---

## 5. Shopping Features

### 5.1 Product Catalog
- Product listing with grid/list views
- Category browsing (bras, bodysuits, etc.)
- Product details with image gallery, size selector, price
- Size guide
- Related products

### 5.2 Cart & Checkout
- Add to cart with size selection
- Cart quantity management
- Cart persistence
- Checkout flow (mock payment → Razorpay/Stripe ready)
- Order confirmation

### 5.3 Customer Account
- Profile management
- Order history
- Saved addresses
- Wishlist
- Notification preferences

---

## 6. Home Page

Premium, interactive shopping experience:
- Hero banner with brand video or lifestyle imagery
- New arrivals carousel
- Featured collections (Parna collection)
- Category cards (Bras, Bodysuits, etc.)
- Brand story snippet
- Smooth animations and transitions
- Pull-to-refresh
- Skeleton loading states

**Header:** Logo | Search | Cart (with count) | Profile  
**Bottom Nav:** Home | Shop | Cart | Chat | Account

---

## 7. Brand Design System

### 7.1 Colors
- Primary: Elegant, sophisticated palette (extract from website)
- Background: Clean whites, soft neutrals
- Accent: Feminine, premium accent color
- Text: High contrast for readability

### 7.2 Typography
- Modern, elegant sans-serif
- Clear hierarchy (headings, body, captions)
- Premium feel with appropriate letter spacing

### 7.3 Components
- Product cards with hover/tap effects
- Elegant buttons (primary, secondary, outline)
- Smooth image galleries
- Animated add-to-cart interactions
- Premium loading states

Update `docs/design-system.md`.

---

## 8. Chat Assistant

Add Chat as primary bottom-nav destination:
- AI assistant for product recommendations
- Order/shipping questions
- Size guide queries
- Human support escalation
- Conversation history
- Unread message indicator

---

## 9. Notifications

- Order confirmations
- Order status updates
- Promotions/offers
- New arrivals
- Sale alerts

Respectful permission flow:
1. Show value explanation
2. Request permission
3. Allow preference management in settings

---

## 10. Admin Panel

Hidden from customers:
- Product management
- Order management
- Customer list
- Analytics dashboard
- Promotion management
- Content updates

Requires admin role authentication.

---

## 11. Performance

- Image optimization (WebP, lazy loading)
- Product image carousels
- Fast product listing (FlashList)
- Skeleton screens
- Smooth 60fps animations
- Optimize for mid-range Android devices

---

## 12. Development Loop

1. **Inspect** — current codebase state
2. **Research** — brand, competitors, UX patterns
3. **Audit** — identify issues
4. **Prioritize** — broken → missing → UX → visual → performance
5. **Implement** — highest-priority items
6. **Test** — functional verification
7. **Review** — re-audit
8. **Document** — update docs
9. **Repeat** — until showcase-ready

---

## 13. Code Quality

- TypeScript-typed, linted, formatted
- Modular, reusable components
- Service layer separates UI from backend
- No hard-coded secrets
- No dead code

---

## 14. Testing

- App launch, navigation, browsing
- Add-to-cart, checkout flow
- Auth flows
- UI on different screen sizes
- Loading, empty, error states

---

## 15. Documentation

```
docs/
├── README.md
├── brand-analysis.md
├── design-system.md
├── architecture.md
├── feature-gap-analysis.md
├── ui-ux-audit.md
├── performance-audit.md
├── backend-integration-plan.md
├── testing.md
├── roadmap.md
└── development-log.md
```

---

## 16. Showcase Readiness

Verify before declaring complete:
- Polished home page
- Working product browsing
- Functional cart & checkout
- Brand-consistent UI
- Smooth animations
- No placeholder content
- No debug UI
- Loading, empty, error states
- Chat functional
- Notifications configured

**Goal:** The app should communicate: *"This is what premium lingerie shopping should feel like on mobile."*

---

## 17. Definition of Done

- [ ] Brand analyzed and design system created
- [ ] Product catalog functional
- [ ] Cart & checkout working
- [ ] Authentication implemented
- [ ] Customer account features complete
- [ ] Admin panel exists and is hidden
- [ ] Chat assistant functional
- [ ] Notifications configured
- [ ] Premium UI/UX delivered
- [ ] Performance optimized
- [ ] Documentation complete
- [ ] Showcase-ready

---

*Last updated: 2026-09-05*  
*Status: Active — building Olakh mobile app*
