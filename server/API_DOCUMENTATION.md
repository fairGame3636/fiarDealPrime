# Roulette Casino API Documentation - Phase 1

## Overview
This API provides endpoints for user authentication, profile management, and roulette table operations for the Roulette Casino application. This documentation covers Phase 1 of the application development.

## Phase 1 Features
- User authentication (register/login)
- User profile management
- Basic table management
- JWT-based security
- Initial wallet system

## Future Phases
### Phase 2 (Coming Soon)
- Betting functionality
- Game logic implementation
- Real-time updates
- Transaction history
- Player statistics

### Phase 3 (Planned)
- Admin dashboard
- Advanced analytics
- Multiple game modes
- Social features
- Payment integration

## Base URL
```
http://localhost:5000
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

## Endpoints

### Authentication

#### Register User
```http
POST /auth/register
```

**Request Body:**
```json
{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "deviceId": "device123"
}
```

**Response (201 Created):**
```json
{
    "token": "jwt_token_here",
    "user": {
        "id": "user_id",
        "name": "Test User",
        "email": "test@example.com",
        "wallet": 1000,
        "role": "player"
    }
}
```

**Validation Rules:**
- All fields are required
- Password must be at least 6 characters
- Email must be in valid format
- Email must be unique

#### Login User
```http
POST /auth/login
```

**Request Body:**
```json
{
    "email": "test@example.com",
    "password": "password123"
}
```

**Response (200 OK):**
```json
{
    "token": "jwt_token_here",
    "user": {
        "id": "user_id",
        "name": "Test User",
        "email": "test@example.com",
        "wallet": 1000,
        "role": "player"
    }
}
```

### User Profile

#### Get Current User
```http
GET /user/me
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
    "id": "user_id",
    "name": "Test User",
    "email": "test@example.com",
    "wallet": 1000,
    "role": "player",
    "deviceId": "device123",
    "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### Tables

#### Get All Tables
```http
GET /tables
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
[
    {
        "id": "table_id_1",
        "name": "Table 1",
        "status": "waiting",
        "minBet": 10,
        "maxBet": 1000,
        "players": [],
        "createdAt": "2024-01-01T00:00:00.000Z"
    },
    {
        "id": "table_id_2",
        "name": "Table 2",
        "status": "waiting",
        "minBet": 50,
        "maxBet": 5000,
        "players": [],
        "createdAt": "2024-01-01T00:00:00.000Z"
    }
]
```

#### Get Table Detail
```http
GET /tables/:id
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
    "id": "table_id",
    "name": "string",
    "status": "string",
    "minBet": number,
    "maxBet": number,
    "players": [],
    "createdAt": "string"
}
```

## Data Models

### User
```typescript
{
    name: string;          // Required
    email: string;         // Required, unique
    passwordHash: string;  // Required
    wallet: number;        // Default: 1000
    role: string;          // Default: 'player', enum: ['player', 'admin']
    deviceId: string;      // Required
    createdAt: Date;       // Auto-generated
}
```

### Table
```typescript
{
    name: string;          // Required
    status: string;        // Default: 'waiting', enum: ['waiting', 'spinning', 'ended']
    minBet: number;        // Required, default: 10
    maxBet: number;        // Required, default: 1000
    players: User[];       // Array of user references
    createdAt: Date;       // Auto-generated
}
```

## Error Responses

### 400 Bad Request
```json
{
    "error": "Error message here"
}
```

### 401 Unauthorized
```json
{
    "error": "Please authenticate."
}
```

### 500 Internal Server Error
```json
{
    "error": "Something went wrong!"
}
```

## Security

- All passwords are hashed using bcrypt
- JWT tokens expire after 24 hours
- Protected routes require valid JWT token
- CORS and Helmet security headers are enabled

## Testing

A Postman collection is available at `Roulette_Casino_API.postman_collection.json` with:
- Pre-configured requests
- Example request bodies
- Test scripts for response validation
- Environment variables for base URL and JWT token

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

3. Start the server:
```bash
npm run dev
```

## Notes

- Two roulette tables are automatically created on server startup if they don't exist
- Each new user starts with a wallet balance of 1000
- All timestamps are in UTC
- This documentation will be updated as new features are added in future phases