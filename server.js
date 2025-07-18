require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();
app.set('trust proxy', 1); // ✅ Trust Render proxy for HTTPS cookies
const port = process.env.PORT || 3000;

// Load Passport
require('./config/passport');

// Middleware
app.use(cors({
  origin: 'https://crud-api-jdvk.onrender.com',
  credentials: true
}));
app.use(express.json());

// Session
app.use(session({
  secret: process.env.SESSION_SECRET || 'someSecretValue',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,       // 🟢 MUST be true on Render (HTTPS)
    sameSite: 'none'    // 🟢 To allow cookies across origins
  }
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Swagger
const swaggerDocument = YAML.load('./swagger/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
const itemRoutes = require('./routes/items');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protectedRoutes');

app.use('/api/items', itemRoutes);
app.use('/auth', authRoutes);
app.use('/', protectedRoutes);

// Test root
app.get('/', (req, res) => {
  res.send('✅ API root is working with OAuth!');
});

// DB Connect
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