import { useEffect, useState } from 'react'
import supabase from '../supabaseClient'

// แปลงสถานะภาษาอังกฤษในฐานข้อมูล เป็นภาษาไทยไว้แสดงผล
const statusLabel = {
  pending: 'รอทำ',
  preparing: 'กำลังทำ',
  done: 'เสร็จแล้ว',
  cancelled: 'ยกเลิกแล้ว',
}

const StaffPage = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  // เปิดหน้า → ดึงออเดอร์ทั้งหมด เรียงจากเก่าไปใหม่ (ใครสั่งก่อนอยู่บน)
  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: true })

      if (error) {
        console.log('ดึงออเดอร์ไม่สำเร็จ:', error)
      } else {
        setOrders(data)
      }

      setLoading(false)
    }

    fetchOrders()
  }, [])

  // เปลี่ยนสถานะออเดอร์ใน Supabase แล้วอัปเดตหน้าจอ
  const updateStatus = async (id, newStatus) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', id) // สำคัญ! ถ้าไม่มี จะเปลี่ยนทุกออเดอร์

    if (error) {
      console.log('เปลี่ยนสถานะไม่สำเร็จ:', error)
      alert('เปลี่ยนสถานะไม่สำเร็จ')
      return
    }

    // แก้ข้อมูลในหน้าจอให้ตรงกับฐานข้อมูล (ท่าเดียวกับ increaseQty ในตะกร้า)
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    )
  }

  if (loading) {
    return <p>กำลังโหลด...</p>
  }

  if (orders.length === 0) {
    return (
      <div>
        <h2>ออเดอร์ทั้งหมด</h2>
        <p>ยังไม่มีออเดอร์</p>
      </div>
    )
  }

  return (
    <div className="staff-page">
      <h2>ออเดอร์ทั้งหมด ({orders.length})</h2>

      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <h3>
            A{String(order.id).padStart(3, '0')} · {order.customer_name || 'ลูกค้า'}
          </h3>
          <p className="order-status">สถานะ: {statusLabel[order.status]}</p>

          {order.items.map((item) => (
            <p key={item.id}>{item.name} × {item.quantity}</p>
          ))}

          <p className="order-total">ยอดรวม {order.total} บาท</p>

          {/* โชว์ปุ่มเฉพาะขั้นถัดไป: รอทำ → กำลังทำ → เสร็จแล้ว */}
          {order.status === 'pending' && (
            <button onClick={() => updateStatus(order.id, 'preparing')}>เริ่มทำ</button>
          )}

          {order.status === 'preparing' && (
            <button onClick={() => updateStatus(order.id, 'done')}>ทำเสร็จแล้ว</button>
          )}
        </div>
      ))}
    </div>
  )
}

export default StaffPage