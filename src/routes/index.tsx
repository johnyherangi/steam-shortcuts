import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useConfig } from "@/context"
import { createFileRoute } from "@tanstack/react-router"
import { path } from "@tauri-apps/api"
import { invoke } from "@tauri-apps/api/core"
import { open } from "@tauri-apps/plugin-dialog"
import { exists, readDir } from "@tauri-apps/plugin-fs"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { readVdf, VdfMap } from "steam-binary-vdf"

export const Route = createFileRoute("/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <SteamDirForm />
      <UserDataForm />
      <ShortcutsForm />
    </>
  )
}

function SteamDirForm() {
  const methods = useForm()
  const { setSteamDir } = useConfig()
  const [error, setError] = useState("")

  const browseFile = async () => {
    const steamDir = await open({ directory: true })
    methods.setValue("steamDir", steamDir ?? "")
  }

  return (
    <Card className="flex flex-col gap-2 p-4">
      <Form
        {...methods}
        onSubmit={methods.handleSubmit((data) => {
          readDir(data.steamDir)
            .then((dir) => {
              const userData = dir.find((d) => d.isDirectory && d.name === "userdata")
              if (userData) {
                setError("")
                setSteamDir(data.steamDir)
              }
            })
            .catch((error) => setError(String(error)))
        })}
      >
        <div className="flex flex-col gap-2">
          <p>Steam directory</p>
          <div className="flex gap-2">
            <Button variant="outline" type="button" onClick={browseFile}>
              Browse
            </Button>
            <Input
              className="w-full rounded border px-2 py-1"
              {...methods.register("steamDir")}
            ></Input>
          </div>
          {error}
          <Button className="w-fit">Read</Button>
        </div>
      </Form>
    </Card>
  )
}

function UserDataForm() {
  const { steamDir, setUserId } = useConfig()
  const [userIds, setUserIds] = useState<string[]>([])

  useEffect(() => {
    if (steamDir) {
      path.join(steamDir, "userdata").then(async (joined) => {
        if (await exists(joined)) {
          const dir = await readDir(joined)
          setUserIds(dir.filter((v) => v.isDirectory).map((v) => v.name))
        }
      })
    }
  }, [steamDir])

  return (
    <Card className="flex flex-col gap-2 p-4">
      <p>User ID</p>
      <Select disabled={userIds.length === 0} onValueChange={setUserId}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a user" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {userIds.map((userId) => (
            <SelectItem key={userId} value={userId}>
              {userId}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Card>
  )
}

function ShortcutsForm() {
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
        Object.entries(shortcuts.shortcuts).map((entry) => <div>{entry[1]}</div>)}
    </Card>
  )
}

async function loadShortcutsVdf(steamDir: string, userId: string) {
  const shortcutsPath = await path.join(steamDir, "userdata", userId, "config", "shortcuts.vdf")
  if (await exists(shortcutsPath)) {
    alert("test")
    const inBuffer = await invoke("read_file", { path: shortcutsPath })
    const shortcuts = readVdf(Buffer.from([inBuffer]))
    return shortcuts
  }

  return undefined
}
