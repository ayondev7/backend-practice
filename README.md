# Express.js Practice Project with Prisma & Mongoose

A complete Express.js backend setup with both PostgreSQL (Prisma) and MongoDB (Mongoose) for learning and practice.

## 📁 Project Structure

```
backend-practice-express/
├── config/
│   ├── mongoDb.js          # MongoDB connection configuration
│   └── prismaDb.js         # PostgreSQL/Prisma configuration
├── controllers/
│   └── userController.js   # User CRUD operations (example)
├── models/
│   └── User.js             # Mongoose User model (example)
├── routes/
│   └── userRoutes.js       # User API routes (example)
├── prisma/
│   └── schema.prisma       # Prisma schema definition
├── app.js                  # Express app configuration
├── server.js               # Server entry point
├── package.json            # Dependencies
├── .env.example            # Environment variables template
├── .gitignore
├── PRACTICE_TASKS.md       # Your practice assignments
└── README.md               # This file
```

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your database URLs:

```env
PORT=3000
NODE_ENV=development

# MongoDB
MONGO_URI=mongodb://localhost:27017/practice_db
# Or use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/database

# PostgreSQL (Prisma)
DATABASE_URL=postgresql://username:password@localhost:5432/practice_db
# Or use cloud PostgreSQL
```

### 3. Setup Databases

#### MongoDB Setup:
- **Local**: Install MongoDB and start the service
- **Cloud**: Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

#### PostgreSQL Setup:
- **Local**: Install PostgreSQL
- **Cloud**: Use [Neon](https://neon.tech/), [Supabase](https://supabase.com/), or [Railway](https://railway.app/)

### 4. Initialize Prisma

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations to create database tables
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to view data
npx prisma studio
```

### 5. Start the Server

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3000`

## 📡 API Endpoints

### Health Check
- `GET /health` - Check if server is running
- `GET /` - API welcome message

### User Endpoints (MongoDB)
- `GET /api/users/mongo` - Get all users from MongoDB
- `GET /api/users/mongo/:id` - Get user by ID
- `POST /api/users/mongo` - Create new user
- `PUT /api/users/mongo/:id` - Update user
- `DELETE /api/users/mongo/:id` - Delete user

### User Endpoints (PostgreSQL)
- `GET /api/users/postgres` - Get all users from PostgreSQL
- `GET /api/users/postgres/:id` - Get user by ID
- `POST /api/users/postgres` - Create new user
- `PUT /api/users/postgres/:id` - Update user
- `DELETE /api/users/postgres/:id` - Delete user

## 🧪 Testing the API

### Using Thunder Client / Postman

**Create a user (MongoDB):**
```json
POST http://localhost:3000/api/users/mongo
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 25,
  "role": "USER"
}
```

**Create a user (PostgreSQL):**
```json
POST http://localhost:3000/api/users/postgres
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "age": 30,
  "role": "ADMIN"
}
```

**Get all users:**
```
GET http://localhost:3000/api/users/mongo
GET http://localhost:3000/api/users/postgres
```

## 📚 Learning Path

### ✅ Setup Complete
You now have a working Express.js server with:
- ✅ MongoDB connection (Mongoose)
- ✅ PostgreSQL connection (Prisma)
- ✅ Example User routes and controllers
- ✅ Proper error handling
- ✅ Environment configuration

### 🎯 Next Steps
Check `PRACTICE_TASKS.md` for your learning tasks:

1. **Phase 1 (Easy)**: Create Product routes, models, and basic CRUD
2. **Phase 2 (Medium)**: Implement filtering, searching, and pagination
3. **Phase 3 (Advanced)**: Master aggregation and complex queries
4. **Bonus Challenges**: Build advanced features

## 🛠️ Useful Commands

### Prisma Commands
```bash
# Generate Prisma Client after schema changes
npx prisma generate

# Create a new migration
npx prisma migrate dev --name description_of_change

# View database in browser
npx prisma studio

# Reset database (⚠️ deletes all data)
npx prisma migrate reset
```

### NPM Scripts
```bash
npm start          # Start server
npm run dev        # Start with auto-reload (Node --watch)
```

## 📖 Key Concepts

### Server Architecture
- **server.js**: Entry point, handles database connections and server startup
- **app.js**: Express configuration, middleware, and routes
- **Separation of concerns**: Keep routing, business logic, and data access separate

### Mongoose vs Prisma
- **Mongoose**: ODM for MongoDB, schema-based, flexible
- **Prisma**: Type-safe ORM for SQL databases, generates TypeScript types
- Both are included so you can compare and learn both approaches

### Error Handling
- Try-catch blocks in controllers
- Global error handler in app.js
- Graceful shutdown handlers in server.js

## 🔧 Troubleshooting

### Port already in use
Change the PORT in `.env` file or kill the process using the port.

### Database connection errors
- Check your DATABASE_URL and MONGO_URI in `.env`
- Ensure databases are running
- Verify credentials and network access

### Prisma errors
- Run `npx prisma generate` after schema changes
- Run migrations: `npx prisma migrate dev`

### Module not found
- Run `npm install` to ensure all dependencies are installed

## 📚 Resources

### Documentation
- [Express.js](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [Prisma](https://www.prisma.io/docs)
- [Node.js](https://nodejs.org/)

### Learning MongoDB
- [MongoDB Aggregation](https://www.mongodb.com/docs/manual/aggregation/)
- [Mongoose Queries](https://mongoosejs.com/docs/queries.html)

### Learning PostgreSQL/Prisma
- [Prisma CRUD](https://www.prisma.io/docs/concepts/components/prisma-client/crud)
- [Prisma Relations](https://www.prisma.io/docs/concepts/components/prisma-schema/relations)

## 🎓 Tips for Learning

1. **Start with Phase 1** - Master the basics before moving on
2. **Compare approaches** - See how Mongoose and Prisma differ
3. **Test everything** - Use Thunder Client/Postman to test each endpoint
4. **Read the comments** - All code is heavily commented for learning
5. **Experiment** - Try different query options and see what happens
6. **Use database viewers** - Prisma Studio and MongoDB Compass help visualize data

## 📝 Notes

- The User model is provided as an example
- You'll create the Product model and additional features
- Focus on understanding the patterns and structure
- Practice makes perfect - do all the tasks!

---

**Happy Coding! 🚀**
