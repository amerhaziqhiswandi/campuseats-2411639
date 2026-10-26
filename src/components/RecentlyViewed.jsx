
//Personal Feature: Recently viewed items
function RecentlyViewed({ items, onClear, onAdd }) {
  if (items.length === 0) return null

  return (
    <section className="recently-viewed" style={{ marginTop: '2rem', padding: '1rem', borderTop: '1px solid #ddd' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 className="section-title">Recently Viewed Items</h3>
        <button type="button" className="btn link danger" onClick={onClear}>
          Clear
        </button>
      </div>

      <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', padding: '0.5rem 0' }}>
        {items.map((item) => (
          <div 
            key={item.id} 
            className="card" 
            style={{ minWidth: '180px', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '8px' }}
          >
            <p style={{ fontWeight: 'bold', margin: '0 0 0.25rem 0' }}>{item.name}</p>
            <p className="muted" style={{ margin: '0 0 0.5rem 0' }}>RM {item.price.toFixed(2)}</p>
            <button 
              type="button" 
              className="btn btn-sm" 
              onClick={() => onAdd(item)}
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
export default RecentlyViewed