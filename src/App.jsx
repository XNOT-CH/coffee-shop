import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import MenuPage from './pages/MenuPage'
import CartPage from './pages/CartPage'
import QueuePage from './pages/QueuePage'
import StaffPage from './pages/StaffPage'
import LoginPage from './pages/LoginPage'          // ← เพิ่มที่ import ด้านบน

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/queue/:id" element={<QueuePage />} />
          <Route path="/staff" element={<StaffPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App