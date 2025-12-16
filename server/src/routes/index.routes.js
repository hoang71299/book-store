const usersRoutes = require('./users.routes')
const categoriesRoutes = require('./category.routes')
const ProductsRoutes = require('./product.routes')
const cartRoutes = require('./cart.routes')
const couponRoutes = require('./coupon.routes')
function routes(app) {
  app.use('/api/user', usersRoutes)
  app.use('/api/category', categoriesRoutes)
  app.use('/api/product', ProductsRoutes)
  app.use('/api/cart', cartRoutes)
  app.use('/api/coupon', couponRoutes)
}

module.exports = routes
