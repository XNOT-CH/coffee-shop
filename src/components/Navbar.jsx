import { Link } from "react-router-dom";
import { useCart } from '../context/CartContext'    
const Navbar = () => {
  const { totalItems } = useCart()  
  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <img src="/src/assets/หมีชิบิหมวกคาเฟ่รีสอร์ต.png" alt="logo" className="logo" />
        <div>
          <h1 className="shop-name">ร้าน</h1>
          <p className="shop-tagline">คำอธิบายร้าน</p>
        </div>
      </Link>

      <nav className="nav-links">
        <Link to="/">เมนู</Link>
        <Link to="/cart">ตะกร้า ({totalItems})</Link>  
        <Link to="/staff">พนักงาน</Link>
      </nav>
    </header>
  );
};

export default Navbar;
