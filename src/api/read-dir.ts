import { invoke } from "@tauri-apps/api/core"

export type DirEntry = {
  name: string
  is_dir: boolean
}

export async function readDir(path: string) {
  return await invoke<DirEntry[]>("read_dir", { path })
}

export async function tryReadDir(path: string): Promise<DirEntry[] | undefined> {
  return await invoke<DirEntry[]>("read_dir", { path }).catch((error) => {
    console.log(error)
    return undefined
  })
}
