import { Menu } from "@tauri-apps/api/menu";
import { openFile } from "./openFile";

export async function createAppMenu() {
    const menu = await Menu.new({
        items: [
          {
            id: 'file',
            text: 'File',
            items: [openFile]
          },
        ],
      });

    return menu.setAsAppMenu()
}
