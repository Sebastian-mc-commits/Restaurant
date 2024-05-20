import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { Alert, ConfigProvider, theme } from "antd";
import RightBarMenu from './components/RightBarMenu';

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (

    <ConfigProvider
      theme={{
        token: {
          // colorPrimary: "white",
          // motion // animation
        },
        algorithm: theme.darkAlgorithm
      }}
    >

      <RightBarMenu>
        <p>Content</p>
      </RightBarMenu>

    </ConfigProvider>
  );
}

export default App;
