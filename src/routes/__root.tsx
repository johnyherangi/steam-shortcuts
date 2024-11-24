import { createRootRoute, Link, Outlet } from "@tanstack/react-router"
import { Suspense } from "react"
import { TanStackRouterDevtools } from "../devTools"

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex gap-2 p-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/steam" className="[&.active]:font-bold">
          Steam
        </Link>
      </div>
      <hr />
      <Outlet />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  ),
})
