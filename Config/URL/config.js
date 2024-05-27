require('dotenv').config();

const config = {
    appVersion: process.env.PROJECT_APP_VERSION,
    backendUrl: process.env.NODE_ENV === 'production' ? process.env.PROD_BACKEND_URL : process.env.DEV_BACKEND_URL
};

module.exports = config;
