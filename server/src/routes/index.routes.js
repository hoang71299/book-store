const usersRoutes = require('./users.routes');
const categoriesRoutes = require('./category.routes');
function routes(app) {
    app.use('/api/user', usersRoutes);
    app.use('/api/category', categoriesRoutes);
}

module.exports = routes;
