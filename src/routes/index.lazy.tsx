import { createLazyFileRoute } from "@tanstack/react-router"
import { open } from "@tauri-apps/plugin-dialog"
import { Form, useForm } from "react-hook-form"

export const Route = createLazyFileRoute("/")({
  component: Index,
})

function Index() {
  const { control, register, setValue } = useForm()

  return (
    <Form
      onSubmit={({ formData }) => {
        alert(formData.get("filePath"))
      }}
      control={control}
      className="p-2"
    >
      <p>Select a shortcuts.vdf file:</p>
      <div className="flex gap-2">
        <button
          className="rounded border px-2 py-1"
          type="button"
          onClick={() => {
            open().then((filePath) => setValue("filePath", filePath ?? ""))
          }}
        >
          Browse
        </button>
        <input className="w-full rounded border px-2 py-1" {...register("filePath")}></input>
      </div>
      <button>Next</button>
    </Form>
  )
}
