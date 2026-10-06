import { Link } from "react-router-dom";
import { useCart } from '../context/CartContext'
const Navbar = () => {
  const { totalItems , lastOrderId } = useCart()
  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <img src="/images/หมีชิบิหมวกคาเฟ่รีสอร์ต.png" alt="logo" className="logo" />
        <div>
          <h1 className="shop-name">Gachi Café</h1>
          <p className="shop-tagline">กาแฟที่อร่อยต้องที่นี่</p>
        </div>
      </Link>

      <nav className="nav-links">
        <Link to="/">เมนู</Link>
        <Link to="/cart">ตะกร้า ({totalItems})</Link>
        <Link to="/staff">พนักงาน</Link>

        {/* ← เพิ่ม: ป้ายเลขคิวล่าสุด (โชว์เฉพาะตอนเคยสั่งแล้ว) */}
        {lastOrderId && (
          <Link to={`/queue/${lastOrderId}`} className="queue-badge">
            คิว A{String(lastOrderId).padStart(3, '0')}
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;