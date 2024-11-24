import { useState } from "react";
import "./App.css";
import editSvg from "./assets/edit.svg";

import { open } from "@tauri-apps/plugin-dialog";

function App() {
  // const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  //   setGreetMsg(await invoke("greet", { name }));
    
  // }

  return (
    <main className="container">
      <h1>
        {"Steam Shortcuts "}
        <img src={editSvg} className="logo react" alt="React logo" />
      </h1>
      <p>Select a shortcuts.vdf file</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          // greet();
        }}
      >
        <input
          id="greet-input"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Full path to file..."
        />
        <button type="button" onClick={() => {
          open().then(v => setName(v ?? ""))
        }}>Browse</button>
      </form>
      {/* <p>{greetMsg}</p> */}
    </main>
  );
}

export default App;
