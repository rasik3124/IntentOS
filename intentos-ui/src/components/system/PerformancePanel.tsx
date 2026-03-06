export default function PerformancePanel() {
  return (
    <div className="w-64 bg-[#2d2d2d]/90 backdrop-blur-lg border border-gray-600 rounded-2xl p-6 shadow-xl text-gray-300">

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white font-semibold">Performance</h2>
        <span>✕</span>
      </div>

      <div className="space-y-3 text-sm">
        <p>CPU 8%</p>
        <p>GPU 3%</p>
        <p>VRAM 13%</p>
        <p>RAM 60%</p>
      </div>

      <div className="mt-4 bg-gray-800 rounded-xl h-24 flex items-center justify-center text-xs">
        Graph Area
      </div>

    </div>
  )
}