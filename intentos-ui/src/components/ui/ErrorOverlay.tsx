interface ErrorOverlayProps {
  visible: boolean
}

export default function ErrorOverlay({ visible }: ErrorOverlayProps) {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
        visible ? "bg-red-600/25 opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="w-24 h-24 rounded-full bg-red-600 flex items-center justify-center shadow-2xl animate-pulse">
        <span className="text-4xl font-bold text-white">!</span>
      </div>
    </div>
  )
}