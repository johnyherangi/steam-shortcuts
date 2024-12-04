import { readDir } from "@/api"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useConfig } from "@/context"
import { open } from "@tauri-apps/plugin-dialog"
import { useState } from "react"
import { useForm } from "react-hook-form"

export function SteamDirForm() {
  const methods = useForm()
  const { steamDir, setSteamDir } = useConfig()
  const [error, setError] = useState("")

  const browseFile = async () => {
    const steamDir = await open({ directory: true })
    methods.setValue("steamDir", steamDir ?? "")
  }

  console.log("steamDir", steamDir)

  return (
    <Card className="flex flex-col gap-2 p-4">
      <Form
        {...methods}
        onSubmit={methods.handleSubmit((data) => {
          readDir(data.steamDir)
            .then((dir) => {
              const userData = dir.find((d) => d.is_dir && d.name === "userdata")
              if (userData) {
                setError("")
                setSteamDir(data.steamDir)
              }
            })
            .catch((error) => setError(String(error)))
        })}
      >
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <Button variant="outline" type="button" onClick={browseFile}>
              Browse
            </Button>
            <Input
              className="w-full rounded border px-2 py-1"
              {...methods.register("steamDir")}
              placeholder={"path to steam..."}
            ></Input>
            <Button className="w-fit">Read</Button>
          </div>
          {error}
        </div>
      </Form>
    </Card>
  )
}
