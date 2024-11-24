import { Card } from "@/components/ui/card"
import { useConfig } from "@/context"
import { createFileRoute } from "@tanstack/react-router"
import { readFile } from "@tauri-apps/plugin-fs"
import { useEffect, useState } from "react"
import { readVdf, VdfMap } from "steam-binary-vdf"

export const Route = createFileRoute("/_steamdir/userdata/$userId")({
  component: RouteComponent,
})

function RouteComponent() {
  const { steamDir, userId } = useConfig()

  const [shortcuts, setShortcuts] = useState<VdfMap>()
  useEffect(() => {
    loadShortcutsVdf(steamDir, userId).then(setShortcuts)
  }, [steamDir, userId])

  return (
    <Card className="flex flex-col gap-2 p-4">
      {shortcuts?.shortcuts &&
        Object.entries(shortcuts.shortcuts).map((entry) => <div>{entry[1]}</div>)}
    </Card>
  )
}

async function loadShortcutsVdf(steamDir: string, userId: string) {
  // const userDataPath = await path.join(steamDir, "userdata", userId, "config")
  // const dir = await readDir(userDataPath)
  // if (!dir.find((d) => d.isFile && d.name === "shortcuts.vdf")) {
  //   console.error("Failed to find shortcuts.vdf")
  //   return
  // }

  // read the vdf
  // const filePath = await path.join(userDataPath, userId, "shortcuts.vdf")

  try {
    const inBuffer = await readFile(
      "C:\\Program Files (x86)\\Steam\\userdata\\99784327\\config\\shortcuts.vdf",
    )
    const shortcuts = readVdf(Buffer.from(inBuffer))
    return shortcuts
  } catch (e) {
    console.log(e)
    return undefined
  }
}
