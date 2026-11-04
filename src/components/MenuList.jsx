import MenuItemCard from './MenuItemCard.jsx'
import { useCart } from '../hooks/useCart.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

function MenuList({ items = [],  isOpen = true }) {
  const { addToCart } = useCart()
  const [, setRecentItems] = useLocalStorage('campuseats-recent', [])

  const handleAddItem = (item) => {
    if (!isOpen) return // Safety guard

    // 1. Add to cart
    addToCart(item)
    // 2. Move item to the very front of recently viewed
    setRecentItems((prev = []) => {
      const remaining = prev.filter((i) => i.id !== item.id)
      return [item, ...remaining].slice(0, 6)
    })
  }

  if (items.length === 0) return <p className="muted">No items on this menu yet.</p>

  return (
    <div className="grid">
      {items.map((item) => (
        <MenuItemCard 
          key={item.id} 
          item={item} 
          onAdd={handleAddItem} 
          disabled={!isOpen} 
        />
      ))}
    </div>
  )
}

export default MenuList