import { Gtk, Gdk } from "ags/gtk4"
import app from "ags/gtk4/app"
import Hyprland from "gi://AstalHyprland"
import { createBinding } from "ags"

const hyprland = Hyprland.get_default()

export default function Workspaces({
	gdkmonitor,
}: {
	gdkmonitor: Gdk.Monitor
}) {
	return (
		<box class="Workspaces" vexpand={false} valign={Gtk.Align.CENTER}>
			{createBinding(hyprland, "workspaces").as((workspaces) =>
				workspaces
					.sort((a, b) => a.id - b.id)
					.filter((workspace) => workspace.monitor.model == gdkmonitor.model)
					.map((workspace) => (
						<button
							class={createBinding(hyprland, "focusedWorkspace").as(
								(focusedWorkspace) =>
									workspace === focusedWorkspace
										? "focused transparentButton"
										: "unfocused transparentButton",
							)}
							onClicked={() => workspace.focus()}
						>
							<box class="WorkspaceCircle" />
						</button>
					)),
			)()}
		</box>
	)
}
