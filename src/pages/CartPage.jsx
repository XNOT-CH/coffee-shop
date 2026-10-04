import { useCart } from '../context/CartContext'

const CartPage = () => {
  const { cart } = useCart()

  return (
    <div>
      <h2>หน้าตะกร้า</h2>
      <p>ในตะกร้ามี {cart.length} รายการ</p>
      {cart.map((c) => (
        <p key={c.id}>{c.name} × {c.quantity}</p>
      ))}
    </div>
  )
}

export default CartPage