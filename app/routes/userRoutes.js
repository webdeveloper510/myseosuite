const { register, login } = require('../controller/authController');
const { deleteAccount, updateUser } = require('../controller/userController');
const { userPlans, stripe } = require('../controller/userController');
const { verifyToken } = require('../middlewares/AuthMiddleware');

module.exports = (app) => {
   /**
    * @swagger
    *  paths:
    *   /api/auth/register:
    *    post:
    *     description: register new users
    *     requestBody:
    *      content:
    *       application/json:
    *        schema:
    *         properties:
    *          name:
    *           type: string
    *          email: 
    *           type: string
    *          password:
    *           type: string
    *     responses:
    *      201:
    *       description: User registered successfully
    *      400:
    *       description: Please provide all fields
    *      409:
    *       description: Email already exists
    *      500:
    *       description: Internal server error
    */
    app.route('/api/auth/register').post(register);
     /**
    * @swagger
    *  paths:
    *   /api/auth/login:
    *    post:
    *     description: user login
    *     requestBody:
    *      content:
    *       application/json:
    *        schema:
    *         properties:
    *          email: 
    *           type: string
    *          password:
    *           type: string
    *     responses:
    *      201:
    *       description: User Successfully logged In
    *      400:
    *       description: Please provide all the fields
    *      401:
    *       description: Invalid Credentials
    *      500:
    *       description: Internal Server Error
    *      
    */
    app.route('/api/auth/login').post(login);
    /**
    * @swagger
    *  paths:
    *   /api/user/updateUser:
    *    post:
    *     description: user login
    *     requestBody:
    *      content:
    *       application/json:
    *        schema:
    *         properties:
    *          name:
    *           type: string
    *          email:
    *           type: string
    *          password:
    *           type: string
    *          newPassword: 
    *           type: string
    *     responses:
    *      400:
    *       description: Please fill the required fields
    *      200:
    *       description: Name Updated, Email Updated, password updated
    *      401:
    *       description: Invalid Credentials
    *      500:
    *       description: Internal Server Error
    */
    app.route('/api/user/updateUser').patch(verifyToken, updateUser);
    /**
    * @swagger
    *  paths:
    *   /api/user/deleteUserAccount:
    *    post:
    *     description: delete Account
    *     requestBody:
    *      content:
    *       application/json:
    *        schema:
    *         properties:
    *     responses:
    *      200:
    *       description: Account Deleted Successfully
    *      400:
    *       description: User does not exist
    *      500:
    *       description: Internal Server error
    *          
    */
    app.route('/api/user/deleteUserAccount').delete(verifyToken, deleteAccount);
    /**
    * @swagger
    *  paths:
    *   /api/user/change-plan:
    *    put:
    *     description: change subscription plans
    *      requestBody:
    *       content:
    *        application/json:
    *      responses:
    *       409:
    *        description: You already have this plan, please choose other plans
    *       200:
    *        description: Plan Created
    *       500:
    *        description: Internal server error
    */
    app.route('/api/user/change-plan').put(verifyToken, userPlans);
    /**
    * @swagger
    *  paths:
    *   /api/stripe:
    *    post:
    *     description: stripe payment
    */
   app.route('/api/payment/stripe').post(verifyToken, stripe);
}