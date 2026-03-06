export default function TopBar() {
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#2d2d2d]/80 backdrop-blur-lg border border-gray-600 rounded-2xl px-8 py-3 flex gap-6 shadow-xl">

      {["API", "Settings", "Monitor", "Voice", "Logs"].map((item) => (
        <button
          key={item}
          className="text-gray-300 hover:text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all"
        >
          {item}
        </button>
      ))}

    </div>
  )
}