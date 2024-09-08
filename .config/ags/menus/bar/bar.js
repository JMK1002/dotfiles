import { workspaces } from "./widgets/workspaces.js"
import WindowRevealer from "../../utils/WindowRevealer.js"

export const Bar = WindowRevealer({
    name: "bar",
    anchor: ["bottom"],
    layer: "overlay",
    child: Widget.Box({
        child: workspaces
    }),
    keymode: "on-demand"
})