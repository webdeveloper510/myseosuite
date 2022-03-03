const { createPlans } = require('../controller/adminController');

module.exports = (app) => {
    app.route('/api/admin/createPlan').post(createPlans);
}