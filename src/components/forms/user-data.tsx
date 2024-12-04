import { readDir } from "@/api"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useConfig } from "@/context"
import { path } from "@tauri-apps/api"
import { useEffect, useState } from "react"

export function UserDataForm() {
  const { steamDir, setUserId } = useConfig()
  const [userIds, setUserIds] = useState<string[]>([])
  const [error, setError] = useState("")

  useEffect(() => {
    if (steamDir) {
      path
        .join(steamDir, "userdata")
        .then(readDir)
        .then((dir) => {
          setUserIds(dir.filter((v) => v.is_dir).map((v) => v.name))
          setError("")
        })
        .catch(setError)
    }
  }, [steamDir])

  const caption =
    userIds.length === 1 ? `1 user profile found.` : `${userIds.length} user profiles found`

  return (
    <Card className="flex flex-col items-start gap-2 p-4">
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
      <caption>{error || steamDir ? caption : ""}</caption>
    </Card>
  )
}
