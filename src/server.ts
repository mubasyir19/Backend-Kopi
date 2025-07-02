import app from './app';
import { logger } from './utils/logger';

const PORT = process.env.PORT || 50000;

const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  logger.info(`Environment ${process.env.NODE_ENV}`);
  logger.info(`API BASE URL: http://localhost:${PORT}/api/v1`);
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  server.close(() => {
    logger.info('Process terminated');
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT received');
  server.close(() => {
    logger.info('Process terminated');
  });
});

export default server;
