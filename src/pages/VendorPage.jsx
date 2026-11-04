import { Link, useParams } from 'react-router-dom'
import { useVendors } from '../hooks/useVendors.js'
import MenuList from '../components/MenuList.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { useEffect } from 'react'

function VendorPage() {
  const { id } = useParams()     // /vendor/kafe-ali gives id = 'kafe-ali'
  const { vendors, loading, error, reload } = useVendors()

  // Personal Feature: Persist menu sort choice in localStorage
  const [sortBy, setSortBy] = useLocalStorage('campuseats-sort', 'default')

  const vendor = vendors.find((v) => v.id === id)
  // Connect recent items and cart
  const [, setRecentItems] = useLocalStorage('campuseats-recent', [])

  // Track the first few items from this vendor when the page opens
  useEffect(() => {
    if (vendor?.menu && vendor.menu.length > 0) {
      setRecentItems((prev = []) => {
        // Choose the items to add (e.g. the first items, or specific viewed items)
        const newItems = vendor.menu.slice(0, 2)

        // Strip out ANY previous instances of these items from wherever they sat in history
        const remainingItems = prev.filter(
          (existing) => !newItems.some((n) => n.id === existing.id)
        )

        // Place the newest ones strictly at index 0 (front)
        return [...newItems, ...remainingItems].slice(0, 6)
      })
    }
  }, [id, vendor, setRecentItems]) // Re-run whenever id or vendor changes

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={reload} />

  // 1. Check if vendor exists FIRST
  if (!vendor) {
    return (
      <section className="container">
        <h2 className="section-title">Vendor not found</h2>
        <p className="muted">
          There is no vendor called "{id}". <Link to="/" end>Back to vendors</Link>
        </p>
      </section>
    )
  }

  // 2. Safe to sort vendor.menu here because vendor is guaranteed to exist
  let sortedMenu = vendor.menu ? [...vendor.menu] : []

  // Sort menu items based on saved preference
  if (sortBy === 'price-asc') {
    sortedMenu.sort((a, b) => a.price - b.price)
  } else if (sortBy === 'price-desc') {
    sortedMenu.sort((a, b) => b.price - a.price)
  } else if (sortBy === 'name') {
    sortedMenu.sort((a, b) => a.name.localeCompare(b.name))
  }

  return (
    <section>
      <p><Link to="/">← All vendors</Link></p>
      <h2 className="section-title">{vendor.name}</h2>
      <p className="muted">{vendor.location} · {vendor.openHours}</p>

      {/* Sort Controls */}
      <div style={{ margin: '1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <label htmlFor="menu-sort" style={{ fontWeight: 600, fontSize: '0.9rem' }}>
          Sort by:
        </label>
        <select
          id="menu-sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ padding: '0.4rem 0.6rem', borderRadius: '8px', border: '1px solid #c5cbd3' }}
        >
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name">Name (A–Z)</option>
        </select>
      </div>

      <MenuList items={sortedMenu} isOpen={vendor.isOpen} />
    </section>
  )
}

export default VendorPage