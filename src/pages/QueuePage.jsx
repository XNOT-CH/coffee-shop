import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import supabase from '../supabaseClient'

// แปลงสถานะภาษาอังกฤษในฐานข้อมูล เป็นภาษาไทยไว้แสดงผล
const statusLabel = {
  pending: 'รอทำ',
  preparing: 'กำลังทำ',
  done: 'เสร็จแล้ว',
  cancelled: 'ยกเลิกแล้ว',
}

const QueuePage = () => {
  // อ่านเลขออเดอร์จาก URL เช่น /queue/5 → id = '5'
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  // หน้าขึ้นแล้ว → ไปดึงออเดอร์จาก Supabase (ทำใหม่เมื่อ id เปลี่ยน)
  useEffect(() => {
    const fetchOrder = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.log('ดึงออเดอร์ไม่สำเร็จ:', error)
      } else {
        setOrder(data)
      }

      setLoading(false)
    }

    fetchOrder()
  }, [id])

  // กำลังรอข้อมูล
  if (loading) {
    return <p>กำลังโหลด...</p>
  }

  // หาออเดอร์ไม่เจอ
  if (!order) {
    return (
      <div>
        <h2>ไม่พบออเดอร์นี้</h2>
        <Link to="/">กลับไปหน้าเมนู</Link>
      </div>
    )
  }

  // เลขคิว เช่น id 5 → A005
  const queueNumber = `A${String(order.id).padStart(3, '0')}`

  return (
    <div className="queue-page">
      <p>เลขคิวของคุณ</p>
      <h2 className="queue-number">{queueNumber}</h2>
      <p>คุณ {order.customer_name || 'ลูกค้า'}</p>
      <p className="queue-status">สถานะ: {statusLabel[order.status]}</p>

      {/* รายการที่สั่ง (ดึงจาก items ในฐานข้อมูล) */}
      <div className="queue-items">
        <h3>รายการที่สั่ง</h3>
        {order.items.map((item) => (
          <p key={item.id}>
            {item.name} × {item.quantity} — {item.price * item.quantity} บาท
          </p>
        ))}
        <p className="queue-total">ยอดรวม {order.total} บาท</p>
      </div>

      <Link to="/">สั่งเพิ่ม</Link>
    </div>
  )
}

export default QueuePage