function MenuItemCard({ item, onAdd, onViewItem }) {
    return (
    <article className="card menu-card" onClick={() => onViewItem?.(item)}>
        <div className="thumb" aria-hidden="true">{item.name.charAt(0)}</div>
        <p className="tag">{item.category}</p>
        <h3>{item.name}</h3>
        <p className="muted">{item.description}</p>
        <p className="price">RM {item.price.toFixed(2)}</p>
        <button className="btn" disabled={!item.available} 
            onClick={(e) => {
                e.stopPropagation();     //Prevents firing card click twice
                onAdd(item);
                onViewItem?.(item);     // Viewing/adding marks it as viewed
            }}>
                {item.available ? 'Add to cart' : 'Sold out'}
        </button>
    </article>
    )
}
export default MenuItemCard