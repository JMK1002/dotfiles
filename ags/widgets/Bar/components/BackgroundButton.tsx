import { Gdk } from "ags/gtk4"
import app from "ags/gtk4/app"

export default function BackgroundButton({
	gdkmonitor,
}: {
	gdkmonitor: Gdk.Monitor
}) {
	return (
		<button
			class={"animatedGradient"}
			onClicked={() => {
				app.toggle_window(`WallpaperChanger-${gdkmonitor.connector}`)
			}}
		>
			Change Background
		</button>
	)
}
