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
    <div className="glass-card h-fit rounded-3xl border border-white/10 p-6">
      <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Total Amount</p>
      <p className="mt-2 font-display text-3xl font-black text-white">₹{total}</p>
      <button
        onClick={handleCheckout}
        disabled={paymentLoading || cart.length === 0}
        className="aurora-btn mt-6 w-full rounded-xl py-3.5 text-sm font-bold text-white transition disabled:opacity-50"
      >
        {paymentLoading ? "Processing..." : "Complete Purchase"}
      </button>
    </div>
  )
}
