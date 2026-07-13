import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import RenderCartCourses from "../../components/core/Dashboard/Cart/RenderCartCourses"
import RenderTotalAmount from "../../components/core/Dashboard/Cart/RenderTotalAmount"

export default function Cart() {
  const { cart, totalItems } = useSelector((state) => state.cart)

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-charcoal">My Cart</h1>
      <p className="mt-1 text-sm text-charcoal-dim">{totalItems} course{totalItems !== 1 ? "s" : ""} in cart</p>

      {cart.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-ink-100 bg-white p-10 text-center">
          <p className="text-charcoal-dim">Your cart is empty.</p>
          <Link to="/catalog" className="mt-4 inline-block text-sm font-medium text-ink-900 hover:underline">
            Browse the catalog
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="rounded-2xl border border-ink-100 bg-white p-6 lg:col-span-2">
            {cart.map((course) => (
              <RenderCartCourses key={course._id} course={course} />
            ))}
          </div>
          <RenderTotalAmount />
        </div>
      )}
    </div>
  )
}
