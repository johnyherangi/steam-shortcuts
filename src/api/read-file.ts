import { invoke } from "@tauri-apps/api/core"

export async function readFile<T>(path: string) {
  return await invoke<T>("read_file", { path })
}
