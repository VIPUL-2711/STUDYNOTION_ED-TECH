import RatingStars from "../../common/RatingStars"

export default function ReviewCard({ review }) {
  return (
    <div className="min-w-[300px] max-w-[300px] rounded-xl border border-ink-100 bg-white p-5">
      <div className="flex items-center gap-3">
        <img
          src={
            review.user?.image ||
            `https://api.dicebear.com/10.x/initials/svg?seed=${review.user?.firstName}`
          }
          alt={review.user?.firstName}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-medium text-charcoal">
            {review.user?.firstName} {review.user?.lastName}
          </p>
          <RatingStars rating={review.rating} />
        </div>
      </div>
      <p className="mt-3 line-clamp-4 text-sm text-charcoal-dim">{review.review}</p>
    </div>
  )
}
