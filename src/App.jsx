import menu from './data/menu'
import MenuCard from './components/MenuCard'

const App = () => {
  return (
    <div>
      <h1>เมนู</h1>
      <div className="menu-list">
        {menu.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default App