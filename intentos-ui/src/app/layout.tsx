import TopBar from "../components/system/TopBar"
import CommandSystem from "../components/system/CommandSystem"
import PerformancePanel from "../components/system/PerformancePanel"
import ChatPanel from "../components/chat/ChatPanel"
import LogPanel from "../components/log/LogPanel"
import { useState } from "react"
import type { Message, ActionLog, ErrorLog } from "../types"
import ErrorOverlay from "../components/ui/ErrorOverlay"
import { detectIntent, executeIntent } from "../services/api"

export default function Layout() {
  const [messages, setMessages] = useState<Message[]>([])
  const [actionLogs, setActionLogs] = useState<ActionLog[]>([])
  const [errorLogs, setErrorLogs] = useState<ErrorLog[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorOverlay, setErrorOverlay] = useState(false)
  const triggerError = (message: string) => {
    const id = Date.now().toString()

    setErrorOverlay(true)

    setErrorLogs((prev) => [
      ...prev,
      {
        id,
        content: message,
        timestamp: new Date().toLocaleTimeString()
      }
    ])

    // Auto hide red overlay after 1.2 sec
    setTimeout(() => {
      setErrorOverlay(false)
    }, 1200)
  }
  const handleCommand = async (input: string) => {
    const userId = Date.now().toString()

    // 1️⃣ Add user message
    setMessages((prev) => [
      ...prev,
      { id: userId, role: "user", content: input }
    ])

    setIsProcessing(true)

    try {
      // 2️⃣ Detect intent using service
      const intentData = await detectIntent(input)

      const systemId = (Date.now() + 1).toString()

      // 3️⃣ Always show assistant reply
      setMessages((prev) => [
        ...prev,
        {
          id: systemId,
          role: "system",
          content: intentData.reply
        }
      ])

      // 4️⃣ Execute only if action
      if (intentData.mode === "action" && intentData.intent) {

        const execData = await executeIntent(
          intentData.intent,
          intentData.parameters
        )

        if (execData.status === "success") {
          setActionLogs((prev) => [
            ...prev,
            {
              id: systemId,
              content: `Executed → ${intentData.intent}`,
              timestamp: new Date().toLocaleTimeString()
            }
          ])
        } else {
          triggerError(execData.message)
        }
      }

    } catch (error) {
      triggerError("System pipeline failed")
    } finally {
      setIsProcessing(false)
    }
  }
  return (
    <div className="h-screen w-screen bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: "url('/bg.jpg')" }}>

      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <TopBar />

      <div className="absolute top-24 left-8">
        <CommandSystem />
      </div>

      <div className="absolute top-80 left-8">
        <PerformancePanel />
      </div>

      <ChatPanel
        messages={messages}
        isProcessing={isProcessing}
        onSend={handleCommand}
      />

      <LogPanel
        actionLogs={actionLogs}
        errorLogs={errorLogs}
      />

      <ErrorOverlay visible={errorOverlay} />

    </div>
  )
}