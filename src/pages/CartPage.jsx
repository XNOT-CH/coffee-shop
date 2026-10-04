import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import CartItem from '../components/CartItem'

const CartPage = () => {
  const { cart } = useCart()

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
    </div>
  )
}

export default CartPage