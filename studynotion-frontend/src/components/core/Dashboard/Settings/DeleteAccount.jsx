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
    <div className="mt-6 flex items-start gap-4 rounded-2xl border border-rose-200 bg-rose-50 p-6">
      <FiTrash2 className="mt-1 shrink-0 text-xl text-rose-600" />
      <div className="flex-1">
        <h2 className="font-display text-lg font-semibold text-rose-700">Delete account</h2>
        <p className="mt-1 text-sm text-rose-700/80">
          This permanently deletes your account and profile. This action can't be undone.
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
          className="mt-4 rounded-lg bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700"
        >
          Delete my account
        </button>
      </div>
      <ConfirmationModal modalData={confirmationModal} />
    </div>
  )
}
