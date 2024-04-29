require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet'); // Included for production security enhancements
const morgan = require('morgan');
const compression = require('compression');


const app = express();
const port = process.env.PORT || 3000;

// CORS Configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
  credentials: true,
};
app.use(cors(corsOptions));


app.use(helmet());
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(morgan(process.env.NODE_ENV !== 'production' ? 'dev' : 'combined'));

// Routes configuration
const userRoutes = require('./routes/UserRoutes');
const introSectionRoutes = require('./routes/IntroSectionRoutes');
const productsRoutes = require('./routes/productsRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const furnitureRoutes = require('./routes/furnitureRoutes');
app.use('/api/users', userRoutes);
app.use('/api/introSection', introSectionRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api', furnitureRoutes);


// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
