import { useMemo } from 'react'
import { useCart } from '../hooks/useCart.js'
import { useVendors } from '../hooks/useVendors.js'
import { Loading, ErrorMessage } from '../components/Status.jsx'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import VendorCard from '../components/VendorCard.jsx'
import RecentlyViewed from '../components/RecentlyViewed.jsx'


function HomePage() {
    const { vendors, loading, error, reload } = useVendors()
    const [vendorSort, setVendorSort] = useLocalStorage('campuseats-vendor-sort', 'default')
    const [recentItems, setRecentItems] = useLocalStorage('campuseats-recent', [])
    const { addToCart } = useCart()

    // Handler that adds to cart AND moves the item to the front of recentItems
    const handleAddFromRecent = (item) => {
      addToCart(item)
      setRecentItems((prev = []) => {
      const remaining = prev.filter((i) => i.id !== item.id)
      return [item, ...remaining].slice(0, 6)
    })
  }

    const sortedVendors = useMemo(() => {
        const list = [...vendors]
        if (vendorSort === 'name') {
            return list.sort((a, b) => a.name.localeCompare(b.name))
        }
        if (vendorSort === 'open') {
            return list.sort((a, b) => (b.isOpen ? 1 : 0) - (a.isOpen ? 1 : 0))
        }
        return list
    }, [vendors, vendorSort])

    if (loading) return <Loading />
    if (error) return <ErrorMessage message={error} onRetry={reload} />
 
    return (
    <section>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="section-title">Choose a vendor</h2>
        <select
          value={vendorSort}
          onChange={(e) => setVendorSort(e.target.value)}
          style={{ padding: '0.4rem 0.6rem', borderRadius: '8px', border: '1px solid #c5cbd3' }}
        >
          <option value="default">Default</option>
          <option value="name">Name (A–Z)</option>
          <option value="open">Open first</option>
        </select>
      </div>

      <div className="vendor-grid">
        {sortedVendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
      <RecentlyViewed 
        items={recentItems} 
        onClear={() => setRecentItems([])} 
        onAdd={handleAddFromRecent} 
      />
    </section>
  )
}
export default HomePage