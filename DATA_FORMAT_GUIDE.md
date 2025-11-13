# 📊 API DATA FORMAT GUIDE

Quick reference for request/response formats when practicing.

---

## 🔵 MONGODB (Mongoose) - User Model

### Create User
**Endpoint:** `POST /api/users/mongo`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 25,
  "role": "USER"
}
```

**Field Requirements:**
- `name`: String, required, 2-50 characters
- `email`: String, required, unique, valid email format
- `age`: Number, optional, 0-150
- `role`: String, enum: ['USER', 'ADMIN', 'MODERATOR'], default: 'USER'

**Success Response (201):**
```json
{
  "status": "success",
  "message": "User created successfully",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "age": 25,
      "role": "USER",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

### Update User
**Endpoint:** `PUT /api/users/mongo/:id`

**Request Body (partial update allowed):**
```json
{
  "name": "John Updated",
  "age": 26
}
```

### Get All Users
**Endpoint:** `GET /api/users/mongo`

**Success Response (200):**
```json
{
  "status": "success",
  "results": 2,
  "data": {
    "users": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john@example.com",
        "age": 25,
        "role": "USER",
        "createdAt": "2024-01-15T10:30:00.000Z",
        "updatedAt": "2024-01-15T10:30:00.000Z"
      },
      {
        "_id": "507f1f77bcf86cd799439012",
        "name": "Jane Smith",
        "email": "jane@example.com",
        "age": 30,
        "role": "ADMIN",
        "createdAt": "2024-01-15T11:00:00.000Z",
        "updatedAt": "2024-01-15T11:00:00.000Z"
      }
    ]
  }
}
```

---

## 🟢 POSTGRESQL (Prisma) - User Model

### Create User
**Endpoint:** `POST /api/users/postgres`

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "age": 30,
  "role": "ADMIN"
}
```

**Field Requirements:**
- `name`: String, required
- `email`: String, required, unique
- `age`: Integer, optional
- `role`: String, default: 'USER'

**Success Response (201):**
```json
{
  "status": "success",
  "message": "User created successfully",
  "data": {
    "user": {
      "id": 1,
      "name": "Jane Smith",
      "email": "jane@example.com",
      "age": 30,
      "role": "ADMIN",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

**Note:** PostgreSQL uses integer `id` instead of MongoDB's `_id` ObjectId.

---

## 🛒 PRODUCT MODEL (Your Practice Task)

### Create Product (MongoDB)
**Endpoint:** `POST /api/products/mongo`

**Request Body:**
```json
{
  "name": "Gaming Laptop",
  "description": "High-performance gaming laptop with RTX 4080",
  "price": 1299.99,
  "stock": 15,
  "category": "Electronics",
  "inStock": true
}
```

**Field Requirements:**
- `name`: String, required, min 3 characters
- `description`: String, optional
- `price`: Number, required, min 0
- `stock`: Number, default 0, min 0
- `category`: String, enum: ['Electronics', 'Clothing', 'Food', 'Books']
- `inStock`: Boolean, default true

### Create Product (PostgreSQL)
**Endpoint:** `POST /api/products/postgres`

**Request Body:**
```json
{
  "name": "Wireless Mouse",
  "description": "Ergonomic wireless mouse",
  "price": 29.99,
  "stock": 100,
  "category": "Electronics",
  "inStock": true
}
```

---

## 🔍 QUERY PARAMETERS EXAMPLES

### Filtering
```
GET /api/products/mongo/filter?category=Electronics&minPrice=100&maxPrice=1000&inStock=true
```

**Query Params:**
- `category`: String - Filter by category
- `minPrice`: Number - Minimum price
- `maxPrice`: Number - Maximum price
- `inStock`: Boolean - Only in-stock items

### Search
```
GET /api/products/mongo/search?keyword=laptop
```

**Query Params:**
- `keyword`: String - Search in name and description

### Pagination
```
GET /api/products/mongo?page=2&limit=10&sort=-price
```

**Query Params:**
- `page`: Number - Page number (default: 1)
- `limit`: Number - Items per page (default: 10)
- `sort`: String - Sort field (prefix with `-` for descending)

**Pagination Response:**
```json
{
  "status": "success",
  "results": 10,
  "totalPages": 5,
  "currentPage": 2,
  "data": {
    "products": [...]
  }
}
```

---

## ⚠️ ERROR RESPONSES

### 400 Bad Request
```json
{
  "status": "error",
  "message": "Name and email are required"
}
```

### 404 Not Found
```json
{
  "status": "error",
  "message": "User not found"
}
```

### 500 Internal Server Error
```json
{
  "status": "error",
  "message": "Failed to create user in MongoDB",
  "error": "Detailed error message"
}
```

### Duplicate Email (MongoDB)
```json
{
  "status": "error",
  "message": "Email already exists"
}
```

### Duplicate Email (Prisma)
```json
{
  "status": "error",
  "message": "Email already exists"
}
```

---

## 📊 AGGREGATION RESPONSE EXAMPLES

### Product Statistics
**Endpoint:** `GET /api/products/mongo/stats`

**Response:**
```json
{
  "status": "success",
  "data": {
    "totalProducts": 150,
    "avgPrice": 349.99,
    "maxPrice": 2999.99,
    "minPrice": 9.99,
    "totalInventoryValue": 52498.50
  }
}
```

### Products by Category
**Endpoint:** `GET /api/products/mongo/stats/by-category`

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "category": "Electronics",
      "count": 45,
      "avgPrice": 599.99,
      "totalStock": 230,
      "minPrice": 29.99,
      "maxPrice": 2999.99
    },
    {
      "category": "Books",
      "count": 60,
      "avgPrice": 19.99,
      "totalStock": 450,
      "minPrice": 9.99,
      "maxPrice": 59.99
    }
  ]
}
```

### Price Range Analysis
**Endpoint:** `GET /api/products/mongo/stats/price-ranges`

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "range": "Budget (0-100)",
      "count": 50,
      "products": ["Mouse", "Keyboard", "USB Cable"]
    },
    {
      "range": "Mid-range (100-500)",
      "count": 35,
      "products": ["Monitor", "Tablet", "Headphones"]
    },
    {
      "range": "Premium (500-1000)",
      "count": 25,
      "products": ["Laptop", "Smartphone", "Graphics Card"]
    },
    {
      "range": "Luxury (1000+)",
      "count": 15,
      "products": ["Gaming PC", "4K TV", "Professional Camera"]
    }
  ]
}
```

---

## 🧪 TESTING TIPS

### Using Thunder Client in VS Code:
1. Install Thunder Client extension
2. Create a new request
3. Set method (GET, POST, PUT, DELETE)
4. Enter URL (e.g., `http://localhost:3000/api/users/mongo`)
5. For POST/PUT: Go to "Body" tab, select "JSON", paste request body
6. Click "Send"

### Using cURL (Terminal):
```bash
# Create user
curl -X POST http://localhost:3000/api/users/mongo \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","age":25}'

# Get all users
curl http://localhost:3000/api/users/mongo

# Get user by ID
curl http://localhost:3000/api/users/mongo/507f1f77bcf86cd799439011

# Update user
curl -X PUT http://localhost:3000/api/users/mongo/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{"name":"John Updated"}'

# Delete user
curl -X DELETE http://localhost:3000/api/users/mongo/507f1f77bcf86cd799439011
```

---

## 💡 QUICK TIPS

1. **MongoDB IDs**: Use the `_id` value from GET responses
2. **PostgreSQL IDs**: Use integer `id` values
3. **Timestamps**: Automatically added by both databases
4. **Optional fields**: Can be omitted in requests
5. **Enum values**: Must match exactly (case-sensitive)
6. **Prices**: Use decimal numbers (e.g., 29.99)
7. **Boolean values**: Use `true` or `false` (lowercase, no quotes)

---

**Keep this guide handy while working on your practice tasks! 📚**
