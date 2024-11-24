import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useConfig } from "@/context"
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router"
import { open } from "@tauri-apps/plugin-dialog"
import { useForm } from "react-hook-form"

export const Route = createFileRoute("/steam")({
  component: Steam,
})

function Steam() {
  const methods = useForm()
  const navigate = useNavigate()
  const { setSteamDir } = useConfig()

  const browseFile = async () => {
    const steamDir = await open({ directory: true })
    methods.setValue("steamDir", steamDir ?? "")
  }

  return (
    <div className="flex flex-col gap-2 p-2">
      <Form
        {...methods}
        onSubmit={methods.handleSubmit((data) => {
          setSteamDir(data.steamDir)
          navigate({ to: "/steam/userdata" })
        })}
      >
        <div className="flex flex-col gap-2">
          <p>Locate Steam directory</p>
          <div className="flex gap-2">
            <Button variant="outline" type="button" onClick={browseFile}>
              Browse
            </Button>
            <input
              className="w-full rounded border px-2 py-1"
              {...methods.register("steamDir")}
            ></input>
          </div>
          <Button variant="outline" className="w-fit">
            Read
          </Button>
        </div>
      </Form>
      <Outlet />
    </div>
  )
}
