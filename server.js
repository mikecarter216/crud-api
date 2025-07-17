require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();
const port = process.env.PORT || 3000;

// 🔐 Load Passport config BEFORE routes
require('./config/passport');

// 📦 Middleware
app.use(cors());
app.use(express.json());

// 🗝️ Session (OAuth)
app.use(session({
  secret: 'someSecretValue', // 🔁 Replace in production
  resave: false,
  saveUninitialized: false,
}));

// 🛂 Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// 📚 Swagger setup
const swaggerDocument = YAML.load('./swagger/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 🛣️ Routes
const itemRoutes = require('./routes/items');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protectedRoutes');

app.use('/api/items', itemRoutes);
app.use('/auth', authRoutes);
app.use('/', protectedRoutes);

// 🔎 Test route
app.get('/', (req, res) => {
  res.send('✅ API root is working with OAuth!');
});

// 📡 MongoDB connect and start server
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});
