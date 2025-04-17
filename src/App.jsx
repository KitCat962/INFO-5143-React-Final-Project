import styles from './App.module.scss'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import Root from './routes/Root'
import Cart from './routes/cart/Cart'
import Order from './routes/cart/order/Order'
import OrderConfirmed from './routes/cart/order-confirmed/OrderConfirmed'
import Product from './routes/products/Product'
import Search from './routes/search/Search'
import Category from './routes/search/category/Category'
import Admin from './routes/admin/Admin'
import AdminNewProduct from './routes/admin/products/new/NewProduct'
import AdminEditProduct from './routes/admin/products/edit/EditProduct'
import AdminOrders from './routes/admin/orders/Orders'
import AdminViewOrder from './routes/admin/orders/order/ViewOrder'
import NotFound404 from './routes/404'
import AdminProducts from './routes/admin/products/Products'
import HeaderFooter from './routes/HeaderFooter'

function App() {
  return <BrowserRouter>
    <Routes>
      {/* <Route path='/' element={<><Header /><div className = {styles.app-container}><Outlet /></div><Footer /></>}> */}
      <Route path='/' element={<HeaderFooter />}>
        <Route index element={<Root />} />
        <Route path='cart' >
          <Route index element={<Cart />} />
          <Route path='order' element={<Order />} />
          <Route path='order-confirmed' element={<OrderConfirmed />} />
        </Route>
        <Route path='products/:productID' element={<Product />} />
        <Route path='search'>
          <Route index element={<Search />} />
          <Route path=':category' element={<Category />} />
        </Route>
        <Route path='admin' element={<Admin />}>
          <Route path='products'>
            <Route index element={<AdminProducts />} />
            <Route path='new' element={<AdminNewProduct />} />
            <Route path='edit/:productID' element={<AdminEditProduct />} />
          </Route>
          <Route path='orders' >
            <Route index element={<AdminOrders />} />
            <Route path=':orderID' element={<AdminViewOrder />} />
          </Route>
          <Route path='*' element={<Navigate to='/admin' />} />
        </Route>
        <Route path='*' element={<NotFound404 />} />
      </Route>

    </Routes>
  </BrowserRouter>
}

export default App
