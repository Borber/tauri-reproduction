import { A, RouteSectionProps } from "@solidjs/router"
import { getCurrent } from "@tauri-apps/api/window"

import "./App.css"
import { Match, Switch, createSignal, onMount } from "solid-js"
import {
    CodeIcon,
    HelpIcon,
    HomeIcon,
    InBoxIcon,
    PlusIcon,
    SettingIcon,
} from "./icon"
import { emit } from "@tauri-apps/api/event"

const App = (props: RouteSectionProps) => {
    const current = getCurrent()

    const [flag, setFlag] = createSignal(false)
    onMount(async () => {
        window.addEventListener("keyup", async (e) => {
            if (e.key == "Escape") {
                current.close()
            }

            if (e.key == "n") {
                setFlag(true)
                const inputElement = document.getElementById("input")
                if (inputElement) inputElement.focus()
            }
        })
    })

    const [value, Value] = createSignal("")

    // 处理回车事件
    const handleKeyPress = async (e: KeyboardEvent) => {
        if (e.isComposing === false && e.key === "Enter") {
            await emit("addTask", {
                id: value().length,
                name: value(),
            })
            //清空输入框
            Value("")
            setFlag(false)
        }
    }
    return (
        <div class="app">
            <div class="container">{props.children}</div>
            <div class="taskbar">
                <div class="taskbar-left">
                    <A href="/" class="taskbar-control-item">
                        <HomeIcon size={25} />
                    </A>
                    <A href="/inbox" class="taskbar-control-item">
                        <InBoxIcon size={28} />
                    </A>
                </div>

                <div class="taskbar-center">
                    <Switch>
                        <Match when={!flag()}>
                            <A href="/project" class="taskbar-control-item">
                                <CodeIcon size={25} />
                            </A>
                            <A href="/inbox" class="taskbar-control-item">
                                <PlusIcon size={25} />
                            </A>
                        </Match>
                        <Match when={flag()}>
                            <div class="new">
                                <input
                                    id="input"
                                    class="input"
                                    type="text"
                                    value={value()}
                                    onInput={(e) =>
                                        Value(e.currentTarget.value)
                                    }
                                    onKeyPress={handleKeyPress}
                                />
                            </div>
                        </Match>
                    </Switch>
                </div>

                <div class="taskbar-right">
                    <A href="/help" class="taskbar-control-item">
                        <HelpIcon size={25} />
                    </A>
                    <A href="/setting" class="taskbar-control-item">
                        <SettingIcon size={25} />
                    </A>
                </div>
            </div>
        </div>
    )
}

export default App
