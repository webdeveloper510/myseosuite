require('dotenv').config();

module.exports = {
    APP_PORT : process.env.PORT,
    MONGO_URL : process.env.MONGO_URI,
    GEN_SALT : process.env.SALT,
    SECRET_KEY : process.env.SECRET,
    EXPIRES_IN : process.env.EXPIRES,
    STRIPE_KEY : process.env.STRIPE
}