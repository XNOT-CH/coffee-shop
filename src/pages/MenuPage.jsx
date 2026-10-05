import { useState } from 'react'
import menu from '../data/menu'
import MenuCard from '../components/MenuCard'
import BannerSlider from '../components/BannerSlider'
const categories = ['ทั้งหมด', 'กาแฟ', 'ชาและนม', 'ขนม']
  

// ค่า เริ่มต้น ของปุ่ม
const MenuPage = () => {
  // JS

  // ให้เว็บจำว่ากดปุ่มไหน
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด')



  const filteredMenu =
    selectedCategory === 'ทั้งหมด'
      ? menu
      : menu.filter((item) => item.category === selectedCategory)


  // JSX
  return (
    <div>
      <BannerSlider />
      <h2>เมนู</h2>


      <div className='category'>

        {/* วนลูปรายชื่อหมวด ['ทั้งหมด', 'กาแฟ', 'ชาและนม', 'ขนม'] ทีละตัว รอบไหนเจอชื่อไหน ชื่อนั้นจะอยู่ในตัวแปร category */}
        {categories.map((category) => (
          // แต่ละรอบสร้างปุ่ม 1 ปุ่ม รวม 4 รอบได้ 4 ปุ่ม
          <button
            key={category}
            // ป้ายชื่อประจำปุ่ม ให้ React แยกออกว่าปุ่มไหนเป็นปุ่มไหน (ผู้ใช้มองไม่เห็น)
            // ใช่ → ได้ class category-btn active (จะถูกแต่งให้เด่น)
            // ไม่ใช่ → ได้แค่ category-btn
            className={selectedCategory === category ? 'category-btn active' : 'category-btn'}


            onClick={() => setSelectedCategory(category)}
          >

            {/* category มีค่า	ปุ่มขึ้นคำว่า
      1	'ทั้งหมด'	ทั้งหมด
      2	'กาแฟ'	กาแฟ
      3	'ชาและนม'	ชาและนม
      4	'ขนม' */}
            {category}
          </button>
        ))}
      </div>


      {/* เมนูสินค้า  */}
      <div className="menu-list">
        {filteredMenu.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}


export default MenuPage