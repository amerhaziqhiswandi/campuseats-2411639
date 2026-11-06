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

## Week 4
- Tool(s):
    - Debugging Component Props (VendorPage.jsx):
        ~ Shared VendorPage.jsx code to resolve a menu rendering/blank screen runtime issue (diagnosing the menu={vendor.menu} vs items prop mismatch).
    - CSS Link Styling:
        ~ Ask for assistance on how to remove a blue hyperlink effect on the font and logo.
    - Implementing Personal Feature:
        ~ Shared personal feature requirement screenshot to inquire on how to solve the task given
    - React Compiler / Memoization Warning:
        ~ Shared a compiler message: "Compilation Skipped: Existing memoization could not be preserved..." regarding useMemo dependency arrays.
    - Debugging 404 Blank Screen:
        ~ Troubleshooting why typing an invalid URL like /vendor/test produced a white screen instead of the not-found message
    - UI Visibility Debugging (RecentlyViewed):
        ~ Diagnosing why the recently viewed shelf stopped rendering on the homepage
    - Runtime Error in RecentlyViewed:
        ~ Shared console error: "Uncaught TypeError: Cannot read properties of undefined (reading 'length') at RecentlyViewed.jsx:4".
    - Component State Management (RecentlyViewed.jsx):
        ~ Fix prop defaulting and resolve why it wasn't displaying on HomePage after the crash was fixed.
    - ESLint & Hook Dependencies in VendorPage.jsx:
        ~ Shared linter warnings: 'setRecentItems' is not defined and unnecessary dependency: 'setRecentItems'.
        ~ Shared TypeScript/ESLint warning: 'recentItems' is declared but its value is never read in VendorPage.jsx.
    - Recently Viewed Order & Interaction Logic:
        ~ Ensuring re-viewed/re-clicked items jump to index 0
        ~ Resolving why clicking "Add" inside the recently viewed strip failed to re-order the items
    - Closed Shop error:
        ~ Add a feature where when a shop is closed, the add to cart button will be greyed out and blocked from being able to be added to cart.
