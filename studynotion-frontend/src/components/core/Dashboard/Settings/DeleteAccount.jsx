import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FiTrash2 } from "react-icons/fi"
import { deleteAccount } from "../../../../services/operations/settingsAPI"
import ConfirmationModal from "../../../common/ConfirmationModal"

export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [confirmationModal, setConfirmationModal] = useState(null)

  return (
    <div className="flex items-start gap-4 rounded-3xl border border-rose-500/25 bg-rose-950/20 p-7 backdrop-blur-xl">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-400">
        <FiTrash2 className="text-lg" />
      </div>
      <div className="flex-1">
        <h2 className="font-display text-lg font-bold text-rose-300">Delete Account Permanently</h2>
        <p className="mt-1 text-sm text-rose-200/70 leading-relaxed">
          Once you delete your account, all course enrollments, lecture progress, personal profiles, and certificates will be irrevocably deleted.
        </p>
        <button
          onClick={() =>
            setConfirmationModal({
              text1: "Delete your account?",
              text2: "All your data will be permanently removed. This cannot be undone.",
              btn1Text: "Delete",
              btn2Text: "Cancel",
              btn1Handler: () => {
                dispatch(deleteAccount(token, navigate))
                setConfirmationModal(null)
              },
              btn2Handler: () => setConfirmationModal(null),
            })
          }
          className="mt-4 rounded-xl bg-rose-600 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-rose-500 shadow-lg shadow-rose-950/50"
        >
          Delete my account
        </button>
      </div>
      <ConfirmationModal modalData={confirmationModal} />
    </div>
  )
}
