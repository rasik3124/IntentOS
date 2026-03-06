export default function CommandSystem() {
  return (
    <div className="w-64 bg-[#2d2d2d]/90 backdrop-blur-lg border border-gray-600 rounded-2xl p-6 shadow-xl">

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white font-semibold">Command System</h2>
        <span className="text-gray-400 cursor-pointer">✕</span>
      </div>

      <div className="flex gap-4 mb-6">
        {["⏻", "🎤", "🖥"].map((icon, i) => (
          <button
            key={i}
            className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-xl flex items-center justify-center text-lg transition"
          >
            {icon}
          </button>
        ))}
      </div>

      <div className="border-t border-gray-600 mt-4" />

    </div>
  )
}