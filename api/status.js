// Status endpoint for monitoring
module.exports = (req, res) => {
  const status = {
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
    platform: 'Vercel',
    version: '1.0.0',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    endpoints: {
      health: '/health',
      api: '/api',
      project: '/api/project-info',
      auth: '/api/auth',
      apartments: '/api/apartments'
    }
  };

  res.json(status);
};
