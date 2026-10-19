import IconBtn from "./IconBtn"

export default function ConfirmationModal({ modalData }) {
  if (!modalData) return null

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
      <div className="w-full max-w-md animate-fade-in-up rounded-2xl border border-white/10 bg-midnight-surface/95 p-6 shadow-2xl shadow-indigo-950/80 backdrop-blur-2xl">
        <h3 className="font-display text-lg font-bold text-white">{modalData.text1}</h3>
        <p className="mt-2 text-sm text-slate-400 leading-relaxed">{modalData.text2}</p>
        <div className="mt-6 flex items-center gap-4">
          <IconBtn text={modalData.btn1Text} onClick={modalData.btn1Handler} customClasses="bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-950/50" />
          <IconBtn text={modalData.btn2Text} onClick={modalData.btn2Handler} outline />
        </div>
      </div>
    </div>
  )
}
