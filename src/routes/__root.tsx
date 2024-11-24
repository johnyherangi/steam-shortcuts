import { createRootRoute, Outlet } from "@tanstack/react-router"

export const Route = createRootRoute({
  component: Root,
})

function Root() {
  return (
    <div className="flex flex-col gap-2 p-2">
      <Outlet />
    </div>
  )
}
