import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useConfig } from "@/context"
import { createRootRoute, Outlet, useNavigate } from "@tanstack/react-router"
import { open } from "@tauri-apps/plugin-dialog"
import { readDir } from "@tauri-apps/plugin-fs"
import { useState } from "react"
import { useForm } from "react-hook-form"

export const Route = createRootRoute({
  component: SteamDirForm,
})

function SteamDirForm() {
  const methods = useForm()
  const navigate = useNavigate()
  const { setSteamDir } = useConfig()
  const [error, setError] = useState("")

  const browseFile = async () => {
    const steamDir = await open({ directory: true })
    methods.setValue("steamDir", steamDir ?? "")
  }

  return (
    <div className="flex flex-col gap-2 p-2">
      <Card className="flex flex-col gap-2 p-4">
        <p>Steam directory</p>
        <div className="flex gap-2">
          <Button variant="outline" type="button" onClick={browseFile}>
            Browse
          </Button>
          <Input
            className="w-full rounded border px-2 py-1"
            {...methods.register("steamDir")}
            onChange={(e) => {
              readDir(e.target.value)
                .then((dir) => {
                  const userData = dir.find((d) => d.isDirectory && d.name === "userdata")
                  if (userData) {
                    setError("")
                    setSteamDir(e.target.value)
                    navigate({ to: "/userdata" })
                  }
                })
                .catch((error) => setError(String(error)))
            }}
          ></Input>
        </div>
        {error}
      </Card>
      <Outlet />
    </div>
  )
}
