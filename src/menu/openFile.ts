import { MenuItemOptions } from "@tauri-apps/api/menu";
import { open } from "@tauri-apps/plugin-dialog";

export const openFile: MenuItemOptions = {
    id: "open",
    text: "Open",
    action: () => open().then(filePath => localStorage.setItem("filePath", filePath ?? ""))
}