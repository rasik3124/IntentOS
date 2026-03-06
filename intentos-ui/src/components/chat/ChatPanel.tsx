import { useState, useRef, useEffect } from "react"
import type { Message } from "../../types"

interface Props {
  messages: Message[]
  isProcessing: boolean
  onSend: (input: string) => void
}

export default function ChatPanel({
  messages,
  isProcessing,
  onSend
}: Props) {

  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  // 🔥 Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isProcessing])

  return (
    <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#2d2d2d]/90 backdrop-blur-lg border border-gray-600 rounded-3xl shadow-2xl flex flex-col">

      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-600">
        <h2 className="text-white font-semibold">Chat Panel</h2>
        <span className="text-gray-400 cursor-pointer">✕</span>
      </div>

      {/* Messages */}
      <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 bg-gradient-to-br from-purple-800 to-blue-800 scroll-smooth">

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`px-5 py-3 rounded-2xl w-fit max-w-[80%] ${
              msg.role === "user"
                ? "self-end bg-white/20 text-white"
                : "self-start bg-white/10 text-white"
            }`}
          >
            {msg.content}
          </div>
        ))}

        {isProcessing && (
          <div className="self-start text-gray-300 text-sm animate-pulse">
            Processing...
          </div>
        )}

        {/* 🔥 Invisible anchor */}
        <div ref={messagesEndRef} />

      </div>

      {/* Input */}
      <div className="p-6 border-t border-gray-600 flex gap-4 bg-[#2d2d2d] rounded-b-3xl">
        <button className="bg-gray-700 p-3 rounded-xl">📎</button>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && input.trim()) {
              onSend(input.trim())
              setInput("")
            }
          }}
          placeholder="Type your command..."
          className="flex-1 bg-gray-700 text-white px-4 py-3 rounded-xl outline-none"
        />
      </div>

    </div>
  )
}