import type { Message, ActionLog, ErrorLog } from "../types/index"

export interface AppState {
  messages: Message[]
  actionLogs: ActionLog[]
  errorLogs: ErrorLog[]
  isProcessing: boolean
  errorOverlay: boolean
}