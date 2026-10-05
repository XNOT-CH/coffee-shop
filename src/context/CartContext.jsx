import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  // เพิ่มของลงตะกร้า (เจอของซ้ำ → บวกจำนวน, ไม่เจอ → เพิ่มใหม่)
  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id)

      if (existing) {
        return prev.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        )
      }

      return [...prev, { ...item, quantity: 1 }]
    })
  }

  // ลบทั้งรายการ
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((c) => c.id !== id))
  }

  // จำนวน +1
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((c) => (c.id === id ? { ...c, quantity: c.quantity + 1 } : c))
    )
  }

  // จำนวน -1 (เหลือ 0 → ลบออก)
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, quantity: c.quantity - 1 } : c))
        .filter((c) => c.quantity > 0)
    )
  }

  // ล้างตะกร้า (หลังสั่งสำเร็จ)
  const clearCart = () => {
    setCart([])
  }

  // นับจำนวนชิ้น / รวมเงิน
  const totalItems = cart.reduce((sum, c) => sum + c.quantity, 0)
  const totalPrice = cart.reduce((sum, c) => sum + c.price * c.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)