# 🗄️ DATABASE SETUP GUIDE

Step-by-step guide to setup MongoDB and PostgreSQL for this project.

---

## 🍃 MONGODB SETUP

### Option 1: MongoDB Atlas (Cloud - Recommended for Beginners)

1. **Create Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free account

2. **Create Cluster**
   - Click "Build a Database"
   - Choose "FREE" tier (M0)
   - Select a region close to you
   - Click "Create Cluster"

3. **Setup Database Access**
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Create username and password (save these!)
   - Set "Database User Privileges" to "Read and write to any database"
   - Click "Add User"

4. **Setup Network Access**
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" in left sidebar
   - Click "Connect" on your cluster
   - Click "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `myFirstDatabase` with your preferred database name (e.g., `practice_db`)

6. **Update .env File**
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/practice_db
   ```

### Option 2: Local MongoDB Installation

**Windows:**
1. Download MongoDB Community Server from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Run installer, choose "Complete" installation
3. Install as Windows Service
4. MongoDB Compass (GUI) will be installed automatically

**Your .env:**
```env
MONGO_URI=mongodb://localhost:27017/practice_db
```

**Start MongoDB:**
- Service runs automatically
- Or manually: `net start MongoDB`

---

## 🐘 POSTGRESQL SETUP

### Option 1: Neon (Cloud - Recommended for Beginners)

1. **Create Account**
   - Go to [Neon](https://neon.tech/)
   - Sign up with GitHub or email

2. **Create Project**
   - Click "Create Project"
   - Choose a name (e.g., "practice-db")
   - Select region
   - Click "Create Project"

3. **Get Connection String**
   - Copy the "Connection string" shown
   - It looks like: `postgresql://user:pass@host.neon.tech/dbname`

4. **Update .env File**
   ```env
   DATABASE_URL=postgresql://username:password@ep-xxx.us-east-2.aws.neon.tech/neondb
   ```

### Option 2: Supabase (Cloud Alternative)

1. Go to [Supabase](https://supabase.com/)
2. Create new project
3. Wait for database setup
4. Go to Project Settings > Database
5. Find "Connection string" section
6. Use the "URI" format (not the pooler)
7. Update .env with the connection string

### Option 3: Local PostgreSQL Installation

**Windows:**
1. Download PostgreSQL from [PostgreSQL Downloads](https://www.postgresql.org/download/)
2. Run installer
3. Remember the password you set for postgres user
4. Accept default port (5432)

**Create Database:**
```bash
# Open SQL Shell (psql) or pgAdmin
CREATE DATABASE practice_db;
```

**Your .env:**
```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/practice_db
```

---

## ✅ VERIFY YOUR SETUP

### Test MongoDB Connection

1. Create `.env` file with your MONGO_URI
2. Run this test:
   ```bash
   npm run dev
   ```
3. Look for: `✅ MongoDB Connected Successfully`

### Test PostgreSQL Connection

1. Ensure DATABASE_URL is in `.env`
2. Run Prisma commands:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```
3. Look for: `✅ PostgreSQL (Prisma) Connected Successfully`

---

## 🔧 AFTER DATABASE SETUP

### 1. Copy .env.example to .env
```bash
cp .env.example .env
```

### 2. Edit .env with your database URLs
```env
PORT=3000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string_here
DATABASE_URL=your_postgresql_connection_string_here
```

### 3. Initialize Prisma
```bash
# Generate Prisma Client
npx prisma generate

# Create database tables
npx prisma migrate dev --name init
```

### 4. Start the server
```bash
npm run dev
```

### 5. Test the API
Open browser or Thunder Client:
- Health check: `http://localhost:3000/health`
- API welcome: `http://localhost:3000/`

---

## 🛠️ USEFUL DATABASE TOOLS

### MongoDB
- **MongoDB Compass**: GUI for viewing MongoDB data
  - Download: https://www.mongodb.com/products/compass
  - Connect using your MONGO_URI
  
- **VS Code Extension**: MongoDB for VS Code
  - Install from Extensions marketplace
  - Connect to your MongoDB instance

### PostgreSQL
- **Prisma Studio**: Built-in database browser
  ```bash
  npx prisma studio
  ```
  Opens in browser at http://localhost:5555

- **pgAdmin**: Full-featured PostgreSQL GUI
  - Download: https://www.pgadmin.org/
  
- **VS Code Extension**: PostgreSQL by Chris Kolkman
  - Install from Extensions marketplace

---

## 🐛 TROUBLESHOOTING

### MongoDB Issues

**"Connection timed out"**
- Check Network Access in Atlas (allow 0.0.0.0/0)
- Verify internet connection
- Try different WiFi/network

**"Authentication failed"**
- Double-check username and password
- Ensure password doesn't have special characters that need encoding
- Use `encodeURIComponent()` for password in connection string

**"Database not found"**
- Database name in connection string should match
- MongoDB creates databases automatically when first document is inserted

### PostgreSQL Issues

**"Connection refused"**
- Check if PostgreSQL service is running
- Verify port 5432 is correct
- Check firewall settings

**"Password authentication failed"**
- Double-check password
- For local: use password set during installation
- For cloud: copy connection string exactly as provided

**"Database doesn't exist"**
- For local: create database manually
- For cloud: database should be created automatically

### Prisma Issues

**"Prisma Client not generated"**
```bash
npx prisma generate
```

**"Migration failed"**
```bash
# Reset and try again
npx prisma migrate reset
npx prisma migrate dev --name init
```

**"Environment variable not found"**
- Ensure .env file exists in root directory
- Check DATABASE_URL is spelled correctly
- Restart your terminal/server

---

## 📊 QUICK DATABASE COMPARISON

| Feature | MongoDB (Mongoose) | PostgreSQL (Prisma) |
|---------|-------------------|---------------------|
| Type | NoSQL (Document) | SQL (Relational) |
| ID Type | ObjectId (string) | Integer (auto-increment) |
| Schema | Flexible | Strict |
| Relations | References | Foreign Keys |
| Queries | JavaScript-like | SQL-like |
| Scaling | Horizontal | Vertical |

---

## ✨ NEXT STEPS

Once both databases are connected:

1. ✅ Test the example User endpoints
2. ✅ View data in MongoDB Compass / Prisma Studio
3. ✅ Start working on PRACTICE_TASKS.md
4. ✅ Create Product model and routes
5. ✅ Practice CRUD operations
6. ✅ Learn aggregation queries

---

**Need help?**
- MongoDB Docs: https://docs.mongodb.com/
- Mongoose Docs: https://mongoosejs.com/docs/
- Prisma Docs: https://www.prisma.io/docs/
- PostgreSQL Docs: https://www.postgresql.org/docs/

**Happy coding! 🚀**
