import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import VendorCard from './components/VendorCard.jsx'
import MenuList from './components/MenuList.jsx'
import Footer from './components/Footer.jsx'
import CartPage from './components/CartPage.jsx'

function Loading() {
  return (
    <div className="container" role="status">
      Loading menus...
    </div>
  )
}

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="card error" role="alert">
      <p>Could not load menus: {message}</p>
      <button className="btn" onClick={onRetry}>Try again</button>
    </div>
  )
}

function App() {
  const [vendors, setVendors] = useState([])
  const [selectedVendorId, setSelectedVendorId] = useState(null)
  const [cart, setCart] = useState([])
  const [loading , setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)  
  const [view, setView] = useState('menu')  // 'menu', 'cart', or 'done'
  const cartCount = cart.reduce((total, line) => total + line.qty, 0)
  const [lastOrder, setLastOrder] = useState(null)

  //Fetch vendors from mock API
  useEffect(() => {
    const controller = new AbortController()

    fetch('/api/vendors.json', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load vendors (status ${res.status})`)
        }
        return res.json()
      })
      .then((data) => {
        setVendors(data)
        if (data && data.length > 0) {
          setSelectedVendorId(data[0].id)
        }
        setLoading(false)
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        console.error('Fetch error:', err)
        setError(err.message || 'Something went wrong')
        setLoading(false)
      })

    return () => controller.abort()
  }, [reloadKey])  // re-run effect when reloadKey changes

  //Cart Handlers
  function handleAddToCart(menuItem) {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((line) => line.item.id === menuItem.id)

      if (existingIndex > -1) {
        // Item already in cart: increment its qty
        return prevCart.map((line, idx) =>
          idx === existingIndex ? { ...line, qty: line.qty + 1 } : line
        )
      }

      // New item: add as a new line object
      return [...prevCart, { item: menuItem, qty: 1 }]
    })
  }

  function handleRetry() {
    setLoading(true)
    setError(null)
    setReloadKey((prevKey) => prevKey + 1)  // increment reloadKey to trigger re-fetch
  }

  function handleRemove(itemId) {
    setCart((prevCart) => prevCart.filter((line) => line.item.id !== itemId))
  }

  function handleChangeQty(itemId, delta) {
    setCart((prevCart) =>
      prevCart
        .map((line) => {
          if (line.item.id === itemId) {
            return { ...line, qty: line.qty + delta }
          }
          return line
        })
        .filter((line) => line.qty > 0)
    )
  }

  function handlePlaceOrder(details) {
    const total = cart.reduce((sum, line) => sum + (line.item.price * line.qty), 0)

    const pickupDate = new Date(Date.now() + 30 * 60 * 1000) // 30 minutes from now
    const pickupTime = pickupDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    setLastOrder({ ...details, total: total.toFixed(2), pickupTime })
    setCart([])
    setView('done')
  }

  //Find active vendor
  const selectedVendor = vendors.find((vendor) => vendor.id === selectedVendorId)

  //Determine what main content to display based on view and status
  let content
  if (loading) {
    content = <Loading />
  } else if (error) {
    content = <ErrorMessage message={error} onRetry={handleRetry} />
  }
  else if (view === 'cart') {
    content = (
        <CartPage cart={cart} onChangeQty={handleChangeQty}
                  onRemove={handleRemove} onPlaceOrder={handlePlaceOrder} />
    )
  } else if (view === 'done') {
    content = (
      <div className="card order-done" style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Order Confirmed!</h2>
        <p>Thank you for your order.</p>
        <p><strong>Total Paid:</strong> RM {lastOrder?.total}</p>
        <p><strong>Estimated Pickup Time:</strong> {lastOrder?.pickupTime}</p>
        <button 
          className="btn" 
          style={{ marginTop: '1rem' }} 
          onClick={() => setView('menu')}
        >
          Back to Menu
        </button>
      </div>
    )
  } else {
    content = (
      <>
        <section>
          <h2 className="section-title">Vendors</h2>
          <div className="vendor-grid">
            {vendors.map(vendor => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                isSelected={vendor.id === selectedVendorId}
                onSelect={setSelectedVendorId}
              />
            ))}
          </div>
        </section>

        {selectedVendorId && (
          <section>
            <h2 className="section-title">Menu: {selectedVendor.name}</h2>
            <MenuList items={selectedVendor.menu} onAdd={handleAddToCart} />
          </section>
        )}
      </>
    )
  }
 
  return (
    <>
      <Header cartCount={cartCount}
              onShowMenu={() => setView('menu')} onShowCart={() => setView('cart')} />
      <main className="container">
        {content}
      </main>
      <Footer />
    </>
  )
}

export default App