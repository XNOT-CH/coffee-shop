import menu from '../data/menu'
import MenuCard from '../components/MenuCard'

const MenuPage = () => {
  return (
    <div>
      <h2>เมนู</h2>
      <div className="menu-list">
        {menu.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default MenuPage