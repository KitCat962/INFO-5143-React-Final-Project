import './App.scss'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router'
import Root from './routes/Root'
import Cart from './routes/cart/Cart'
import Order from './routes/cart/order/Order'
import OrderConfirmed from './routes/cart/order-confirmed/OrderConfirmed'
import Product from './routes/products/Product'
import Search from './routes/search/Search'
import Category from './routes/search/category/Category'
import Admin from './routes/admin/Admin/Admin'
import NewProduct from './routes/admin/new-product/NewProduct'
import EditProduct from './routes/admin/edit-product/EditProduct'
import Orders from './routes/admin/orders/Orders'
import ViewOrder from './routes/admin/orders/order/ViewOrder'
import NotFound404 from './routes/404'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import AuthWrapper from './routes/admin/AuthWrapper'

function App() {
  return <BrowserRouter>
    <Routes>
      {/* <Route path='/' element={<><Header /><div className='app-container'><Outlet /></div><Footer /></>}> */}
      <Route path='/' element={<><Header /><Outlet /><Footer /></>}>
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
        <Route path='admin' element={<AuthWrapper/>}>
          <Route index element={<Admin />} />
          <Route path='new-product' element={<NewProduct />} />
          <Route path='edit-product/:productID' element={<EditProduct />} />
          <Route path='orders' >
            <Route index element={<Orders />} />
            <Route path=':orderID' element={<ViewOrder />} />
          </Route>
        </Route>
        <Route path='*' element={<NotFound404 />} />
      </Route>

    </Routes>
  </BrowserRouter>
}

export default App
