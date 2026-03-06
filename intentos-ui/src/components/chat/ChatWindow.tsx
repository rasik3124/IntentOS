import Bubble from "./Bubble"
import LoadingDots from "../ui/LoadingDots"

export default function ChatWindow() {
  return (
    <div className="flex-1 overflow-y-auto px-20 py-16 space-y-10 scroll-smooth">

      <Bubble role="user" content="Open Explorer" />
      <Bubble role="system" content="Explorer opened successfully." />

      {/* Loading example */}
      <div className="self-start bg-[#444654] px-5 py-3 rounded-2xl border border-gray-600 w-fit shadow-md">
        <LoadingDots />
      </div>

    </div>
  )
}