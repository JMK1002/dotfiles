import { WifiMenu } from "./pages/network.js"
import { HomeMenu } from "./pages/home.js"
import WindowRevealer from "../../utils/WindowRevealer.js"

const page = Variable("home")

const stack = Widget.Stack({
    className: "quicksettings transparentBackground",
    homogeneous: false,
    children: {
        "home": HomeMenu(page),
        "wifi": WifiMenu(page)
    },
    transition: "slide_left_right",
})
.hook(page, () => {
    // @ts-ignore
    stack.shown = page.value
}, "changed")

export const QuicksettingsMenu = WindowRevealer({
        name: "quicksettings",
        anchor: ["top", "right"],
        layer: "overlay",
        child: Widget.Box({
            child: stack
        }),
        keymode: "on-demand"
    })