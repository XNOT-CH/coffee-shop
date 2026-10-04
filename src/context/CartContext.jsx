// ==========================================================
// CartContext = "ตะกร้ากลาง" ของทั้งเว็บ
// ทุกหน้า (MenuPage, CartPage, Navbar) ใช้ตะกร้าใบเดียวกันผ่านไฟล์นี้
//
// วิธีใช้ในไฟล์อื่น:
//   import { useCart } from '../context/CartContext'
//   const { cart, addToCart, totalItems } = useCart()
// ==========================================================

import { createContext, useContext, useState } from 'react'

// 1) สร้าง "กล่องกลาง" เปล่า ๆ 1 ใบ
const CartContext = createContext()

// 2) CartProvider = คนถือกล่อง
//    ครอบไว้ที่ main.jsx → ทุกหน้าใน App หยิบของในกล่องได้
//    children = ทุกอย่างที่อยู่ข้างใน (ก็คือ App)
export const CartProvider = ({ children }) => {
    // 3) ตะกร้า: เริ่มต้นเป็น array ว่าง []
    //    ของแต่ละชิ้น = ข้อมูลเมนู + quantity (จำนวน)
    //    เช่น { id: 1, name: 'ลาเต้เย็น', price: 55, ..., quantity: 2 }
    const [cart, setCart] = useState([])

    // 4) เพิ่มเมนูลงตะกร้า (เรียกใช้ตอนกดปุ่ม "ใส่ตะกร้า" ใน MenuCard)
    const addToCart = (item) => {
        // ใช้ prev = ตะกร้าล่าสุด กดรัว ๆ แล้วจำนวนไม่หาย
        setCart((prev) => {
            // หาว่าในตะกร้ามีเมนูนี้อยู่แล้วไหม
            const existing = prev.find((c) => c.id === item.id)

            // มีแล้ว → บวกจำนวนเพิ่ม 1 (ชิ้นอื่นเหมือนเดิม)
            if (existing) {
                return prev.map((c) =>
                    c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
                )
            }


            const removeFromCart = (id) => {
                setCart((prev) => prev.filter((c) => c.id !== id))
            }


            const increaseQty = (id) => {
                setCart((prev) =>
                    prev.map((c) => (c.id === id ? { ...c, quantity: c.quantity + 1 } : c))
                )
            }



            const decreaseQty = (id) => {
                setCart((prev) =>
                    prev
                        .map((c) => (c.id === id ? { ...c, quantity: c.quantity - 1 } : c))
                        .filter((c) => c.quantity > 0)
                )
            }

            // ยังไม่มี → เพิ่มเป็นรายการใหม่ จำนวน 1
            // ใช้ ... สร้างตะกร้าใบใหม่ (ห้ามใช้ push แก้ของเดิม หน้าจอจะไม่อัปเดต)
            return [...prev, { ...item, quantity: 1 }]
        })
    }

    // 5) นับจำนวนชิ้นทั้งหมดในตะกร้า (ใช้โชว์ใน Navbar)
    //    ไล่บวก quantity ทุกรายการ เช่น ลาเต้ 3 + ชาไทย 1 = 4
    //    ไม่ต้องเป็น state เพราะคำนวณใหม่เองทุกครั้งที่ตะกร้าเปลี่ยน
    const totalItems = cart.reduce((sum, c) => sum + c.quantity, 0)

    // 6) ใส่ของลงกล่อง → ไฟล์อื่นหยิบไปใช้ได้ผ่าน useCart()
    return (
        <CartContext.Provider value={{ cart, addToCart, totalItems }}>
            {children}
        </CartContext.Provider>
    )
}

// 7) useCart = ทางลัดเปิดกล่อง
//    ไฟล์ไหนอยากใช้ตะกร้า เรียก useCart() แล้วหยิบของที่ต้องการออกมา
export const useCart = () => useContext(CartContext)