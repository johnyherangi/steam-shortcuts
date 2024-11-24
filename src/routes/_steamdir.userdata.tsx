import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useConfig } from "@/context"
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router"
import { path } from "@tauri-apps/api"
import { readDir } from "@tauri-apps/plugin-fs"
import { useEffect, useState } from "react"

export const Route = createFileRoute("/_steamdir/userdata")({
  component: UserDataForm,
})

function UserDataForm() {
  const { steamDir, setUserId } = useConfig()
  const navigate = useNavigate()
  const [userIds, setUserIds] = useState<string[]>([])

  useEffect(() => {
    if (steamDir) {
      path
        .join(steamDir, "userdata")
        .then((joined) => readDir(joined))
        .then((value) => {
          setUserIds(value.filter((v) => v.isDirectory).map((v) => v.name))
        })
    }
  }, [steamDir])

  return (
    <>
      <Card className="flex flex-col gap-2 p-4">
        <p>User ID</p>
        <Select
          onValueChange={(userId) => {
            setUserId(userId)
            navigate({ to: "/userdata/$userId", params: { userId } })
          }}
        >
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
      <Outlet />
    </>
  )
}
