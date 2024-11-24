import React, { useContext, useState } from "react"

export type Config = { steamDir?: "" }

export const configContext = React.createContext({
  steamDir: "",
  setSteamDir: (_steamDir: string) => {},
})

export function ConfigProvider({ children }: React.PropsWithChildren) {
  const [steamDir, setSteamDir] = useState("")
  return (
    <configContext.Provider value={{ steamDir, setSteamDir }}>{children}</configContext.Provider>
  )
}

export function useConfig() {
  return useContext(configContext)
}
