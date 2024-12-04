import { Card } from "@/components/ui/card"
import { useConfig } from "@/context"
import { path } from "@tauri-apps/api"
import { invoke } from "@tauri-apps/api/core"
import { useEffect, useState } from "react"
import { readVdf, VdfMap } from "steam-binary-vdf"

export function ShortcutsForm() {
  const { steamDir, userId } = useConfig()

  const [shortcuts, setShortcuts] = useState<VdfMap>()
  useEffect(() => {
    if (steamDir && userId) {
      loadShortcutsVdf(steamDir, userId).then(setShortcuts)
    }
  }, [steamDir, userId])

  return (
    <Card className="flex flex-col gap-2 p-4">
      <p>Shortcuts</p>
      {shortcuts?.shortcuts &&
        Object.entries(shortcuts.shortcuts).map((entry) => <div>{entry[1].AppName}</div>)}
    </Card>
  )
}

async function loadShortcutsVdf(steamDir: string, userId: string) {
  const shortcutsPath = await path.join(steamDir, "userdata", userId, "config", "shortcuts.vdf")
  try {
    const result: ArrayBuffer = await invoke("read_file", { path: shortcutsPath })

    const shortcuts = readVdf(Buffer.from(result))
    return shortcuts
  } catch (error) {
    alert(String(error))
    return undefined
  }
}
