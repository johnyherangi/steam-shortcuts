import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/steam/userdata/$userId")({
  component: RouteComponent,
})

function RouteComponent() {
  return "Hello /steam/userdata/$userId!"
}
