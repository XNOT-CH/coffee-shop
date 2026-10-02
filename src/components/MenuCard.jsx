const MenuCard = ({ item }) => {
    return (
        <div className="menu-card">
            <img src={item.image} alt={item.name} />
            {item.isRecommended && <span className="badge">แนะนำ</span>}
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            {item.type && <span className="type">{item.type}</span>}
            <p className="price">{item.price} บาท</p>
            <button disabled={!item.isAvailable}>
                {item.isAvailable ? 'ใส่ตะกร้า' : 'หมด'}
            </button>
        </div>
    )
}

export default MenuCard