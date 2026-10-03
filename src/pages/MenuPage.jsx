import { useState } from 'react'
import menu from '../data/menu'
import MenuCard from '../components/MenuCard'
import BannerSlider from '../components/BannerSlider'
const categories = ['ทั้งหมด', 'กาแฟ', 'ชาและนม', 'ขนม']

const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด')

  const filteredMenu =                                        // ← ใหม่
    selectedCategory === 'ทั้งหมด'
      ? menu
      : menu.filter((item) => item.category === selectedCategory)

  return (
    <div>
      <h2>เมนู</h2>
      <BannerSlider />
      {/* ← ลบบรรทัด <p>เลือกอยู่: ...</p> ออกแล้ว */}

      <div className="category-list">
        {categories.map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? 'category-btn active' : 'category-btn'}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="menu-list">
        {filteredMenu.map((item) => (                          // ← เปลี่ยนจาก menu
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default MenuPage