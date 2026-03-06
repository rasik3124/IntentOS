export interface Message {
  id: string
  role: "user" | "system"
  content: string
}

export interface ActionLog {
  id: string
  content: string
  timestamp: string
}

export interface ErrorLog {
  id: string
  content: string
  timestamp: string
}