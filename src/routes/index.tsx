import { ShortcutsForm } from "@/components/forms/shortcuts"
import { SteamDirForm } from "@/components/forms/steam-dir"
import { UserDataForm } from "@/components/forms/user-data"
import { createFileRoute } from "@tanstack/react-router"

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
