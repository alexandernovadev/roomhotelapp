# 🏠 RoomHotel App - Modern Vacation Rental Platform

A modern, responsive vacation rental platform built with Vue 3, featuring advanced search capabilities, user management, and a comprehensive booking system.

![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-9.x-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-4.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## ✨ Features

### 🏡 Property Management
- **Advanced Property Search** with multiple filters (location, price range, amenities, room type)
- **Property Listings** with detailed information and high-quality images
- **Amenity System** with 8+ predefined amenities (WiFi, Kitchen, Parking, AC, TV, Washer, Pool, Gym)
- **Price Management** with flexible pricing and discount options
- **Image Gallery** support for multiple property photos

### 👤 User Experience
- **User Authentication** with Firebase Auth
- **User Profiles** with customizable information
- **Favorites System** with localStorage persistence
- **Responsive Design** optimized for all devices
- **Modern UI/UX** with smooth animations and transitions

### 🔍 Search & Discovery
- **Real-time Search** with instant results
- **Advanced Filtering** by price, location, amenities, and room type
- **Sorting Options** by relevance, price, and date
- **Location-based Search** with city and address support
- **Pagination** for large result sets

### 🛠️ Developer Experience
- **Composable Architecture** with reusable Vue 3 composables
- **Component Library** with consistent design system
- **CSS Variables** for maintainable styling
- **Type-safe Development** with comprehensive validation
- **Modular Structure** for easy maintenance and scaling

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- Yarn or npm
- Firebase project (for authentication and database)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/roomhotel-app.git
cd roomhotel-app
```

2. **Install dependencies**
```bash
yarn install
```

3. **Environment Setup**
Create a `.env` file in the root directory:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. **Start development server**
```bash
yarn dev
```

5. **Open your browser**
Navigate to `http://localhost:5173`

## 🏗️ Architecture

### Project Structure
```
src/
├── components/          # Reusable Vue components
│   ├── layout/         # Layout components (Header, Navigation, etc.)
│   ├── ui/            # UI components (Button, Input, Modal, etc.)
│   ├── forms/         # Form components
│   └── features/      # Feature-specific components
├── composables/        # Vue 3 composables for logic reuse
├── views/             # Page components
├── stores/            # Vuex store modules
├── utils/             # Utility functions and helpers
├── styles/            # Global styles and CSS variables
└── assets/            # Static assets
```

### Key Components

#### 🎨 Layout Components
- **PageHeader**: Consistent page headers with gradient backgrounds
- **PageContainer**: Responsive container with configurable padding
- **Navigation**: Main navigation with user authentication
- **Logo**: Branded logo component

#### 🧩 UI Components
- **Button**: Multi-variant button component (primary, secondary, etc.)
- **Input**: Form input with validation and error handling
- **Modal**: Reusable modal component with animations
- **Dropdown**: Interactive dropdown component
- **NotificationToast**: Toast notification system

#### 🔧 Composable Functions
- **useAmenities**: Amenity management and labeling
- **useFavorites**: Favorites system with localStorage
- **useForm**: Form validation and state management
- **useAuth**: Authentication state management
- **useNotifications**: Notification system

#### 🛠️ Utility Functions
- **formatPrice**: Flexible price formatting with currency support
- **formatDate**: Date formatting utilities
- **validation**: Form validation helpers
- **storage**: localStorage utilities
- **constants**: Application constants

## 🎨 Design System

### CSS Variables
The app uses a comprehensive CSS variable system for consistent styling:

```css
:root {
  --color-primary: #0891b2;
  --color-primary-dark: #0e7490;
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --radius-lg: 0.75rem;
  --spacing-lg: 1.5rem;
}
```

### Utility Classes
Predefined utility classes for common patterns:
- `.card` - Standard card styling
- `.card-hover` - Interactive card with hover effects
- `.btn-primary` - Primary button styling
- `.input-field` - Form input styling
- `.page-container` - Responsive container

## 🔧 Development

### Available Scripts

```bash
# Development
yarn dev              # Start development server
yarn build            # Build for production
yarn preview          # Preview production build

# Code Quality
yarn lint             # Lint and fix files
yarn format           # Format code with Prettier

# Testing
yarn test             # Run tests
yarn test:coverage    # Run tests with coverage
```

### Code Style
- **ESLint** for code linting
- **Prettier** for code formatting
- **Vue 3 Composition API** for component logic
- **Tailwind CSS** for styling
- **TypeScript-like** validation with JSDoc

### Best Practices
- **Composable Architecture**: Logic reuse through composables
- **Component Composition**: Small, focused components
- **CSS Variables**: Consistent design tokens
- **Error Handling**: Comprehensive error boundaries
- **Performance**: Lazy loading and code splitting

## 📱 Features in Detail

### Property Search
```javascript
// Advanced search with multiple filters
const searchFilters = {
  location: 'Bogotá, Colombia',
  priceRange: '50000-100000',
  amenities: ['wifi', 'kitchen'],
  roomTypes: ['apartamento', 'casa']
}
```

### Favorites System
```javascript
// Persistent favorites with localStorage
const { isFavorite, toggleFavorite, favoritesCount } = useFavorites()
```

### Form Validation
```javascript
// Comprehensive form validation
const { form, errors, validateForm } = useForm({
  title: '',
  price: '',
  description: ''
})
```

## 🚀 Deployment

### Production Build
```bash
yarn build
```

### Environment Variables
Ensure all Firebase configuration is set in production environment.

### Hosting
The app can be deployed to:
- **Vercel** (recommended)
- **Netlify**
- **Firebase Hosting**
- **Any static hosting service**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow Vue 3 Composition API patterns
- Use composables for reusable logic
- Maintain consistent code style
- Add tests for new features
- Update documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Vue.js** team for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Firebase** for backend services
- **Vite** for the fast build tool

## 📞 Support

For support, email support@roomhotel-app.com or join our Slack channel.

---

**Built with ❤️ using Vue 3, Tailwind CSS, and Firebase**
