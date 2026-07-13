import IconBtn from "./IconBtn"

export default function ConfirmationModal({ modalData }) {
  if (!modalData) return null

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-charcoal/50 backdrop-blur-sm">
      <div className="w-11/12 max-w-md animate-fade-in-up rounded-2xl border border-ink-100 bg-white p-6 shadow-xl">
        <h3 className="font-display text-lg font-semibold text-charcoal">{modalData.text1}</h3>
        <p className="mt-2 text-sm text-charcoal-dim">{modalData.text2}</p>
        <div className="mt-6 flex items-center gap-4">
          <IconBtn text={modalData.btn1Text} onClick={modalData.btn1Handler} customClasses="bg-rose-600 hover:bg-rose-600/90" />
          <IconBtn text={modalData.btn2Text} onClick={modalData.btn2Handler} outline />
        </div>
      </div>
    </div>
  )
}
