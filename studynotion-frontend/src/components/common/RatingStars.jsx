import { FaStar, FaRegStar } from "react-icons/fa"

export default function RatingStars({ rating = 0, onChange, size = "text-sm" }) {
  const stars = [1, 2, 3, 4, 5]
  const interactive = typeof onChange === "function"

  return (
    <div className={`flex items-center gap-1 ${size}`}>
      {stars.map((star) =>
        star <= Math.round(rating) ? (
          <FaStar
            key={star}
            className={`text-amber-500 ${interactive ? "cursor-pointer" : ""}`}
            onClick={() => interactive && onChange(star)}
          />
        ) : (
          <FaRegStar
            key={star}
            className={`text-amber-500 ${interactive ? "cursor-pointer" : ""}`}
            onClick={() => interactive && onChange(star)}
          />
        )
      )}
    </div>
  )
}
