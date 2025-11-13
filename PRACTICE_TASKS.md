# 🎯 EXPRESS.JS PRACTICE TASKS
## Learn Routes, Controllers, Mongoose & Prisma

This document contains progressive practice tasks to help you master:
- Creating routes for different HTTP methods
- Writing controller functions
- MongoDB queries with Mongoose
- PostgreSQL queries with Prisma
- Aggregation pipelines and complex queries

---

## 📚 PHASE 1: EASY TASKS (Getting Started)

### Task 1.1: Create Product Routes (MongoDB)
**Objective**: Learn basic routing patterns

Create a new file: `routes/productRoutes.js`

```javascript
// TODO: Create the following routes:
// GET    /api/products/mongo           - Get all products
// GET    /api/products/mongo/:id       - Get one product
// POST   /api/products/mongo           - Create product
// PUT    /api/products/mongo/:id       - Update product
// DELETE /api/products/mongo/:id       - Delete product

// Required fields for Product:
// - name (String, required)
// - description (String)
// - price (Number, required)
// - stock (Number, default: 0)
// - category (String, enum: ['Electronics', 'Clothing', 'Food', 'Books'])
// - inStock (Boolean, default: true)
```

**What to practice:**
- Creating Express router
- Defining different HTTP methods (GET, POST, PUT, DELETE)
- Using route parameters (`:id`)
- Importing and using controller functions

---

### Task 1.2: Create Product Model (Mongoose)
**Objective**: Learn Mongoose schema definition

Create a new file: `models/Product.js`

```javascript
// TODO: Create a Mongoose schema with:
// - name: String, required, min 3 characters
// - description: String
// - price: Number, required, min 0
// - stock: Number, default 0, min 0
// - category: String, enum values (see Task 1.1)
// - inStock: Boolean, default true
// - timestamps: true (createdAt, updatedAt)

// BONUS:
// - Add an index on 'category'
// - Create a virtual property 'priceWithTax' (price * 1.1)
// - Add a pre-save middleware to set inStock=false if stock=0
```

**What to practice:**
- Defining Mongoose schemas
- Using validators (required, min, max, enum)
- Setting default values
- Creating indexes
- Virtual properties
- Middleware hooks

---

### Task 1.3: Create Product Controller - Basic CRUD (MongoDB)
**Objective**: Learn basic database operations

Create a new file: `controllers/productController.js`

Implement these functions:

```javascript
// 1. getAllProductsFromMongo
//    - Use Product.find()
//    - Return all products
//    - Response format: { status, results, data: { products } }

// 2. getProductByIdFromMongo
//    - Use Product.findById(id)
//    - Handle "not found" case
//    - Response: { status, data: { product } }

// 3. createProductInMongo
//    - Validate: name and price are required
//    - Use Product.create()
//    - Response: 201 status, { status, message, data: { product } }

// 4. updateProductInMongo
//    - Use Product.findByIdAndUpdate(id, data, { new: true })
//    - Handle "not found"
//    - Response: { status, message, data: { product } }

// 5. deleteProductFromMongo
//    - Use Product.findByIdAndDelete(id)
//    - Handle "not found"
//    - Response: { status, message }
```

**What to practice:**
- Mongoose query methods (find, findById, create, findByIdAndUpdate, findByIdAndDelete)
- Error handling (try-catch)
- Validating request data
- Sending appropriate HTTP status codes (200, 201, 400, 404, 500)
- Consistent response formatting

---

### Task 1.4: Create Product Schema & Routes (PostgreSQL/Prisma)
**Objective**: Learn Prisma schema definition

Add to `prisma/schema.prisma`:

```prisma
// TODO: Define a Product model with:
// - id: Int, auto-increment, primary key
// - name: String
// - description: String (optional)
// - price: Float
// - stock: Int, default 0
// - category: String
// - inStock: Boolean, default true
// - createdAt: DateTime, default now
// - updatedAt: DateTime, auto-update

// Map to 'products' table
```

**Steps:**
1. Add the model to schema.prisma
2. Run: `npx prisma migrate dev --name add_products`
3. Run: `npx prisma generate`

**What to practice:**
- Defining Prisma models
- Understanding field types (Int, String, Float, Boolean, DateTime)
- Using decorators (@id, @default, @updatedAt)
- Running migrations
- Generating Prisma Client

---

### Task 1.5: Create Product Controller - Basic CRUD (PostgreSQL)
**Objective**: Learn Prisma query operations

Add to `controllers/productController.js`:

```javascript
// Implement PostgreSQL versions:
// 1. getAllProductsFromPostgres
//    - Use prisma.product.findMany()

// 2. getProductByIdFromPostgres
//    - Parse id as Int
//    - Use prisma.product.findUnique({ where: { id } })

// 3. createProductInPostgres
//    - Use prisma.product.create({ data: { ... } })
//    - Convert price and stock to numbers

// 4. updateProductInPostgres
//    - Use prisma.product.update({ where: { id }, data: { ... } })
//    - Handle P2025 error (not found)

// 5. deleteProductFromPostgres
//    - Use prisma.product.delete({ where: { id } })
```

Create routes file: `routes/productRoutes.js` (if not done already)

```javascript
// Add PostgreSQL routes:
// GET    /api/products/postgres
// GET    /api/products/postgres/:id
// POST   /api/products/postgres
// PUT    /api/products/postgres/:id
// DELETE /api/products/postgres/:id
```

**What to practice:**
- Prisma Client methods (findMany, findUnique, create, update, delete)
- Type conversions (parseInt, parseFloat)
- Handling Prisma error codes (P2025, P2002)
- Comparing Mongoose vs Prisma syntax

---

## 🚀 PHASE 2: MEDIUM TASKS (Query Filtering & Pagination)

### Task 2.1: Filtering & Searching Products (MongoDB)
**Objective**: Learn query filters and search

Add to `routes/productRoutes.js`:
```javascript
// GET /api/products/mongo/search?keyword=laptop
// GET /api/products/mongo/filter?category=Electronics&minPrice=100&maxPrice=1000
```

Implement in `controllers/productController.js`:

```javascript
// searchProductsInMongo
// - Get 'keyword' from req.query
// - Search in name and description using $regex (case-insensitive)
// - Use: { $or: [{ name: regex }, { description: regex }] }

// filterProductsInMongo
// - Get category, minPrice, maxPrice, inStock from req.query
// - Build filter object dynamically
// - Example: { category, price: { $gte: minPrice, $lte: maxPrice }, inStock }
// - Use Product.find(filter)
```

**What to practice:**
- Query parameters (req.query)
- MongoDB operators ($regex, $or, $gte, $lte)
- Building dynamic query objects
- Case-insensitive search
- Combining multiple filters

---

### Task 2.2: Pagination & Sorting (MongoDB)
**Objective**: Learn pagination and sorting

Add route:
```javascript
// GET /api/products/mongo?page=1&limit=10&sort=-price
```

Implement in controller:

```javascript
// getAllProductsWithPagination
// - Get page, limit, sort from req.query
// - Default: page=1, limit=10, sort=createdAt
// - Calculate skip: (page - 1) * limit
// - Use: Product.find().sort(sort).skip(skip).limit(limit)
// - Get total count: Product.countDocuments()
// - Response: { status, results, totalPages, currentPage, data }
```

**What to practice:**
- Pagination logic (skip, limit)
- Sorting (ascending/descending)
- Calculating total pages
- Providing pagination metadata

---

### Task 2.3: Filtering & Searching Products (PostgreSQL/Prisma)
**Objective**: Learn Prisma filtering

Add routes:
```javascript
// GET /api/products/postgres/search?keyword=laptop
// GET /api/products/postgres/filter?category=Electronics&minPrice=100
```

Implement in controller:

```javascript
// searchProductsInPostgres
// - Use prisma.product.findMany({
//     where: {
//       OR: [
//         { name: { contains: keyword, mode: 'insensitive' } },
//         { description: { contains: keyword, mode: 'insensitive' } }
//       ]
//     }
//   })

// filterProductsInPostgres
// - Build where clause dynamically
// - Use: { category, price: { gte: minPrice, lte: maxPrice }, inStock }
```

**What to practice:**
- Prisma where clauses
- OR conditions
- Case-insensitive search (mode: 'insensitive')
- Comparison operators (gte, lte, contains)

---

### Task 2.4: Pagination & Sorting (PostgreSQL/Prisma)
**Objective**: Learn Prisma pagination

Implement:

```javascript
// getAllProductsFromPostgresWithPagination
// - Use prisma.product.findMany({
//     skip: (page - 1) * limit,
//     take: limit,
//     orderBy: { price: 'desc' }  // or other fields
//   })
// - Get count: prisma.product.count()
// - Return pagination metadata
```

**What to practice:**
- Prisma skip and take
- orderBy clause
- Counting records
- Dynamic sorting by different fields

---

## 💪 PHASE 3: ADVANCED TASKS (Aggregation & Complex Queries)

### Task 3.1: MongoDB Aggregation - Product Statistics
**Objective**: Learn aggregation pipeline

Add route:
```javascript
// GET /api/products/mongo/stats
```

Implement:

```javascript
// getProductStats
// Use aggregation pipeline to calculate:
// - Total products count
// - Average price
// - Total inventory value (sum of price * stock)
// - Products by category (count per category)
// - Most expensive product
// - Least expensive product

// Example pipeline:
// Product.aggregate([
//   {
//     $group: {
//       _id: null,
//       totalProducts: { $sum: 1 },
//       avgPrice: { $avg: '$price' },
//       maxPrice: { $max: '$price' },
//       minPrice: { $min: '$price' }
//     }
//   }
// ])
```

**What to practice:**
- MongoDB aggregation pipeline
- Aggregation stages ($group, $match, $project, $sort)
- Aggregation operators ($sum, $avg, $max, $min, $multiply)
- Grouping by fields

---

### Task 3.2: MongoDB Aggregation - Products by Category
**Objective**: Master grouping and calculations

Add route:
```javascript
// GET /api/products/mongo/stats/by-category
```

Implement:

```javascript
// getProductStatsByCategory
// Calculate for each category:
// - Number of products
// - Average price
// - Total stock
// - Total value (price * stock for all products)
// - Lowest and highest priced product

// Pipeline:
// [
//   {
//     $group: {
//       _id: '$category',
//       count: { $sum: 1 },
//       avgPrice: { $avg: '$price' },
//       totalStock: { $sum: '$stock' },
//       minPrice: { $min: '$price' },
//       maxPrice: { $max: '$price' }
//     }
//   },
//   { $sort: { count: -1 } }
// ]
```

**What to practice:**
- Grouping by category
- Multiple aggregation operators
- Sorting aggregated results
- Complex calculations

---

### Task 3.3: MongoDB Aggregation - Price Range Analysis
**Objective**: Advanced filtering and grouping

Add route:
```javascript
// GET /api/products/mongo/stats/price-ranges
```

Implement:

```javascript
// getProductsByPriceRange
// Group products into price ranges:
// - Budget: 0-100
// - Mid-range: 100-500
// - Premium: 500-1000
// - Luxury: 1000+

// Use $bucket or $cond in aggregation
// Return count of products in each range

// Pipeline with $bucket:
// [
//   {
//     $bucket: {
//       groupBy: '$price',
//       boundaries: [0, 100, 500, 1000, 10000],
//       default: 'Other',
//       output: {
//         count: { $sum: 1 },
//         products: { $push: '$name' }
//       }
//     }
//   }
// ]
```

**What to practice:**
- $bucket stage
- Custom boundaries
- $push operator (collecting values)
- Conditional grouping

---

### Task 3.4: MongoDB Aggregation - Low Stock Alert
**Objective**: Complex filtering and sorting

Add route:
```javascript
// GET /api/products/mongo/low-stock?threshold=10
```

Implement:

```javascript
// getLowStockProducts
// Find products with stock below threshold
// Calculate "urgency score" based on:
//   - Stock level (lower = more urgent)
//   - Price (higher price = more urgent)
// Sort by urgency

// Pipeline:
// [
//   { $match: { stock: { $lt: threshold } } },
//   {
//     $addFields: {
//       urgencyScore: {
//         $multiply: [
//           { $subtract: [threshold, '$stock'] },
//           '$price'
//         ]
//       }
//     }
//   },
//   { $sort: { urgencyScore: -1 } },
//   {
//     $project: {
//       name: 1,
//       stock: 1,
//       price: 1,
//       urgencyScore: 1
//     }
//   }
// ]
```

**What to practice:**
- $addFields stage
- Mathematical operations ($multiply, $subtract)
- $project stage (selecting fields)
- Calculated fields in aggregation

---

### Task 3.5: PostgreSQL/Prisma - Aggregation & Statistics
**Objective**: Learn Prisma aggregation

Add route:
```javascript
// GET /api/products/postgres/stats
```

Implement:

```javascript
// getProductStatsPostgres
// Use Prisma aggregate:
// const stats = await prisma.product.aggregate({
//   _count: { _all: true },
//   _avg: { price: true, stock: true },
//   _sum: { stock: true },
//   _max: { price: true },
//   _min: { price: true }
// })

// Calculate total inventory value using:
// const products = await prisma.product.findMany({
//   select: { price: true, stock: true }
// })
// const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0)
```

**What to practice:**
- Prisma aggregate function
- Aggregation operations (_count, _avg, _sum, _max, _min)
- Select specific fields
- Post-processing calculations

---

### Task 3.6: PostgreSQL/Prisma - Group By Category
**Objective**: Grouping in Prisma

Add route:
```javascript
// GET /api/products/postgres/stats/by-category
```

Implement:

```javascript
// getProductStatsByCategoryPostgres
// Use Prisma groupBy:
// const stats = await prisma.product.groupBy({
//   by: ['category'],
//   _count: { _all: true },
//   _avg: { price: true },
//   _sum: { stock: true },
//   _max: { price: true },
//   _min: { price: true }
// })

// Sort results by count descending
```

**What to practice:**
- Prisma groupBy method
- Grouping by specific fields
- Multiple aggregations
- Sorting grouped results

---

### Task 3.7: PostgreSQL/Prisma - Complex Filters
**Objective**: Advanced Prisma queries

Add route:
```javascript
// GET /api/products/postgres/advanced-search
```

Implement:

```javascript
// advancedSearchPostgres
// Support query params:
// - keyword: Search in name/description
// - categories: Array of categories
// - minPrice, maxPrice: Price range
// - inStock: Boolean
// - sortBy: 'price' | 'name' | 'stock'
// - sortOrder: 'asc' | 'desc'

// Example:
// const products = await prisma.product.findMany({
//   where: {
//     AND: [
//       {
//         OR: [
//           { name: { contains: keyword, mode: 'insensitive' } },
//           { description: { contains: keyword, mode: 'insensitive' } }
//         ]
//       },
//       { category: { in: categories } },
//       { price: { gte: minPrice, lte: maxPrice } },
//       { inStock: inStock }
//     ]
//   },
//   orderBy: { [sortBy]: sortOrder }
// })
```

**What to practice:**
- Complex where clauses (AND, OR)
- Array operators (in)
- Dynamic orderBy
- Combining multiple filters
- Query parameter parsing

---

## 🎓 BONUS CHALLENGES

### Challenge 1: Create Order System
Create Order model with:
- Products array (references)
- Calculate total automatically
- Track status (pending, shipped, delivered)
- Implement: Create order, Get orders, Update status

### Challenge 2: User-Product Relations
Add:
- User's favorite products
- Product reviews (rating, comment)
- Implement: Add to favorites, Write review, Get product with reviews

### Challenge 3: Full-Text Search
Implement:
- MongoDB text indexes
- PostgreSQL full-text search
- Ranking by relevance

### Challenge 4: Bulk Operations
Implement:
- Import products from CSV/JSON
- Bulk update prices (increase by percentage)
- Bulk delete out-of-stock products

### Challenge 5: Analytics Dashboard
Create endpoint that returns:
- Sales trends (if you add orders)
- Popular categories
- Inventory warnings
- Revenue projections

---

## 📝 TESTING YOUR WORK

### Use These Tools:
1. **Thunder Client / Postman**: Test your API endpoints
2. **Prisma Studio**: View PostgreSQL data (`npx prisma studio`)
3. **MongoDB Compass**: View MongoDB data

### Sample Test Data:

**Create Product (MongoDB/PostgreSQL):**
```json
POST /api/products/mongo
{
  "name": "Laptop",
  "description": "High-performance gaming laptop",
  "price": 1200,
  "stock": 15,
  "category": "Electronics",
  "inStock": true
}
```

**Filter Products:**
```
GET /api/products/mongo/filter?category=Electronics&minPrice=500&maxPrice=2000
```

**Pagination:**
```
GET /api/products/mongo?page=1&limit=5&sort=-price
```

---

## 🎯 LEARNING PROGRESSION

1. ✅ Start with PHASE 1 (Easy) - Get comfortable with basics
2. ✅ Move to PHASE 2 (Medium) - Learn filtering and pagination
3. ✅ Tackle PHASE 3 (Advanced) - Master aggregation
4. ✅ Try BONUS challenges when ready

**Remember:**
- Read the comments carefully
- Test each endpoint after implementation
- Compare MongoDB vs Prisma approaches
- Don't hesitate to check documentation
- Experiment with different query options

**Good luck! 🚀**
