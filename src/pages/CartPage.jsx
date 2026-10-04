import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import CartItem from '../components/CartItem'

const CartPage = () => {
  const { cart, totalPrice } = useCart()
  const [customerName, setCustomerName] = useState('')

  if (cart.length === 0) {
    return (
      <div>
        <h2>ตะกร้าของฉัน</h2>
        <p>ตะกร้ายังว่างอยู่</p>
        <Link to="/">ไปเลือกเมนู</Link>
      </div>
    )
  }

  return (
    <div>
      <h2>ตะกร้าของฉัน</h2>

      <div className="cart-list">
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="cart-summary">
        <label>
          ชื่อเล่น (ไว้เรียกตอนเครื่องดื่มเสร็จ)
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="เช่น ส้มโอ"
          />
        </label>

        <p className="cart-total">ยอดรวม {totalPrice} บาท</p>

        <button className="confirm-btn">ยืนยันสั่งเลย</button>
      </div>
    </div>
  )
}

export default CartPage