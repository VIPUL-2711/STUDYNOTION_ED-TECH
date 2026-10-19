import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import RenderCartCourses from "../../components/core/Dashboard/Cart/RenderCartCourses"
import RenderTotalAmount from "../../components/core/Dashboard/Cart/RenderTotalAmount"

export default function Cart() {
  const { cart, totalItems } = useSelector((state) => state.cart)

  return (
    <div className="space-y-6">
      <div className="border-b border-white/5 pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-aurora-cyan">Checkout</span>
        <h1 className="font-display text-2xl font-black text-white sm:text-3xl">My Cart</h1>
        <p className="mt-1 text-xs text-slate-400">{totalItems} course{totalItems !== 1 ? "s" : ""} selected for enrollment</p>
      </div>

      {cart.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-midnight-surface/50 p-12 text-center backdrop-blur-xl">
          <p className="text-slate-400">Your cart is empty.</p>
          <Link to="/catalog" className="aurora-btn mt-6 inline-block rounded-xl px-6 py-2.5 text-xs font-bold text-white">
            Browse Catalog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="glass-card rounded-3xl border border-white/10 p-6 lg:col-span-2">
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
