function MenuItemCard({ item, onAdd, onViewItem, disabled = false }) {
    // Disabled if the store itself is closed OR if the dish is sold out
    const isButtonDisabled = disabled || !item.available

    // Determine button label text
    const buttonLabel = disabled
    ? 'Closed'
    : !item.available
    ? 'Sold out'
    : 'Add to cart'

    return (
    <article className="card menu-card" onClick={() => onViewItem?.(item)}>
        <div className="thumb" aria-hidden="true">{item.name.charAt(0)}</div>
        <p className="tag">{item.category}</p>
        <h3>{item.name}</h3>
        <p className="muted">{item.description}</p>
        <p className="price">RM {item.price.toFixed(2)}</p>
        <button 
            type="button"
            className="btn" 
            disabled={isButtonDisabled} 
            onClick={(e) => {
                e.stopPropagation() // Prevents firing card click twice
                if (isButtonDisabled) return
                onAdd(item)
                onViewItem?.(item) // Viewing/adding marks it as viewed
            }}
        >
            {buttonLabel}
        </button>
    </article>
    )
}
export default MenuItemCard