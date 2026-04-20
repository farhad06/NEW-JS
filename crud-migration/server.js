import 'dotenv/config';
import app from './src/app.js';
import sequelize from './src/config/dbConnect.js';
const PORT = process.env.DB_PORT || 8000;


try {
    await sequelize.authenticate();
    console.log('✅ MySQL connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
} catch (err) {
    console.error('❌ DB connection failed:', err.message);
    process.exit(1);
}
