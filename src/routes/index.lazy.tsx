import { Form } from "@/components/ui/form"
import { createLazyFileRoute } from "@tanstack/react-router"
import { open } from "@tauri-apps/plugin-dialog"
import { useForm } from "react-hook-form"

export const Route = createLazyFileRoute("/")({
  component: Index,
})

function Index() {
  const methods = useForm()

  return (
    <Form {...methods}>
      <p>Select a shortcuts.vdf file:</p>
      <div className="flex gap-2">
        <button
          className="rounded border px-2 py-1"
          type="button"
          onClick={() => {
            open().then((filePath) => methods.setValue("filePath", filePath ?? ""))
          }}
        >
          Browse
        </button>
        <input
          className="w-full rounded border px-2 py-1"
          {...methods.register("filePath")}
        ></input>
      </div>
      <button>Next</button>
    </Form>
  )
}
