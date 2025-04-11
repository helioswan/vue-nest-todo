const CorsOptions = {
  origin: [process.env.CORS_ORIGIN],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true,
  maxAge: 86400,
};

export default CorsOptions;
