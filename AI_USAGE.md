# AI usage log

Using AI never costs marks; a vague or missing log does.
Add a new section every week, before you tag. Did not use AI? Write "None" under Tool(s).

## Week 1
- Tool(s): None

## Week 2
- Tool(s): None

## Week 3
- Tool(s):
    - Javascript to JSON Migration :
        ~ Converted hardcoded JavaScript vendor and menu data (vendors.js) into compliant JSON syntax for public/api/vendors.json

    - Ask how to manage selectedVendorID:
        ~ Updated App.jsx to manage selectedVendorId, derive selectedVendor safely, and resolve rendering errors before data is loaded.

    - Implementing AbortController and Error/Loading States:
        ~ Integrated native browser AbortController into useEffect with cleanup via controller.abort()
        ~ Handled AbortError suppression in the catch block.
        ~ Resolved the React Compiler/strict lint error ("Calling setState synchronously within an effect can trigger cascading renders")

    - Cart Component & State Handlers:
        ~ Built the parent state handlers in App.jsx: handleRemove, handleChangeQty, and handleAddToCart.
        ~ Implemented handlePlaceOrder to calculate total prices using .reduce(), generate estimated pickup times, mahallah must be selected, reset the cart, show errors, and toggle order completion views.
        ~ Resolved double-rendering and undefined property crashes.

    - Recently Viewed Feature:
        ~ Created state and handler logic to track viewed menu items with deduplication, newest-first ordering, a 5-item cap, and a clear button.
        ~ Built and placed the RecentlyViewed component directly above the footer.
