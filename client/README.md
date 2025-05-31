# Roulette Casino Frontend

## Phase 1: User Interface and Authentication

### Overview
The frontend of the Roulette Casino application is built with React, Vite, and Tailwind CSS. This phase focuses on creating a responsive user interface with authentication and basic table management features.

### Features Implemented

#### 1. Authentication
- User registration page
- Login page with JWT token storage
- Protected routes for authenticated users
- Automatic token handling in API requests
- User wallet balance display

#### 2. Table Management
- Dashboard with available roulette tables
- Table cards showing:
  - Table name
  - Minimum and maximum bet limits
  - Table status
- Detailed table view page
- Responsive grid layout for tables

#### 3. User Interface Components
- Navigation bar with:
  - User name display
  - Wallet balance
  - Logout button
- Loading states
- Error handling and display
- Responsive design for all screen sizes

### Technical Stack

#### Core Technologies
- **React**: Frontend framework
- **Vite**: Build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **React Router v6**: Client-side routing
- **Axios**: HTTP client for API requests
- **Zustand**: State management

#### Key Dependencies
```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "react-router-dom": "^6.x",
    "axios": "^1.x",
    "zustand": "^4.x",
    "tailwindcss": "^3.x"
  }
}
```

### Project Structure
```
client/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── TableCard.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── DashboardPage.jsx
│   │   └── TableDetailPage.jsx
│   ├── store/
│   │   └── authStore.js
│   ├── api/
│   │   └── axiosClient.js
│   ├── App.jsx
│   └── main.jsx
├── public/
├── index.html
└── package.json
```

### Component Details

#### 1. Authentication Components
- **LoginPage**: Email and password login form
- **RegisterPage**: User registration form
- **ProtectedRoute**: Route wrapper for authenticated access

#### 2. Table Components
- **TableCard**: Displays individual table information
  - Table name
  - Bet limits
  - Status indicator
  - View Table button
- **TableDetailPage**: Detailed view of a specific table
  - Table information
  - Status display
  - Coming soon section for game interface

#### 3. Layout Components
- **Navbar**: Top navigation bar
  - User information
  - Wallet balance
  - Navigation links
- **DashboardPage**: Main application page
  - Welcome message
  - Wallet balance
  - Table grid

### State Management
- **Auth Store** (Zustand):
  - User information
  - Authentication state
  - Login/Logout functions
  - Token management

### API Integration
- **Axios Client**:
  - Base URL configuration
  - Token injection
  - Error handling
  - Request/Response interceptors

### Styling
- **Tailwind CSS**:
  - Custom color scheme
  - Responsive design
  - Component-specific styles
  - Dark theme

### Setup Instructions

1. **Install dependencies**
```bash
npm install
```

2. **Environment Setup**
Create `.env` file:
```
VITE_API_URL=http://localhost:5000
```

3. **Start development server**
```bash
npm run dev
```

### Known Issues and Solutions
1. **Table Name Handling**: Implemented URL encoding for table names in routes
2. **Authentication Flow**: Proper token storage and refresh handling
3. **Responsive Design**: Mobile-first approach with Tailwind breakpoints

### Future Enhancements
- Real-time table updates
- Betting interface
- User profile management
- Theme customization
- Loading animations
- Error boundary implementation

### Development Guidelines
1. **Component Structure**:
   - Use functional components with hooks
   - Implement proper prop types
   - Keep components focused and reusable

2. **State Management**:
   - Use Zustand for global state
   - Local state for component-specific data
   - Proper error and loading states

3. **Styling**:
   - Follow Tailwind utility classes
   - Maintain consistent spacing
   - Use custom color variables

4. **Code Organization**:
   - Group related components
   - Maintain clear file structure
   - Use proper naming conventions 