const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

// Load environment variables
dotenv.config();

// Swagger setup
const swaggerDocument = YAML.load('./swagger/swagger.yaml');

// Express app setup
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('✅ API root is working on Render!');
});

// Routes
const itemRoutes = require('./routes/items');
const categoryRoutes = require('./routes/categories'); // 👈 new route

app.use('/api/items', itemRoutes);
app.use('/api/categories', categoryRoutes); // 👈 use it
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(port, () => {
      console.log(`✅ Server is live on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });