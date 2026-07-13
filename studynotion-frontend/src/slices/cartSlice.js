import { createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"

const cartFromStorage = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
const totalItems = cartFromStorage.length
const total = cartFromStorage.reduce((acc, item) => acc + Number(item.price || 0), 0)

const initialState = {
  cart: cartFromStorage,
  total: total,
  totalItems: totalItems,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const course = action.payload
      const alreadyIn = state.cart.find((item) => item._id === course._id)
      if (alreadyIn) {
        toast.error("Course already in cart")
        return
      }
      state.cart.push(course)
      state.totalItems++
      state.total += Number(course.price || 0)
      localStorage.setItem("cart", JSON.stringify(state.cart))
      toast.success("Course added to cart")
    },
    removeFromCart(state, action) {
      const courseId = action.payload
      const index = state.cart.findIndex((item) => item._id === courseId)
      if (index >= 0) {
        state.totalItems--
        state.total -= Number(state.cart[index].price || 0)
        state.cart.splice(index, 1)
        localStorage.setItem("cart", JSON.stringify(state.cart))
        toast.success("Course removed from cart")
      }
    },
    resetCart(state) {
      state.cart = []
      state.total = 0
      state.totalItems = 0
      localStorage.removeItem("cart")
    },
  },
})

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions
export default cartSlice.reducer
