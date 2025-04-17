import styles from './App.module.scss'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import Root from './routes/Root'
import Cart from './routes/cart/Cart'
import Product from './routes/products/Product'
import Search from './routes/search/Search'
import Admin from './routes/admin/Admin'
import AdminNewProduct from './routes/admin/products/new/NewProduct'
import AdminEditProduct from './routes/admin/products/edit/EditProduct'
import AdminOrders from './routes/admin/orders/Orders'
import AdminViewOrder from './routes/admin/orders/order/ViewOrder'
import NotFound404 from './routes/404'
import AdminProducts from './routes/admin/products/Products'
import HeaderFooter from './routes/HeaderFooter'
import Checkout from './routes/cart/checkout/Checkout'

function App() {
  return <BrowserRouter>
    <Routes>
      {/* <Route path='/' element={<><Header /><div className = {styles.app-container}><Outlet /></div><Footer /></>}> */}
      <Route path='/' element={<HeaderFooter />}>
        <Route index element={<Root />} />
        <Route path='cart' >
          <Route index element={<Cart />} />
          <Route path='checkout' element={<Checkout />} />
        </Route>
        <Route path='products/:productID' element={<Product />} />
        <Route path='search' element={<Search />} />
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
