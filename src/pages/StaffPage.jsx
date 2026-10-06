import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom' // ← เพิ่ม
import supabase from '../supabaseClient'
import staffEmails from '../data/staff' // ← เพิ่มใหม่: รายชื่ออีเมลพนักงาน

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
  const [notStaff, setNotStaff] = useState(false) // ← เพิ่มใหม่: ล็อกอินแล้วแต่ไม่ใช่พนักงาน
  const navigate = useNavigate() // ← เพิ่ม: ตัวพาเปลี่ยนหน้า

  // เปิดหน้า → ดึงออเดอร์ทั้งหมด เรียงจากเก่าไปใหม่ (ใครสั่งก่อนอยู่บน)
  useEffect(() => {
    const fetchOrders = async () => {
      // ← เพิ่ม: เช็กก่อนว่าล็อกอินหรือยัง ถ้ายัง → เด้งไปหน้าล็อกอิน
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        navigate('/login')
        return
      }

      // ← เพิ่มใหม่: อีเมลไม่อยู่ในรายชื่อพนักงาน → ไม่ให้ดูออเดอร์
      if (!staffEmails.includes(session.user.email)) {
        setNotStaff(true)
        setLoading(false)
        return
      }

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

  // ← เพิ่ม: ออกจากระบบ แล้วกลับไปหน้าล็อกอิน
  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  if (loading) {
    return <p>กำลังโหลด...</p>
  }

  // ← เพิ่มใหม่: ล็อกอินแล้ว แต่ไม่ใช่พนักงาน
  if (notStaff) {
    return (
      <div className="no-access">
        <h2>คุณไม่มีสิทธิ์เข้าถึงหน้าพนักงาน</h2>
        <p>บัญชีนี้ไม่ได้อยู่ในรายชื่อพนักงาน</p>
        <button onClick={handleLogout}>ออกจากระบบ</button>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div>
        <h2>ออเดอร์ทั้งหมด</h2>
        <p>ยังไม่มีออเดอร์</p>
        <button onClick={handleLogout}>ออกจากระบบ</button> {/* ← เพิ่ม */}
      </div>
    )
  }

  return (
    <div className="staff-page">
      <h2>ออเดอร์ทั้งหมด ({orders.length})</h2>
      <button onClick={handleLogout}>ออกจากระบบ</button> {/* ← เพิ่ม */}

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