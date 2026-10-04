import { useCart } from '../context/CartContext'

const CartItem = ({ item }) => {
  const { removeFromCart, increaseQty, decreaseQty } = useCart()      // ← เพิ่ม decreaseQty

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} />

      <div className="cart-item-info">
        <h3>{item.name}</h3>
        <p>{item.price} บาท</p>
      </div>

      <div className="qty-control">
        <button onClick={() => decreaseQty(item.id)}>-</button>       {/* ← ใหม่ */}
        <span>{item.quantity}</span>
        <button onClick={() => increaseQty(item.id)}>+</button>
      </div>

      <p className="cart-item-total">{item.price * item.quantity} บาท</p>

      <button onClick={() => removeFromCart(item.id)}>ลบ</button>
    </div>
  )
}

export default CartItem