import app from "ags/gtk4/app"
import { Gdk } from "ags/gtk4"

export default function CalendarButton({
	gdkmonitor,
}: {
	gdkmonitor: Gdk.Monitor
}) {
	return (
		<button
			class={"transparentButton"}
			onClicked={() => {
				app.toggle_window(`CalendarWindow-${gdkmonitor.connector}`)
			}}
		>
			Calendar
		</button>
	)
}
