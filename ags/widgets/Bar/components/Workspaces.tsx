import { Gtk } from "ags/gtk4"
import Hyprland from "gi://AstalHyprland"
import { createBinding } from "ags"



const hyprland = Hyprland.get_default()

export default function Workspaces() {
    return <box 
        class="Workspaces"
        vexpand={false}
        valign={Gtk.Align.CENTER}
        >
            {createBinding(hyprland, "workspaces").as(workspaces => workspaces
                .sort((a, b) => a.id - b.id)
                .map(workspace => (
                    <button 
                        class={
                            createBinding(hyprland, "focusedWorkspace")
                                .as(
                                    focusedWorkspace => workspace === focusedWorkspace ?
                                        "focused transparentButton" :
                                        "unfocused transparentButton"
                                )
                        }
                        onClicked={() => workspace.focus()}>
                        <box class="WorkspaceCircle" />
                    </button>
                ))
            )()}
        </box>
}