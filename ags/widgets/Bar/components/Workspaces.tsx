import { App, Astal, Gtk, Gdk } from "astal/gtk3"
import { Variable, bind } from "astal"
import Hyprland from "gi://AstalHyprland"
import AstalHyprland from "gi://AstalHyprland?version=0.1"

const hyprland = Hyprland.get_default()

export default function Workspaces() {
    return <box 
        className="Workspaces"
        vexpand={false}
        valign={Gtk.Align.CENTER}
        >
            {bind(hyprland, "workspaces").as(workspaces => workspaces
                .sort((a, b) => a.id - b.id)
                .map(ws => (
                    <button 
                        className={
                            bind(hyprland, "focusedWorkspace")
                                .as(
                                    fw => ws === fw ?
                                        "focused transparentButton" :
                                        "unfocused transparentButton"
                                )
                        }
                        onClicked={() => ws.focus()}>
                        <box className="WorkspaceCircle" />
                    </button>
                ))
            )}
        </box>
}