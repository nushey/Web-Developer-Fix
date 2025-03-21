require('dotenv').config({ path: './config.env' });


const app = require('./app');
const connectDatabase = require('./config/database');
const cloudinary = require('cloudinary');
const winston = require('winston');

const PORT = process.env.PORT || 4000;

// UncaughtException Error
process.on('uncaughtException', (err) => {
	console.log(`Error: ${err.message}`);
	process.exit(1);
});

// Verificación de que dotenv está funcionando
console.log(`JWT Secret (from .env): ${process.env.REACT_APP_JWT_SECRET}`); // ✅ Debería mostrar la clave secreta

// Logger de Winston
const logger = winston.createLogger({
	level: 'info',
	format: winston.format.simple(),
	transports: [new winston.transports.Console()],
});

logger.info('Logger initialized successfully.');

const server = app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

// Unhandled Promise Rejection
process.on('unhandledRejection', (err) => {
	console.log(`Error: ${err.message}`);
	server.close(() => {
		process.exit(1);
	});
});
