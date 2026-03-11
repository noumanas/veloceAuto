require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const vehicleRoutes = require('./routes/vehicles');
const leadRoutes = require('./routes/leads');
const aiRoutes = require('./routes/ai');
const inquiryRoutes = require('./routes/inquiries');

const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./config/swagger');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

app.use(cors());
app.use(express.json());

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/inquiries', inquiryRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
