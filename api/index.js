const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

// Configuration
const config = require('./config');

// الاتصال بقاعدة البيانات
const connectDB = require('../config/database');

// Routes
const apartmentRoutes = require('../routes/apartments');
const authRoutes = require('../routes/auth');
const projectRoutes = require('../routes/project');
const mediaRoutes = require('../routes/media');
const adminRoutes = require('../routes/admin');
const inquiryRoutes = require('../routes/inquiries');
const publicRoutes = require('../routes/public');
const projectInfoRoutes = require('../routes/projectInfo');
const usersRoutes = require('../routes/users');
const settingsRoutes = require('../routes/settings');
const locationFeaturesRoutes = require('../routes/locationFeatures');

const app = express();

// الاتصال بقاعدة البيانات
connectDB();

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Disable caching for development to prevent 304 issues
app.use((req, res, next) => {
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  });
  next();
});

// Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: {
    success: false,
    message: 'تم تجاوز الحد الأقصى للطلبات، يرجى المحاولة لاحقاً'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Rate limiting خاص لـ login (أكثر تساهلاً للتطوير)
const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 دقائق
  max: config.rateLimit.loginMax,
  message: {
    success: false,
    message: 'تم تجاوز الحد الأقصى لمحاولات تسجيل الدخول، يرجى المحاولة لاحقاً'
  },
  skipSuccessfulRequests: true
});

app.use('/api/auth/login', loginLimiter);
app.use('/api/', limiter);

// CORS - يسمح بجميع المسارات والنقاط
app.use(cors(config.cors));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression
app.use(compression());

// Logging
if (config.server.nodeEnv === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'الخادم يعمل بشكل طبيعي',
    timestamp: new Date().toISOString(),
    environment: config.server.nodeEnv,
    platform: 'Vercel'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/apartments', apartmentRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/project-info', projectInfoRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/location-features', locationFeaturesRoutes);

// Public API Routes (بدون prefix إضافي)
app.use('/api', publicRoutes);

// Default route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'مرحباً بك في API لوحة تحكم مشروع 24 - حي الزهراء',
    version: '1.0.0',
    documentation: '/api/docs'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'المسار غير موجود'
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);

  // Multer errors
  if (error.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'حجم الملف كبير جداً'
    });
  }

  // Mongoose validation errors
  if (error.name === 'ValidationError') {
    const errors = Object.values(error.errors).map(err => err.message);
    return res.status(400).json({
      success: false,
      message: 'بيانات غير صحيحة',
      errors
    });
  }

  // Mongoose duplicate key error
  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern)[0];
    return res.status(400).json({
      success: false,
      message: `${field} موجود مسبقاً`
    });
  }

  // JWT errors
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'التوكن غير صالح'
    });
  }

  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'التوكن منتهي الصلاحية'
    });
  }

  // Default error
  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'خطأ في الخادم',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

// Export for Vercel
module.exports = app;
