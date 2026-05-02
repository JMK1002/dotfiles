import Workspaces from "./components/Workspaces"
import BackgroundButton from "./components/BackgroundButton"
import WofiButton from "./components/WofiButton"
import CalendarButton from "./components/CalendarButton"
import Gdk from "gi://Gdk?version=4.0"
import { Astal, Gtk } from "ags/gtk4"
import app from "ags/gtk4/app"

// * Have Wofi launcher, workspaces, bg changer, media, frequently used apps (maybe), diagnostic, quicksettings, calendar, power

export default function Bar(gdkmonitor: Gdk.Monitor) {
	return (
		<window
			name={`Bar-${gdkmonitor.connector}`}
			class="Bar"
			gdkmonitor={gdkmonitor}
			exclusivity={Astal.Exclusivity.EXCLUSIVE}
			anchor={
				Astal.WindowAnchor.TOP |
				Astal.WindowAnchor.LEFT |
				Astal.WindowAnchor.RIGHT
			}
			application={app}
			visible={true}
		>
			<box spacing={20} halign={Gtk.Align.START}>
				<WofiButton />
				<Workspaces />
				<BackgroundButton gdkmonitor={gdkmonitor} />
				<CalendarButton gdkmonitor={gdkmonitor} />
			</box>
		</window>
	)
}
