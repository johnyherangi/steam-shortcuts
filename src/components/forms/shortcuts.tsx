import { readFile } from "@/api"
import { Card } from "@/components/ui/card"
import { useConfig } from "@/context"
import { path } from "@tauri-apps/api"
import { useEffect, useState } from "react"
import {
  FieldValues,
  Form,
  FormProvider,
  useFieldArray,
  useForm,
  UseFormRegister,
} from "react-hook-form"
import { readVdf, VdfMap } from "steam-binary-vdf"

export function ShortcutsForm() {
  const { steamDir, userId } = useConfig()

  const [shortcuts, setShortcuts] = useState<VdfMap>()
  useEffect(() => {
    if (steamDir && userId) {
      loadShortcutsVdf(steamDir, userId).then(setShortcuts)
    }
  }, [steamDir, userId])

  const shortcutsArr = Object.entries(shortcuts?.shortcuts ?? {}).map((e) => e[1])

  console.log(shortcutsArr[0].tags)

  if (shortcutsArr.length === 0) {
    return <></>
  }

  const defaultValues = {
    shortcuts: shortcutsArr,
  }

  return <ShortcutsList defaultValues={defaultValues} />
}

function ShortcutsList({ defaultValues }: { defaultValues: any }) {
  const methods = useForm({
    defaultValues,
  })

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control: methods.control,
    name: "shortcuts",
  })

  console.log(methods.formState.defaultValues, defaultValues)

  return (
    <FormProvider {...methods}>
      <Form>
        <Card className="flex flex-col gap-2 p-4">
          <ul>{fields.map(shortcut(methods.register))}</ul>
        </Card>
      </Form>
    </FormProvider>
  )
}

function shortcut(register: UseFormRegister<FieldValues>) {
  const gridRow = (fieldName: string, index: number, type = "text") => {
    return (
      <>
        <label htmlFor={fieldName}>{fieldName}</label>
        <input id={fieldName} {...register(`shortcuts.${index}.${fieldName}`)} type={type} />
      </>
    )
  }

  return function (field: Record<"id", string>, index: number) {
    return (
      <li key={field.id} className="grid grid-cols-2 gap-2">
        {gridRow("exe", index)}
        {gridRow("StartDir", index)}
        {gridRow("icon", index)}
        {gridRow("ShortcutPath", index)}
        {gridRow("LaunchOptions", index)}
        {gridRow("IsHidden", index, "number")}
        {gridRow("AllowDesktopConfig", index, "number")}
        {gridRow("AllowOverlay", index, "number")}
        {gridRow("openvr", index)}
        {gridRow("Devkit", index)}
        {gridRow("DevkitGameID", index)}
        {gridRow("LastPlayTime", index, "number")}
        {gridRow("tags", index)}
      </li>
    )
  }
}

async function loadShortcutsVdf(steamDir: string, userId: string) {
  const shortcutsPath = await path.join(steamDir, "userdata", userId, "config", "shortcuts.vdf")
  try {
    const result = await readFile<ArrayBuffer>(shortcutsPath)
    return readVdf(Buffer.from(result))
  } catch (error) {
    alert(String(error))
    return undefined
  }
}
