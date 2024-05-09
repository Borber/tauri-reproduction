/* @refresh reload */
import { render } from "solid-js/web"
import { Router } from "@solidjs/router"

import App from "./App"
import "./styles.css"
import Home from "./components/Home"


const routes = [
    {
        path: "/",
        component: Home,
    },
]

render(
    () => <Router root={App}>{routes}</Router>,
    document.getElementById("root") as HTMLElement
)
