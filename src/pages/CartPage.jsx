// เชื่อมต่อกับ Supabase 
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import CartItem from '../components/CartItem'
import supabase from '../supabaseClient'

const CartPage = () => {
  const { cart, totalPrice, clearCart } = useCart()   // ← เพิ่ม clearCart
  const [customerName, setCustomerName] = useState('')
  const navigate = useNavigate()                      // ← เพิ่มบรรทัดนี้

  // ส่งตะกร้าเข้า Supabase
  const handleConfirm = async () => {
    const items = cart.map((c) => ({
      id: c.id,
      name: c.name,
      price: c.price,
      quantity: c.quantity,
    }))

    const { data, error } = await supabase
      .from('orders')
      .insert({
        items, // items: items,
        total: totalPrice,
        customer_name: customerName,
      })
      .select()
      .single()

    if (error) {
      console.log('สั่งไม่สำเร็จ:', error)
      alert('สั่งไม่สำเร็จ ลองใหม่อีกครั้ง')
      return
    }

    // สั่งสำเร็จ → ล้างตะกร้า แล้วพาไปหน้าเลขคิวของออเดอร์นี้
    clearCart()
    navigate(`/queue/${data.id}`)
  }

  // ตะกร้าว่าง → แสดงข้อความแล้วจบเลย
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

        {/* กดแล้วส่งตะกร้าเข้า Supabase */}
        <button className="confirm-btn" onClick={handleConfirm}>ยืนยันสั่งเลย</button>
      </div>
    </div>
  )
}

export default CartPage