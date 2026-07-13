import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { buyCourses } from "../../../../services/operations/paymentAPI"

export default function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { paymentLoading } = useSelector((state) => state.course)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleCheckout() {
    dispatch(buyCourses(cart, token, user, navigate))
  }

  return (
    <div className="h-fit rounded-2xl border border-ink-100 bg-white p-6">
      <p className="text-sm text-charcoal-dim">Total</p>
      <p className="mt-1 font-display text-3xl font-bold text-ink-900">₹{total}</p>
      <button
        onClick={handleCheckout}
        disabled={paymentLoading || cart.length === 0}
        className="mt-6 w-full rounded-lg bg-ink-900 py-3 text-sm font-semibold text-white transition hover:bg-ink-800 disabled:opacity-60"
      >
        {paymentLoading ? "Processing..." : "Checkout"}
      </button>
    </div>
  )
}
