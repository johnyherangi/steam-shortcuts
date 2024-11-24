import React, { useContext, useState } from "react"

export type Config = { steamDir?: "" }

export const configContext = React.createContext({
  steamDir: "",
  setSteamDir: (_steamDir: string) => {},
  userId: "",
  setUserId: (_userId: string) => {},
})

export function ConfigProvider({ children }: React.PropsWithChildren) {
  const [steamDir, setSteamDir] = useState("")
  const [userId, setUserId] = useState("")
  return (
    <configContext.Provider value={{ steamDir, setSteamDir, userId, setUserId }}>
      {children}
    </configContext.Provider>
  )
}

export function useConfig() {
  return useContext(configContext)
}
