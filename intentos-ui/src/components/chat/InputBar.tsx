export default function InputBar() {
  return (
    <div className="h-24 bg-[#202123] flex items-center px-20 gap-6 border-t border-gray-700 shadow-inner">

      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="Type your command..."
          className="w-full bg-[#40414F] text-white px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-[#10A37F] transition-all"
        />
      </div>

      <button className="bg-[#10A37F] px-8 py-4 rounded-2xl text-white font-medium hover:scale-105 hover:shadow-lg transition-all duration-200">
        Send
      </button>

    </div>
  )
}