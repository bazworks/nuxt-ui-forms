# Nuxt UI Template

A modern Nuxt 3 template with UI components, authentication, and best practices.

## Features

- 🎨 **UI Framework**: Built with [Nuxt UI](https://ui.nuxt.com/) for beautiful, accessible components
- 🔐 **Authentication**: JWT-based authentication with persistent sessions
- 📊 **Data Tables**: Smart table component with sorting, filtering, and pagination
- 📝 **Form Validation**: Form handling with VeeValidate and Zod
- 🎯 **Type Safety**: Full TypeScript support
- 🎨 **Icons**: Heroicons integration
- 📱 **Responsive**: Mobile-first design
- 🎨 **Theme**: Light mode by default with dark mode support

## Tech Stack

- [Nuxt 3](https://nuxt.com/) - The Vue Framework
- [Nuxt UI](https://ui.nuxt.com/) - UI Components
- [Pinia](https://pinia.vuejs.org/) - State Management
- [VeeValidate](https://vee-validate.logaretm.com/) - Form Validation
- [Zod](https://zod.dev/) - Schema Validation
- [TanStack Table](https://tanstack.com/table) - Table Management
- [TypeScript](https://www.typescriptlang.org/) - Type Safety

## Installed Modules

The following Nuxt modules are installed and available for use:

- `@nuxt/eslint` - ESLint integration for code quality
- `@nuxt/image` - Image optimization and processing
- `@nuxt/ui` - UI components and utilities
- `@nuxt/fonts` - Font optimization and management
- `@nuxt/icon` - Icon support with various icon sets
- `@pinia/nuxt` - Pinia state management integration
- `pinia-plugin-persistedstate/nuxt` - State persistence across page reloads

## Core Composables

### useApi

A composable for handling API requests with built-in error handling and authentication:

- Handles JWT token management
- Provides both `apiFetch` and `apiUseFetch` methods
- Automatic error handling with toast notifications
- Type-safe responses
- Handles both backend (DRF) and non-backend errors differently

### useAuth

Authentication composable for managing user sessions:

- JWT token management
- Login/logout functionality
- Session persistence
- Protected route handling
- User profile management

### useErrorFormatter

Error handling composable for consistent error display:

- Formats backend (DRF) errors
- Handles non-backend errors
- Provides toast notifications
- Type-safe error handling

## Example Pages

Located in `app/pages/examples/`:

- `login.vue` - Example login page with form validation
- `testapi.vue` - API testing page
- `index.vue` - Example dashboard layout

## Local API Routes

Located in `server/routes/local/`:

- `profile.get.ts` - Example protected profile endpoint
- `token.post.ts` - JWT token generation endpoint
- `error.ts` - Error handling examples

## Environment Setup

Create a `.env` file with the following variables:

```
# Required for useApi composable
API_BASE_URL=http://localhost:8000  # Your backend API URL

# Required for session management
NUXT_SESSION_PASSWORD=your-secure-password-here  # Used for session encryption

# Optional environment variables
NODE_ENV=development
```

## Project Structure

```
├── app/
│   ├── assets/        # Static assets
│   ├── components/    # Vue components
│   │   ├── CoreSidebar/    # Sidebar components
│   │   ├── Filter/         # Filter components
│   │   └── Core*.vue       # Core UI components
│   ├── composables/   # Vue composables
│   │   ├── useApi.ts       # API client
│   │   ├── useAuth.ts      # Authentication
│   │   └── useErrorFormatter.ts # Error handling
│   ├── layouts/       # Page layouts
│   ├── middleware/    # Route middleware
│   ├── pages/         # Application pages
│   │   └── examples/  # Example pages
│   ├── plugins/       # Vue plugins
│   ├── stores/        # Pinia stores
│   └── types/         # TypeScript types
├── server/           # Server routes
│   └── routes/       # API routes
│       └── local/    # Local API endpoints
├── public/           # Public assets
└── utils/            # Utility functions
```

## Core Components

- `CoreSmartTable`: Advanced data table with sorting, filtering, and pagination
- `CoreFieldSelectMenu`: Enhanced select menu component
- `CoreFileUploader`: File upload component with preview
- `CoreConfirmDialog`: Reusable confirmation dialog

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and configure your environment variables:
   ```bash
   cp .env.example .env
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run generate` - Generate static site
- `npm run preview` - Preview production build

## Best Practices

1. **Type Safety**: Use TypeScript for all new code
2. **Component Structure**: Follow the Core\* prefix for base components
3. **Error Handling**: Use the error formatter for consistent error messages
4. **API Calls**: Use the useApi composable for all API requests
5. **State Management**: Use Pinia stores for global state
6. **Form Validation**: Use VeeValidate with Zod schemas

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

MIT
