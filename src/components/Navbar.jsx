import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <img src="/src/assets/หมีชิบิหมวกคาเฟ่รีสอร์ต.png" alt="logo" className="logo" />
        <div>
          <h1 className="shop-name">ชื่อร้าน</h1>
          <p className="shop-tagline">บรรยายร้าน</p>
        </div>
      </Link>

      <nav className="nav-links">
        <Link to="/">เมนู</Link>
        <Link to="/cart">ตะกร้า</Link>
        <Link to="/staff">พนักงาน</Link>
      </nav>
    </header>
  );
};

export default Navbar;
