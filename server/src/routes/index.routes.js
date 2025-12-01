const usersRoutes = require('./users.routes');
const categoriesRoutes = require('./category.routes');
const ProductsRoutes = require('./product.routes');
function routes(app) {
    app.use('/api/user', usersRoutes);
    app.use('/api/category', categoriesRoutes);
    app.use('/api/product', ProductsRoutes);
}

module.exports = routes;
