interface BubbleProps {
  role: "user" | "system"
  content: string
}

export default function Bubble({ role, content }: BubbleProps) {
  const isUser = role === "user"

  return (
    <div
      className={`max-w-2xl px-6 py-4 rounded-2xl text-sm leading-relaxed shadow-lg transition-all duration-200 ${
        isUser
          ? "self-end bg-[#10A37F] text-white"
          : "self-start bg-[#444654] text-gray-100 border border-gray-600"
      }`}
    >
      {content}
    </div>
  )
}