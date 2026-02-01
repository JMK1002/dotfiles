import { Astal, Gdk, Gtk } from "ags/gtk4"
import WindowRevealer from "../../utils/WindowRevealer"
import GoogleCalendar from "./components/GoogleCalendar"
import EventDisplay from "./components/EventDisplay"
import ICAL from "ical.js"
import { interval } from "ags/time"
import app from "ags/gtk4/app"

const myCal = new GoogleCalendar(`jmkovalovsky@gmail.com.ics`)

export default (gdkmonitor: Gdk.Monitor) => {
	const window = <window
		name={"CalendarWindow"}
		application={app}
		class={"transparentBackground darkerBackground"}
		anchor={Astal.WindowAnchor.TOP}
		layer={Astal.Layer.TOP}
		keymode={Astal.Keymode.ON_DEMAND}
		exclusivity={Astal.Exclusivity.NORMAL}
		visible={true}
		>
		<box>
			<Gtk.Calendar class="calendar"/>
			<box orientation={Gtk.Orientation.VERTICAL}>
				<box>
					<button 
						// onClicked={() => toggled.set(!toggled.get())}
						label={"Add Event"}
					/>
					<button
						// onClicked={() => reloadEvents(calendar)}
						label={"Reload Events"}
					/>
				</box>
			</box>
		</box>
	</window>
	
	if (window instanceof Astal.Window) {
		return WindowRevealer(window)
	}
}