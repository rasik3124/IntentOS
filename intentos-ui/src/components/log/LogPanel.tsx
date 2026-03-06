import { useState } from "react"
import type { ActionLog, ErrorLog } from "../../types"

interface Props {
  actionLogs: ActionLog[]
  errorLogs: ErrorLog[]
}

export default function LogPanel({
  actionLogs,
  errorLogs
}: Props) {

  const [activeTab, setActiveTab] = useState<"active" | "error">("active")

  return (
    <div className="absolute top-24 right-8 w-72 h-[500px] bg-[#2d2d2d]/90 backdrop-blur-lg border border-gray-600 rounded-2xl shadow-xl flex flex-col">

      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-600">
        <h2 className="text-white font-semibold">Log Panel</h2>
        <span className="text-gray-400 cursor-pointer">✕</span>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-4">
        <button
          onClick={() => setActiveTab("active")}
          className={`flex-1 py-2 rounded-lg transition ${
            activeTab === "active"
              ? "bg-gray-700 text-white"
              : "bg-gray-800 text-gray-400"
          }`}
        >
          Active Log
        </button>

        <button
          onClick={() => setActiveTab("error")}
          className={`flex-1 py-2 rounded-lg transition ${
            activeTab === "error"
              ? "bg-red-600 text-white"
              : "bg-gray-800 text-gray-400"
          }`}
        >
          Error Log
        </button>
      </div>

      {/* Logs */}
      <div className="flex-1 p-4 bg-black/80 rounded-b-2xl text-sm overflow-y-auto">

        {activeTab === "active" && (
          actionLogs.length > 0 ? (
            actionLogs.map((log) => (
              <div key={log.id} className="mb-2 text-green-400">
                [{log.timestamp}] {log.content}
              </div>
            ))
          ) : (
            <div className="text-gray-500">No actions yet.</div>
          )
        )}

        {activeTab === "error" && (
          errorLogs.length > 0 ? (
            errorLogs.map((log) => (
              <div key={log.id} className="mb-2 text-red-400">
                [{log.timestamp}] {log.content}
              </div>
            ))
          ) : (
            <div className="text-gray-500">No errors.</div>
          )
        )}

      </div>

    </div>
  )
}