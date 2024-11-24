import { Form } from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useConfig } from "@/context"
import { createFileRoute } from "@tanstack/react-router"
import { readDir } from "@tauri-apps/plugin-fs"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

export const Route = createFileRoute("/steam/userdata")({
  component: UserData,
})

function UserData() {
  const methods = useForm()
  const { steamDir } = useConfig()
  const [userIds, setUserIds] = useState<string[]>([])

  useEffect(() => {
    if (steamDir) {
      readDir(`${steamDir}/userdata`).then((value) => {
        setUserIds(value.filter((v) => v.isDirectory).map((v) => v.name))
      })
    }
  }, [steamDir])

  return (
    <Form {...methods}>
      <p>Select a user</p>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {userIds.map((userId) => (
            <SelectItem value={userId}>{userId}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Form>
  )
}
