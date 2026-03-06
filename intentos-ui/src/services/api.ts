const BASE_URL = "http://127.0.0.1:8000"

export async function detectIntent(message: string) {
  const res = await fetch(`${BASE_URL}/intent`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  })

  if (!res.ok) throw new Error("Intent API failed")

  return res.json()
}

export async function executeIntent(intent: string, parameters: any) {
  const res = await fetch(`${BASE_URL}/execute`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ intent, parameters })
  })

  if (!res.ok) throw new Error("Execution API failed")

  return res.json()
}